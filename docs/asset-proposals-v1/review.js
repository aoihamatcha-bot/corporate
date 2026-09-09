const assets=JSON.parse(document.querySelector('#asset-data').textContent);
const storageKey='mystena-asset-proposals-v1-review';
let selections={};
try{selections=JSON.parse(localStorage.getItem(storageKey)||'{}');}catch{selections={};}
const labels={candidate:'採用候補',revise:'修正して検討',decline:'見送り'};
const dialog=document.querySelector('#lightbox');
function summary(){
 const chosen=assets.filter(a=>selections[a.id]?.decision||selections[a.id]?.memo);
 document.querySelector('#decision-count').textContent=`選択済み ${assets.filter(a=>selections[a.id]?.decision).length} / ${assets.length}`;
 document.querySelector('#export-text').value='MYSTENA 画像アセット v1 のレビュー\n'+(chosen.length?chosen.map(a=>{const s=selections[a.id];return `${a.id} ${a.title}：${labels[s.decision]||'未選択'}${s.variant&&s.variant!=='common'?' ['+s.variant+']':''}${s.memo?'\n  '+s.memo:''}`;}).join('\n\n'):'（候補を選ぶか、メモを記入してください）')+'\n\n※ サイト反映は、このレビュー後の依頼で判断します。';
}
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(selections));}catch{}summary();}
for(const a of assets){
 const card=document.querySelector(`[data-id="${a.id}"]`);
 const decision=card.querySelector('.decision'),memo=card.querySelector('textarea');
 decision.value=selections[a.id]?.decision||'';memo.value=selections[a.id]?.memo||'';
 let active=a.files.find(f=>f.variant===selections[a.id]?.variant)||a.files[0];
 function updateVariant(f){
  active=f;const img=card.querySelector('.preview img');img.src=f.path;img.alt=a.alt[f.variant==='en'?'en':'ja'];img.width=f.width;img.height=f.height;
  card.querySelector('.preview').classList.toggle('dark',f.variant==='dark');
  for(const b of card.querySelectorAll('[data-variant]'))b.setAttribute('aria-pressed',String(b.dataset.variant===f.variant));
  card.querySelector('.dimensions').textContent=`${f.width} × ${f.height}`;
  card.querySelector('.file-info').textContent=f.path.split('/').pop()+' · '+Math.round(f.bytes/1024)+' KB';
  card.querySelector('.download-image').href=f.path;
  if(f.svg){card.querySelector('.download-svg').href=f.svg;card.querySelector('.download-editable').href=f.editableSvg;}
 }
 updateVariant(active);
 for(const b of card.querySelectorAll('[data-variant]'))b.addEventListener('click',()=>{const f=a.files.find(f=>f.variant===b.dataset.variant);updateVariant(f);selections[a.id]={...selections[a.id],variant:f.variant};persist();});
 function save(){selections[a.id]={...selections[a.id],decision:decision.value,memo:memo.value,variant:active.variant};persist();}
 decision.addEventListener('change',save);memo.addEventListener('input',save);
 card.querySelector('.preview').addEventListener('click',()=>{
  document.querySelector('#dialog-title').textContent=a.id+' / '+a.title;
  const img=document.querySelector('#dialog-image');img.src=active.path;img.alt=a.alt[active.variant==='en'?'en':'ja'];img.parentElement.classList.toggle('dark',active.variant==='dark');
  document.querySelector('#dialog-caption').textContent=a.place+' — '+a.note;
  document.querySelector('#dialog-download').href=active.path;
  dialog.showModal();
 });
}
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('#copy-review').addEventListener('click',async()=>{
 const input=document.querySelector('#export-text'),status=document.querySelector('#copy-status');
 try{await navigator.clipboard.writeText(input.value);status.textContent='コピーしました。このチャットへ貼り付けてください。';}catch{input.focus();input.select();status.textContent='本文を選択しました。コピーして、このチャットへ貼り付けてください。';}
});
summary();
