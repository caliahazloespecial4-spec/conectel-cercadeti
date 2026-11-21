/* CONECTEL V6 — lógica compartida. Cada pantalla tiene SU HTML en paginas/. */
(() => {
'use strict';
const C=window.CONECTEL_CONFIG, D=window.CONECTEL_DATA, B=window.CONECTEL_BACKEND;
const $=(q,r=document)=>r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
const esc=(v='')=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const page=document.body.dataset.page, base=document.body.dataset.base;
const url=(name)=>base+'paginas/'+name+'.html';
const storageProfile='conectel-demo-perfil-v1', storageDrafts='conectel-demo-solicitudes-v6';
// Personalización local, sin cuentas, correo ni contraseña.
const LOCAL_NAME='conectel-nombre-visible-v8';
function displayName(){try{return (localStorage.getItem(LOCAL_NAME)||'').trim()}catch{return ''}}
function userKey(prefix){return prefix+'::invitado'} // Mantiene historial local anterior de invitado.
function refreshIdentity(){
 const n=displayName();
 document.querySelectorAll('[data-welcome-name]').forEach(el=>{el.textContent=n||'Invitado'});
 document.querySelectorAll('[data-greeting]').forEach(el=>{el.textContent=n?'¡Hola, '+n+'!':'¡Hola, Invitado!'});
 document.querySelectorAll('[data-profile-short]').forEach(el=>{el.textContent=n||'Mi perfil'});
 document.querySelectorAll('a[href="acceso.html"]').forEach(a=>{if(a.closest('.side-nav'))a.innerHTML='<svg aria-hidden="true"><use href="#i-user"></use></svg> Personalizar saludo'});
}
let toastTimer, currentUser=null;
function toast(message){const t=$('#toast');if(!t)return;t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),4800)}
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function save(key,val){try{localStorage.setItem(key,JSON.stringify(val));return true}catch{toast('No se pudo guardar la información.');return false}}
function localProfile(){return read(userKey(storageProfile),{titular:'',contrato:'',nombre:displayName(),telefono:'',zona:''})}
function collect(form){const f=new FormData(form);return Object.fromEntries([...f.entries()].filter(([k])=>k!=='comprobante'))}
function fillProfile(){const p=localProfile();if(!p.nombre)p.nombre=displayName();$$('[data-profile]').forEach(e=>{if(p[e.dataset.profile])e.value=p[e.dataset.profile]});$$('select[name=zona]').forEach(e=>{if(p.zona)e.value=p.zona})}
function rememberForm(d){const p={...localProfile(),titular:d.titular,contrato:d.contrato||'',nombre:d.nombre,telefono:d.telefono,zona:d.zona};save(userKey(storageProfile),p)}
function channelFor(problem){return problem==='Atención especializada'?'especializado':'general'}
function phone(channel){return String(C.canales[channel]||'').replace(/\D/g,'')}
function whatsapp(msg,channel){const num=phone(channel);if(!num){toast('Este número de atención aún no está configurado.');return}const link='https://wa.me/'+num+'?text='+encodeURIComponent(msg);const w=window.open(link,'_blank');if(w)w.opener=null;else window.location.href=link}
function saveDraft(d,channel,type){const items=read(userKey(storageDrafts),[]);items.unshift({id:'LOCAL-'+Date.now().toString(36).toUpperCase(),fecha:new Date().toISOString(),tipo,problema:d.problema||'Pago',titular:d.titular,nombre:d.nombre,telefono:d.telefono,zona:d.zona,canal:channel,estado:'Borrador local: envío no confirmado'});save(userKey(storageDrafts),items.slice(0,40))}
function setupMenu(){const b=$('#menuButton'),m=$('#sidebar'),o=$('#mobileOverlay');if(!b||!m)return;function close(){m.classList.remove('open');b.setAttribute('aria-expanded','false')}b.addEventListener('click',()=>{m.classList.toggle('open');b.setAttribute('aria-expanded',String(m.classList.contains('open')))});o?.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
function setupReport(){const f=$('#reportForm');if(!f)return;const select=$('#issueSelect'), label=$('#assignedChannel');const requested=new URLSearchParams(location.search).get('tipo');if(requested){if(requested==='especializada')select.value='Atención especializada';else if([...select.options].some(o=>o.value===requested))select.value=requested}
function update(){const special=channelFor(select.value)==='especializado';label.innerHTML='<svg aria-hidden="true"><use href="#i-headphones"></use></svg><div><strong>'+(special?'Atención especializada':'Atención general')+' · '+(special?'960 737 675':'968 447 790')+'</strong><small>Destino asignado automáticamente. No necesitas elegir un número.</small></div>'}
select.addEventListener('change',update);update();f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;const d=collect(f),channel=channelFor(d.problema);rememberForm(d);let msg=`Hola, Conectel. Deseo reportar una solicitud desde el aplicativo.\n\nMotivo: ${d.problema}\nTitular del contrato: ${d.titular}\nContrato: ${d.contrato||'No indicado'}\nPersona que reporta: ${d.nombre}\nContacto: ${d.telefono}\nLocalidad: ${d.zona}\nDirección: ${d.direccion}\nDetalle: ${d.descripcion}`;if(channel==='especializado')msg+='\nMotivo de escalamiento: No obtuve solución satisfactoria en el canal general.';saveDraft(d,channel,'avería');whatsapp(msg,channel);toast('Se abrió el chat con el mensaje preparado. Presiona Enviar en WhatsApp.');})}
function setupPayments(){const f=$('#paymentForm');if(!f)return;const input=$('#paymentPhoto'), preview=$('#photoPreview');input.addEventListener('change',()=>{const file=input.files?.[0];preview.replaceChildren();if(!file)return;if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>8*1024*1024){toast('Selecciona una imagen JPG, PNG o WEBP menor de 8 MB.');input.value='';return}const img=document.createElement('img');const p=document.createElement('p');const objectUrl=URL.createObjectURL(file);img.src=objectUrl;img.alt='Vista previa de tu comprobante';img.addEventListener('load',()=>URL.revokeObjectURL(objectUrl),{once:true});p.textContent=file.name+' · Recuerda adjuntarla manualmente en WhatsApp.';preview.append(img,p)});f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;const d=collect(f);rememberForm(d);d.problema='Reportar pago';const hasImage=!!input.files?.length;const msg=`Hola, Conectel. Deseo reportar un pago.\n\nTitular del contrato: ${d.titular}\nN.º de contrato: ${d.contrato||'No indicado'}\nPersona que reporta: ${d.nombre}\nCelular: ${d.telefono}\nLocalidad: ${d.zona}\nMedio: ${d.medio}\nFecha: ${d.fechaPago}\nMonto: S/ ${Number(d.monto).toFixed(2)}\nOperación: ${d.operacion||'No indicado'}\nObservaciones: ${d.descripcion||'Sin observaciones'}\nComprobante: ${hasImage?'Adjuntaré la captura de forma manual en este chat.':'No adjuntado.'}`;saveDraft(d,'general','pago');whatsapp(msg,'general');toast(hasImage?'WhatsApp abierto: adjunta tu captura y pulsa Enviar.':'WhatsApp abierto: revisa el mensaje y pulsa Enviar.');})}
function setupTickets(){
 const el=$('#ticketsContainer');if(!el)return;
 const items=read(userKey(storageDrafts),[]);
 const identity='Perfil local: '+esc(displayName()||'Invitado')+' · Este historial solo existe en este navegador';
 el.innerHTML='<p class="smallprint">'+identity+'</p>'+(items.length?items.map(t=>`<article class="ticket-card"><div><span class="ticket-id">${esc(t.id)} · ${new Date(t.fecha).toLocaleString('es-PE')}</span><h3>${esc(t.problema)}</h3><p>${esc(t.titular)} · ${esc(t.zona)}</p><p><strong>${esc(t.estado)}</strong></p></div></article>`).join(''):'<div class="empty"><h3>Aún no hay solicitudes guardadas</h3><p>Prepara un reporte desde este navegador para verlo aquí. El envío a WhatsApp se confirma únicamente dentro de WhatsApp.</p></div>');
}
function setupPlans(){const grid=$('#plansGrid');if(!grid)return;grid.innerHTML=C.planes.map(p=>`<article class="panel plan-card ${p.destacado?'featured':''}">${p.destacado?'<span class="tag">Más elegido</span>':''}<h3>${esc(p.nombre)}</h3><div class="plan-speed">${esc(p.velocidad)}</div><div class="plan-price">${esc(p.precio)} / mes</div><p>${esc(p.descripcion)}</p><a class="btn btn-primary" href="${url('reportar')}?tipo=${encodeURIComponent('Otra solicitud')}">Consultar plan</a></article>`).join('');$('#coverageForm')?.addEventListener('submit',e=>{e.preventDefault();const d=collect(e.target);whatsapp('Hola, Conectel. Quisiera consultar cobertura en '+d.zona+', sector '+d.sector+'.','general')})}
function setupHelp(){const root=$('#faqContainer');if(!root)return;root.innerHTML=D.preguntas.map(({q,a})=>`<details class="faq" data-faq="${esc((q+' '+a).toLowerCase())}"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');$('#faqSearch').addEventListener('input',e=>{const query=e.target.value.toLocaleLowerCase('es').trim();$$('[data-faq]').forEach(el=>{el.hidden=!el.dataset.faq.includes(query)})})}
function setupProfile(){
 const f=$('#profileForm');if(!f)return;
 const status=$('#accountStatus');
 function update(){status.textContent=displayName()?'Hola, '+displayName()+'. Tus datos se guardan en este navegador.':'Estás como Invitado. Puedes escribir tu nombre cuando quieras.';refreshIdentity()}
 update();
 f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;const d=collect(f);save(userKey(storageProfile),d);if(d.nombre?.trim())localStorage.setItem(LOCAL_NAME,d.nombre.trim());update();toast('¡Perfil guardado! Tu saludo se actualizará en todo CONECTEL.');});
 $('#clearProfile')?.addEventListener('click',()=>{if(confirm('¿Eliminar nombre, perfil y solicitudes de este navegador?')){localStorage.removeItem(LOCAL_NAME);localStorage.removeItem(userKey(storageProfile));localStorage.removeItem(userKey(storageDrafts));location.reload()}})
}
function setupAccess(){
 const form=$('#simpleNameForm');if(!form)return;
 const input=$('#friendlyName'), msg=$('#nameStatus');
 function update(){const n=displayName();input.value=n;msg.textContent=n?'Ahora te saludamos como '+n+'. Puedes cambiar tu nombre cuando quieras.':'Actualmente apareces como Invitado. Escribe cualquier nombre para personalizar tu experiencia.';refreshIdentity()}
 update();
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=input.value.trim().replace(/\s+/g,' ').slice(0,60);if(!name){toast('Escribe un nombre.');return}localStorage.setItem(LOCAL_NAME,name);const p=localProfile();p.nombre=name;save(userKey(storageProfile),p);update();toast('¡Hola, '+name+'! Tu nombre quedó guardado en este navegador.');});
 $('#useGuest')?.addEventListener('click',()=>{localStorage.removeItem(LOCAL_NAME);const p=localProfile();p.nombre='';save(userKey(storageProfile),p);update();toast('Ahora apareces como Invitado.')});
}
function setupAdmin(){const el=$('#adminTickets');if(!el)return;el.innerHTML='<div class="empty"><h3>Panel administrativo no disponible en modo local</h3><p>Esta versión es una demostración para clientes. No envía solicitudes a un panel de empresa: las guarda solo en el dispositivo de cada persona.</p><a class="btn btn-primary" href="solicitudes.html">Ver mis solicitudes locales</a></div>';$('#refreshAdmin')?.addEventListener('click',()=>toast('Sin servidor: no hay reportes de otros dispositivos.'))}
setupMenu();refreshIdentity();fillProfile();({reportar:setupReport,pagos:setupPayments,solicitudes:setupTickets,planes:setupPlans,ayuda:setupHelp,perfil:setupProfile,acceso:setupAccess,admin:setupAdmin})[page]?.();
})();
