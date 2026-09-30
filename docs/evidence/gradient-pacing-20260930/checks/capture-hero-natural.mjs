import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
const output='docs/evidence/gradient-pacing-20260930/candidate';
if (await fs.stat(`${output}/hero-record.json`).catch(()=>null)) throw new Error('Preserve evidence');
const expected=JSON.parse(await fs.readFile(`${output}/record.json`,'utf8'));
const build=(await fs.readFile('.next/BUILD_ID','utf8')).trim();
if(build!==expected.runtimeBefore.buildId) throw new Error('Wrong runtime');
const report={builtSource:expected.builtSource,buildId:build,conditions:'Natural motion; no seeking, timing override or CSS override. Capture band, color-only and settled phases.',images:[],errors:[],servedFiles:{}};
const responses=[];
const hash=b=>createHash('sha256').update(b).digest('hex');
const browser=await chromium.launch();
for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:width===390?844:1000},reducedMotion:'no-preference'});
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('response',r=>{const u=new URL(r.url());if(u.pathname.startsWith('/_next/static/')&&/\.(js|css)$/.test(u.pathname))responses.push((async()=>{const bytes=await r.body();const file='.next/'+u.pathname.slice('/_next/'.length);const matches=hash(bytes)===hash(await fs.readFile(file));report.servedFiles[u.pathname]={sha256:hash(bytes),matches};if(!matches)throw new Error('Asset mismatch');})());});
 await page.goto('http://127.0.0.1:3017/');
 await page.waitForFunction(()=>document.documentElement.dataset.intro==='done');
 const phase=async(name,predicate)=>{
  await page.waitForFunction(predicate);
  const state=await page.locator('.hero h1').evaluate(el=>({bands:[...el.querySelectorAll('.reveal-band')].map(b=>getComputedStyle(b).opacity),colors:[...el.querySelectorAll('.reveal-color')].map(b=>getComputedStyle(b).opacity)}));
  const filename=`ja-${width}-hero-${name}.png`;
  await page.screenshot({path:`${output}/${filename}`});report.images.push({filename,state});
 };
 await phase('band',()=>[...document.querySelectorAll('.hero h1 .reveal-band')].some(b=>Number(getComputedStyle(b).opacity)>.84));
 await phase('color',()=>[...document.querySelectorAll('.hero h1 .reveal-band')].every(b=>Number(getComputedStyle(b).opacity)===0)&&[...document.querySelectorAll('.hero h1 .reveal-color')].every(b=>Number(getComputedStyle(b).opacity)>.99));
 await phase('settled',()=>[...document.querySelectorAll('.hero h1 .reveal-text')].every(b=>b.dataset.revealState==='settled'));
 await context.close();
}
await Promise.all(responses);await browser.close();
if((await fs.readFile('.next/BUILD_ID','utf8')).trim()!==build)throw new Error('Runtime drift');
await fs.writeFile(`${output}/hero-record.json`,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({images:report.images.length,errors:report.errors,assets:Object.keys(report.servedFiles).length}));
