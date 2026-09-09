const assets=JSON.parse(document.querySelector('#asset-data').textContent);
const storageKey='mystena-asset-proposals-v2-review';
const defaults={A03:{decision:'adopt',variant:'common',memo:''},A04:{decision:'adopt',variant:'common',memo:''},A08:{decision:'adopt',variant:'common',memo:''},A05:{decision:'provisional',variant:'previous',memo:''}};
let selections=structuredClone(defaults);
try{const saved=JSON.parse(localStorage.getItem(storageKey)||'null');if(saved&&typeof saved==='object')selections=saved;}catch{}
const labels={adopt:'採用',provisional:'一旦採用',revise:'修正して検討',decline:'見送り'};
const dialog=document.querySelector('#lightbox');
function summary(){
 const chosen=assets.filter(a=>selections[a.id]?.decision||selections[a.id]?.memo);
 document.querySelector('#decision-count').textContent=`選択済み ${assets.filter(a=>selections[a.id]?.decision).length} / ${assets.length}`;
 document.querySelector('#export-text').value='MYSTENA 画像アセット v2 のレビュー\n'+chosen.map(a=>{const s=selections[a.id],v=a.files.find(f=>f.variant===s.variant);return `${a.id} ${a.title}：${labels[s.decision]||'未選択'} [${v?.label||s.variant||a.defaultVariant}]${s.memo?'\n  '+s.memo:''}`;}).join('\n\n')+'\n\n※ サイト反映は、このレビュー後の依頼で判断します。';
}
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(selections));}catch{}summary();}
for(const a of assets){
 const el=document.querySelector(`[data-id="${a.id}"]`),select=el.querySelector('.decision'),memo=el.querySelector('textarea');
 select.value=selections[a.id]?.decision||'';memo.value=selections[a.id]?.memo||'';
 let active=a.files.find(f=>f.variant===selections[a.id]?.variant)||a.files.find(f=>f.variant===a.defaultVariant);
 function render(f){
  active=f;const img=el.querySelector('.preview img');img.src=f.path;img.alt=f.alt||a.alt[f.variant==='en'?'en':'ja'];img.width=f.width;img.height=f.height;
  const saved=selections[a.id];select.value=saved?.variant===f.variant?saved.decision||'':'';memo.value=saved?.variant===f.variant?saved.memo||'':'';
  el.querySelector('.preview').classList.toggle('dark',f.variant==='dark');
  for(const b of el.querySelectorAll('[data-variant]'))b.setAttribute('aria-pressed',String(b.dataset.variant===f.variant));
  el.querySelector('.dimensions').textContent=`${f.width} × ${f.height}`;el.querySelector('.file-info').textContent=f.path.split('/').pop()+' · '+Math.round(f.bytes/1024)+' KB';el.querySelector('.download-image').href=f.path;
  for(const [selector,key]of [['.download-svg','svg'],['.download-editable','editableSvg']]){const link=el.querySelector(selector);link.hidden=!f[key];if(f[key])link.href=f[key];}
 }
 render(active);
 for(const b of el.querySelectorAll('[data-variant]'))b.addEventListener('click',()=>{render(a.files.find(f=>f.variant===b.dataset.variant));});
 // Browsing a comparison never changes the selected deliverable. Selection is explicit.
 function save(){selections[a.id]={decision:select.value,memo:memo.value,variant:active.variant};persist();}
 select.addEventListener('change',save);memo.addEventListener('input',save);
 el.querySelector('.preview').addEventListener('click',()=>{
  document.querySelector('#dialog-title').textContent=a.id+' / '+a.title+' / '+active.label;
  const img=document.querySelector('#dialog-image');img.src=active.path;img.alt=active.alt||a.alt[active.variant==='en'?'en':'ja'];img.parentElement.classList.toggle('dark',active.variant==='dark');
  document.querySelector('#dialog-caption').textContent=a.place+' — '+(active.variant==='previous'?'v1の原案。元ファイルを変更せず保存しています。':a.note);
  document.querySelector('#dialog-download').href=active.path;dialog.showModal();
 });
}
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
document.querySelector('#copy-review').addEventListener('click',async()=>{const field=document.querySelector('#export-text'),status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(field.value);status.textContent='コピーしました。このチャットへ貼り付けてください。';}catch{field.focus();field.select();status.textContent='本文を選択しました。コピーして、このチャットへ貼り付けてください。';}});
summary();
