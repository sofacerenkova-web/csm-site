/* Новая страница всегда открывается сверху (кроме якорей и кнопки «Назад») */
(function(){let t='navigate';try{const n=performance.getEntriesByType('navigation')[0];if(n)t=n.type}catch(e){}
 if(t==='back_forward'||location.hash)return;
 function top(){try{window.scrollTo({top:0,left:0,behavior:'instant'})}catch(e){window.scrollTo(0,0)}}
 top();document.addEventListener('DOMContentLoaded',top);addEventListener('load',top)})();
/* ЦСМ — общие скрипты сайта */
(function(){
const h=document.documentElement, mo=h.classList.contains('mo'), D=window.CSM||{};
const $=(s,r)=> (r||document).querySelector(s), $$=(s,r)=>[].slice.call((r||document).querySelectorAll(s));
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const ARR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
CSM.ARR=ARR;

/* ---------- версия для слабовидящих ---------- */
function a11yApply(){const on=ls.get('csm_a11y')==='1';h.classList.toggle('a11y',on);h.classList.toggle('inv',on&&ls.get('csm_a11y_inv')==='1');h.classList.toggle('noimg',on&&ls.get('csm_a11y_img')==='0');h.style.setProperty('--fz',ls.get('csm_a11y_fz')||'1');
 $$('[data-a11y-fz]').forEach(b=>b.classList.toggle('on',(ls.get('csm_a11y_fz')||'1')===b.dataset.a11yFz));
 $$('[data-a11y-c]').forEach(b=>b.classList.toggle('on',(ls.get('csm_a11y_inv')==='1')===(b.dataset.a11yC==='inv')));
 const ib=$('[data-a11y-img]');if(ib)ib.textContent=ls.get('csm_a11y_img')==='0'?'Показать изображения':'Скрыть изображения'}
a11yApply();
document.addEventListener('click',e=>{const t=e.target.closest('[data-a11y],[data-a11y-fz],[data-a11y-c],[data-a11y-img]');if(!t)return;
 if(t.hasAttribute('data-a11y'))ls.set('csm_a11y',h.classList.contains('a11y')?'0':'1');
 if(t.dataset.a11yFz)ls.set('csm_a11y_fz',t.dataset.a11yFz);
 if(t.dataset.a11yC)ls.set('csm_a11y_inv',t.dataset.a11yC==='inv'?'1':'0');
 if(t.hasAttribute('data-a11y-img'))ls.set('csm_a11y_img',ls.get('csm_a11y_img')==='0'?'1':'0');
 a11yApply()});

/* ---------- шапка сворачивается, внизу появляется плашка ---------- */
const hdr=$('#hdr'),dock=$('#dock');let bookVis=false,ftVis=false;
if('IntersectionObserver' in window){const io2=new IntersectionObserver(es=>es.forEach(x=>{if(x.target.id==='booking')bookVis=x.isIntersecting;else ftVis=x.isIntersecting;onSc()}),{threshold:.05});['#booking','footer'].forEach(s=>{const e=$(s);e&&io2.observe(e)})}
function hh(){if(!hdr)return;const c=hdr.classList.contains('sc');hdr.classList.remove('sc');const tb=hdr.querySelector('.topbar');document.documentElement.style.setProperty('--hh',hdr.offsetHeight+'px');document.documentElement.style.setProperty('--tbh',(tb?tb.offsetHeight:0)+'px');if(c)hdr.classList.add('sc')}hh();addEventListener('resize',hh);
let scOn=false;function onSc(){const y=scrollY;if(hdr){if(!scOn&&y>90)scOn=true;else if(scOn&&y<30)scOn=false;hdr.classList.toggle('sc',scOn)}const on=y>520&&!bookVis&&!ftVis;if(dock){dock.classList.toggle('on',on);document.body.classList.toggle('dock-on',on&&innerWidth>1100)}}
/* статус «открыто» по времени Красноярска (UTC+7) */
(function(){const st=$('#dkSt');if(!st||!dock)return;const n=new Date(Date.now()+(new Date().getTimezoneOffset()+420)*60000),d=n.getDay(),m=n.getHours()*60+n.getMinutes();
 const H={1:[480,1200],2:[480,1200],3:[480,1200],4:[480,1200],5:[480,1200],6:[540,960]};const h=H[d];
 if(h&&m>=h[0]&&m<h[1]){dock.classList.add('open');st.textContent='Сейчас открыто · до '+(h[1]/60)+':00'}
 else{let k=1,dd;for(;k<8;k++){dd=(d+k)%7;if(H[dd])break}const nm=['в воскресенье','в понедельник','во вторник','в среду','в четверг','в пятницу','в субботу'];
  const today=h&&m<h[0];const o=today?h[0]:H[dd][0];st.textContent='Откроемся '+(today?'сегодня':k===1?'завтра':nm[dd])+' в '+(o/60)+':00'}})();
addEventListener('scroll',onSc,{passive:true});addEventListener('resize',onSc);onSc();
/* ---------- мобильное меню ---------- */
const dr=$('#drawer'),bg=$('.burger');
if(bg&&dr)bg.addEventListener('click',()=>{const o=dr.classList.toggle('open');document.body.classList.toggle('lock',o);bg.setAttribute('aria-expanded',o);bg.innerHTML=o?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>'});

/* ---------- запись: модальное окно ---------- */
const md=$('#bookModal');
function openBook(dir,extra){if(!md)return;md.classList.add('open');document.body.classList.add('lock');const f=$('form',md);f.classList.remove('done','err');
 if(dir){const s=$('select',f);[].forEach.call(s.options,o=>{if(o.value===dir||o.text===dir)s.value=o.value})}
 const c=$('textarea',f);if(c)c.value=extra||'';setTimeout(()=>{const i=$('input',f);i&&i.focus()},300)}
function closeBook(){md&&md.classList.remove('open');document.body.classList.remove('lock')}
CSM.openBook=openBook;
document.addEventListener('click',e=>{const a=e.target.closest('a[href="#zapis"],[data-book]');if(a){e.preventDefault();if(dr&&dr.classList.contains('open'))bg.click();openBook(a.dataset.dir,a.dataset.note)}
 if(e.target===md||e.target.closest('#bookModal .x'))closeBook()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeBook();closeSearch()}});

/* ---------- формы: согласие отдельным чекбоксом (152-ФЗ ст. 9) ---------- */
$$('form.bk').forEach(f=>{f.addEventListener('submit',e=>{e.preventDefault();
 const req=$$('[required]',f).filter(x=>x.type==='checkbox'?!x.checked:!String(x.value).trim());
 if(req.length){f.classList.add('err');req[0].focus();return}
 f.classList.remove('err');
 /* ИНТЕГРАЦИЯ: отправить данные в CRM/МИС на российском сервере и записать в журнал согласий
    дату, время, IP и версию текста согласия (CONSENT_VERSION). */
 const data={form:f.dataset.form||'zapis',consent_version:'2026-11-01',ts:new Date().toISOString()};
 $$('input,select,textarea',f).forEach(x=>{if(x.name)data[x.name]=x.type==='checkbox'?x.checked:x.value});
 window.dispatchEvent(new CustomEvent('csm:lead',{detail:data}));
 if(window.ym&&CSM.YM_ID)try{ym(CSM.YM_ID,'reachGoal','lead_'+data.form)}catch(_){}
 f.classList.add('done')})});

/* ---------- cookie-баннер: Метрика только после согласия ---------- */
CSM.YM_ID=null; /* ← номер счётчика Яндекс Метрики */
function loadMaps(){$$('iframe[data-src]').forEach(f=>{f.src=f.dataset.src;f.removeAttribute('data-src');const b=f.parentNode.querySelector('.mload');b&&b.remove()})}
document.addEventListener('click',e=>{if(e.target.closest('[data-map]'))loadMaps()});
function loadMetrika(){loadMaps();if(!CSM.YM_ID||window.ym)return;(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(CSM.YM_ID,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false})}
const ck=$('#cookie'),cv=ls.get('csm_cookie');
if(cv==='yes')loadMetrika();else if(!cv&&ck)setTimeout(()=>ck.classList.add('show'),1200);
document.addEventListener('click',e=>{const b=e.target.closest('[data-cookie]');if(!b)return;ls.set('csm_cookie',b.dataset.cookie);ck&&ck.classList.remove('show');if(b.dataset.cookie==='yes')loadMetrika()});
/* цели: звонок и мессенджер */
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="tel:"],a[href*="t.me/"]');if(a&&window.ym&&CSM.YM_ID)try{ym(CSM.YM_ID,'reachGoal',a.href.startsWith('tel:')?'call':'messenger')}catch(_){}});

/* ---------- поиск по сайту ---------- */
const so=$('#search');
function closeSearch(){so&&so.classList.remove('open')}
document.addEventListener('click',e=>{if(e.target.closest('[data-search]')){e.preventDefault();so.classList.add('open');setTimeout(()=>$('input',so).focus(),80)}if(e.target.closest('#search .x'))closeSearch()});
const norm=s=>String(s).toLowerCase().replace(/ё/g,'е');
function index(){const out=[];(window.CSM_PAGES||[]).forEach(p=>out.push({t:p.t,d:p.d,u:p.u,k:'Страница',x:norm(p.t+' '+p.d+' '+(p.x||''))}));
 (D.DOCTORS||[]).forEach(d=>out.push({t:d.name,d:d.role,u:'vrach-'+d.id,k:'Врач',x:norm(d.name+'.html '+d.role+' '+d.spec)}));
 (D.PRICES||[]).forEach(c=>c.items.forEach(i=>out.push({t:i[1],d:c.cat+' · '+i[2]+' ₽',u:'ceny.html?q='+encodeURIComponent(i[1].slice(0,40)),k:'Услуга',x:norm(i[1]+' '+c.cat+' '+i[0])})));return out}
let IDX=null;
if(so){const inp=$('input',so),ul=$('ul',so),hint=$('.hint',so);inp.addEventListener('input',()=>{IDX=IDX||index();const q=norm(inp.value.trim());ul.innerHTML='';if(q.length<2){hint.textContent='Например: УЗИ, SVF, гинеколог, ЭКГ, массаж';return}
 const ws=q.split(/\s+/);const r=IDX.filter(i=>ws.every(w=>i.x.indexOf(w)>-1)).map(i=>[i,(norm(i.t).indexOf(q)>-1?0:2)+(i.k==='Страница'?0:1)]).sort((a,b)=>a[1]-b[1]).map(x=>x[0]).slice(0,24);
 hint.textContent=r.length?'Найдено: '+r.length:'Ничего не найдено. Позвоните нам — подскажем: '+D.CLINIC.phone;
 r.forEach(i=>{const li=document.createElement('li');li.innerHTML='<a href="'+i.u+'"><i>'+i.k+'</i><b>'+esc(i.t)+'</b><small>'+esc(i.d)+'</small></a>';ul.appendChild(li)})})}

/* ---------- рендер: цены направления ---------- */
const fmt=p=>p+(/₽/.test(p)?'':' ₽');
CSM.priceRows=(items,q)=>items.map(i=>{let n=esc(i[1]);if(q){const re=new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig');n=n.replace(re,'<mark>$1</mark>')}return i[0]==='—'?'<div class="pr nc"><span>'+n+'</span><b>'+fmt(i[2])+'</b></div>':'<div class="pr"><code>'+esc(i[0])+'</code><span>'+n+'</span><b>'+fmt(i[2])+'</b></div>'}).join('');
$$('[data-prices]').forEach(el=>{const dir=el.dataset.prices,only=el.dataset.cat;
 const cats=(D.PRICES||[]).filter(c=>c.dir===dir&&(!only||c.cat===only));const lim=Math.min(+el.dataset.limit||6,cats.length>1?4:6);
 let html='';cats.forEach(c=>{const more=c.items.length>lim+2;const it=more?c.items.slice(0,lim):c.items;
  html+='<div class="pt"><h3>'+esc(c.cat)+'</h3>'+CSM.priceRows(it)+(more?'<div class="pt-more" hidden>'+CSM.priceRows(c.items.slice(lim))+'</div><button type="button" class="pt-tg" data-n="'+(c.items.length-lim)+'">Показать ещё '+(c.items.length-lim)+' '+(c.items.length-lim>4?'позиций':'позиции')+'</button>':'')+'</div>'});
 el.innerHTML=html+'<div class="pt-meta"><span>Цены в рублях, актуальны на '+D.PRICE_DATE+'. Полный прайс — на странице <a href="ceny.html" style="color:var(--acc)">«Цены»</a>.</span><span>Стоимость препаратов указана отдельно, если не оговорено иное.</span></div>'});

document.addEventListener('click',e=>{const b=e.target.closest('.pt-tg');if(!b)return;const m=b.previousElementSibling;const o=m.hidden;m.hidden=!o;b.textContent=o?'Свернуть':'Показать ещё '+b.dataset.n+(b.dataset.n>4?' позиций':' позиции');if(!o)b.closest('.pt').scrollIntoView({block:'nearest',behavior:'smooth'})});
/* ---------- полный прайс с поиском и фильтром ---------- */
const pl=$('[data-pricelist]');
if(pl){const inp=$('#pq'),fb=$('#pf'),out=$('#plist');let cur='all';
 const cats=[{k:'all',t:'Все'}].concat((D.DIRECTIONS||[]).map(d=>({k:d.slug,t:d.title})));
 cats.forEach(c=>{const b=document.createElement('button');b.type='button';b.textContent=c.t;b.dataset.k=c.k;b.onclick=()=>{cur=c.k;draw()};fb.appendChild(b)});
 function draw(){const q=norm(inp.value.trim());[].forEach.call(fb.children,b=>b.classList.toggle('on',b.dataset.k===cur));let html='',n=0;const used={};
  (D.PRICES||[]).forEach(c=>{if(cur!=='all'&&c.dir!==cur)return;const it=c.items.filter(i=>!q||norm(i[1]+' '+i[0]+' '+c.cat).indexOf(q)>-1);if(!it.length)return;n+=it.length;
   const d=(D.DIRECTIONS||[]).find(x=>x.slug===c.dir);html+='<div class="pt"'+(used[c.dir]?'':' id="'+c.dir+'"')+'><h3>';used[c.dir]=1;html+=''+esc(c.cat)+(d?'<a href="'+d.slug+'.html">О направлении →</a>':'')+'</h3>'+(function(){const L=(!q&&innerWidth<=700)?5:1e9,more=it.length>L+2;return CSM.priceRows(more?it.slice(0,L):it,inp.value.trim())+(more?'<div class="pt-more" hidden>'+CSM.priceRows(it.slice(L))+'</div><button type="button" class="pt-tg" data-n="'+(it.length-L)+'">Показать ещё '+(it.length-L)+' '+(it.length-L>4?'позиций':'позиции')+'</button>':'')})()+'</div>'});
  out.innerHTML=html||'<div class="pt empty">По запросу ничего не найдено. Уточните у администратора: <a href="tel:'+D.CLINIC.tel+'">'+D.CLINIC.phone+'</a></div>';$('#pn').textContent=n}
 inp.addEventListener('input',draw);const qs=new URLSearchParams(location.search).get('q');if(qs)inp.value=qs;
 const hs=location.hash.slice(1);if(hs&&cats.some(c=>c.k===hs))cur=hs;draw()}

/* ---------- врачи ---------- */
const ini=n=>n.split(' ').slice(0,2).map(w=>w[0]).join('');
CSM.docCard=d=>'<article class="dcard rv"><a class="ava'+(d.photo?'':' nophoto')+'" href="vrach-'+d.id+'.html" aria-label="'+esc(d.name)+'">'+'<span class="ini">'+ini(d.name)+'</span><i></i>'+(d.photo?'<img src="'+d.photo+'" alt="'+esc(d.name)+'" loading="lazy" onerror="this.remove()">':'')+'</a>'+
 '<span class="tg">'+esc(d.spec)+'</span><h3><a href="vrach-'+d.id+'.html">'+esc(d.name)+'</a></h3><p class="rl">'+esc(d.role)+'</p><dl>'+
 (d.exp?'<div><dt>Стаж</dt><dd>'+esc(d.exp)+'</dd></div>':'')+'<div><dt>Приём</dt><dd>'+esc(d.sched||'по записи, уточняйте у администратора')+'</dd></div></dl>'+
 '<div class="act"><a class="btn btn-r" href="#zapis" data-dir="'+esc(d.spec)+'" data-note="Запись к врачу: '+esc(d.name)+'">Записаться</a><a class="btn btn-m" href="vrach-'+d.id+'.html">Профиль</a></div></article>';
$$('[data-doctors]').forEach(el=>{const dir=el.dataset.doctors;el.innerHTML=(D.DOCTORS||[]).filter(d=>!dir||d.dirs.indexOf(dir)>-1).map(CSM.docCard).join('')});
const dl=$('[data-doclist]');
if(dl){const fb=$('#df'),out=$('#dlist');const specs=['Все'].concat([...new Set(D.DOCTORS.map(d=>d.spec))]);let cur='Все';
 specs.forEach(s=>{const b=document.createElement('button');b.type='button';b.textContent=s;b.onclick=()=>{cur=s;draw()};fb.appendChild(b)});
 function draw(){[].forEach.call(fb.children,b=>b.classList.toggle('on',b.textContent===cur));const L=D.DOCTORS.filter(d=>cur==='Все'||d.spec===cur),N=9;out.innerHTML=L.map(CSM.docCard).join('');$$('.rv',out).forEach(x=>x.classList.add('in'));
  let mb=$('.dl-more',dl);if(mb)mb.remove();if(L.length>N){[].slice.call(out.children,N).forEach(c=>c.hidden=true);mb=document.createElement('button');mb.type='button';mb.className='pt-tg dl-more';mb.textContent='Показать всех врачей ('+L.length+')';mb.onclick=()=>{[].forEach.call(out.children,c=>c.hidden=false);mb.remove()};out.after(mb)}}
 draw()}
/* профиль врача: vrach.html?id= */
const dp=$('[data-doctor]');
if(dp){const id=window.CSM_DOC||new URLSearchParams(location.search).get('id');const d=(D.DOCTORS||[]).find(x=>x.id===id);if(!d){location.replace('vrachi.html');return}
 document.title=d.name+' — '+d.role+' · Центр современной медицины, Красноярск';
 const md2=$('meta[name=description]');md2&&md2.setAttribute('content',d.name+', '+d.role.toLowerCase()+' в Центре современной медицины (Красноярск). Образование, стаж, график приёма, запись онлайн.');
 $$('[data-f]',dp).forEach(el=>{const k=el.dataset.f;let v=d[k];if(k==='ini')v=ini(d.name);el.textContent=v||el.dataset.empty||'уточняется'});
 const cr=$('#crumbName');if(cr)cr.textContent=d.name;
 const dirs=(D.DIRECTIONS||[]).filter(x=>d.dirs.indexOf(x.slug)>-1);
 const dk=$('#docDirs');if(dk)dk.innerHTML=dirs.map(x=>'<a href="'+x.slug+'.html"><span>'+esc(x.title)+'<small>Направление · приём от '+x.from+'</small></span><span class="ar">'+ARR+'</span></a>').join('');
 const pp=$('#docPrices');if(pp&&dirs[0])pp.setAttribute('data-dir',dirs[0].slug);
 $$('[data-book-doc]').forEach(b=>{b.dataset.dir=d.spec;b.dataset.note='Запись к врачу: '+d.name});
 const pr=$('#docPrice');if(pr){const c=(D.PRICES||[]).find(c=>c.dir===d.dirs[0]);if(c)pr.innerHTML=CSM.priceRows(c.items.slice(0,6))+'<div class="pr"><code></code><span><a href="'+d.dirs[0]+'.html" style="color:var(--acc)">Все услуги направления →</a></span><b></b></div>'}
 const ot=$('#docOthers');if(ot)ot.innerHTML=D.DOCTORS.filter(x=>x.id!==d.id&&x.dirs.some(s=>d.dirs.indexOf(s)>-1)).concat(D.DOCTORS.filter(x=>x.id!==d.id&&!x.dirs.some(s=>d.dirs.indexOf(s)>-1))).slice(0,3).map(CSM.docCard).join('');
 const ld={"@context":"https://schema.org","@type":"Physician","name":d.name,"medicalSpecialty":d.spec,"worksFor":{"@type":"MedicalClinic","name":D.CLINIC.name},"address":{"@type":"PostalAddress","addressLocality":"Красноярск","streetAddress":"ул. Карла Маркса, 75А"},"telephone":D.CLINIC.phone};
 const s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(ld);document.head.appendChild(s)}

/* ---------- направления (хаб) ---------- */
$$('[data-tiles]').forEach(el=>{el.innerHTML=(D.DIRECTIONS||[]).map((d,i)=>'<a class="tile rv" style="--d:'+(i%3*90)+'ms" href="'+d.slug+'.html"><img src="assets/img/'+d.img+'" alt="'+esc(d.title)+'" loading="lazy"><span class="n">'+String(i+1).padStart(2,'0')+'</span><div class="in3"><h3>'+esc(d.title)+'</h3><p>'+esc(d.short)+'</p><div class="ft2"><span>от '+d.from.replace(/^от /,'')+'</span><span class="ar">'+ARR+'</span></div></div></a>').join('')});

/* ---------- анимации (как на главной) ---------- */
function wrap(n,c){[].slice.call(n.childNodes).forEach(x=>{if(x.nodeType===3){const f=document.createDocumentFragment();x.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(' '));return}const o=document.createElement('span');o.className='hw';const i=document.createElement('span');i.style.setProperty('--i',c.n++);i.textContent=w;o.appendChild(i);f.appendChild(o)});x.replaceWith(f)}else if(x.nodeType===1&&x.tagName!=='BR'&&x.tagName!=='A')wrap(x,c)})}
if(mo&&!h.classList.contains('a11y')){$$('.sh h2,.about h2,.h2.wr0').forEach(e=>{if(e.classList.contains('wr')||e.querySelector('.hw'))return;wrap(e,{n:0});e.classList.add('wr')});
 $$('.phero h1').forEach(e=>{if(e.querySelector('.hw'))return;wrap(e,{n:0});$$('.hw>span',e).forEach((s,i)=>s.style.setProperty('--i',i))})}
if(!h.classList.contains('home')&&mo){let s=false;const go=()=>{if(s)return;s=true;h.classList.add('go')};Promise.race([document.fonts?document.fonts.ready:0,new Promise(r=>setTimeout(r,900))]).then(go);setTimeout(go,1200)}
const els=$$('.rv,.wr');
if(!('IntersectionObserver' in window)||!mo){els.forEach(e=>e.classList.add('in'))}
else{const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);setTimeout(()=>x.target.classList.add('rd'),1800)}}),{threshold:0,rootMargin:'0px 0px -8% 0px'});
 els.forEach(e=>io.observe(e));setTimeout(()=>els.forEach(e=>e.classList.add('in')),8000)}
const pb=$('#pbar');if(pb&&!h.classList.contains('home'))addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;pb.style.transform='scaleX('+(m>0?scrollY/m:0)+')'},{passive:true});
if(matchMedia('(hover:hover)').matches&&mo&&!h.classList.contains('home')){
 const g=$('#glow');if(g){let gx=0,gy=0,tx=0,ty=0,on=false;addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;if(!on){on=true;g.style.opacity=1;gx=tx;gy=ty}});document.addEventListener('mouseleave',()=>{g.style.opacity=0;on=false});(function f(){gx+=(tx-gx)*.08;gy+=(ty-gy)*.08;g.style.transform='translate('+gx+'px,'+gy+'px)';requestAnimationFrame(f)})()}
 document.addEventListener('mousemove',e=>{const b=e.target.closest('.btn-r');if(!b)return;const r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.18)+'px '+((e.clientY-r.top-r.height/2)*.28)+'px'});
 document.addEventListener('mouseout',e=>{const b=e.target.closest('.btn-r');if(b&&!b.contains(e.relatedTarget))b.style.translate='0 0'})}
/* оглавление: подсветка */
const toc=$$('.toc a');if(toc.length&&'IntersectionObserver' in window){const io3=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)toc.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+x.target.id))}),{rootMargin:'-30% 0px -60% 0px'});toc.forEach(a=>{const t=$(a.getAttribute('href'));t&&io3.observe(t)})}
})();

/* Карусель специальных предложений */
(function(){const t=document.getElementById('ofTrack');if(!t)return;const pv=document.getElementById('ofPrev'),nx=document.getElementById('ofNext'),n=document.getElementById('ofN');
 const cards=()=>[].slice.call(t.children);
 function step(){const c=cards();return c.length>1?c[1].offsetLeft-c[0].offsetLeft:t.clientWidth}
 function upd(){const c=cards(),s=step(),per=Math.max(1,Math.round(t.clientWidth/s)),i=Math.round(t.scrollLeft/s),a=Math.min(c.length,i+1),b=Math.min(c.length,i+per);
  if(n)n.textContent=(a===b?a:a+'–'+b)+' из '+c.length;
  if(pv)pv.disabled=t.scrollLeft<4;if(nx)nx.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4}
 function go(d){const s=step(),per=Math.max(1,Math.round(t.clientWidth/s));t.scrollBy({left:d*s*(per>1?per-1:1),behavior:'smooth'})}
 pv&&pv.addEventListener('click',()=>go(-1));nx&&nx.addEventListener('click',()=>go(1));
 t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}});
 let r;t.addEventListener('scroll',()=>{cancelAnimationFrame(r);r=requestAnimationFrame(upd)},{passive:true});addEventListener('resize',upd);upd()})();

/* Универсальная карусель (отзывы) + «Читать целиком» */
(function(){document.querySelectorAll('.car-t').forEach(t=>{const sec=t.closest('section');const pv=sec.querySelector('.car-p'),nx=sec.querySelector('.car-x'),n=sec.querySelector('.car-n');
 const step=()=>{const c=t.children;return c.length>1?c[1].offsetLeft-c[0].offsetLeft:t.clientWidth};
 function upd(){const c=t.children.length,s=step(),per=Math.max(1,Math.round(t.clientWidth/s)),i=Math.round(t.scrollLeft/s),a=Math.min(c,i+1),b=Math.min(c,i+per);if(n)n.textContent=(a===b?a:a+'–'+b)+' из '+c;if(pv)pv.disabled=t.scrollLeft<4;if(nx)nx.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4}
 function go(d){const s=step(),per=Math.max(1,Math.round(t.clientWidth/s));t.scrollBy({left:d*s*(per>1?per-1:1),behavior:'smooth'})}
 pv&&pv.addEventListener('click',()=>go(-1));nx&&nx.addEventListener('click',()=>go(1));
 t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}});
 let r;t.addEventListener('scroll',()=>{cancelAnimationFrame(r);r=requestAnimationFrame(upd)},{passive:true});addEventListener('resize',upd);
 t.querySelectorAll('.rvw').forEach(c=>{const p=c.querySelector('.rvw-t');requestAnimationFrame(()=>{if(p.scrollHeight>p.clientHeight+4){const b=document.createElement('button');b.type='button';b.className='rvw-more';b.textContent='Читать целиком';b.onclick=()=>{const o=c.classList.toggle('open');b.textContent=o?'Свернуть':'Читать целиком'};p.after(b)}})});
 upd()})})();
