let E, page='home';
const A=document.getElementById('app');
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
function render(){
 document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
 if(page==='home') A.innerHTML=`<div class="brand">THEGOATWORLD</div><div class="meta"><span>${E.day}<br>${E.date}</span><b>#${E.number}</b></div><div class="hero">INFRA<br>ESTRUC<br>TURA</div><div class="bar">DEL DÍA →</div><div class="sub">LO ESENCIAL. SIN RUIDO.</div><a class="cta" href="#" data-go="day">COMENZAR →</a>`;
 if(page==='day') A.innerHTML=`<h1 class="pageTitle">EL DÍA</h1><div class="tabs"><span>TODAS</span><span>POLÍTICA</span><span>ECONOMÍA</span><span>TECNOLOGÍA</span></div>`+E.news.map((n,i)=>`<article class="news"><div class="num">0${i+1}</div><div><b class="tag ${n.cat}">${n.cat}</b><h3>${esc(n.title)}</h3><p>${esc(n.desc)}</p></div></article>`).join('');
 if(page==='mario') A.innerHTML=`<section class="yellow"><div class="brand">MARIO GUZMÁN　 #${E.number}</div><p class="sub">MI LECTURA PARA CONECTAR LOS PUNTOS.</p><div class="card concept"><h3>CONCEPTO DEL DÍA</h3><h2>${esc(E.concept)}</h2><p>${esc(E.concept_text)}</p></div><div class="card"><h3>CONEXIÓN / TENSIÓN</h3><p>${esc(E.tension)}</p></div><div class="card"><h3>PREGUNTA DEL DÍA</h3><p>${esc(E.question)}</p></div></section>`;
 if(page==='nameky') A.innerHTML=`<section class="dark"><h1 class="pageTitle">NAMEKY</h1><div class="sub">LA SALIDA LITERARIA PARA IR MÁS LEJOS.</div><div class="art"></div>${E.nameky.map(x=>`<p>${esc(x)}</p>`).join('')}<p>THEGOATWORLD · #${E.number}</p></section>`;
}
document.addEventListener('click',e=>{let b=e.target.closest('[data-page],[data-go]');if(!b)return;e.preventDefault();page=b.dataset.page||b.dataset.go;render()});
fetch('edicion.json').then(r=>r.json()).then(x=>{E=x;render()}).catch(()=>A.innerHTML='<p>No se pudo cargar la edición.</p>');
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');