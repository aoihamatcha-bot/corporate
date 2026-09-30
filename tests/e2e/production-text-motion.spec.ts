import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Read-only observation of the Owner-specified Production deployment, not a
// snapshot generated from the candidate implementation under test.
const production = JSON.parse(readFileSync('docs/evidence/production-text-restore-20260930/production/record.json', 'utf8'));
const tokens: Record<string, number> = production.views[0].body[0].tokens;

test('body restores the observed Production wipe, moving gradient and timing rules', async ({ page }) => {
  await page.goto('/about');
  const body = page.locator('.page-description .reveal-text');
  await expect(body).toHaveCount(1);
  await expect(body).toHaveAttribute('data-reveal-state', 'running');
  const state = await body.evaluate((el, names) => {
    const style = getComputedStyle(el);
    const source = el.querySelector('.reveal-source')!;
    const overlay = el.querySelector('.reveal-color')!;
    const sourceEffect = source.getAnimations()[0].effect as KeyframeEffect;
    const glow = overlay.getAnimations().find(a=>(a.effect as KeyframeEffect).getKeyframes().some(f=>'backgroundPosition' in f))!;
    const effect = glow.effect as KeyframeEffect;
    const bands = [...el.querySelectorAll('.reveal-band')];
    return {
      tokens: Object.fromEntries(names.map(name=>[name,Number(style.getPropertyValue(name))])),
      beat: Number(style.getPropertyValue('--ink-beat')),
      source: { timing: sourceEffect.getTiming(), frames: sourceEffect.getKeyframes() },
      color: { timing: effect.getTiming(), frames: effect.getKeyframes(), size: getComputedStyle(overlay).backgroundSize, filter: getComputedStyle(overlay,'::before').filter },
      bands: bands.map(band=>({palette:band.getAttribute('data-palette'),timing:band.getAnimations()[0].effect!.getTiming(),frames:(band.getAnimations()[0].effect as KeyframeEffect).getKeyframes()})),
      palette: el.getAttribute('data-palette'),
      rootAnimations:el.getAnimations().length,
    };
  },Object.keys(tokens));
  expect(state.tokens).toEqual(tokens);
  const wipe=tokens['--body-wipe-ms']+state.beat*19;
  const hold=tokens['--body-hold-ms']+state.beat*20;
  const fade=tokens['--body-fade-ms']+state.beat*43;
  const delay=tokens['--body-delay-ms']+state.beat*37;
  const clear=wipe+Math.min(Math.max(state.bands.length-1,0),4)*65;
  expect(state.source.timing).toMatchObject({duration:wipe,delay,easing:'cubic-bezier(0.65, 0, 0.2, 1)',fill:'backwards',iterations:1});
  expect(state.source.frames.map(f=>f.computedOffset)).toEqual([0,.35,1]);
  expect(state.source.frames[0].clipPath).toContain('100%');
  expect(state.color.timing).toMatchObject({duration:clear+hold+fade,delay,easing:'linear',iterations:1});
  expect(state.color.frames.map(f=>Number(f.opacity))).toEqual([1,1,0]);
  expect(state.color.frames.map(f=>f.backgroundPosition)).toEqual(['0% 50%','65% 50%','100% 50%']);
  expect(state.color.frames[1].computedOffset! * Number(state.color.timing.duration) - clear).toBeCloseTo(hold,5);
  expect(state.color.size).toBe('180% 100%');
  expect(state.color.filter).toBe('brightness(0.82)');
  expect(state.rootAnimations).toBe(0);
  expect(state.bands.length).toBeGreaterThan(0);
  for (const [index,band] of state.bands.entries()) {
    expect(band.palette).not.toBe(state.palette);
    expect(band.timing).toMatchObject({duration:wipe,delay:delay+Math.min(index,4)*65,easing:'cubic-bezier(0.65, 0, 0.2, 1)',fill:'both'});
    expect(band.frames.map(f=>f.computedOffset)).toEqual([0,.38,.48,1]);
  }
  await expect(body).toHaveAttribute('data-reveal-state','settled');
  await expect(body.locator('.reveal-source')).toHaveCSS('clip-path','none');
  await expect(body.locator('.reveal-color')).toHaveCSS('opacity','0');
  await expect(body.locator('.reveal-band')).toHaveCount(0);
});

test('utility text uses Production color-only motion without a wipe or changing its hit target', async ({ page }) => {
  await page.goto('/about');
  const utility=page.locator('.menu-trigger .reveal-text');
  await expect(utility).toHaveAttribute('data-reveal-state','running');
  const state=await utility.evaluate(el=>({
    bands:el.querySelectorAll('.reveal-band').length,
    sourceAnimations:el.querySelector('.reveal-source')!.getAnimations().length,
    rootAnimations:el.getAnimations().length,
    frames:(el.querySelector('.reveal-color')!.getAnimations()[0].effect as KeyframeEffect).getKeyframes(),
  }));
  expect(state).toMatchObject({bands:0,sourceAnimations:0,rootAnimations:0});
  expect(state.frames.map(f=>f.backgroundPosition)).toEqual(['0% 50%','65% 50%','100% 50%']);
  await expect(utility).toHaveAttribute('data-reveal-state','settled');
  await expect(page.getByRole('button',{name:'メニューを開く'})).toBeEnabled();
});

test('menu restores separate wipe palettes on every opening and reveals keyboard-focused labels immediately', async ({ page }) => {
  await page.goto('/about');
  const open=page.getByRole('button',{name:'メニューを開く'});
  const dialog=page.getByRole('dialog');
  const palettes: string[][]=[];
  for(let i=0;i<2;i++) {
    await open.click();
    const state=await dialog.locator('.menu-ink').evaluateAll(elements=>elements.map(el=>({
      palette:el.getAttribute('data-palette')!,
      wipePalette:el.querySelector('.menu-ink-wipe')!.getAttribute('data-palette'),
      kind:el.getAttribute('data-motion-kind'),
      visible:el.getClientRects().length>0,
      animations:el.getAnimations({subtree:true}).map(a=>(a as CSSAnimation).animationName),
    })));
    palettes.push(state.map(s=>s.palette));
    for(const entry of state) {
      expect(entry.wipePalette).not.toBe(entry.palette);
      if(entry.visible && entry.kind!=='utility') {
        expect(entry.animations).toContain('type-band');
        expect(entry.animations).toContain('glyph-reveal');
        expect(entry.animations).toContain('nav-ink-settle');
      }
    }
    await page.keyboard.press('Tab');
    const focused=await dialog.evaluate(el=>{
      const focused=el.querySelector(':focus')!;
      return [...focused.querySelectorAll('.menu-ink-base')].map(label=>({clip:getComputedStyle(label).clipPath,animations:label.getAnimations().length}));
    });
    expect(focused.length).toBeGreaterThan(0);
    expect(focused.every(s=>s.clip==='none'&&s.animations===0)).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  }
  expect(palettes[0].length).toBe(palettes[1].length);
  expect(palettes[1].every((palette,i)=>palette!==palettes[0][i])).toBe(true);
});
