/** Node.js >= 22.18 (native TypeScript stripping). No npm packages required. */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { handwriting, handwritingPen } from '../components/motion/handwriting.ts';

// Paths use only absolute M/L/C commands. Sample curves, resample at equal
// distances, then build a pressure envelope with semicircular terminal caps.
export function samplePath(d) {
  const tokens = d.match(/[MLC]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? [];
  const points = [];
  let i = 0, p;
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === 'M' || cmd === 'L') {
      p = [Number(tokens[i++]), Number(tokens[i++])];
      points.push(p);
    } else if (cmd === 'C') {
      const a = [Number(tokens[i++]), Number(tokens[i++])];
      const b = [Number(tokens[i++]), Number(tokens[i++])];
      const c = [Number(tokens[i++]), Number(tokens[i++])];
      const start = p;
      const estimate = Math.hypot(a[0]-p[0], a[1]-p[1]) + Math.hypot(b[0]-a[0],b[1]-a[1]) + Math.hypot(c[0]-b[0],c[1]-b[1]);
      const steps = Math.max(8, Math.ceil(estimate / 0.25));
      for (let n=1; n<=steps; n++) {
        const t=n/steps, u=1-t;
        points.push([u*u*u*start[0]+3*u*u*t*a[0]+3*u*t*t*b[0]+t*t*t*c[0], u*u*u*start[1]+3*u*u*t*a[1]+3*u*t*t*b[1]+t*t*t*c[1]]);
      }
      p=c;
    } else throw new Error(`Unsupported path command: ${cmd}`);
  }
  const distances=[0];
  for(let j=1;j<points.length;j++) distances.push(distances[j-1]+Math.hypot(points[j][0]-points[j-1][0],points[j][1]-points[j-1][1]));
  const length=distances.at(-1);
  if(!Number.isFinite(length) || length <= 0) throw new Error('Invalid centerline');
  const count=Math.max(2,Math.ceil(length/0.4));
  const sampled=[];
  let segment=1;
  for(let j=0;j<=count;j++) {
    const at=length*j/count;
    while(segment<distances.length-1 && distances[segment]<at) segment++;
    const fraction=(at-distances[segment-1])/(distances[segment]-distances[segment-1] || 1);
    sampled.push(points[segment-1].map((v,k)=>v+(points[segment][k]-v)*fraction));
  }
  return {points:sampled,length};
}

export function inkOutline(d) {
  const {points}=samplePath(d);
  const left=[],right=[],radii=[],angles=[];
  for(let i=0;i<points.length;i++) {
    const t=i/(points.length-1), a=points[Math.max(0,i-2)], b=points[Math.min(points.length-1,i+2)];
    const angle=Math.atan2(b[1]-a[1],b[0]-a[0]);
    const pressure=1-(1-handwritingPen.startPressure)*Math.exp(-t*13)-(1-handwritingPen.endPressure)*Math.exp(-(1-t)*13)+handwritingPen.swell*Math.sin(Math.PI*t);
    const radius=handwritingPen.width*pressure/2;
    const nx=-Math.sin(angle)*radius, ny=Math.cos(angle)*radius;
    left.push([points[i][0]+nx,points[i][1]+ny]);
    right.push([points[i][0]-nx,points[i][1]-ny]);
    angles.push(angle);radii.push(radius);
  }
  const cap=(p,r,angle)=>Array.from({length:8},(_,i)=>{
    const theta=angle+Math.PI/2-Math.PI*(i+1)/8;
    return [p[0]+Math.cos(theta)*r,p[1]+Math.sin(theta)*r];
  });
  const outline=[...left,...cap(points.at(-1),radii.at(-1),angles.at(-1)),...right.reverse(),...cap(points[0],radii[0],angles[0]+Math.PI)];
  return outline.map((p,i)=>`${i?'L':'M'}${p.map(v=>Number(v.toFixed(2))).join(' ')}`).join(' ')+' Z';
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const ink=Object.fromEntries(Object.entries(handwriting).map(([glyph,paths])=>[glyph,paths.map(inkOutline)]));
  writeFileSync(new URL('../components/motion/handwriting-ink.ts',import.meta.url),
    '// Generated from handwriting.ts by scripts/build-handwriting-v3.mjs. Do not edit by hand.\n'+
    'export const handwritingInk: Record<string, string[]> = '+JSON.stringify(ink,null,2)+';\n');
  console.log(`Generated ${Object.values(ink).flat().length} rounded ink outlines in ${fileURLToPath(new URL('../components/motion/handwriting-ink.ts',import.meta.url))}`);
}
