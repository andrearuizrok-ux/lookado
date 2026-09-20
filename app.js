
const KEY="lookado_app_v1";

function addDays(date,n){const d=new Date(date);d.setDate(d.getDate()+n);return d}
function isoDate(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function money(v){return new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR"}).format(v)}
function fmtDate(s,short=false){
  const d=new Date(s+"T12:00:00");
  return new Intl.DateTimeFormat("it-IT",short?{weekday:"short",day:"2-digit",month:"short"}:{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(d)
}
const TODAY=()=>isoDate(new Date());

const seed={
  user:{name:"Ospite",email:"",phone:""},
  favorites:[],
  businesses:[
    {id:"b1",name:"The Good Cut",category:["Hair","Barber"],rating:4.9,reviews:320,distance:0.8,city:"Milano",address:"Via Brera 18",priceFrom:20,description:"Hair & barber studio contemporaneo con servizi uomo e donna.",membership:"pro"},
    {id:"b2",name:"Luna Nails",category:["Nails","Beauty"],rating:4.8,reviews:118,distance:1.6,city:"Milano",address:"Corso Garibaldi 42",priceFrom:25,description:"Nail studio specializzato in manicure, semipermanente e nail art.",membership:"start"},
    {id:"b3",name:"Kai Wellness",category:["Wellness","Beauty"],rating:4.9,reviews:210,distance:2.4,city:"Milano",address:"Via Solferino 8",priceFrom:40,description:"Wellness studio con trattamenti viso, massaggi e rituali di cura.",membership:"business"},
    {id:"b4",name:"Forma Studio",category:["Hair","Beauty"],rating:4.7,reviews:92,distance:3.1,city:"Milano",address:"Viale Monza 54",priceFrom:22,description:"Hair & beauty studio inclusivo, moderno e orientato alla consulenza.",membership:"pro"},
    {id:"b5",name:"North Barber",category:["Barber"],rating:4.8,reviews:176,distance:1.2,city:"Milano",address:"Via Torino 19",priceFrom:18,description:"Barber shop contemporaneo, tagli classici e moderni.",membership:"start"},
    {id:"b6",name:"Aura Lab",category:["Beauty","Nails"],rating:4.9,reviews:145,distance:2.0,city:"Milano",address:"Via Moscova 11",priceFrom:28,description:"Beauty lab per viso, mani e trattamenti personalizzati.",membership:"pro"}
  ],
  services:[
    {id:"s1",businessId:"b1",name:"Taglio uomo",category:"Barber",duration:30,price:20,team:["t1","t2"]},
    {id:"s2",businessId:"b1",name:"Taglio + barba",category:"Barber",duration:45,price:30,team:["t1"]},
    {id:"s3",businessId:"b1",name:"Taglio donna",category:"Hair",duration:45,price:35,team:["t3"]},
    {id:"s4",businessId:"b1",name:"Colore + piega",category:"Hair",duration:105,price:68,team:["t3"]},
    {id:"s5",businessId:"b2",name:"Semipermanente",category:"Nails",duration:60,price:32,team:["t4"]},
    {id:"s6",businessId:"b2",name:"Manicure completa",category:"Nails",duration:45,price:28,team:["t4"]},
    {id:"s7",businessId:"b3",name:"Massaggio rilassante",category:"Wellness",duration:60,price:55,team:["t5"]},
    {id:"s8",businessId:"b3",name:"Pulizia viso",category:"Beauty",duration:60,price:48,team:["t6"]},
    {id:"s9",businessId:"b4",name:"Piega",category:"Hair",duration:45,price:25,team:["t7"]},
    {id:"s10",businessId:"b4",name:"Trattamento viso",category:"Beauty",duration:50,price:45,team:["t8"]},
    {id:"s11",businessId:"b5",name:"Taglio uomo",category:"Barber",duration:30,price:18,team:["t9"]},
    {id:"s12",businessId:"b6",name:"Nail art",category:"Nails",duration:75,price:42,team:["t10"]},
    {id:"s13",businessId:"b6",name:"Laminazione ciglia",category:"Beauty",duration:60,price:50,team:["t11"]}
  ],
  team:[
    {id:"t1",businessId:"b1",name:"Alex",role:"Barber"},
    {id:"t2",businessId:"b1",name:"Jamie",role:"Barber"},
    {id:"t3",businessId:"b1",name:"Maya",role:"Hair stylist"},
    {id:"t4",businessId:"b2",name:"Luna",role:"Nail artist"},
    {id:"t5",businessId:"b3",name:"Kai",role:"Massage therapist"},
    {id:"t6",businessId:"b3",name:"Elena",role:"Estetista"},
    {id:"t7",businessId:"b4",name:"Sara",role:"Hair stylist"},
    {id:"t8",businessId:"b4",name:"Nina",role:"Estetista"},
    {id:"t9",businessId:"b5",name:"Noah",role:"Barber"},
    {id:"t10",businessId:"b6",name:"Mia",role:"Nail artist"},
    {id:"t11",businessId:"b6",name:"Sofia",role:"Lash artist"}
  ],
  appointments:[],
  reviews:[
    {id:"r1",businessId:"b1",author:"Cliente 1",rating:5,text:"Servizio puntuale e risultato ottimo."},
    {id:"r2",businessId:"b1",author:"Cliente 2",rating:5,text:"Prenotazione semplice e staff molto professionale."},
    {id:"r3",businessId:"b3",author:"Cliente 3",rating:5,text:"Ambiente rilassante e trattamento curato."}
  ],
  proBusinessId:"b1",
  membershipPlans:{
    start:{name:"Start",price:19,features:["Profilo pubblico","Prenotazioni","Agenda","Clienti"]},
    pro:{name:"Pro",price:49,features:["Tutto in Start","Gestione team","Analytics","Marketing","Lista d'attesa"]},
    business:{name:"Business",price:99,features:["Tutto in Pro","Multi-sede","Analytics avanzate","Priorità supporto","Automazioni"]}
  }
};

function seedAppointments(s){
  const t=new Date(), tm=addDays(t,1), d2=addDays(t,3);
  s.appointments=[
    {id:crypto.randomUUID(),businessId:"b1",serviceId:"s1",teamId:"t1",date:isoDate(t),time:"09:00",status:"confirmed",customer:{name:"Cliente 1",email:"c1@example.com",phone:"+39 333 1111111"},source:"app"},
    {id:crypto.randomUUID(),businessId:"b1",serviceId:"s3",teamId:"t3",date:isoDate(t),time:"10:30",status:"pending",customer:{name:"Cliente 2",email:"c2@example.com",phone:"+39 333 2222222"},source:"app"},
    {id:crypto.randomUUID(),businessId:"b1",serviceId:"s2",teamId:"t1",date:isoDate(t),time:"12:00",status:"confirmed",customer:{name:"Cliente 3",email:"c3@example.com",phone:"+39 333 3333333"},source:"manual"},
    {id:crypto.randomUUID(),businessId:"b2",serviceId:"s5",teamId:"t4",date:isoDate(tm),time:"14:00",status:"confirmed",customer:{name:s.user.name,email:s.user.email,phone:s.user.phone},source:"app"},
    {id:crypto.randomUUID(),businessId:"b3",serviceId:"s7",teamId:"t5",date:isoDate(d2),time:"16:00",status:"confirmed",customer:{name:s.user.name,email:s.user.email,phone:s.user.phone},source:"app"}
  ];
}
let state=JSON.parse(localStorage.getItem(KEY)||"null");
if(!state){state=structuredClone(seed);seedAppointments(state);save()}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function biz(id){return state.businesses.find(x=>x.id===id)}
function svc(id){return state.services.find(x=>x.id===id)}
function tm(id){return state.team.find(x=>x.id===id)}
function initials(name){return name.split(/\s+/).map(x=>x[0]).slice(0,2).join("").toUpperCase()}

let filters={q:"",category:null,city:"Milano"};
let booking={businessId:null,serviceId:null,teamId:null,date:null,time:null,step:1,appointmentId:null};
let deferredPrompt=null;

const app=document.getElementById("app"), modeBtn=document.getElementById("modeBtn"), installBtn=document.getElementById("installBtn");
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;installBtn.classList.remove("hidden")});
installBtn.onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installBtn.classList.add("hidden")};
if("serviceWorker" in navigator)navigator.serviceWorker.register("/service-worker.js").catch(()=>{});

modeBtn.onclick=()=>handleProButton();
window.addEventListener("hashchange",()=>render());


function route(){
  const h=location.hash.replace("#/","");
  const parts=h.split("/");
  if(parts[0]==="pro")return {area:"pro",view:parts[1]||"dashboard",id:parts[2]||null};
  return {area:"client",view:parts[0]||"home",id:parts[1]||null};
}
function toast(t){
  const el=document.getElementById("toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)
}
function renderLegacy(){
  const r=route();
  modeBtn.textContent=r.area==="pro"?"Vista cliente":"LOOKADO Pro";
  document.getElementById("mobileNav").style.display=r.area==="pro"?"none":"";
  document.querySelectorAll(".mobile-nav a").forEach(a=>a.classList.toggle("active",a.dataset.route===r.view));
  if(r.area==="pro")renderPro(r.view);else renderClient(r.view,r.id);
  window.scrollTo({top:0,behavior:"instant"});
}
function renderClient(view,id){
  const views={home:homeView,business:()=>businessView(id),book:()=>bookingView(id),bookings:bookingsView,favorites:favoritesView,profile:profileView};
  app.innerHTML=(views[view]||homeView)();
}
function homeView(){
  const results=getFilteredBusinesses();
  return `<div class="shell">
    <section class="hero">
      <div class="hero-card">
        <div class="eyebrow">Beauty · Barber · Wellness</div>
        <h1>Find it. Book it. Look good.</h1>
        <p class="hero-copy">Trova professionisti, confronta servizi e disponibilità, prenota in pochi secondi.</p>
        <div class="search-box">
          <input id="searchQ" value="${filters.q}" placeholder="Hair, barber, nails, beauty..." oninput="filters.q=this.value;refreshHome()">
          <select id="searchCity" onchange="filters.city=this.value;refreshHome()"><option>Milano</option><option>Roma</option><option>Torino</option></select>
          <button class="btn primary" onclick="refreshHome()">Cerca</button>
        </div>
      </div>
      <aside class="hero-card hero-side">
        <div class="metric"><span>Professionisti demo</span><strong>${state.team.length}</strong></div>
        <div class="metric"><span>Attività</span><strong>${state.businesses.length}</strong></div>
        <div class="metric"><span>Prenotazione</span><strong>24/7</strong></div>
      </aside>
    </section>

    <section class="section">
      <div class="section-head"><div><div class="eyebrow">Esplora</div><h2>Cosa cerchi?</h2></div></div>
      <div class="categories">
        ${categoryCard("Hair","✂")}
        ${categoryCard("Barber","◒")}
        ${categoryCard("Nails","✦")}
        ${categoryCard("Beauty","◉")}
        ${categoryCard("Wellness","≈")}
        ${categoryCard(null,"•••","Tutto")}
      </div>
    </section>

    <section class="section" id="results">
      <div class="section-head"><div><div class="eyebrow">Vicino a te</div><h2>${filters.category||"Attività consigliate"}</h2><p>${results.length} risultati disponibili</p></div></div>
      <div class="cards">${results.map(businessCard).join("")}</div>
    </section>
  </div>`;
}
function categoryCard(cat,ico,label){return `<button class="category ${filters.category===cat?"active":""}" onclick="setCategory(${cat?`'${cat}'`:"null"})"><span class="ico">${ico}</span><strong>${label||cat}</strong></button>`}
function setCategory(cat){filters.category=cat;render()}
function refreshHome(){render()}
function getFilteredBusinesses(){
  return state.businesses.filter(b=>{
    const q=filters.q.trim().toLowerCase();
    const matchesQ=!q||b.name.toLowerCase().includes(q)||b.category.some(c=>c.toLowerCase().includes(q))||state.services.filter(s=>s.businessId===b.id).some(s=>s.name.toLowerCase().includes(q));
    const matchesCat=!filters.category||b.category.includes(filters.category);
    return matchesQ&&matchesCat;
  }).sort((a,b)=>a.distance-b.distance)
}
function businessCard(b){
  const fav=state.favorites.includes(b.id);
  return `<article class="biz-card">
    <div class="biz-img">
      <button class="fav-btn" onclick="event.stopPropagation();toggleFavorite('${b.id}')">${fav?"♥":"♡"}</button>
      <div class="monogram">${initials(b.name)}</div>
    </div>
    <div class="biz-body">
      <div class="biz-top"><div><h3>${b.name}</h3><div class="meta">${b.category.join(" · ")} · ${b.distance} km</div></div><div class="rating">★ ${b.rating}</div></div>
      <div class="tags">${b.category.map(x=>`<span class="chip">${x}</span>`).join("")}</div>
      <div class="biz-footer"><div><div class="meta">da</div><div class="price">${money(b.priceFrom)}</div></div><button class="btn dark small" onclick="location.hash='#/business/${b.id}'">Vedi</button></div>
    </div>
  </article>`
}
function toggleFavorite(id){
  if(state.favorites.includes(id))state.favorites=state.favorites.filter(x=>x!==id);else state.favorites.push(id);
  save();toast(state.favorites.includes(id)?"Aggiunto ai preferiti":"Rimosso dai preferiti");render()
}
function businessView(id){
  const b=biz(id);if(!b)return homeView();
  const services=state.services.filter(s=>s.businessId===id),team=state.team.filter(t=>t.businessId===id),reviews=state.reviews.filter(r=>r.businessId===id);
  return `<div class="shell">
    <button class="btn ghost small" onclick="history.back()">← Indietro</button>
    <section class="profile-hero section">
      <div class="gallery"></div>
      <div class="profile-info">
        <div class="eyebrow">${b.category.join(" · ")}</div>
        <h1>${b.name}</h1>
        <p>★ ${b.rating} (${b.reviews} recensioni) · ${b.distance} km · ${b.city}</p>
        <p>${b.description}</p>
        <div class="tags">${b.category.map(x=>`<span class="chip">${x}</span>`).join("")}</div>
        <div class="hero-actions">
          <button class="btn primary" onclick="location.hash='#/book/${b.id}'">Prenota</button>
          <button class="btn ghost" onclick="toggleFavorite('${b.id}')">${state.favorites.includes(b.id)?"♥ Salvato":"♡ Salva"}</button>
        </div>
      </div>
    </section>

    <section class="section booking-grid">
      <div class="panel">
        <div class="panel-head"><div><div class="eyebrow">Servizi</div><h2>Scegli il trattamento</h2></div></div>
        <div class="services-list">${services.map(s=>`<div class="service-row"><div><strong>${s.name}</strong><div class="duration">${s.duration} min · ${s.category}</div></div><strong>${money(s.price)}</strong><button class="btn dark small" onclick="startBooking('${b.id}','${s.id}')">Prenota</button></div>`).join("")}</div>
      </div>
      <aside class="panel">
        <div class="eyebrow">Team</div><h2>Professionisti</h2>
        <div class="team-grid">${team.map(t=>`<div class="team-card"><div class="avatar">${initials(t.name)}</div><strong>${t.name}</strong><div class="meta">${t.role}</div></div>`).join("")}</div>
        <div class="section"><div class="eyebrow">Recensioni</div>${reviews.length?reviews.map(r=>`<div class="summary-box" style="margin-top:8px"><strong>★ ${r.rating} · ${r.author}</strong><p style="margin-bottom:0">${r.text}</p></div>`).join(""):`<p>Nessuna recensione demo.</p>`}</div>
      </aside>
    </section>
  </div>`
}
function startBooking(bid,sid=null){booking={businessId:bid,serviceId:sid,teamId:null,date:null,time:null,step:sid?2:1,appointmentId:null};location.hash=`#/book/${bid}`}
function bookingView(bid){
  if(booking.businessId!==bid)booking={businessId:bid,serviceId:null,teamId:null,date:null,time:null,step:1,appointmentId:null};
  const b=biz(bid),services=state.services.filter(s=>s.businessId===bid);
  if(booking.step===5)return bookingSuccess();
  return `<div class="shell">
    <div class="panel">
      <div class="panel-head"><div><div class="eyebrow">${b.name}</div><h2>Prenota il tuo appuntamento</h2><p>Disponibilità in tempo reale nella demo.</p></div><button class="btn ghost small" onclick="location.hash='#/business/${bid}'">Esci</button></div>
      <div class="stepper">${["Servizio","Professionista","Data e ora","I tuoi dati"].map((x,i)=>`<div class="step ${booking.step===i+1?"active":""}">${i+1}. ${x}</div>`).join("")}</div>
      ${booking.step===1?selectService(services):booking.step===2?selectTeam():booking.step===3?selectDateTime():customerDetails()}
    </div>
  </div>`
}
function selectService(services){
  return `<div class="services-list">${services.map(s=>`<div class="service-row"><div><strong>${s.name}</strong><div class="duration">${s.duration} min · ${s.category}</div></div><strong>${money(s.price)}</strong><button class="btn dark small" onclick="booking.serviceId='${s.id}';booking.step=2;render()">Scegli</button></div>`).join("")}</div>`
}
function selectTeam(){
  const s=svc(booking.serviceId),people=state.team.filter(t=>s.team.includes(t.id));
  return `<div class="team-grid">${people.map(t=>`<button class="team-card" onclick="booking.teamId='${t.id}';booking.step=3;render()"><div class="avatar">${initials(t.name)}</div><strong>${t.name}</strong><div class="meta">${t.role}</div></button>`).join("")}</div><div class="hero-actions"><button class="btn ghost" onclick="booking.step=1;render()">Indietro</button></div>`
}
function selectDateTime(){
  const days=[...Array(14)].map((_,i)=>addDays(new Date(),i));
  if(!booking.date)booking.date=isoDate(days[0]);
  const slots=availableSlots(booking.date,booking.serviceId,booking.teamId);
  return `<div class="calendar-strip">${days.slice(0,7).map(d=>{const id=isoDate(d);return `<button class="date-pill ${booking.date===id?"active":""}" onclick="booking.date='${id}';booking.time=null;render()"><small>${new Intl.DateTimeFormat("it-IT",{weekday:"short"}).format(d)}</small><strong>${d.getDate()}</strong></button>`}).join("")}</div>
  <div class="section"><h3>${fmtDate(booking.date)}</h3><div class="slots">${slots.map(t=>`<button class="slot ${booking.time===t?"active":""}" onclick="booking.time='${t}';render()">${t}</button>`).join("")}</div></div>
  <div class="hero-actions"><button class="btn ghost" onclick="booking.step=2;render()">Indietro</button><button class="btn primary" ${booking.time?"":"disabled"} onclick="booking.step=4;render()">Continua</button></div>`
}
function availableSlots(date,serviceId,teamId){
  const base=["09:00","09:30","10:00","10:30","11:00","11:30","12:00","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];
  return base.filter(time=>!state.appointments.some(a=>a.teamId===teamId&&a.date===date&&a.time===time&&["pending","confirmed"].includes(a.status)))
}
function customerDetails(){
  const s=svc(booking.serviceId),t=tm(booking.teamId),b=biz(booking.businessId);
  return `<div class="booking-grid">
    <form id="bookingForm" class="form-grid" onsubmit="submitBooking(event)">
      <div class="field"><label>Nome</label><input name="name" value="${state.user.name}" required></div>
      <div class="field"><label>Telefono</label><input name="phone" value="${state.user.phone}" required></div>
      <div class="field full"><label>Email</label><input type="email" name="email" value="${state.user.email}" required></div>
      <div class="field full"><label>Note</label><textarea name="notes" placeholder="Facoltativo"></textarea></div>
      <div class="field full"><label style="display:flex;gap:8px;align-items:flex-start;font-weight:500"><input type="checkbox" required style="width:auto;margin-top:3px"> Accetto il trattamento dei dati per la prenotazione.</label></div>
      <div class="field full"><div class="hero-actions"><button type="button" class="btn ghost" onclick="booking.step=3;render()">Indietro</button><button type="submit" class="btn primary">Invia richiesta</button></div></div>
    </form>
    <aside class="summary-box">
      <h3>Riepilogo</h3>
      <div class="summary-row"><span>Attività</span><strong>${b.name}</strong></div>
      <div class="summary-row"><span>Servizio</span><strong>${s.name}</strong></div>
      <div class="summary-row"><span>Professionista</span><strong>${t.name}</strong></div>
      <div class="summary-row"><span>Quando</span><strong>${fmtDate(booking.date,true)} · ${booking.time}</strong></div>
      <div class="summary-row"><span>Prezzo</span><strong>${money(s.price)}</strong></div>
      <p style="font-size:12px;margin-bottom:0">La richiesta verrà confermata dall'attività.</p>
    </aside>
  </div>`
}
function submitBooking(e){
  e.preventDefault();const fd=new FormData(e.target);
  const a={id:crypto.randomUUID(),businessId:booking.businessId,serviceId:booking.serviceId,teamId:booking.teamId,date:booking.date,time:booking.time,status:"pending",customer:{name:fd.get("name"),phone:fd.get("phone"),email:fd.get("email")},source:"app",notes:fd.get("notes")||""};
  state.appointments.push(a);save();booking.appointmentId=a.id;booking.step=5;render()
}
function bookingSuccess(){
  const a=state.appointments.find(x=>x.id===booking.appointmentId),b=biz(a.businessId),s=svc(a.serviceId),t=tm(a.teamId);
  return `<div class="shell"><div class="panel success-card"><div class="success-icon">✓</div><h2>Richiesta inviata</h2><p>${b.name} riceverà la tua richiesta e potrà confermarla.</p><div class="summary-box" style="max-width:520px;margin:20px auto;text-align:left"><div class="summary-row"><span>Servizio</span><strong>${s.name}</strong></div><div class="summary-row"><span>Professionista</span><strong>${t.name}</strong></div><div class="summary-row"><span>Quando</span><strong>${fmtDate(a.date,true)} · ${a.time}</strong></div><div class="summary-row"><span>Stato</span><strong><span class="badge pending">In attesa</span></strong></div></div><button class="btn dark" onclick="location.hash='#/bookings'">I miei appuntamenti</button></div></div>`
}
function bookingsView(){
  const apps=state.appointments.filter(a=>a.customer.email===state.user.email).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  return `<div class="shell"><div class="section-head"><div><div class="eyebrow">Il tuo tempo</div><h2>I miei appuntamenti</h2><p>Tutto in un unico posto.</p></div></div><div class="list">${apps.length?apps.map(clientBookingCard).join(""):`<div class="panel empty">Non hai ancora appuntamenti.</div>`}</div></div>`
}
function clientBookingCard(a){
  return `<div class="booking-card"><div class="time">${a.time}<div class="meta">${fmtDate(a.date,true)}</div></div><div><strong>${biz(a.businessId).name}</strong><div class="meta">${svc(a.serviceId).name} · ${tm(a.teamId).name}</div></div><div class="actions"><span class="badge ${a.status}">${statusLabel(a.status)}</span>${a.status==="confirmed"||a.status==="pending"?`<button class="btn ghost small" onclick="rescheduleClient('${a.id}')">Sposta</button><button class="btn danger small" onclick="cancelClient('${a.id}')">Cancella</button>`:""}</div></div>`
}
function statusLabel(s){return ({pending:"In attesa",confirmed:"Confermato",cancelled:"Cancellato",completed:"Completato"})[s]||s}
function cancelClient(id){const a=state.appointments.find(x=>x.id===id);a.status="cancelled";save();toast("Appuntamento cancellato");render()}
function rescheduleClient(id){
  const a=state.appointments.find(x=>x.id===id),slots=availableSlots(a.date,a.serviceId,a.teamId).filter(x=>x!==a.time);
  openModal("Sposta appuntamento",`<p>Scegli un nuovo orario per ${fmtDate(a.date)}.</p><div class="slots">${slots.slice(0,10).map(x=>`<button class="slot" onclick="applyClientTime('${id}','${x}')">${x}</button>`).join("")}</div>`,`<button class="btn ghost" onclick="closeModal()">Chiudi</button>`)
}
function applyClientTime(id,time){const a=state.appointments.find(x=>x.id===id);a.time=time;a.status="pending";save();closeModal();toast("Nuovo orario richiesto");render()}
function favoritesView(){
  const arr=state.businesses.filter(b=>state.favorites.includes(b.id));
  return `<div class="shell"><div class="section-head"><div><div class="eyebrow">Salvati</div><h2>I tuoi preferiti</h2></div></div><div class="cards">${arr.length?arr.map(businessCard).join(""):`<div class="panel empty">Nessun preferito.</div>`}</div></div>`
}
function profileView(){
  return `<div class="shell"><div class="profile-grid"><div class="panel account-card"><div class="account-avatar">${initials(state.user.name)}</div><h2>${state.user.name}</h2><p>${state.user.email}<br>${state.user.phone}</p><button class="btn ghost small" onclick="editProfile()">Modifica profilo</button></div><div class="panel"><div class="eyebrow">LOOKADO</div><h2>Il tuo spazio</h2><div class="summary"><div class="summary-row"><span>Appuntamenti</span><strong>${state.appointments.filter(a=>a.customer.email===state.user.email).length}</strong></div><div class="summary-row"><span>Preferiti</span><strong>${state.favorites.length}</strong></div><div class="summary-row"><span>Recensioni lasciate</span><strong>0</strong></div></div></div></div></div>`
}
function editProfile(){
  openModal("Modifica profilo",`<form id="profileForm" class="form-grid"><div class="field full"><label>Nome</label><input name="name" value="${state.user.name}" required></div><div class="field"><label>Email</label><input type="email" name="email" value="${state.user.email}" required></div><div class="field"><label>Telefono</label><input name="phone" value="${state.user.phone}" required></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveProfile()">Salva</button>`)
}
function saveProfile(){const f=document.getElementById("profileForm");if(!f.reportValidity())return;const fd=new FormData(f);state.user={name:fd.get("name"),email:fd.get("email"),phone:fd.get("phone")};save();closeModal();render();toast("Profilo aggiornato")}

function currentRealBusiness(){
  return myBusinesses.find(x=>x.business_id===state.proBusinessId)?.business || myBusinesses[0]?.business || null
}
function renderPro(view){
  const views={dashboard:proDashboard,business:proBusiness,calendar:proCalendar,requests:proRequests,clients:proClients,services:proServices,team:proTeam,analytics:proAnalytics,marketing:proMarketing,membership:proMembership,settings:proSettings};
  const rb=currentRealBusiness(), businessName=rb?.name||"La mia attività";
  app.innerHTML=`<div class="shell pro-wide"><div class="pro-shell"><aside class="panel sidebar pro-sidebar">
    <div class="pro-brand-block"><div class="eyebrow">LOOKADO PRO</div><h3>${escapeHtml(businessName)}</h3><button class="business-switch" onclick="location.hash='#/pro/business'">Gestisci attività →</button></div>
    <nav class="side-nav">
      <div class="side-label">OGGI</div>${proNav("dashboard","Dashboard",view)}${proNav("calendar","Agenda",view)}${proNav("requests","Richieste",view)}
      <div class="side-label">GESTIONE</div>${proNav("clients","Clienti",view)}${proNav("services","Servizi",view)}${proNav("team","Team",view)}
      <div class="side-label">CRESCITA</div>${proNav("analytics","Analytics",view)}${proNav("marketing","Marketing",view)}
      <div class="side-label">ATTIVITÀ</div>${proNav("business","La mia attività",view)}${proNav("membership","Piano LOOKADO",view)}${proNav("settings","Impostazioni",view)}
    </nav>
    <div class="sidebar-footer"><button class="btn primary small" onclick="openPublicBusinessPreview()">Vedi profilo pubblico</button><button class="btn ghost small" onclick="location.hash='#/create-business'">+ Nuova attività</button></div>
  </aside><section class="pro-content">${(views[view]||proDashboard)()}</section></div></div>`;
}
function proNav(id,label,current){return `<button class="${id===current?"active":""}" onclick="location.hash='#/pro/${id}'">${label}</button>`}
function proApps(){return state.appointments.filter(a=>a.businessId===state.proBusinessId)}
function proDashboard(){
  const b=currentRealBusiness()||{};
  const appts=(state.appointments||[]);
  const pending=appts.filter(a=>a.status==="pending").length;
  const confirmed=appts.filter(a=>a.status==="confirmed").length;
  return `<div class="owner-dashboard">
    <div class="dash-welcome"><div><div class="eyebrow">OGGI · LOOKADO PRO</div><h1>${escapeHtml(b.name||"La tua attività")}</h1><p>Quello che richiede attenzione, in un solo posto.</p></div><div class="dash-actions"><button class="btn ghost" onclick="location.hash='#/pro/business'">La mia attività</button><button class="btn primary" onclick="openManualAppointment()">+ Nuovo appuntamento</button></div></div>
    <div class="today-kpis">
      <div><span>Appuntamenti</span><strong>${confirmed}</strong><small>confermati</small></div>
      <div><span>Da gestire</span><strong>${pending}</strong><small>richieste in attesa</small></div>
      <div><span>Clienti</span><strong>${state.clients?.length||0}</strong><small>nel workspace</small></div>
      <div class="kpi-accent"><span>Profilo LOOKADO</span><strong>Online</strong><small>prenotazioni 24/7</small></div>
    </div>
    <div class="dash-grid">
      <section class="panel focus-panel"><div class="panel-head"><div><div class="eyebrow">AGENDA</div><h2>Il lavoro di oggi</h2></div><button class="btn ghost small" onclick="location.hash='#/pro/calendar'">Apri agenda</button></div>
        <div class="agenda-snapshot">${appts.length?appts.slice(0,5).map(a=>`<div class="agenda-line"><time>${escapeHtml(a.time||"—")}</time><span><strong>${escapeHtml(a.service||"Appuntamento")}</strong><small>${escapeHtml(a.client||"Cliente")}</small></span><em class="status ${a.status}">${escapeHtml(a.status||"")}</em></div>`).join(""):`<div class="empty compact">Nessun appuntamento demo. L'agenda reale apparirà qui.</div>`}</div>
      </section>
      <section class="panel attention-panel"><div class="eyebrow">RICHIEDE ATTENZIONE</div><h2>Non lasciare opportunità ferme</h2>
        <button class="attention-row" onclick="location.hash='#/pro/requests'"><span>${pending}</span><div><strong>Richieste da confermare</strong><small>Rispondi rapidamente ai clienti</small></div><em>→</em></button>
        <button class="attention-row" onclick="location.hash='#/pro/business'"><span>↗</span><div><strong>Completa il profilo</strong><small>Foto, social e mappa aumentano la fiducia</small></div><em>→</em></button>
        <button class="attention-row" onclick="location.hash='#/pro/marketing'"><span>◎</span><div><strong>Riattiva i clienti</strong><small>Usa i momenti vuoti per generare ritorni</small></div><em>→</em></button>
      </section>
      <section class="panel quick-panel"><div class="eyebrow">GESTIONE RAPIDA</div><h2>Lavora senza perdere tempo</h2><div class="quick-grid">
        <button onclick="location.hash='#/pro/clients'"><strong>Clienti</strong><small>CRM e storico</small></button><button onclick="location.hash='#/pro/services'"><strong>Servizi</strong><small>Prezzi e durata</small></button><button onclick="location.hash='#/pro/team'"><strong>Team</strong><small>Turni e operatori</small></button><button onclick="location.hash='#/pro/analytics'"><strong>Analytics</strong><small>Controlla la crescita</small></button>
      </div></section>
      <section class="panel plan-nudge"><div><div class="eyebrow">IL TUO LOOKADO</div><h2>${escapeHtml((b.membership_plan||"start").toUpperCase())}</h2><p>Controlla piano, annuale e funzioni disponibili.</p></div><button class="btn dark" onclick="location.hash='#/pro/membership'">Gestisci piano</button></section>
    </div>
  </div>`
}

function proAppointmentList(arr){
  if(!arr.length)return `<div class="empty">Nessun appuntamento.</div>`;
  return `<div class="list">${arr.map(a=>`<div class="appointment"><div class="time"><strong>${a.time}</strong><div class="meta">${fmtDate(a.date,true)}</div></div><div><strong>${a.customer.name}</strong><div class="meta">${svc(a.serviceId).name}</div></div><div><strong>${tm(a.teamId).name}</strong><div class="meta">${money(svc(a.serviceId).price)}</div></div><div class="actions"><span class="badge ${a.status}">${statusLabel(a.status)}</span>${a.status==="pending"?`<button class="btn success small" onclick="proStatus('${a.id}','confirmed')">Conferma</button><button class="btn danger small" onclick="proStatus('${a.id}','cancelled')">Rifiuta</button>`:""}${a.status==="confirmed"?`<button class="btn ghost small" onclick="proStatus('${a.id}','completed')">Completato</button>`:""}</div></div>`).join("")}</div>`
}
function proStatus(id,status){const a=state.appointments.find(x=>x.id===id);a.status=status;save();toast("Stato aggiornato");render()}
function topServicesBars(){
  const counts={};proApps().forEach(a=>counts[a.serviceId]=(counts[a.serviceId]||0)+1);
  const items=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5),max=Math.max(1,...items.map(x=>x[1]));
  return `<div class="chart-bars">${items.map(([id,c])=>`<div class="bar-row"><span>${svc(id).name}</span><div class="bar-track"><div class="bar-fill" style="width:${(c/max)*100}%"></div></div><strong>${c}</strong></div>`).join("")||"<p>Nessun dato.</p>"}</div>`
}
function proCalendar(){
  setTimeout(loadRealAgenda,0);
  const monday=getAgendaMonday();
  return `<div class="agenda-pro">
    <div class="agenda-head"><div><div class="eyebrow">AGENDA PRO</div><h1>Agenda del team</h1><p>Appuntamenti, disponibilità, pause e blocchi in una sola vista.</p></div>
      <div class="agenda-actions"><button class="btn ghost" onclick="shiftAgenda(-7)">←</button><button class="btn ghost" onclick="agendaToday()">Oggi</button><button class="btn ghost" onclick="shiftAgenda(7)">→</button><button class="btn primary" onclick="openRealAppointment()">+ Appuntamento</button></div>
    </div>
    <div class="agenda-toolbar panel"><div><strong id="agendaRange">${formatAgendaRange(monday)}</strong><small>Settimana</small></div><div class="agenda-legend"><span><i class="confirmed"></i>Confermato</span><span><i class="pending"></i>Da confermare</span><span><i class="blocked"></i>Blocco</span></div><button class="btn ghost small" onclick="openBlockTime()">+ Blocca orario</button></div>
    <div id="realAgenda"><div class="panel empty">Caricamento agenda…</div></div>
  </div>`
}
let agendaAnchor=null;
function isoDay(d){return d.toISOString().slice(0,10)}
function getAgendaMonday(){
  const d=agendaAnchor?new Date(agendaAnchor+"T12:00:00"):new Date(); const day=(d.getDay()+6)%7; d.setDate(d.getDate()-day); return d
}
function formatAgendaRange(m){const e=new Date(m);e.setDate(e.getDate()+6);return `${m.toLocaleDateString("it-IT",{day:"numeric",month:"short"})} – ${e.toLocaleDateString("it-IT",{day:"numeric",month:"short",year:"numeric"})}`}
function shiftAgenda(n){const d=getAgendaMonday();d.setDate(d.getDate()+n);agendaAnchor=isoDay(d);render()}
function agendaToday(){agendaAnchor=null;render()}
async function loadRealAgenda(){
 const root=document.getElementById("realAgenda");if(!root||!state.proBusinessId)return;
 const m=getAgendaMonday(), end=new Date(m);end.setDate(end.getDate()+7);
 const [tr,ar,br]=await Promise.all([
  db.from("team_members").select("*").eq("business_id",state.proBusinessId).eq("active",true).order("created_at"),
  db.from("appointments").select("*,service:services(name,duration_minutes,price),team:team_members(display_name)").eq("business_id",state.proBusinessId).gte("starts_at",m.toISOString()).lt("starts_at",end.toISOString()).order("starts_at"),
  db.from("calendar_blocks").select("*").eq("business_id",state.proBusinessId).gte("starts_at",m.toISOString()).lt("starts_at",end.toISOString()).order("starts_at")
 ]);
 if(tr.error||ar.error||br.error){root.innerHTML=`<div class="notice error">${escapeHtml((tr.error||ar.error||br.error).message)}</div>`;return}
 window._agendaData={team:tr.data||[],appointments:ar.data||[],blocks:br.data||[]};
 const days=Array.from({length:7},(_,i)=>{const d=new Date(m);d.setDate(d.getDate()+i);return d});
 root.innerHTML=`<div class="week-board">${days.map(d=>`<section class="day-column ${isoDay(d)===isoDay(new Date())?"today":""}"><header><span>${d.toLocaleDateString("it-IT",{weekday:"short"})}</span><strong>${d.getDate()}</strong></header><div class="day-events">${renderDayEvents(d)}</div></section>`).join("")}</div>`;
}
function renderDayEvents(d){
 const x=window._agendaData||{appointments:[],blocks:[]}, key=isoDay(d);
 const events=[
  ...x.appointments.filter(a=>isoDay(new Date(a.starts_at))===key).map(a=>({...a,_kind:"appointment",_time:new Date(a.starts_at)})),
  ...x.blocks.filter(a=>isoDay(new Date(a.starts_at))===key).map(a=>({...a,_kind:"block",_time:new Date(a.starts_at)}))
 ].sort((a,b)=>a._time-b._time);
 if(!events.length)return `<button class="empty-day" onclick="openRealAppointment('${key}')">+ Aggiungi</button>`;
 return events.map(a=>a._kind==="block"?`<button class="agenda-event blocked" onclick="deleteBlockConfirm('${a.id}')"><time>${a._time.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}</time><strong>${escapeHtml(a.reason||"Blocco")}</strong><small>Non disponibile</small></button>`:`<button class="agenda-event ${a.status}" onclick="openAppointmentDetail('${a.id}')"><time>${a._time.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}</time><strong>${escapeHtml(a.customer_name)}</strong><small>${escapeHtml(a.service?.name||"Servizio")} · ${escapeHtml(a.team?.display_name||"Team")}</small></button>`).join("")
}
async function agendaFormData(){
 const [s,t,c,st]=await Promise.all([
  db.from("services").select("*").eq("business_id",state.proBusinessId).eq("active",true).order("name"),
  db.from("team_members").select("*").eq("business_id",state.proBusinessId).eq("active",true).order("display_name"),
  db.from("business_customers").select("*").eq("business_id",state.proBusinessId).order("full_name"),
  db.from("service_team").select("*")
 ]);return {services:s.data||[],team:t.data||[],clients:c.data||[],links:st.data||[]}
}
async function openRealAppointment(date=""){
 const x=await agendaFormData();window._agendaForm=x;const today=date||isoDay(new Date());
 openModal("Nuovo appuntamento",`<form id="realApptForm" class="form-grid">
  <div class="field full"><label>Cliente</label><select name="client_id" onchange="prefillAgendaClient(this.value)"><option value="">Nuovo / seleziona cliente</option>${x.clients.map(c=>`<option value="${c.id}">${escapeHtml(c.full_name)}</option>`).join("")}</select></div>
  <div class="field"><label>Nome cliente *</label><input name="customer_name" required></div><div class="field"><label>Telefono</label><input name="customer_phone"></div>
  <div class="field"><label>Servizio *</label><select name="service_id" required onchange="filterAgendaTeam(this.value)"><option value="">Seleziona</option>${x.services.map(s=>`<option value="${s.id}">${escapeHtml(s.name)} · ${s.duration_minutes} min · ${money(Number(s.price))}</option>`).join("")}</select></div>
  <div class="field"><label>Professionista *</label><select name="team_member_id" required><option value="">Prima scegli il servizio</option></select></div>
  <div class="field"><label>Data *</label><input type="date" name="date" value="${today}" required></div><div class="field"><label>Ora *</label><input type="time" name="time" step="900" required></div>
  <div class="field full"><label>Note interne</label><textarea name="notes" rows="3"></textarea></div>
 </form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveRealAppointment()">Salva appuntamento</button>`)
}
function prefillAgendaClient(id){const c=window._agendaForm?.clients.find(x=>x.id===id);if(!c)return;const f=document.getElementById("realApptForm");f.customer_name.value=c.full_name||"";f.customer_phone.value=c.phone||""}
function filterAgendaTeam(serviceId){const f=document.getElementById("realApptForm"),x=window._agendaForm;const linked=x.links.filter(l=>l.service_id===serviceId).map(l=>l.team_member_id);const team=linked.length?x.team.filter(t=>linked.includes(t.id)):x.team;f.team_member_id.innerHTML=`<option value="">Seleziona professionista</option>${team.map(t=>`<option value="${t.id}">${escapeHtml(t.display_name)}</option>`).join("")}`}
async function saveRealAppointment(){
 const f=document.getElementById("realApptForm");if(!f.reportValidity())return;const fd=new FormData(f),svc=window._agendaForm.services.find(s=>s.id===fd.get("service_id"));
 const start=new Date(`${fd.get("date")}T${fd.get("time")}:00`), end=new Date(start.getTime()+(Number(svc.duration_minutes)+Number(svc.buffer_minutes||0))*60000);
 const teamId=fd.get("team_member_id");
 const {data:conflicts,error:ce}=await db.from("appointments").select("id").eq("team_member_id",teamId).lt("starts_at",end.toISOString()).gt("ends_at",start.toISOString()).not("status","in","(cancelled,no_show)");
 if(ce){toast(ce.message);return} const {data:blocks}=await db.from("calendar_blocks").select("id").or(`team_member_id.eq.${teamId},team_member_id.is.null`).lt("starts_at",end.toISOString()).gt("ends_at",start.toISOString());
 if(conflicts?.length||blocks?.length){toast("Questo professionista non è disponibile in questo orario.");return}
 const payload={business_id:state.proBusinessId,business_customer_id:fd.get("client_id")||null,service_id:svc.id,team_member_id:teamId,customer_name:fd.get("customer_name"),customer_phone:fd.get("customer_phone")||null,starts_at:start.toISOString(),ends_at:end.toISOString(),status:"confirmed",source:"manual",notes:fd.get("notes")||null};
 const {error}=await db.from("appointments").insert(payload);if(error){toast(error.message);return}closeModal();await loadRealAgenda();toast("Appuntamento salvato")
}
async function openBlockTime(){
 const x=await agendaFormData();openModal("Blocca orario",`<form id="blockForm" class="form-grid"><div class="field full"><label>Professionista</label><select name="team_member_id"><option value="">Tutto il team</option>${x.team.map(t=>`<option value="${t.id}">${escapeHtml(t.display_name)}</option>`).join("")}</select></div><div class="field"><label>Data</label><input type="date" name="date" value="${isoDay(new Date())}" required></div><div class="field"><label>Dalle</label><input type="time" name="start" required></div><div class="field"><label>Alle</label><input type="time" name="end" required></div><div class="field"><label>Motivo</label><input name="reason" placeholder="Pausa, ferie, riunione…"></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveBlockTime()">Blocca</button>`)
}
async function saveBlockTime(){const f=document.getElementById("blockForm");if(!f.reportValidity())return;const fd=new FormData(f),a=new Date(`${fd.get("date")}T${fd.get("start")}:00`),b=new Date(`${fd.get("date")}T${fd.get("end")}:00`);if(b<=a){toast("L'orario finale deve essere successivo.");return}const {error}=await db.from("calendar_blocks").insert({business_id:state.proBusinessId,team_member_id:fd.get("team_member_id")||null,starts_at:a.toISOString(),ends_at:b.toISOString(),reason:fd.get("reason")||"Blocco"});if(error){toast(error.message);return}closeModal();await loadRealAgenda();toast("Orario bloccato")}
function openAppointmentDetail(id){const a=window._agendaData?.appointments.find(x=>x.id===id);if(!a)return;openModal("Appuntamento",`<div class="appointment-detail"><div class="eyebrow">${escapeHtml(a.status.toUpperCase())}</div><h2>${escapeHtml(a.customer_name)}</h2><p><strong>${escapeHtml(a.service?.name||"Servizio")}</strong><br>${new Date(a.starts_at).toLocaleString("it-IT",{dateStyle:"full",timeStyle:"short"})}<br>${escapeHtml(a.team?.display_name||"")}</p>${a.customer_phone?`<p>${escapeHtml(a.customer_phone)}</p>`:""}${a.notes?`<div class="notice">${escapeHtml(a.notes)}</div>`:""}</div>`,`<button class="btn ghost" onclick="closeModal()">Chiudi</button>${a.status==="pending"?`<button class="btn primary" onclick="setAppointmentStatus('${a.id}','confirmed')">Conferma</button>`:""}<button class="btn danger" onclick="setAppointmentStatus('${a.id}','cancelled')">Annulla</button>`)}
async function setAppointmentStatus(id,status){const {error}=await db.from("appointments").update({status,updated_at:new Date().toISOString()}).eq("id",id);if(error){toast(error.message);return}closeModal();await loadRealAgenda();toast("Appuntamento aggiornato")}
async function deleteBlockConfirm(id){if(!confirm("Rimuovere questo blocco dall'agenda?"))return;const {error}=await db.from("calendar_blocks").delete().eq("id",id);if(error){toast(error.message);return}await loadRealAgenda()}

function proRequests(){setTimeout(loadProRequests,0);return `<div><div class="section-head"><div><div class="eyebrow">RICHIESTE</div><h1>Richieste di prenotazione</h1><p>Conferma, rifiuta o proponi un nuovo orario senza perdere il controllo dell'agenda.</p></div></div><div class="request-tabs"><button class="active" onclick="filterProRequests('pending',this)">Da gestire</button><button onclick="filterProRequests('proposed',this)">Proposte</button><button onclick="filterProRequests('confirmed',this)">Confermate</button><button onclick="filterProRequests('all',this)">Tutte</button></div><div id="proRequestsRoot"><div class="panel empty">Caricamento richieste…</div></div></div>`}
let proRequestRows=[];
async function loadProRequests(){const root=document.getElementById("proRequestsRoot");if(!root)return;const {data,error}=await db.from("appointments").select("*,service:services(name,price,duration_minutes),team:team_members(display_name)").eq("business_id",state.proBusinessId).order("starts_at",{ascending:true});if(error){root.innerHTML=`<div class="notice error">${escapeHtml(error.message)}</div>`;return}proRequestRows=data||[];renderProRequestRows("pending")}
function filterProRequests(status,el){document.querySelectorAll(".request-tabs button").forEach(b=>b.classList.remove("active"));el?.classList.add("active");renderProRequestRows(status)}
function renderProRequestRows(filter){const root=document.getElementById("proRequestsRoot");let rows=proRequestRows;if(filter==="pending")rows=rows.filter(a=>a.status==="pending");else if(filter!=="all")rows=rows.filter(a=>a.status===filter);root.innerHTML=rows.length?`<div class="request-list">${rows.map(a=>`<article class="request-card"><div class="request-time"><strong>${new Date(a.starts_at).toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}</strong><span>${new Date(a.starts_at).toLocaleDateString("it-IT",{day:"numeric",month:"short"})}</span></div><div class="request-body"><div class="appt-top"><div><h3>${escapeHtml(a.customer_name)}</h3><p>${escapeHtml(a.service?.name||"")} · ${escapeHtml(a.team?.display_name||"")}</p></div><span class="appt-status ${a.status}">${apptStatusLabel(a.status)}</span></div>${a.customer_phone?`<p class="customer-contact">${escapeHtml(a.customer_phone)}</p>`:""}${a.notes?`<div class="status-note">“${escapeHtml(a.notes)}”</div>`:""}${a.status==="proposed"&&a.proposed_starts_at?`<div class="proposal-inline">Proposto: <strong>${new Date(a.proposed_starts_at).toLocaleString("it-IT",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</strong></div>`:""}<div class="request-actions">${a.status==="pending"?`<button class="btn primary small" onclick="businessApptAction('${a.id}','confirm')">Conferma</button><button class="btn ghost small" onclick="openProposeTime('${a.id}')">Proponi altro orario</button><button class="btn danger small" onclick="businessApptAction('${a.id}','reject')">Rifiuta</button>`:""}${a.status==="confirmed"?`<button class="btn ghost small" onclick="businessApptAction('${a.id}','complete')">Segna completato</button><button class="btn ghost small" onclick="businessApptAction('${a.id}','no_show')">No-show</button>`:""}</div></div></article>`).join("")}</div>`:`<div class="panel empty"><h3>Nessuna richiesta qui</h3><p>Quando arrivano nuove prenotazioni, compariranno automaticamente.</p></div>`}
async function businessApptAction(id,action,note=null,proposed=null){const {data,error}=await db.rpc("business_update_appointment",{p_appointment_id:id,p_action:action,p_proposed_starts_at:proposed,p_note:note});if(error||!data){toast(error?.message||"Operazione non riuscita.");return}toast(action==="confirm"?"Prenotazione confermata":"Prenotazione aggiornata");await loadProRequests()}
function openProposeTime(id){const a=proRequestRows.find(x=>x.id===id);if(!a)return;const d=new Date(a.starts_at);openModal("Proponi un nuovo orario",`<form id="proposalForm" class="form-grid"><div class="field"><label>Nuova data</label><input type="date" name="date" value="${isoDay(d)}" required></div><div class="field"><label>Nuova ora</label><input type="time" name="time" value="${d.toTimeString().slice(0,5)}" required></div><div class="field full"><label>Messaggio al cliente</label><textarea name="note" placeholder="Es. Possiamo riceverti alle 16:30."></textarea></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveProposedTime('${id}')">Invia proposta</button>`)}
async function saveProposedTime(id){const f=document.getElementById("proposalForm");if(!f.reportValidity())return;const fd=new FormData(f),dt=new Date(`${fd.get("date")}T${fd.get("time")}:00`).toISOString();closeModal();await businessApptAction(id,"propose",fd.get("note")||null,dt)}

function proClients(){setTimeout(loadCrmPro,0);return `<div><div class="section-head"><div><div class="eyebrow">CRM CLIENTI</div><h1>Clienti</h1><p>Storico, valore, preferenze e opportunità di ritorno.</p></div><button class="btn primary" onclick="openCrmEditor()">+ Nuovo cliente</button></div><div class="crm-kpis" id="crmKpis"></div><div class="crm-toolbar panel"><input id="crmSearch" placeholder="Cerca nome, telefono o email…" oninput="renderCrmList()"><select id="crmFilter" onchange="renderCrmList()"><option value="all">Tutti i clienti</option><option value="reactivate">Da richiamare</option><option value="vip">Clienti VIP</option><option value="noshow">Con no-show</option><option value="new">Nuovi</option></select></div><div id="crmProRoot"><div class="panel empty">Caricamento CRM…</div></div></div>`}
let crmRows=[],crmAppointments=[];
async function loadCrmPro(){const root=document.getElementById("crmProRoot");if(!root)return;const [c,a]=await Promise.all([db.from("business_customers").select("*").eq("business_id",state.proBusinessId).order("full_name"),db.from("appointments").select("*,service:services(name,price),team:team_members(display_name)").eq("business_id",state.proBusinessId).order("starts_at",{ascending:false})]);if(c.error||a.error){root.innerHTML=`<div class="notice error">${escapeHtml((c.error||a.error).message)}</div>`;return}crmAppointments=a.data||[];crmRows=(c.data||[]).map(x=>crmEnrich(x));renderCrmKpis();renderCrmList()}
function crmEnrich(c){const ap=crmAppointments.filter(a=>a.business_customer_id===c.id||(!a.business_customer_id&&((c.phone&&a.customer_phone===c.phone)||(c.email&&a.customer_email===c.email))));const completed=ap.filter(a=>a.status==="completed"),spend=completed.reduce((n,a)=>n+Number(a.service?.price||0),0),last=ap[0]?.starts_at||c.created_at,noShow=ap.filter(a=>a.status==="no_show").length,days=(Date.now()-new Date(last))/86400000;return {...c,_appointments:ap,_visits:completed.length,_spend:spend,_last:last,_noshow:noShow,_reactivate:completed.length>0&&days>60,_new:ap.length<=1,_vip:spend>=500||completed.length>=8}}
function renderCrmKpis(){const el=document.getElementById("crmKpis");if(!el)return;el.innerHTML=`<div><span>Clienti</span><strong>${crmRows.length}</strong></div><div><span>Da richiamare</span><strong>${crmRows.filter(x=>x._reactivate).length}</strong></div><div><span>VIP</span><strong>${crmRows.filter(x=>x._vip).length}</strong></div><div><span>Valore registrato</span><strong>${money(crmRows.reduce((n,x)=>n+x._spend,0))}</strong></div>`}
function renderCrmList(){const root=document.getElementById("crmProRoot");if(!root)return;const q=(document.getElementById("crmSearch")?.value||"").toLowerCase(),f=document.getElementById("crmFilter")?.value||"all";let rows=crmRows.filter(x=>!q||[x.full_name,x.email,x.phone].some(v=>(v||"").toLowerCase().includes(q)));if(f!=="all")rows=rows.filter(x=>f==="reactivate"?x._reactivate:f==="vip"?x._vip:f==="noshow"?x._noshow>0:x._new);root.innerHTML=rows.length?`<div class="crm-list">${rows.map(x=>`<button class="crm-row" onclick="openCrmClient('${x.id}')"><div class="crm-avatar">${escapeHtml(x.full_name.slice(0,1).toUpperCase())}</div><div class="crm-name"><strong>${escapeHtml(x.full_name)}</strong><small>${escapeHtml(x.phone||x.email||"Nessun contatto")}</small></div><div><small>Visite</small><strong>${x._visits}</strong></div><div><small>Spesa</small><strong>${money(x._spend)}</strong></div><div><small>Ultimo contatto</small><strong>${new Date(x._last).toLocaleDateString("it-IT")}</strong></div><div class="crm-tags">${x._vip?`<span>VIP</span>`:""}${x._reactivate?`<span class="warm">Da richiamare</span>`:""}${x._noshow?`<span class="danger-tag">${x._noshow} no-show</span>`:""}</div><b>›</b></button>`).join("")}</div>`:`<div class="panel empty">Nessun cliente corrisponde al filtro.</div>`}
function openCrmClient(id){const c=crmRows.find(x=>x.id===id);if(!c)return;openModal(c.full_name,`<div class="crm-profile"><div class="crm-profile-top"><div class="crm-avatar big">${escapeHtml(c.full_name.slice(0,1).toUpperCase())}</div><div><div class="eyebrow">SCHEDA CLIENTE</div><h2>${escapeHtml(c.full_name)}</h2><p>${escapeHtml(c.phone||"")} ${c.email?`· ${escapeHtml(c.email)}`:""}</p></div></div><div class="crm-profile-kpis"><div><span>Visite</span><strong>${c._visits}</strong></div><div><span>Spesa</span><strong>${money(c._spend)}</strong></div><div><span>No-show</span><strong>${c._noshow}</strong></div></div>${c.preferences?`<div class="crm-note"><small>Preferenze</small><p>${escapeHtml(c.preferences)}</p></div>`:""}${c.notes?`<div class="crm-note"><small>Note interne</small><p>${escapeHtml(c.notes)}</p></div>`:""}<h3>Storico appuntamenti</h3><div class="crm-history">${c._appointments.slice(0,8).map(a=>`<div><time>${new Date(a.starts_at).toLocaleDateString("it-IT")}</time><span>${escapeHtml(a.service?.name||"Servizio")} · ${escapeHtml(a.team?.display_name||"")}</span><strong>${apptStatusLabel(a.status)}</strong></div>`).join("")||"<p>Nessun appuntamento registrato.</p>"}</div></div>`,`<button class="btn ghost" onclick="openCrmEditor('${c.id}')">Modifica</button>${c.phone?`<a class="btn ghost" href="tel:${escapeHtml(c.phone)}">Chiama</a>`:""}<button class="btn primary" onclick="closeModal();openRealAppointment()">+ Appuntamento</button>`)}
function openCrmEditor(id=""){const c=crmRows.find(x=>x.id===id)||{};openModal(id?"Modifica cliente":"Nuovo cliente",`<form id="crmEditForm" class="form-grid"><div class="field full"><label>Nome e cognome *</label><input name="full_name" value="${escapeHtml(c.full_name||"")}" required></div><div class="field"><label>Telefono</label><input name="phone" value="${escapeHtml(c.phone||"")}"></div><div class="field"><label>Email</label><input type="email" name="email" value="${escapeHtml(c.email||"")}"></div><div class="field"><label>Compleanno</label><input type="date" name="birthday" value="${c.birthday||""}"></div><div class="field"><label>Tag</label><input name="tags" value="${escapeHtml((c.tags||[]).join(", "))}" placeholder="VIP, colore, sposa…"></div><div class="field full"><label>Preferenze</label><textarea name="preferences" placeholder="Colore preferito, allergie comunicate, stile…">${escapeHtml(c.preferences||"")}</textarea></div><div class="field full"><label>Note interne</label><textarea name="notes">${escapeHtml(c.notes||"")}</textarea></div><div class="field full"><label class="switch-line"><input type="checkbox" name="marketing_consent" ${c.marketing_consent?"checked":""}> Consenso comunicazioni marketing registrato</label></div><input type="hidden" name="id" value="${id}"></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveCrmClient()">Salva cliente</button>`)}
async function saveCrmClient(){const f=document.getElementById("crmEditForm");if(!f.reportValidity())return;const fd=new FormData(f),id=fd.get("id"),payload={business_id:state.proBusinessId,full_name:fd.get("full_name"),phone:fd.get("phone")||null,email:fd.get("email")||null,birthday:fd.get("birthday")||null,tags:(fd.get("tags")||"").split(",").map(x=>x.trim()).filter(Boolean),preferences:fd.get("preferences")||null,notes:fd.get("notes")||null,marketing_consent:fd.has("marketing_consent"),updated_at:new Date().toISOString()};let error;if(id)({error}=await db.from("business_customers").update(payload).eq("id",id));else{payload.created_by=authUser.id;delete payload.updated_at;({error}=await db.from("business_customers").insert(payload))}if(error){toast(error.message);return}closeModal();await loadCrmPro();toast("Cliente salvato")}

function openCustomerForm(){
  openModal("Nuovo cliente",`<form id="customerForm" class="form-grid">
    <div class="field full"><label>Nome e cognome *</label><input name="full_name" required></div>
    <div class="field"><label>Telefono</label><input name="phone" autocomplete="tel"></div>
    <div class="field"><label>Email</label><input name="email" type="email" autocomplete="email"></div>
    <div class="field full"><label>Note interne</label><textarea name="notes" rows="3" placeholder="Preferenze, informazioni utili…"></textarea></div>
    <div class="field full"><label style="display:flex;gap:8px;font-weight:600"><input name="invite" type="checkbox" style="width:auto"> Invia anche un invito a creare l'account LOOKADO</label><div class="meta">L'invito richiede un indirizzo email.</div></div>
  </form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveRealCustomer()">Crea cliente</button>`)
}
async function saveRealCustomer(){
  const f=document.getElementById("customerForm");if(!f.reportValidity())return;
  const fd=new FormData(f), email=String(fd.get("email")||"").trim().toLowerCase();
  if(fd.get("invite")&&!email){toast("Inserisci l'email per inviare l'invito");return}
  const {data,error}=await db.from("business_customers").insert({
    business_id:state.proBusinessId,full_name:fd.get("full_name"),phone:fd.get("phone")||null,email:email||null,
    notes:fd.get("notes")||null,created_by:authUser.id
  }).select().single();
  if(error){toast(error.message);return}
  if(fd.get("invite")){
    const {error:inviteError}=await db.functions.invoke("invite-customer",{body:{business_id:state.proBusinessId,email,invite_type:"customer",redirect_to:location.origin+"/#/auth"}});
    if(inviteError){closeModal();render();toast("Cliente creato; invito non inviato");return}
  }
  closeModal();render();toast(fd.get("invite")?"Cliente creato e invitato":"Cliente creato")
}
function openCustomerDetail(raw){
  const c=JSON.parse(raw);
  openModal("Scheda cliente",`<div class="summary-row"><span>Nome</span><strong>${escapeHtml(c.full_name)}</strong></div><div class="summary-row"><span>Email</span><strong>${escapeHtml(c.email||"—")}</strong></div><div class="summary-row"><span>Telefono</span><strong>${escapeHtml(c.phone||"—")}</strong></div><div class="summary-row"><span>Account</span><strong>${c.auth_user_id?"LOOKADO attivo":"Solo CRM"}</strong></div>${c.notes?`<div class="notice" style="margin-top:15px">${escapeHtml(c.notes)}</div>`:""}`,`<button class="btn ghost" onclick="closeModal()">Chiudi</button><button class="btn primary" onclick='openAppointmentForCustomer(${JSON.stringify(JSON.stringify(c))})'>+ Appuntamento</button>`)
}
function openAppointmentForCustomer(raw){
  const c=JSON.parse(raw);closeModal();openManualAppointment();
  setTimeout(()=>{const f=document.getElementById("manualForm");if(!f)return;f.elements.name.value=c.full_name||"";f.elements.phone.value=c.phone||"";f.elements.email.value=c.email||""},0)
}
function proServices(){setTimeout(loadRealServices,0);return `<div><div class="section-head"><div><div class="eyebrow">SERVIZI</div><h1>Catalogo servizi</h1><p>Prezzo, durata, tempo di preparazione e professionisti abilitati.</p></div><button class="btn primary" onclick="openServiceEditor()">+ Nuovo servizio</button></div><div id="realServices"><div class="panel empty">Caricamento servizi…</div></div></div>`}
async function loadRealServices(){const root=document.getElementById("realServices");if(!root)return;const [s,t,l]=await Promise.all([db.from("services").select("*").eq("business_id",state.proBusinessId).order("category").order("name"),db.from("team_members").select("*").eq("business_id",state.proBusinessId).eq("active",true),db.from("service_team").select("*")]);window._serviceData={services:s.data||[],team:t.data||[],links:l.data||[]};root.innerHTML=`<div class="service-admin-grid">${window._serviceData.services.map(v=>{const names=window._serviceData.team.filter(t=>window._serviceData.links.some(l=>l.service_id===v.id&&l.team_member_id===t.id)).map(t=>t.display_name);return `<button class="service-admin-card" onclick="openServiceEditor('${v.id}')"><div><span class="service-cat">${escapeHtml(v.category)}</span><h3>${escapeHtml(v.name)}</h3><p>${v.duration_minutes} min${v.buffer_minutes?` + ${v.buffer_minutes} min buffer`:""} · ${money(Number(v.price))}</p><small>${names.length?escapeHtml(names.join(" · ")):"Tutto il team / da configurare"}</small></div><span class="service-state ${v.active?"on":"off"}">${v.active?"Attivo":"Disattivo"}</span></button>`}).join("")||`<div class="panel empty">Aggiungi il primo servizio prenotabile.</div>`}</div>`}
async function openServiceEditor(id=""){if(!window._serviceData)await loadRealServices();const x=window._serviceData,v=x.services.find(s=>s.id===id)||{};const linked=x.links.filter(l=>l.service_id===id).map(l=>l.team_member_id);openModal(id?"Modifica servizio":"Nuovo servizio",`<form id="serviceEditForm" class="form-grid"><div class="field full"><label>Nome *</label><input name="name" value="${escapeHtml(v.name||"")}" required></div><div class="field"><label>Categoria *</label><input name="category" value="${escapeHtml(v.category||"Beauty")}" required></div><div class="field"><label>Prezzo € *</label><input type="number" step=".01" min="0" name="price" value="${v.price??""}" required></div><div class="field"><label>Durata (min) *</label><input type="number" step="5" min="5" name="duration_minutes" value="${v.duration_minutes||45}" required></div><div class="field"><label>Buffer dopo (min)</label><input type="number" step="5" min="0" name="buffer_minutes" value="${v.buffer_minutes||0}"></div><div class="field full"><label>Professionisti abilitati</label><div class="check-team">${x.team.map(t=>`<label><input type="checkbox" name="team_ids" value="${t.id}" ${linked.includes(t.id)?"checked":""}><span>${escapeHtml(t.display_name)}</span></label>`).join("")||"Aggiungi prima il team."}</div></div><div class="field"><label class="switch-line"><input type="checkbox" name="active" ${v.active!==false?"checked":""}> Servizio attivo</label></div><div class="field"><label class="switch-line"><input type="checkbox" name="online_booking" ${v.online_booking!==false?"checked":""}> Prenotabile online</label></div><div class="field full"><label>Descrizione</label><textarea name="description">${escapeHtml(v.description||"")}</textarea></div><input type="hidden" name="id" value="${id}"></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveServiceEditor()">Salva servizio</button>`)}
async function saveServiceEditor(){const f=document.getElementById("serviceEditForm");if(!f.reportValidity())return;const fd=new FormData(f),id=fd.get("id"),payload={business_id:state.proBusinessId,name:fd.get("name"),category:fd.get("category"),price:Number(fd.get("price")),duration_minutes:Number(fd.get("duration_minutes")),buffer_minutes:Number(fd.get("buffer_minutes")||0),description:fd.get("description")||null,active:fd.has("active"),online_booking:fd.has("online_booking"),updated_at:new Date().toISOString()};let serviceId=id;if(id){const {error}=await db.from("services").update(payload).eq("id",id);if(error){toast(error.message);return}}else{delete payload.updated_at;const {data,error}=await db.from("services").insert(payload).select("id").single();if(error){toast(error.message);return}serviceId=data.id}await db.from("service_team").delete().eq("service_id",serviceId);const ids=fd.getAll("team_ids");if(ids.length){const {error}=await db.from("service_team").insert(ids.map(team_member_id=>({service_id:serviceId,team_member_id})));if(error){toast(error.message);return}}closeModal();await loadRealServices();toast("Servizio salvato")}

function proTeam(){setTimeout(loadTeamPro,0);return `<div><div class="section-head"><div><div class="eyebrow">TEAM PRO</div><h1>Team & disponibilità</h1><p>Configura professionisti, servizi abilitati e orari reali di lavoro.</p></div><button class="btn primary" onclick="openTeamEditor()">+ Professionista</button></div><div id="teamProRoot"><div class="panel empty">Caricamento team…</div></div></div>`}
async function loadTeamPro(){const root=document.getElementById("teamProRoot");if(!root)return;const [t,h,s,l]=await Promise.all([db.from("team_members").select("*").eq("business_id",state.proBusinessId).order("display_name"),db.from("team_working_hours").select("*").eq("business_id",state.proBusinessId).order("weekday"),db.from("services").select("*").eq("business_id",state.proBusinessId).eq("active",true),db.from("service_team").select("*")]);window._teamPro={team:t.data||[],hours:h.data||[],services:s.data||[],links:l.data||[]};root.innerHTML=`<div class="team-pro-grid">${window._teamPro.team.map(x=>{const hs=window._teamPro.hours.filter(h=>h.team_member_id===x.id),sv=window._teamPro.services.filter(v=>window._teamPro.links.some(l=>l.team_member_id===x.id&&l.service_id===v.id));return `<article class="team-pro-card"><div class="team-avatar">${escapeHtml((x.display_name||"?").slice(0,1).toUpperCase())}</div><div class="team-card-main"><div class="team-card-head"><div><h3>${escapeHtml(x.display_name)}</h3><p>${escapeHtml(x.role_title||"Professionista")}</p></div><span class="service-state ${x.active?"on":"off"}">${x.active?"Attivo":"Disattivo"}</span></div><div class="team-meta"><span>${sv.length||"Tutti"} servizi</span><span>${hs.length?`${new Set(hs.map(h=>h.weekday)).size} giorni configurati`:"Orari da configurare"}</span></div><div class="team-card-actions"><button class="btn ghost small" onclick="openTeamEditor('${x.id}')">Profilo</button><button class="btn dark small" onclick="openWorkingHours('${x.id}')">Orari & turni</button></div></div></article>`}).join("")||`<div class="panel empty">Aggiungi il primo professionista.</div>`}</div>`}
async function openTeamEditor(id=""){if(!window._teamPro)await loadTeamPro();const x=window._teamPro,t=x.team.find(v=>v.id===id)||{},linked=x.links.filter(l=>l.team_member_id===id).map(l=>l.service_id);openModal(id?"Modifica professionista":"Nuovo professionista",`<form id="teamEditForm" class="form-grid"><div class="field"><label>Nome *</label><input name="display_name" value="${escapeHtml(t.display_name||"")}" required></div><div class="field"><label>Ruolo</label><input name="role_title" value="${escapeHtml(t.role_title||"")}" placeholder="Hair stylist, Barber…"></div><div class="field full"><label>Servizi che può eseguire</label><div class="check-team">${x.services.map(v=>`<label><input type="checkbox" name="service_ids" value="${v.id}" ${linked.includes(v.id)?"checked":""}><span>${escapeHtml(v.name)}</span></label>`).join("")||"Configura prima i servizi."}</div></div><div class="field"><label class="switch-line"><input type="checkbox" name="active" ${t.active!==false?"checked":""}> Professionista attivo</label></div><input type="hidden" name="id" value="${id}"></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveTeamEditor()">Salva</button>`)}
async function saveTeamEditor(){const f=document.getElementById("teamEditForm");if(!f.reportValidity())return;const fd=new FormData(f),id=fd.get("id"),payload={business_id:state.proBusinessId,display_name:fd.get("display_name"),role_title:fd.get("role_title")||null,active:fd.has("active")};let teamId=id;if(id){const {error}=await db.from("team_members").update(payload).eq("id",id);if(error){toast(error.message);return}}else{const {data,error}=await db.from("team_members").insert(payload).select("id").single();if(error){toast(error.message);return}teamId=data.id}await db.from("service_team").delete().eq("team_member_id",teamId);const ids=fd.getAll("service_ids");if(ids.length){const {error}=await db.from("service_team").insert(ids.map(service_id=>({service_id,team_member_id:teamId})));if(error){toast(error.message);return}}closeModal();await loadTeamPro();toast("Professionista salvato")}
const dayNames=["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"];
function openWorkingHours(teamId){const x=window._teamPro,t=x.team.find(v=>v.id===teamId),hours=x.hours.filter(h=>h.team_member_id===teamId);openModal("Orari · "+t.display_name,`<form id="hoursForm"><input type="hidden" name="team_id" value="${teamId}"><div class="hours-editor">${[1,2,3,4,5,6,0].map(d=>{const h=hours.find(v=>v.weekday===d);return `<div class="hours-row"><label><input type="checkbox" name="day_${d}" ${h?"checked":""}> <strong>${dayNames[d]}</strong></label><input type="time" name="start_${d}" value="${h?.start_time?.slice(0,5)||"09:00"}"><span>—</span><input type="time" name="end_${d}" value="${h?.end_time?.slice(0,5)||"18:00"}"></div>`}).join("")}</div><div class="notice">Puoi usare i blocchi dell'Agenda per pause, ferie e assenze eccezionali.</div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveWorkingHours()">Salva orari</button>`)}
async function saveWorkingHours(){const f=document.getElementById("hoursForm"),fd=new FormData(f),teamId=fd.get("team_id");await db.from("team_working_hours").delete().eq("team_member_id",teamId);const rows=[];for(const d of [0,1,2,3,4,5,6])if(fd.has("day_"+d)){const a=fd.get("start_"+d),b=fd.get("end_"+d);if(!a||!b||b<=a){toast("Controlla gli orari di "+dayNames[d]);return}rows.push({business_id:state.proBusinessId,team_member_id:teamId,weekday:d,start_time:a,end_time:b,active:true})}if(rows.length){const {error}=await db.from("team_working_hours").insert(rows);if(error){toast(error.message);return}}closeModal();await loadTeamPro();toast("Orari aggiornati")}

function proAnalytics(){setTimeout(loadAnalyticsPro,0);return `<div><div class="section-head"><div><div class="eyebrow">ANALYTICS PRO</div><h1>Performance</h1><p>Capisci cosa genera valore, dove perdi capacità e come sta lavorando LOOKADO per l'attività.</p></div><select id="analyticsPeriod" onchange="loadAnalyticsPro()"><option value="30">Ultimi 30 giorni</option><option value="90">Ultimi 90 giorni</option><option value="365">Ultimi 12 mesi</option></select></div><div id="analyticsRoot"><div class="panel empty">Calcolo performance…</div></div></div>`}
async function loadAnalyticsPro(){const root=document.getElementById("analyticsRoot");if(!root)return;const days=Number(document.getElementById("analyticsPeriod")?.value||30),from=new Date(Date.now()-days*86400000).toISOString();const [a,c,s,t]=await Promise.all([db.from("appointments").select("*,service:services(name,price,duration_minutes),team:team_members(display_name)").eq("business_id",state.proBusinessId).gte("starts_at",from),db.from("business_customers").select("id,created_at").eq("business_id",state.proBusinessId),db.from("services").select("id,name,price,duration_minutes").eq("business_id",state.proBusinessId),db.from("team_members").select("id,display_name").eq("business_id",state.proBusinessId)]);if(a.error){root.innerHTML=`<div class="notice error">${escapeHtml(a.error.message)}</div>`;return}renderAnalytics(a.data||[],c.data||[],s.data||[],t.data||[],days)}
function renderAnalytics(a,customers,services,team,days){const root=document.getElementById("analyticsRoot"),done=a.filter(x=>x.status==="completed"),valid=a.filter(x=>!["cancelled","rejected"].includes(x.status)),revenue=done.reduce((n,x)=>n+Number(x.service?.price||0),0),ticket=done.length?revenue/done.length:0,cancel=a.filter(x=>["cancelled","rejected"].includes(x.status)).length,noshow=a.filter(x=>x.status==="no_show").length,newClients=customers.filter(x=>new Date(x.created_at)>=new Date(Date.now()-days*86400000)).length,unique=new Set(done.map(x=>x.business_customer_id||x.customer_phone||x.customer_email).filter(Boolean)),repeat=[...unique].filter(id=>done.filter(x=>(x.business_customer_id||x.customer_phone||x.customer_email)===id).length>1).length,retention=unique.size?repeat/unique.size*100:0;
const svc=services.map(s=>{const rows=done.filter(x=>x.service_id===s.id);return {...s,count:rows.length,rev:rows.reduce((n,x)=>n+Number(x.service?.price||s.price||0),0)}}).sort((x,y)=>y.rev-x.rev);
const staff=team.map(t=>{const rows=done.filter(x=>x.team_member_id===t.id);return {...t,count:rows.length,rev:rows.reduce((n,x)=>n+Number(x.service?.price||0),0),mins:rows.reduce((n,x)=>n+Number(x.service?.duration_minutes||0),0)}}).sort((x,y)=>y.rev-x.rev);
const hours=Array.from({length:12},(_,i)=>i+8).map(h=>({h,count:valid.filter(x=>new Date(x.starts_at).getHours()===h).length})),maxH=Math.max(1,...hours.map(x=>x.count));
root.innerHTML=`<div class="analytics-kpis"><div><span>Valore appuntamenti completati</span><strong>${money(revenue)}</strong><small>${done.length} appuntamenti</small></div><div><span>Ticket medio</span><strong>${money(ticket)}</strong><small>per visita completata</small></div><div><span>Tasso di ritorno</span><strong>${retention.toFixed(0)}%</strong><small>${repeat} clienti ricorrenti</small></div><div><span>Nuovi clienti CRM</span><strong>${newClients}</strong><small>nel periodo</small></div></div><div class="analytics-grid"><section class="panel analytics-wide"><div class="panel-head"><div><div class="eyebrow">DOMANDA</div><h3>Distribuzione per fascia oraria</h3></div></div><div class="hour-chart">${hours.map(x=>`<div><span style="height:${Math.max(4,x.count/maxH*100)}%"></span><small>${String(x.h).padStart(2,"0")}</small></div>`).join("")}</div><p class="muted">Le barre più basse evidenziano le fasce con meno prenotazioni registrate.</p></section><section class="panel"><div class="eyebrow">QUALITÀ AGENDA</div><h3>Cancellazioni & no-show</h3><div class="quality-ring"><strong>${a.length?Math.round((1-(cancel+noshow)/a.length)*100):100}%</strong><span>appuntamenti senza criticità</span></div><div class="quality-lines"><div><span>Cancellati/rifiutati</span><strong>${cancel}</strong></div><div><span>No-show</span><strong>${noshow}</strong></div></div></section><section class="panel"><div class="eyebrow">SERVIZI</div><h3>Valore per servizio</h3><div class="rank-list">${svc.slice(0,6).map((x,i)=>`<div><b>${i+1}</b><span>${escapeHtml(x.name)}<small>${x.count} visite</small></span><strong>${money(x.rev)}</strong></div>`).join("")||`<p class="muted">Servono appuntamenti completati per generare questa analisi.</p>`}</div></section><section class="panel"><div class="eyebrow">TEAM</div><h3>Attività per professionista</h3><div class="rank-list">${staff.slice(0,6).map((x,i)=>`<div><b>${i+1}</b><span>${escapeHtml(x.display_name)}<small>${x.count} appuntamenti · ${Math.round(x.mins/60)}h erogate</small></span><strong>${money(x.rev)}</strong></div>`).join("")||`<p class="muted">Nessun dato team nel periodo.</p>`}</div></section></div><section class="lookado-value"><div><div class="eyebrow">VALORE LOOKADO</div><h2>Il tuo LOOKADO sta lavorando con te.</h2><p>Indicatori calcolati dai dati operativi registrati nel periodo selezionato.</p></div><div class="value-metrics"><div><strong>${valid.length}</strong><span>prenotazioni gestite</span></div><div><strong>${money(revenue)}</strong><span>valore completato</span></div><div><strong>${newClients}</strong><span>nuovi clienti CRM</span></div><div><strong>${cancel+noshow}</strong><span>criticità tracciate</span></div></div></section>`}

function proMarketing(){setTimeout(loadGrowthPro,0);return `<div><div class="section-head"><div><div class="eyebrow">GROWTH CENTER</div><h1>Marketing</h1><p>LOOKADO trasforma agenda e CRM in azioni concrete per far tornare i clienti e riempire i buchi.</p></div><button class="btn primary" onclick="openCampaignComposer()">+ Crea campagna</button></div><div id="growthRoot"><div class="panel empty">Analizzo clienti e agenda…</div></div></div>`}
let growthData={clients:[],appointments:[],campaigns:[]};
async function loadGrowthPro(){const root=document.getElementById("growthRoot");if(!root)return;const [c,a,m]=await Promise.all([db.from("business_customers").select("*").eq("business_id",state.proBusinessId),db.from("appointments").select("*,service:services(name,price)").eq("business_id",state.proBusinessId).order("starts_at",{ascending:false}),db.from("marketing_campaigns").select("*").eq("business_id",state.proBusinessId).order("created_at",{ascending:false})]);if(c.error||a.error||m.error){root.innerHTML=`<div class="notice error">${escapeHtml((c.error||a.error||m.error).message)}</div>`;return}growthData={clients:c.data||[],appointments:a.data||[],campaigns:m.data||[]};renderGrowth()}
function growthSegments(){const now=new Date(),aps=growthData.appointments;return growthData.clients.map(c=>{const ca=aps.filter(a=>a.business_customer_id===c.id||((c.phone&&a.customer_phone===c.phone)||(c.email&&a.customer_email===c.email))),done=ca.filter(a=>a.status==="completed"),last=done[0]?.starts_at||c.created_at,days=(Date.now()-new Date(last))/86400000,spend=done.reduce((n,a)=>n+Number(a.service?.price||0),0),birthday=c.birthday?new Date(c.birthday+"T12:00"):null,bdaySoon=birthday&&Math.abs(new Date(now.getFullYear(),birthday.getMonth(),birthday.getDate())-now)/86400000<=30;return {...c,_done:done.length,_days:days,_spend:spend,_lost:done.length>0&&days>=60,_vip:spend>=500||done.length>=8,_birthday:bdaySoon,_new:ca.length<=1}})}
function renderGrowth(){const root=document.getElementById("growthRoot"),s=growthSegments(),lost=s.filter(x=>x._lost),vip=s.filter(x=>x._vip),birth=s.filter(x=>x._birthday),newc=s.filter(x=>x._new),next7=growthData.appointments.filter(a=>new Date(a.starts_at)>new Date()&&new Date(a.starts_at)<new Date(Date.now()+7*86400000)&&!["cancelled","rejected"].includes(a.status));root.innerHTML=`<div class="growth-hero"><div><div class="eyebrow">OPPORTUNITÀ QUESTA SETTIMANA</div><h2>${lost.length+birth.length} azioni suggerite da LOOKADO</h2><p>Non serve inviare messaggi a tutti. Parti dai clienti che hanno un motivo concreto per tornare.</p></div><div class="growth-score"><strong>${s.length?Math.round((s.length-lost.length)/s.length*100):100}</strong><span>retention health</span></div></div><div class="growth-segments"><button onclick="openSegment('lost')"><span class="seg-icon">↻</span><div><strong>${lost.length}</strong><h3>Clienti da recuperare</h3><p>Non tornano da almeno 60 giorni.</p></div><b>Crea recupero →</b></button><button onclick="openSegment('birthday')"><span class="seg-icon">✦</span><div><strong>${birth.length}</strong><h3>Compleanni vicini</h3><p>Occasione per un messaggio personale.</p></div><b>Prepara →</b></button><button onclick="openSegment('vip')"><span class="seg-icon">◆</span><div><strong>${vip.length}</strong><h3>Clienti VIP</h3><p>I clienti con maggior valore o frequenza.</p></div><b>Coinvolgi →</b></button><button onclick="openSegment('new')"><span class="seg-icon">＋</span><div><strong>${newc.length}</strong><h3>Nuovi clienti</h3><p>Trasforma la prima visita in abitudine.</p></div><b>Fidelizza →</b></button></div><div class="growth-grid"><section class="panel"><div class="panel-head"><div><div class="eyebrow">AGENDA</div><h3>Riempimento prossimi 7 giorni</h3></div><strong>${next7.length} prenotazioni</strong></div><p class="muted">LOOKADO userà disponibilità e CRM per suggerire in futuro campagne mirate sui buchi reali dell'agenda, senza scontare indiscriminatamente.</p><button class="btn ghost" onclick="location.hash='#/pro/agenda'">Apri Agenda</button></section><section class="panel"><div class="panel-head"><div><div class="eyebrow">CAMPAGNE</div><h3>Attività recente</h3></div></div>${growthData.campaigns.slice(0,4).map(x=>`<div class="campaign-row"><div><strong>${escapeHtml(x.name)}</strong><small>${escapeHtml(x.segment)} · ${x.audience_count} clienti</small></div><span class="campaign-status">${x.status==="draft"?"Bozza":x.status}</span></div>`).join("")||`<div class="empty-mini">Nessuna campagna creata.</div>`}</section></div><div class="growth-warning"><strong>Invio messaggi</strong><p>In questa versione LOOKADO prepara segmenti e campagne reali, ma non simula invii WhatsApp/SMS/email. I provider di messaggistica verranno collegati separatamente.</p></div>`}
function segmentRows(type){const s=growthSegments();return type==="lost"?s.filter(x=>x._lost):type==="birthday"?s.filter(x=>x._birthday):type==="vip"?s.filter(x=>x._vip):s.filter(x=>x._new)}
function segmentTitle(t){return {lost:"Clienti da recuperare",birthday:"Compleanni vicini",vip:"Clienti VIP",new:"Nuovi clienti"}[t]||"Segmento"}
function openSegment(type){const rows=segmentRows(type);openModal(segmentTitle(type),`<div class="segment-modal"><p>${rows.length} clienti nel segmento.</p><div class="segment-list">${rows.slice(0,30).map(c=>`<div><span class="crm-avatar">${escapeHtml(c.full_name.slice(0,1))}</span><div><strong>${escapeHtml(c.full_name)}</strong><small>${type==="lost"?`${Math.round(c._days)} giorni dall'ultima visita`:type==="vip"?`${money(c._spend)} registrati`:escapeHtml(c.phone||c.email||"")}</small></div></div>`).join("")||`<div class="empty-mini">Nessun cliente in questo segmento.</div>`}</div></div>`,`<button class="btn ghost" onclick="closeModal()">Chiudi</button>${rows.length?`<button class="btn primary" onclick="openCampaignComposer('${type}')">Crea campagna</button>`:""}`)}
function openCampaignComposer(type="lost"){const rows=segmentRows(type),templates={lost:"Ciao {{nome}}, è da un po' che non ci vediamo. Se vuoi, puoi controllare le prossime disponibilità su LOOKADO.",birthday:"Ciao {{nome}}, buon compleanno da parte nostra! Ti aspettiamo presto.",vip:"Ciao {{nome}}, grazie per essere uno dei nostri clienti più affezionati.",new:"Ciao {{nome}}, grazie per averci scelto. Quando vuoi prenotare di nuovo, ci trovi su LOOKADO."};openModal("Nuova campagna",`<form id="campaignForm" class="form-grid"><div class="field full"><label>Nome campagna</label><input name="name" value="${segmentTitle(type)} · ${new Date().toLocaleDateString("it-IT")}" required></div><div class="field"><label>Segmento</label><select name="segment" onchange="closeModal();openCampaignComposer(this.value)"><option value="lost" ${type==="lost"?"selected":""}>Da recuperare</option><option value="birthday" ${type==="birthday"?"selected":""}>Compleanni</option><option value="vip" ${type==="vip"?"selected":""}>VIP</option><option value="new" ${type==="new"?"selected":""}>Nuovi</option></select></div><div class="field"><label>Destinatari</label><input value="${rows.length} clienti" disabled></div><div class="field full"><label>Messaggio</label><textarea name="message" rows="6">${templates[type]}</textarea></div><input type="hidden" name="audience" value="${rows.length}"><input type="hidden" name="segment_fixed" value="${type}"></form><div class="notice">La campagna verrà salvata come bozza. Nessun messaggio sarà inviato finché non colleghiamo un canale di invio.</div>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveGrowthCampaign()">Salva bozza</button>`)}
async function saveGrowthCampaign(){const f=document.getElementById("campaignForm");if(!f.reportValidity())return;const fd=new FormData(f),{error}=await db.from("marketing_campaigns").insert({business_id:state.proBusinessId,name:fd.get("name"),segment:fd.get("segment_fixed"),channel:"manual",message:fd.get("message"),status:"draft",audience_count:Number(fd.get("audience")),created_by:authUser.id});if(error){toast(error.message);return}closeModal();toast("Campagna salvata come bozza");await loadGrowthPro()}

function proMembership(){setTimeout(loadPlanValue,0);return `<div><div class="section-head"><div><div class="eyebrow">PIANO LOOKADO</div><h1>Il tuo LOOKADO</h1><p>Non solo cosa include il piano: quanto lavoro sta gestendo per la tua attività.</p></div></div><div id="planValueRoot"><div class="panel empty">Calcolo valore LOOKADO…</div></div></div>`}
async function loadPlanValue(){const root=document.getElementById("planValueRoot");if(!root)return;const from=new Date();from.setDate(1);from.setHours(0,0,0,0);const [a,c,s,t]=await Promise.all([db.from("appointments").select("*,service:services(name,price,duration_minutes)").eq("business_id",state.proBusinessId).gte("starts_at",from.toISOString()),db.from("business_customers").select("id,created_at").eq("business_id",state.proBusinessId),db.from("services").select("id").eq("business_id",state.proBusinessId).eq("active",true),db.from("team_members").select("id").eq("business_id",state.proBusinessId).eq("active",true)]);if(a.error){root.innerHTML=`<div class="notice error">${escapeHtml(a.error.message)}</div>`;return}const rows=a.data||[],done=rows.filter(x=>x.status==="completed"),managed=rows.filter(x=>!["cancelled","rejected"].includes(x.status)),value=done.reduce((n,x)=>n+Number(x.service?.price||0),0),mins=managed.reduce((n,x)=>n+Number(x.service?.duration_minutes||0),0),newc=(c.data||[]).filter(x=>new Date(x.created_at)>=from).length,online=rows.filter(x=>x.source==="lookado").length,issues=rows.filter(x=>["cancelled","rejected","no_show"].includes(x.status)).length,current=(state.proBusiness?.membership_plan||"start").toLowerCase();renderPlanValue({managed:managed.length,value,mins,newc,online,issues,services:(s.data||[]).length,team:(t.data||[]).length,current})}
function renderPlanValue(v){const annual=window.planAnnual!==false,plans=[{id:"start",name:"Start",m:13,y:120,desc:"Per iniziare a gestire tutto in un solo posto.",features:["Agenda e prenotazioni online","Profilo pubblico LOOKADO","CRM clienti","Servizi e prezzi","1 professionista","Promemoria email","Statistiche essenziali"]},{id:"pro",name:"Pro",m:29,y:290,desc:"Per attività che vogliono crescere e lavorare con un team.",features:["Tutto di Start","Team fino a 5","Turni e disponibilità","CRM avanzato","Analytics PRO","Growth Center e segmenti","Waitlist e automazioni"],popular:true},{id:"business",name:"Business",m:49,y:490,desc:"Per strutture più organizzate e multi-team.",features:["Tutto di Pro","Team esteso","Multi-sede (in arrivo)","Ruoli e permessi avanzati","Report avanzati","Automazioni marketing avanzate","Supporto prioritario"]}];const cur=plans.find(x=>x.id===v.current)||plans[0];document.getElementById("planValueRoot").innerHTML=`<section class="value-command"><div><div class="eyebrow">QUESTO MESE</div><h2>Il tuo LOOKADO sta lavorando con te.</h2><p>Questi numeri vengono dai dati realmente registrati dalla tua attività.</p></div><div class="value-command-grid"><div><strong>${v.managed}</strong><span>prenotazioni gestite</span></div><div><strong>${Math.round(v.mins/60)}h</strong><span>di servizi organizzati</span></div><div><strong>${v.newc}</strong><span>nuovi clienti CRM</span></div><div><strong>${money(v.value)}</strong><span>valore completato</span></div></div></section><div class="plan-current"><div><span>Piano attuale</span><h3>LOOKADO ${cur.name}</h3><p>${cur.desc}</p></div><div><strong>${annual?money(cur.y)+"/anno":money(cur.m)+"/mese"}</strong><small>${annual&&cur.id==="start"?"equivale a €10/mese":annual?"pagamento annuale":"pagamento mensile"}</small></div></div><div class="plan-toggle"><button class="${!annual?"active":""}" onclick="window.planAnnual=false;renderPlanValue(${JSON.stringify(v).replace(/"/g,"&quot;")})">Mensile</button><button class="${annual?"active":""}" onclick="window.planAnnual=true;renderPlanValue(${JSON.stringify(v).replace(/"/g,"&quot;")})">Annuale <span>Risparmia</span></button></div><div class="pricing-grid">${plans.map(p=>`<article class="pricing-card ${p.popular?"popular":""} ${p.id===v.current?"current":""}">${p.popular?`<div class="popular-label">PIÙ SCELTO</div>`:""}${p.id===v.current?`<div class="current-label">IL TUO PIANO</div>`:""}<h3>${p.name}</h3><p>${p.desc}</p><div class="price"><strong>${annual?money(p.y):money(p.m)}</strong><span>/${annual?"anno":"mese"}</span></div>${annual?`<small class="monthly-equiv">${p.id==="start"?"€10,00":money(p.y/12)} / mese equivalente</small>`:""}<ul>${p.features.map(f=>`<li>✓ ${f}</li>`).join("")}</ul><button class="btn ${p.popular?"primary":"ghost"}" ${p.id===v.current?"disabled":""} onclick="selectLookadoPlan('${p.id}',${annual})">${p.id===v.current?"Piano attuale":"Scegli "+p.name}</button></article>`).join("")}</div><section class="addons"><div class="eyebrow">ADD-ON</div><h2>Potenzia LOOKADO quando ti serve.</h2><div class="addon-grid"><div><strong>AI Receptionist</strong><p>Risponde alle chiamate, raccoglie richieste e aiuta con le prenotazioni.</p><span>Prossimamente</span></div><div><strong>WhatsApp & SMS</strong><p>Promemoria e comunicazioni automatiche con i clienti.</p><span>Prossimamente</span></div><div><strong>No-show Protection</strong><p>Caparra e strumenti per ridurre appuntamenti persi.</p><span>Prossimamente</span></div></div></section><div class="plan-trust"><strong>0% di commissione sui tuoi clienti diretti.</strong><span>Se in futuro LOOKADO introdurrà un costo per nuovi clienti acquisiti dal marketplace, sarà separato e trasparente.</span></div>`}
function selectLookadoPlan(id,annual){const p={start:["Start",annual?120:13],pro:["Pro",annual?290:29],business:["Business",annual?490:49]}[id];openModal("Passa a LOOKADO "+p[0],`<div class="checkout-preview"><div class="success-ring">→</div><h2>${p[0]}</h2><p>Hai scelto il piano ${annual?"annuale":"mensile"}.</p><div class="confirm-card"><div><span>Totale</span><strong>${money(p[1])}${annual?"/anno":"/mese"}</strong></div></div><div class="notice">Il checkout non è ancora collegato. Non verrà effettuato alcun addebito.</div></div>`,`<button class="btn ghost" onclick="closeModal()">Chiudi</button><button class="btn primary" disabled>Pagamento in configurazione</button>`)}

function setBilling(mode){
  lookadoBilling=mode;
  document.getElementById("billMonthly")?.classList.toggle("active",mode==="monthly");
  document.getElementById("billAnnual")?.classList.toggle("active",mode==="annual");
  document.querySelectorAll("[data-monthly]").forEach(el=>{
    el.innerHTML=mode==="monthly"?`€${el.dataset.monthly}<small>/mese</small>`:`€${el.dataset.annualeq}<small>/mese</small>`;
  });
  document.querySelectorAll("[data-annual-note]").forEach(el=>el.textContent=mode==="annual"?`€${el.dataset.annualNote}/anno · fatturato annualmente`:"Fatturato mensilmente");
}
function planCard(id,name,sub,monthly,annualEq,annual,features,current,recommended=false){
  const active=current===id;
  return `<article class="price-card ${recommended?"recommended":""} ${active?"current":""}">
    ${recommended?`<div class="popular-label">PIÙ SCELTO</div>`:""}
    <div class="price-head"><div><div class="plan-name">${name}</div><p>${sub}</p></div>${active?`<span class="current-pill">Piano attuale</span>`:""}</div>
    <div class="price" data-monthly="${monthly}" data-annualeq="${annualEq}">€${monthly}<small>/mese</small></div>
    <div class="annual-note" data-annual-note data-annual-note="${annual}">Fatturato mensilmente</div>
    <button class="btn ${recommended?"primary":"dark"} full" ${active?"disabled":""} onclick="selectLookadoPlan('${id}')">${active?"Piano attuale":"Scegli "+name}</button>
    <div class="feature-list">${features.map(f=>`<span>✓ ${f}</span>`).join("")}</div>
  </article>`
}
function selectLookadoPlan(id){
  const labels={start:"LOOKADO Start",pro:"LOOKADO Pro",business:"LOOKADO Business"};
  const prices={start:{monthly:"€13/mese",annual:"€120/anno"},pro:{monthly:"€29/mese",annual:"€290/anno"},business:{monthly:"€49/mese",annual:"€490/anno"}};
  openModal("Passa a "+labels[id],`<div class="checkout-preview"><div class="checkout-plan"><span>${labels[id]}</span><strong>${prices[id][lookadoBilling]}</strong></div><p>${lookadoBilling==="annual"?"Pagamento annuale.":"Pagamento mensile."} Potrai gestire fatturazione e rinnovo dalla tua area.</p><div class="notice">Il checkout reale verrà collegato al provider di pagamento: non attiviamo un piano senza un pagamento effettivo.</div></div>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" disabled title="Pagamento da collegare">Pagamento in configurazione</button>`)
}
setTimeout(async()=>{const el=document.getElementById("planClientCount");if(el&&state.proBusinessId){const {count}=await db.from("business_customers").select("*",{count:"exact",head:true}).eq("business_id",state.proBusinessId);el.textContent=count??0}},0);

function changePlan(id){biz(state.proBusinessId).membership=id;save();toast("Membership aggiornata nella demo");render()}
function proBusiness(){setTimeout(loadBusinessProfilePro,0);return `<div><div class="section-head"><div><div class="eyebrow">LA MIA ATTIVITÀ</div><h1>Profilo & presenza su LOOKADO</h1><p>Gestisci ciò che vede il cliente e controlla il profilo prima di pubblicarlo.</p></div><button class="btn dark" onclick="openPublicBusinessPreview()">Anteprima pubblica</button></div><div id="businessProfileRoot"><div class="panel empty">Caricamento attività…</div></div></div>`}
let businessProfileData={business:null,services:[],team:[],photos:[]};
async function loadBusinessProfilePro(){const root=document.getElementById("businessProfileRoot");if(!root)return;const [b,s,t,p]=await Promise.all([db.from("businesses").select("*").eq("id",state.proBusinessId).single(),db.from("services").select("*").eq("business_id",state.proBusinessId).order("name"),db.from("team_members").select("*").eq("business_id",state.proBusinessId).order("display_name"),db.from("business_photos").select("*").eq("business_id",state.proBusinessId).order("sort_order")]);if(b.error){root.innerHTML=`<div class="notice error">${escapeHtml(b.error.message)}</div>`;return}businessProfileData={business:b.data,services:s.data||[],team:t.data||[],photos:p.data||[]};renderBusinessProfile()}
function profileCompletion(){const b=businessProfileData.business,s=businessProfileData.services,t=businessProfileData.team,p=businessProfileData.photos;const checks=[b.name,b.description,b.phone,b.address,b.city,b.instagram_url||b.website_url,b.google_maps_url,s.length,t.length,p.length];return Math.round(checks.filter(Boolean).length/checks.length*100)}
function renderBusinessProfile(){const root=document.getElementById("businessProfileRoot"),b=businessProfileData.business,pc=profileCompletion();root.innerHTML=`<div class="business-command"><div class="profile-health"><div class="completion-ring" style="--pc:${pc*3.6}deg"><div><strong>${pc}%</strong><span>completo</span></div></div><div><div class="eyebrow">PROFILO PUBBLICO</div><h2>${escapeHtml(b.name)}</h2><p>${pc<80?"Completa il profilo per presentarti meglio ai nuovi clienti.":"Il profilo è pronto per essere scoperto su LOOKADO."}</p></div></div><button class="btn primary" onclick="openPublicBusinessPreview()">Vedi come mi vedono i clienti</button></div><div class="business-settings-grid"><section class="panel"><div class="panel-head"><div><div class="eyebrow">IDENTITÀ</div><h3>Informazioni attività</h3></div><button class="btn ghost small" onclick="editBusinessIdentity()">Modifica</button></div><div class="business-data"><div><span>Categoria</span><strong>${escapeHtml(b.category||"Da impostare")}</strong></div><div><span>Telefono</span><strong>${escapeHtml(b.phone||"Da aggiungere")}</strong></div><div><span>Indirizzo</span><strong>${escapeHtml([b.address,b.city].filter(Boolean).join(", ")||"Da aggiungere")}</strong></div><div><span>Timezone</span><strong>${escapeHtml(b.timezone||"Europe/Rome")}</strong></div></div></section><section class="panel"><div class="panel-head"><div><div class="eyebrow">PRESENZA ONLINE</div><h3>Social & contatti</h3></div><button class="btn ghost small" onclick="editBusinessOnline()">Modifica</button></div><div class="business-links">${businessLink("Instagram",b.instagram_url)}${businessLink("Facebook",b.facebook_url)}${businessLink("TikTok",b.tiktok_url)}${businessLink("Sito web",b.website_url)}${businessLink("Google Maps",b.google_maps_url)}</div></section><section class="panel"><div class="panel-head"><div><div class="eyebrow">GALLERIA</div><h3>Foto del profilo</h3></div><button class="btn ghost small" onclick="addBusinessPhoto()">+ Foto</button></div><div class="photo-manager">${businessProfileData.photos.map((x,i)=>`<div class="${i===0?"cover-photo":""}"><img src="${escapeHtml(x.url||"")}" alt="${escapeHtml(x.caption||"")}"><div class="photo-actions">${i===0?`<span>Copertina</span>`:`<button title="Imposta come copertina" onclick="setBusinessCover('${x.id}')">★</button>`}<button title="Rimuovi" onclick="deleteBusinessPhoto('${x.id}')">×</button></div></div>`).join("")||`<div class="empty-mini">Aggiungi foto reali dell'attività, lavori e ambiente.</div>`}</div></section><section class="panel"><div class="panel-head"><div><div class="eyebrow">PRENOTAZIONI</div><h3>Regole</h3></div><button class="btn ghost small" onclick="editBookingRules()">Modifica</button></div><div class="business-data"><div><span>Preavviso minimo</span><strong>${b.booking_notice_minutes||60} min</strong></div><div><span>Cancellazione</span><strong>fino a ${b.cancellation_notice_hours||24}h prima</strong></div><div><span>Servizi online</span><strong>${businessProfileData.services.filter(x=>x.online_booking!==false&&x.active).length}</strong></div><div><span>Professionisti attivi</span><strong>${businessProfileData.team.filter(x=>x.active).length}</strong></div></div></section></div><section class="profile-checklist panel"><div><div class="eyebrow">CHECKLIST CRESCITA</div><h3>Un profilo completo converte meglio.</h3></div><div class="checklist-grid">${profileCheck("Descrizione",!!b.description)}${profileCheck("Indirizzo",!!b.address)}${profileCheck("Google Maps",!!b.google_maps_url)}${profileCheck("Foto",businessProfileData.photos.length>0)}${profileCheck("Servizi",businessProfileData.services.length>0)}${profileCheck("Team",businessProfileData.team.length>0)}</div></section>`}
function businessLink(label,url){return `<div><span>${label}</span><strong>${url?escapeHtml(url.replace(/^https?:\/\//,"").slice(0,35)):"Non collegato"}</strong></div>`}
function profileCheck(label,ok){return `<div class="${ok?"done":""}"><b>${ok?"✓":"○"}</b><span>${label}</span></div>`}
function editBusinessIdentity(){const b=businessProfileData.business;openModal("Informazioni attività",`<form id="bizIdentityForm" class="form-grid"><div class="field full"><label>Nome attività</label><input name="name" value="${escapeHtml(b.name||"")}" required></div><div class="field"><label>Categoria</label><input name="category" value="${escapeHtml(b.category||"")}"></div><div class="field"><label>Telefono</label><input name="phone" value="${escapeHtml(b.phone||"")}"></div><div class="field"><label>Città</label><input name="city" value="${escapeHtml(b.city||"")}"></div><div class="field"><label>Indirizzo</label><input name="address" value="${escapeHtml(b.address||"")}"></div><div class="field full"><label>Descrizione</label><textarea name="description" rows="5">${escapeHtml(b.description||"")}</textarea></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveBusinessIdentity()">Salva</button>`)}
async function saveBusinessIdentity(){const f=document.getElementById("bizIdentityForm");if(!f.reportValidity())return;const fd=new FormData(f),payload=Object.fromEntries(["name","category","phone","city","address","description"].map(k=>[k,fd.get(k)||null]));const {error}=await db.from("businesses").update(payload).eq("id",state.proBusinessId);if(error){toast(error.message);return}closeModal();await loadBusinessProfilePro();toast("Profilo aggiornato")}
function editBusinessOnline(){const b=businessProfileData.business;openModal("Presenza online",`<form id="bizOnlineForm" class="form-grid">${["instagram_url","facebook_url","tiktok_url","website_url","google_maps_url"].map(k=>`<div class="field full"><label>${({instagram_url:"Instagram",facebook_url:"Facebook",tiktok_url:"TikTok",website_url:"Sito web",google_maps_url:"Google Maps"}[k])}</label><input name="${k}" value="${escapeHtml(b[k]||"")}" placeholder="https://…"></div>`).join("")}</form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveBusinessOnline()">Salva</button>`)}
async function saveBusinessOnline(){const fd=new FormData(document.getElementById("bizOnlineForm")),payload={};["instagram_url","facebook_url","tiktok_url","website_url","google_maps_url"].forEach(k=>payload[k]=fd.get(k)||null);const {error}=await db.from("businesses").update(payload).eq("id",state.proBusinessId);if(error){toast(error.message);return}closeModal();await loadBusinessProfilePro();toast("Collegamenti aggiornati")}
function editBookingRules(){const b=businessProfileData.business;openModal("Regole di prenotazione",`<form id="bookingRulesForm" class="form-grid"><div class="field"><label>Preavviso minimo (minuti)</label><input type="number" min="0" name="booking_notice_minutes" value="${b.booking_notice_minutes||60}"></div><div class="field"><label>Cancellazione fino a (ore prima)</label><input type="number" min="0" name="cancellation_notice_hours" value="${b.cancellation_notice_hours||24}"></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveBookingRules()">Salva</button>`)}
async function saveBookingRules(){const fd=new FormData(document.getElementById("bookingRulesForm"));const {error}=await db.from("businesses").update({booking_notice_minutes:Number(fd.get("booking_notice_minutes")),cancellation_notice_hours:Number(fd.get("cancellation_notice_hours"))}).eq("id",state.proBusinessId);if(error){toast(error.message);return}closeModal();await loadBusinessProfilePro();toast("Regole aggiornate")}
function addBusinessPhoto(){openModal("Carica foto",`<form id="photoUploadForm" class="form-grid"><div class="photo-drop" onclick="document.getElementById('businessPhotoFile').click()"><div class="upload-icon">↑</div><strong>Scegli una foto dal dispositivo</strong><span>JPG, PNG o WebP · massimo 8 MB</span><input id="businessPhotoFile" type="file" accept="image/jpeg,image/png,image/webp" hidden onchange="previewBusinessPhoto(this)"></div><div id="businessPhotoPreview"></div><div class="field full"><label>Didascalia</label><input name="caption" maxlength="120" placeholder="Es. Il nostro salone, balayage, nail art…"></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button id="uploadPhotoBtn" class="btn primary" onclick="uploadBusinessPhoto()">Carica foto</button>`)}
function previewBusinessPhoto(input){const f=input.files?.[0],el=document.getElementById("businessPhotoPreview");if(!f||!el)return;if(f.size>8*1024*1024){input.value="";el.innerHTML=`<div class="notice error">La foto supera 8 MB.</div>`;return}const url=URL.createObjectURL(f);el.innerHTML=`<div class="local-photo-preview"><img src="${url}" alt=""><div><strong>${escapeHtml(f.name)}</strong><small>${(f.size/1024/1024).toFixed(1)} MB</small></div></div>`}
async function uploadBusinessPhoto(){const input=document.getElementById("businessPhotoFile"),f=input?.files?.[0];if(!f){toast("Scegli prima una foto.");return}if(!["image/jpeg","image/png","image/webp"].includes(f.type)||f.size>8*1024*1024){toast("Formato o dimensione non consentiti.");return}const btn=document.getElementById("uploadPhotoBtn");btn.disabled=true;btn.textContent="Caricamento…";const ext=(f.name.split(".").pop()||"jpg").toLowerCase(),path=`${state.proBusinessId}/${Date.now()}-${crypto.randomUUID()}.${ext}`;const {error:upErr}=await db.storage.from("business-media").upload(path,f,{cacheControl:"3600",upsert:false,contentType:f.type});if(upErr){btn.disabled=false;btn.textContent="Carica foto";toast(upErr.message);return}const {data:pub}=db.storage.from("business-media").getPublicUrl(path),caption=new FormData(document.getElementById("photoUploadForm")).get("caption")||null;const {error:dbErr}=await db.from("business_photos").insert({business_id:state.proBusinessId,url:pub.publicUrl,caption,sort_order:businessProfileData.photos.length});if(dbErr){await db.storage.from("business-media").remove([path]);btn.disabled=false;btn.textContent="Carica foto";toast(dbErr.message);return}closeModal();await loadBusinessProfilePro();toast("Foto caricata")}
function storagePathFromPublicUrl(url){const marker="/storage/v1/object/public/business-media/";if(!url||!url.includes(marker))return null;return decodeURIComponent(url.split(marker)[1])}
async function deleteBusinessPhoto(id){if(!confirm("Rimuovere questa foto?"))return;const ph=businessProfileData.photos.find(x=>x.id===id),path=storagePathFromPublicUrl(ph?.url);const {error}=await db.from("business_photos").delete().eq("id",id);if(error){toast(error.message);return}if(path)await db.storage.from("business-media").remove([path]);await loadBusinessProfilePro();toast("Foto rimossa")}
async function setBusinessCover(id){const ph=businessProfileData.photos.find(x=>x.id===id);if(!ph)return;const others=businessProfileData.photos.filter(x=>x.id!==id).sort((a,b)=>a.sort_order-b.sort_order);const updates=[db.from("business_photos").update({sort_order:0}).eq("id",id),...others.map((x,i)=>db.from("business_photos").update({sort_order:i+1}).eq("id",x.id))];await Promise.all(updates);await loadBusinessProfilePro();toast("Copertina aggiornata")}

function openPublicBusinessPreview(){const b=businessProfileData.business,s=businessProfileData.services.filter(x=>x.active),t=businessProfileData.team.filter(x=>x.active),ph=businessProfileData.photos;openModal("Anteprima profilo pubblico",`<div class="public-preview"><div class="preview-cover">${ph[0]?`<img src="${escapeHtml(ph[0].url||ph[0].photo_url||"")}" alt="">`:`<div class="preview-placeholder">LOOKADO</div>`}</div><div class="preview-body"><div class="eyebrow">${escapeHtml(b.category||"BEAUTY & WELLNESS")}</div><h1>${escapeHtml(b.name)}</h1><p class="preview-location">${escapeHtml([b.address,b.city].filter(Boolean).join(" · "))}</p><p>${escapeHtml(b.description||"Aggiungi una descrizione per raccontare la tua attività.")}</p><h3>Servizi</h3><div class="preview-services">${s.slice(0,8).map(x=>`<div><span><strong>${escapeHtml(x.name)}</strong><small>${x.duration_minutes} min</small></span><b>${money(Number(x.price||0))}</b></div>`).join("")||"<p>Nessun servizio pubblicato.</p>"}</div><h3>Team</h3><div class="preview-team">${t.map(x=>`<div><span>${escapeHtml(x.display_name.slice(0,1))}</span><strong>${escapeHtml(x.display_name)}</strong><small>${escapeHtml(x.role_title||"Professionista")}</small></div>`).join("")||"<p>Team da configurare.</p>"}</div><button class="btn primary preview-book" disabled>Prenota ora</button><small class="preview-note">Questa è un'anteprima: il pulsante è disattivato.</small></div></div>`,`<button class="btn dark" onclick="closeModal()">Chiudi anteprima</button>`)}

function profileTask(label,done,sub,action){return `<button class="task-row ${done?"done":""}" onclick="${action}"><span>${done?"✓":"○"}</span><span><strong>${label}</strong><small>${done?"Completato":sub}</small></span><em>${done?"":"Completa →"}</em></button>`}
function openPublicPreview(){
 const x=window._lookadoHub;if(!x){toast("Caricamento profilo…");return} const b=x.business;
 openModal("Anteprima profilo pubblico",`<div class="public-preview">
  <div class="public-gallery">${x.photos.length?x.photos.slice(0,3).map((p,i)=>`<img class="${i===0?"main":""}" src="${escapeHtml(p.url)}">`).join(""):`<div class="preview-placeholder">Le foto della tua attività appariranno qui</div>`}</div>
  <div class="public-title"><div><div class="eyebrow">${escapeHtml((b.categories||[]).join(" · "))}</div><h2>${escapeHtml(b.name)}</h2><p>${escapeHtml([b.address,b.city].filter(Boolean).join(", "))}</p></div><div class="rating-box">★ Nuovo su LOOKADO</div></div>
  <p>${escapeHtml(b.description||"Aggiungi una descrizione per raccontare ai clienti la tua attività.")}</p>
  <div class="public-section"><h3>Servizi</h3>${x.services.length?x.services.map(s=>`<div class="service-preview"><span><strong>${escapeHtml(s.name)}</strong><small>${s.duration_minutes} min</small></span><b>${money(Number(s.price))}</b></div>`).join(""):`<div class="empty">Nessun servizio ancora.</div>`}</div>
  <div class="public-section"><h3>Scegli il professionista</h3><div class="staff-preview"><span class="staff-pill active">★ Indifferente · primo disponibile</span>${x.team.map(t=>`<span class="staff-pill">${escapeHtml(t.display_name)}</span>`).join("")}</div></div>
  <div class="public-cta"><button class="btn primary">Vedi disponibilità e prenota</button>${b.google_maps_url?`<button class="btn ghost">Indicazioni</button>`:""}</div>
 </div>`,`<button class="btn ghost" onclick="closeModal()">Chiudi anteprima</button>`)
}
function openPhotoManager(){
 const x=window._lookadoHub||{photos:[]};
 openModal("Foto e gallery",`<p>Inserisci per ora il link di una foto pubblica. Nel prossimo passaggio abilitiamo l'upload diretto dal telefono.</p><form id="photoForm" class="form-grid"><div class="field full"><label>URL foto</label><input name="url" type="url" required placeholder="https://..."></div><div class="field full"><label>Didascalia</label><input name="caption" placeholder="Es. Interno del salone"></div></form><div class="gallery-admin">${x.photos.map(p=>`<img src="${escapeHtml(p.url)}">`).join("")}</div>`,`<button class="btn ghost" onclick="closeModal()">Chiudi</button><button class="btn primary" onclick="saveBusinessPhoto()">Aggiungi foto</button>`)
}
async function saveBusinessPhoto(){const f=document.getElementById("photoForm");if(!f.reportValidity())return;const fd=new FormData(f);const {error}=await db.from("business_photos").insert({business_id:state.proBusinessId,url:fd.get("url"),caption:fd.get("caption")||null});if(error){toast(error.message);return}closeModal();await loadBusinessHub();toast("Foto aggiunta")}
function openSocialManager(){
 const b=(window._lookadoHub?.business)||currentRealBusiness()||{};
 openModal("Social e web",`<form id="socialForm" class="form-grid"><div class="field"><label>Instagram</label><input name="instagram_url" value="${escapeHtml(b.instagram_url||"")}"></div><div class="field"><label>Facebook</label><input name="facebook_url" value="${escapeHtml(b.facebook_url||"")}"></div><div class="field"><label>TikTok</label><input name="tiktok_url" value="${escapeHtml(b.tiktok_url||"")}"></div><div class="field"><label>Sito web</label><input name="website_url" value="${escapeHtml(b.website_url||"")}"></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveSocials()">Salva</button>`)
}
async function saveSocials(){const fd=new FormData(document.getElementById("socialForm"));const o=Object.fromEntries(fd.entries());const {error}=await db.from("businesses").update(o).eq("id",state.proBusinessId);if(error){toast(error.message);return}closeModal();await loadAccountContext();await loadBusinessHub();toast("Social aggiornati")}
function openMapManager(){
 const b=(window._lookadoHub?.business)||currentRealBusiness()||{};
 openModal("Posizione e mappa",`<form id="mapForm" class="form-grid"><div class="field"><label>Città</label><input name="city" value="${escapeHtml(b.city||"")}"></div><div class="field"><label>Indirizzo</label><input name="address" value="${escapeHtml(b.address||"")}"></div><div class="field full"><label>Link Google Maps</label><input name="google_maps_url" value="${escapeHtml(b.google_maps_url||"")}" placeholder="https://maps.google.com/..."></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveMap()">Salva</button>`)
}
async function saveMap(){const fd=new FormData(document.getElementById("mapForm"));const {error}=await db.from("businesses").update(Object.fromEntries(fd.entries())).eq("id",state.proBusinessId);if(error){toast(error.message);return}closeModal();await loadAccountContext();await loadBusinessHub();toast("Posizione aggiornata")}
function googleCalendarInfo(){openModal("Google Calendar",`<div class="integration-explain"><h3>Sincronizzazione calendario</h3><p>LOOKADO userà gli impegni del calendario per evitare sovrapposizioni e potrà aggiungere le nuove prenotazioni al calendario scelto.</p><div class="notice">Il collegamento OAuth Google è la prossima integrazione tecnica: il pulsante non simula una connessione che non esiste.</div></div>`,`<button class="btn primary" onclick="closeModal()">Ho capito</button>`)}
function agendaImportInfo(){openModal("Importa la tua agenda",`<h3>Non devi ricominciare da zero.</h3><p>Il flusso previsto importa clienti e appuntamenti da CSV/Excel, mostra un'anteprima e ti fa confermare prima di salvare.</p><div class="notice">Importazione file in preparazione.</div>`,`<button class="btn primary" onclick="closeModal()">Chiudi</button>`)}
function proSettings(){
  const m=myBusinesses.find(x=>x.business_id===state.proBusinessId)||myBusinesses[0];
  const b=m?.business||{};
  return `<div class="panel-head"><div><div class="eyebrow">Impostazioni</div><h2>Profilo attività</h2><p>Modifica i dati reali mostrati su LOOKADO.</p></div><button class="btn primary small" onclick="openBusinessEdit()">Modifica attività</button></div>
  <div class="grid" style="grid-template-columns:1fr 1fr;gap:16px">
    <div class="panel"><h3>Dati pubblici</h3><div class="summary-row"><span>Nome</span><strong>${escapeHtml(b.name||"—")}</strong></div><div class="summary-row"><span>Città</span><strong>${escapeHtml(b.city||"—")}</strong></div><div class="summary-row"><span>Indirizzo</span><strong>${escapeHtml(b.address||"—")}</strong></div><div class="summary-row"><span>Piano</span><strong>${escapeHtml(b.membership_plan||"start")}</strong></div></div>
    <div class="panel"><h3>Le tue attività</h3>${myBusinesses.map(x=>`<div class="summary-row"><span>${escapeHtml(x.business?.name||"Attività")}</span><button class="btn ${x.business_id===state.proBusinessId?"secondary":"ghost"} small" onclick="switchBusiness('${x.business_id}')">${x.business_id===state.proBusinessId?"Attiva":"Apri"}</button></div>`).join("")}<button class="btn dark small" style="margin-top:15px" onclick="location.hash='#/create-business'">+ Nuova attività</button></div>
    <div class="panel"><h3>Integrazioni</h3><p>Google Calendar, email, WhatsApp Business e pagamenti saranno collegabili da questa sezione.</p><button class="btn ghost small" onclick="toast('Integrazioni in configurazione')">Configura</button></div>
  </div>`
}
function switchBusiness(id){state.proBusinessId=id;save();render();toast("Attività selezionata")}
function openBusinessEdit(){
  const m=myBusinesses.find(x=>x.business_id===state.proBusinessId),b=m?.business||{};
  openModal("Modifica attività",`<form id="businessEditForm" class="form-grid">
  <div class="field full"><label>Nome attività</label><input name="name" value="${escapeHtml(b.name||"")}" required></div>
  <div class="field"><label>Città</label><input name="city" value="${escapeHtml(b.city||"")}"></div>
  <div class="field"><label>Indirizzo</label><input name="address" value="${escapeHtml(b.address||"")}"></div>
  </form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveBusinessEdit()">Salva</button>`)
}
async function saveBusinessEdit(){
 const f=document.getElementById("businessEditForm");if(!f.reportValidity())return;const fd=new FormData(f);
 const {error}=await db.from("businesses").update({name:fd.get("name"),city:fd.get("city"),address:fd.get("address"),updated_at:new Date().toISOString()}).eq("id",state.proBusinessId);
 if(error){toast(error.message);return} await loadAccountContext();closeModal();render();toast("Attività aggiornata")
}
function openManualAppointment(){
  const services=state.services.filter(s=>s.businessId===state.proBusinessId);
  openModal("Nuovo appuntamento",`<form id="manualForm" class="form-grid"><div class="field full"><label>Cliente</label><input name="name" required></div><div class="field"><label>Telefono</label><input name="phone" required></div><div class="field"><label>Email</label><input type="email" name="email" required></div><div class="field full"><label>Servizio</label><select id="manualService" name="serviceId" onchange="refreshManualTeam()">${services.map(s=>`<option value="${s.id}">${s.name}</option>`).join("")}</select></div><div class="field"><label>Professionista</label><select id="manualTeam" name="teamId"></select></div><div class="field"><label>Data</label><input type="date" name="date" value="${TODAY()}" required></div><div class="field"><label>Ora</label><input type="time" name="time" step="1800" required></div><div class="field"><label>Stato</label><select name="status"><option value="confirmed">Confermato</option><option value="pending">In attesa</option></select></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveManualAppointment()">Salva</button>`);refreshManualTeam()
}
function refreshManualTeam(){const sid=document.getElementById("manualService")?.value;if(!sid)return;const s=svc(sid);document.getElementById("manualTeam").innerHTML=state.team.filter(t=>s.team.includes(t.id)).map(t=>`<option value="${t.id}">${t.name}</option>`).join("")}
function saveManualAppointment(){const f=document.getElementById("manualForm");if(!f.reportValidity())return;const fd=new FormData(f);state.appointments.push({id:crypto.randomUUID(),businessId:state.proBusinessId,serviceId:fd.get("serviceId"),teamId:fd.get("teamId"),date:fd.get("date"),time:fd.get("time"),status:fd.get("status"),customer:{name:fd.get("name"),phone:fd.get("phone"),email:fd.get("email")},source:"manual"});save();closeModal();toast("Appuntamento creato");render()}
function openServiceForm(){
  const people=state.team.filter(t=>t.businessId===state.proBusinessId);
  openModal("Nuovo servizio",`<form id="serviceForm" class="form-grid"><div class="field full"><label>Nome</label><input name="name" required></div><div class="field"><label>Categoria</label><select name="category"><option>Hair</option><option>Barber</option><option>Nails</option><option>Beauty</option><option>Wellness</option></select></div><div class="field"><label>Durata</label><input type="number" name="duration" value="30" step="5" min="15" required></div><div class="field"><label>Prezzo</label><input type="number" name="price" step="0.5" min="0" required></div><div class="field"><label>Professionista</label><select name="teamId">${people.map(t=>`<option value="${t.id}">${t.name}</option>`).join("")}</select></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveService()">Salva</button>`)
}
function saveService(){const f=document.getElementById("serviceForm");if(!f.reportValidity())return;const fd=new FormData(f);state.services.push({id:"s"+crypto.randomUUID(),businessId:state.proBusinessId,name:fd.get("name"),category:fd.get("category"),duration:Number(fd.get("duration")),price:Number(fd.get("price")),team:[fd.get("teamId")]});save();closeModal();render();toast("Servizio creato")}
function openTeamForm(){
  openModal("Nuovo membro",`<form id="teamForm" class="form-grid"><div class="field full"><label>Nome</label><input name="name" required></div><div class="field full"><label>Ruolo</label><input name="role" required placeholder="Hair stylist, Barber..."></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveTeam()">Salva</button>`)
}
function saveTeam(){const f=document.getElementById("teamForm");if(!f.reportValidity())return;const fd=new FormData(f);state.team.push({id:"t"+crypto.randomUUID(),businessId:state.proBusinessId,name:fd.get("name"),role:fd.get("role")});save();closeModal();render();toast("Membro aggiunto")}
function openModal(title,body,actions=""){const el=document.createElement("div");el.id="modal";el.className="modal-bg";el.innerHTML=`<div class="modal"><div class="panel-head"><h3>${title}</h3><button class="btn ghost small" onclick="closeModal()">✕</button></div>${body}<div class="modal-actions">${actions}</div></div>`;el.addEventListener("click",e=>{if(e.target===el)closeModal()});document.body.appendChild(el)}
function closeModal(){document.getElementById("modal")?.remove()}
function resetDemo(){if(!confirm("Ripristinare tutti i dati demo?"))return;localStorage.removeItem(KEY);location.reload()}



// =========================================================
// LOOKADO REAL AUTH — Supabase
// =========================================================
const SUPABASE_URL="https://jmbkpjhmsqdurftxpjvx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_Nm3Wjx7HGdPPeySlMatAWw_MpeHotsX";
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);

let authUser=null;
let authProfile=null;
let myBusinesses=[];
let authReady=false;

async function bootLookado(){
  // The interface must always render, even if Auth/network is slow or unavailable.
  authReady=true;
  if(!location.hash) location.hash="#/home";
  render();
  try{
    const sessionPromise=db.auth.getSession();
    const timeout=new Promise((_,reject)=>setTimeout(()=>reject(new Error("timeout")),8000));
    const result=await Promise.race([sessionPromise,timeout]);
    authUser=result?.data?.session?.user||null;
    if(authUser){ try{ await loadAccountContext(); }catch(e){ console.error("LOOKADO context",e); } }
    updateAccountHeader(); render();
  }catch(e){
    console.error("LOOKADO auth boot",e);
    authUser=null; updateAccountHeader(); render();
    showStartupWarning();
  }
  db.auth.onAuthStateChange((_event,session)=>{
    // Do not await network/database work inside the auth callback.
    authUser=session?.user||null; authProfile=null; myBusinesses=[];
    updateAccountHeader(); render();
    if(authUser) setTimeout(async()=>{try{await loadAccountContext();updateAccountHeader();render()}catch(e){console.error(e)}},0);
  });
}
function showStartupWarning(){
  if(document.getElementById("startupWarning"))return;
  const d=document.createElement("div");d.id="startupWarning";d.className="startup-warning";
  d.innerHTML=`<span>Connessione account temporaneamente lenta.</span><button onclick="location.reload()">Riprova</button>`;
  document.body.appendChild(d);
}

async function loadAccountContext(){
  try{
    await db.rpc("accept_my_invites");
    const {data:p}=await db.from("profiles").select("id,full_name,phone,avatar_url,locale").eq("id",authUser.id).maybeSingle();
    authProfile=p||{id:authUser.id,full_name:authUser.user_metadata?.full_name||"",phone:authUser.user_metadata?.phone||""};
    state.user={name:authProfile.full_name||authUser.email,email:authUser.email||"",phone:authProfile.phone||""};
    const {data:m,error}=await db.from("business_members").select("role,status,business_id,business:businesses(id,name,slug,membership_plan,city,address)").eq("user_id",authUser.id).eq("status","active");
    if(error) throw error;
    myBusinesses=m||[];
    if(myBusinesses.length) state.proBusinessId=myBusinesses[0].business_id;
    save();
  }catch(e){console.error("LOOKADO context",e)}
}

function updateAccountHeader(){
  const actions=document.querySelector(".top-actions");
  if(!actions)return;
  let menu=document.getElementById("accountMenu");
  if(menu) menu.remove();
  const wrap=document.createElement("div"); wrap.id="accountMenu"; wrap.className="account-menu";
  if(authUser){
    const label=(authProfile?.full_name||authUser.email||"Account").split(" ")[0];
    wrap.innerHTML=`<button class="btn ghost small account-trigger" onclick="toggleAccountPopover()">${escapeHtml(label)} ▾</button>
      <div id="accountPopover" class="account-popover hidden">
        <a href="#/profile">Area cliente</a>
        <button onclick="handleProButton()">LOOKADO Pro</button>
        <a href="#/create-business">${myBusinesses.length?"+ Nuova attività":"Crea attività"}</a>
        <button onclick="logoutLookado()">Esci</button>
      </div>`;
  }else{
    wrap.innerHTML=`<button class="btn ghost small" onclick="location.hash='#/auth'">Accedi</button>`;
  }
  actions.insertBefore(wrap, document.getElementById("modeBtn") || actions.firstChild);
}
function toggleAccountPopover(){document.getElementById("accountPopover")?.classList.toggle("hidden")}
function escapeHtml(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}

function render(){
  if(!authReady){app.innerHTML=`<div class="shell"><div class="panel empty">Caricamento LOOKADO…</div></div>`;return}
  const hash=(location.hash||"#/home").replace(/^#\//,"");
  const parts=hash.split("/");
  const isPro=parts[0]==="pro";
  const view=isPro?(parts[1]||"dashboard"):(parts[0]||"home");

  if(!isPro && ["auth","reset","create-business"].includes(view)){
    document.getElementById("mobileNav").style.display="none";
    if(view==="auth") app.innerHTML=authView();
    if(view==="reset") app.innerHTML=resetView();
    if(view==="create-business") app.innerHTML=createBusinessView();
    return;
  }
  if(!isPro && ["bookings","favorites","profile"].includes(view) && !authUser){
    location.hash="#/auth"; return;
  }
  if(!isPro && view==="book" && !authUser){
    sessionStorage.setItem("lookado_after_auth",location.hash);
    location.hash="#/auth"; return;
  }
  if(isPro && !authUser){location.hash="#/auth";return}
  if(isPro && !myBusinesses.length){
    app.innerHTML=proGateView();
    document.getElementById("mobileNav").style.display="none";
    return;
  }
  renderLegacy();
}

function authView(){
  if(authUser){location.hash="#/profile";return ""}
  return `<div class="auth-shell"><div class="auth-layout">
    <section class="auth-brand"><div class="eyebrow" style="color:#72D8CF">LOOKADO</div><h1 style="font-size:54px">Il tuo look, il tuo tempo.</h1><p>Scopri professionisti, prenota e gestisci tutto da un unico account.</p></section>
    <section class="auth-card">
      <div class="auth-tabs"><button id="loginTab" class="active" onclick="switchAuthTab('login')">Accedi</button><button id="signupTab" onclick="switchAuthTab('signup')">Registrati</button></div>
      <div id="authMessage"></div>
      <form id="loginForm" class="form-grid" onsubmit="loginLookado(event)">
        <div class="field full"><label>Email</label><input name="email" type="email" autocomplete="email" required></div>
        <div class="field full"><label>Password</label><input name="password" type="password" autocomplete="current-password" minlength="6" required></div>
        <div class="field full"><button class="btn primary" type="submit">Accedi</button></div>
        <div class="field full" style="text-align:center"><button class="btn ghost small" type="button" onclick="location.hash='#/reset'">Password dimenticata?</button></div>
      </form>
      <form id="signupForm" class="form-grid hidden" onsubmit="signupLookado(event)">
        <div class="field full"><label>Come vuoi usare LOOKADO?</label><div class="onboarding-choice"><label class="choice-card"><input type="radio" name="account_goal" value="customer" checked style="width:auto"> <strong>Cerco un professionista</strong><div class="meta">Prenota servizi e gestisci i tuoi appuntamenti.</div></label><label class="choice-card"><input type="radio" name="account_goal" value="business" style="width:auto"> <strong>Ho un’attività</strong><div class="meta">Crea il profilo e usa LOOKADO Pro.</div></label></div></div>
        <div class="field full"><label>Nome e cognome</label><input name="full_name" autocomplete="name" required></div>
        <div class="field"><label>Telefono</label><input name="phone" autocomplete="tel" required></div>
        <div class="field"><label>Email</label><input name="email" type="email" autocomplete="email" required></div>
        <div class="field full"><label>Password</label><input name="password" type="password" autocomplete="new-password" minlength="8" required></div>
        <div class="field full"><label style="display:flex;gap:8px;font-weight:500"><input type="checkbox" required style="width:auto"> Accetto termini e privacy.</label></div>
        <div class="field full"><button class="btn primary" type="submit">Crea account LOOKADO</button></div>
      </form>
    </section>
  </div></div>`
}
function switchAuthTab(tab){
  document.getElementById("loginForm")?.classList.toggle("hidden",tab!=="login");
  document.getElementById("signupForm")?.classList.toggle("hidden",tab!=="signup");
  document.getElementById("loginTab")?.classList.toggle("active",tab==="login");
  document.getElementById("signupTab")?.classList.toggle("active",tab==="signup");
  const m=document.getElementById("authMessage"); if(m)m.innerHTML="";
}
function authMessage(text,error=false){const m=document.getElementById("authMessage");if(m)m.innerHTML=`<div class="notice ${error?"error":""}" style="margin-bottom:14px">${escapeHtml(text)}</div>`}
async function signupLookado(e){
  e.preventDefault(); const fd=new FormData(e.target);
  authMessage("Creazione account…");
  const {data,error}=await db.auth.signUp({
    email:fd.get("email"), password:fd.get("password"),
    options:{emailRedirectTo:location.origin+"/#/profile",data:{full_name:fd.get("full_name"),phone:fd.get("phone"),account_goal:fd.get("account_goal")}}
  });
  if(error){authMessage(error.message,true);return}
  if(data.session){location.hash=fd.get("account_goal")==="business"?"#/create-business":"#/profile"} else authMessage("Account creato. Controlla la tua email e conferma l'indirizzo per accedere.");
}
async function loginLookado(e){
  e.preventDefault();const fd=new FormData(e.target);authMessage("Accesso…");
  const {error}=await db.auth.signInWithPassword({email:fd.get("email"),password:fd.get("password")});
  if(error){authMessage(error.message,true);return}
  const after=sessionStorage.getItem("lookado_after_auth");sessionStorage.removeItem("lookado_after_auth");location.hash=after||"#/profile";
}
async function logoutLookado(){await db.auth.signOut();location.hash="#/home";toast("Sessione chiusa")}
function resetView(){
  return `<div class="auth-shell" style="max-width:650px"><div class="auth-card"><div class="eyebrow">Account</div><h2>Recupera password</h2><p>Inserisci la tua email. Riceverai il link per impostare una nuova password.</p><div id="authMessage"></div><form class="form-grid" onsubmit="sendReset(event)"><div class="field full"><label>Email</label><input type="email" name="email" required></div><div class="field full"><button class="btn primary">Invia link</button></div></form></div></div>`
}
async function sendReset(e){e.preventDefault();const email=new FormData(e.target).get("email");const {error}=await db.auth.resetPasswordForEmail(email,{redirectTo:location.origin+"/#/profile"});authMessage(error?error.message:"Email inviata. Controlla la tua casella.",!!error)}
function proGateView(){
  return `<div class="shell"><div class="panel pro-gate"><div class="eyebrow">LOOKADO PRO</div><h2>Porta la tua attività su LOOKADO</h2><p>Non hai ancora un'attività collegata a questo account.</p><button class="btn primary" onclick="location.hash='#/create-business'">Crea attività</button><button class="btn ghost" style="margin-left:6px" onclick="location.hash='#/home'">Torna al marketplace</button></div></div>`
}
function createBusinessView(){
  if(!authUser){location.hash="#/auth";return ""}
  const steps=[
    ["1","Identità"],["2","Contatti"],["3","Servizi"],["4","Team"],["5","Agenda"],["6","Profilo"]
  ];
  return `<div class="shell onboarding-shell">
    <div class="onboarding-head"><div><div class="eyebrow">LOOKADO PRO · ONBOARDING</div><h1>Porta la tua attività su LOOKADO.</h1><p>Costruiamo un profilo completo, pronto per ricevere prenotazioni.</p></div><div class="setup-badge">Configurazione guidata</div></div>
    <div class="setup-steps">${steps.map((s,i)=>`<div class="setup-step ${i===0?"active":""}" data-stepdot="${i}"><span>${s[0]}</span>${s[1]}</div>`).join("")}</div>
    <div id="businessMessage"></div>
    <form id="createBusinessForm" onsubmit="createBusinessLookado(event)">
      <section class="setup-page" data-setuppage="0">
        <div class="setup-grid">
          <div class="setup-main panel"><div class="eyebrow">01 · IDENTITÀ</div><h2>Raccontaci chi siete</h2>
            <div class="form-grid">
              <div class="field full"><label>Nome attività *</label><input name="name" required placeholder="Es. Studio Forma"></div>
              <div class="field full"><label>Tipologia *</label><div class="category-select">${["Hair salon","Barber","Nails","Beauty","Wellness","Make-up","Brows & lashes","Massage"].map(c=>`<label><input type="checkbox" name="categories" value="${c.toLowerCase()}" style="width:auto"><span>${c}</span></label>`).join("")}</div></div>
              <div class="field full"><label>Descrizione</label><textarea name="description" rows="5" placeholder="Cosa rende speciale la tua attività? Specializzazioni, stile, esperienza…"></textarea></div>
            </div>
          </div>
          <aside class="setup-preview"><div class="phone-preview"><div class="preview-photo">La tua copertina</div><div class="preview-body"><span class="verified">LOOKADO</span><h3 id="previewName">La tua attività</h3><p>Profilo in costruzione</p><div class="preview-book">Prenota</div></div></div></aside>
        </div>
      </section>
      <section class="setup-page hidden" data-setuppage="1"><div class="panel"><div class="eyebrow">02 · CONTATTI & POSIZIONE</div><h2>Fatti trovare facilmente</h2><div class="form-grid">
        <div class="field"><label>Email attività *</label><input name="email" type="email" value="${escapeHtml(authUser.email||"")}" required></div>
        <div class="field"><label>Telefono *</label><input name="phone" required></div>
        <div class="field"><label>Città *</label><input name="city" required></div><div class="field"><label>Indirizzo *</label><input name="address" required></div>
        <div class="field full"><label>Link Google Maps</label><input name="maps" type="url" placeholder="https://maps.google.com/..."><div class="meta">Il cliente vedrà “Indicazioni” nel profilo.</div></div>
        <div class="field"><label>Instagram</label><input name="instagram" placeholder="https://instagram.com/..."></div><div class="field"><label>Sito web</label><input name="website" placeholder="https://..."></div>
      </div></div></section>
      <section class="setup-page hidden" data-setuppage="2"><div class="panel"><div class="eyebrow">03 · SERVIZI</div><h2>Cosa possono prenotare?</h2><p>Puoi iniziare con alcuni servizi e completarli dopo.</p><div id="draftServices"></div><button type="button" class="btn secondary" onclick="addDraftService()">+ Aggiungi servizio</button></div></section>
      <section class="setup-page hidden" data-setuppage="3"><div class="panel"><div class="eyebrow">04 · TEAM</div><h2>Chi esegue i servizi?</h2><p>Il cliente potrà scegliere un professionista specifico oppure <strong>“Indifferente · primo disponibile”</strong>.</p><div id="draftTeam"></div><button type="button" class="btn secondary" onclick="addDraftTeam()">+ Aggiungi professionista</button></div></section>
      <section class="setup-page hidden" data-setuppage="4"><div class="panel"><div class="eyebrow">05 · AGENDA</div><h2>Non partire da zero</h2><div class="import-cards">
        <button type="button" class="import-card" onclick="selectAgendaImport('google')"><strong>Google Calendar</strong><span>Collega il calendario e importa gli impegni esistenti.</span><em>Collega →</em></button>
        <button type="button" class="import-card" onclick="selectAgendaImport('csv')"><strong>Importa agenda</strong><span>Carica CSV/Excel con appuntamenti o clienti esistenti.</span><em>Prepara importazione →</em></button>
        <button type="button" class="import-card" onclick="selectAgendaImport('new')"><strong>Inizia da LOOKADO</strong><span>Configura orari e disponibilità da zero.</span><em>Continua →</em></button>
      </div><input type="hidden" name="agenda_mode" value="new"><div id="agendaChoice" class="notice" style="margin-top:16px">Potrai modificare questa scelta in qualsiasi momento.</div></div></section>
      <section class="setup-page hidden" data-setuppage="5"><div class="setup-grid"><div class="panel"><div class="eyebrow">06 · PROFILO PUBBLICO</div><h2>Ultimi dettagli</h2>
        <div class="upload-zone"><strong>Foto del locale e dei lavori</strong><p>Copertina, ambiente, team, risultati. Le foto aumentano la fiducia prima della prenotazione.</p><button type="button" class="btn ghost" onclick="toast('Upload foto: si attiverà dopo la creazione del profilo')">+ Aggiungi foto</button></div>
        <div class="notice" style="margin-top:16px">Dopo la creazione apriremo LOOKADO Pro per completare orari, foto, social, servizi e disponibilità.</div>
      </div><aside class="panel"><h3>Prima di pubblicare</h3><div class="check-list"><span>✓ Profilo attività</span><span>✓ Posizione e contatti</span><span>✓ Servizi prenotabili</span><span>✓ Team e “Indifferente”</span><span>✓ Agenda</span><span>✓ Presenza online</span></div></aside></div></section>
      <div class="setup-actions"><button id="setupBack" type="button" class="btn ghost hidden" onclick="moveSetup(-1)">← Indietro</button><div></div><button id="setupNext" type="button" class="btn primary" onclick="moveSetup(1)">Continua →</button><button id="setupCreate" type="submit" class="btn primary hidden">Crea attività e apri LOOKADO Pro</button></div>
    </form>
  </div>`
}
let setupStep=0;
function moveSetup(delta){
 const form=document.getElementById("createBusinessForm"); if(!form)return;
 if(delta>0){
   const page=form.querySelector(`[data-setuppage="${setupStep}"]`);
   const required=[...page.querySelectorAll("[required]")];
   if(required.some(x=>!x.reportValidity()))return;
   if(setupStep===0 && !new FormData(form).getAll("categories").length){showBusinessError("Seleziona almeno una tipologia.");return}
 }
 setupStep=Math.max(0,Math.min(5,setupStep+delta));
 form.querySelectorAll("[data-setuppage]").forEach((x,i)=>x.classList.toggle("hidden",i!==setupStep));
 document.querySelectorAll("[data-stepdot]").forEach((x,i)=>x.classList.toggle("active",i<=setupStep));
 document.getElementById("setupBack").classList.toggle("hidden",setupStep===0);
 document.getElementById("setupNext").classList.toggle("hidden",setupStep===5);
 document.getElementById("setupCreate").classList.toggle("hidden",setupStep!==5);
 window.scrollTo({top:0,behavior:"smooth"});
}
function showBusinessError(t){const m=document.getElementById("businessMessage");if(m)m.innerHTML=`<div class="notice error">${escapeHtml(t)}</div>`}
function addDraftService(){
 const box=document.getElementById("draftServices");const row=document.createElement("div");row.className="draft-row";
 row.innerHTML=`<input name="service_name" placeholder="Es. Taglio donna" required><input name="service_duration" type="number" min="5" step="5" value="45" placeholder="Minuti"><input name="service_price" type="number" min="0" step=".01" placeholder="€"><button type="button" class="icon-btn" onclick="this.parentElement.remove()">×</button>`;box.appendChild(row)
}
function addDraftTeam(){
 const box=document.getElementById("draftTeam");const row=document.createElement("div");row.className="draft-row team";
 row.innerHTML=`<input name="team_name" placeholder="Nome professionista" required><input name="team_role" placeholder="Ruolo / specialità"><button type="button" class="icon-btn" onclick="this.parentElement.remove()">×</button>`;box.appendChild(row)
}
function selectAgendaImport(mode){
 document.querySelector('[name="agenda_mode"]').value=mode;
 document.getElementById("agendaChoice").innerHTML=mode==="google"?"Google Calendar selezionato. Dopo la creazione ti guideremo nel collegamento OAuth.":mode==="csv"?"Importazione selezionata. Dopo la creazione potrai caricare il file agenda.":"LOOKADO sarà la tua agenda principale.";
}
async function createBusinessLookado(e){
 e.preventDefault(); const form=e.target,fd=new FormData(form),cats=fd.getAll("categories");
 if(!authUser){location.hash="#/auth";return}
 if(!cats.length){showBusinessError("Seleziona almeno una tipologia.");setupStep=0;moveSetup(0);return}
 const btn=document.getElementById("setupCreate");btn.disabled=true;btn.textContent="Creazione in corso…";
 try{
   const {data:id,error}=await db.rpc("create_my_business",{
    p_name:fd.get("name"),p_email:fd.get("email"),p_phone:fd.get("phone"),p_city:fd.get("city"),p_address:fd.get("address"),
    p_description:fd.get("description")||"",p_categories:cats,p_instagram:fd.get("instagram")||null,p_website:fd.get("website")||null,p_maps:fd.get("maps")||null
   });
   if(error)throw error;
   const names=fd.getAll("service_name"),dur=fd.getAll("service_duration"),prices=fd.getAll("service_price");
   for(let i=0;i<names.length;i++) if(String(names[i]).trim()) await db.from("services").insert({business_id:id,name:names[i],duration_minutes:Number(dur[i]||45),price:Number(prices[i]||0),category:cats[0],active:true});
   const tnames=fd.getAll("team_name"),roles=fd.getAll("team_role");
   for(let i=0;i<tnames.length;i++) if(String(tnames[i]).trim()) await db.from("team_members").insert({business_id:id,display_name:tnames[i],role_title:roles[i]||"Professional",active:true});
   const mode=fd.get("agenda_mode");
   if(mode==="google"||mode==="csv") await db.from("calendar_integrations").upsert({business_id:id,user_id:authUser.id,provider:mode,status:"disconnected"});
   await loadAccountContext();state.proBusinessId=id;save();toast("Attività creata");location.hash="#/pro/business";
 }catch(err){console.error(err);showBusinessError(err.message||"Non è stato possibile creare l'attività.");btn.disabled=false;btn.textContent="Crea attività e apri LOOKADO Pro"}
}

async function handleProButton(){
  if(!authUser){location.hash="#/auth";return}
  if(location.hash.startsWith("#/pro")){location.hash="#/home";return}
  if(myBusinesses.length) location.hash="#/pro/business"; else location.hash="#/create-business";
}

// Real profile replaces demo-only profile when authenticated.
const demoProfileView=profileView;
profileView=function(){
  if(!authUser)return authView();
  return `<div class="shell"><div class="profile-grid"><div class="panel account-card"><div class="account-avatar">${initials(authProfile?.full_name||authUser.email||"U")}</div><h2>${escapeHtml(authProfile?.full_name||"Il mio profilo")}</h2><p>${escapeHtml(authUser.email||"")}<br>${escapeHtml(authProfile?.phone||"")}</p><button class="btn ghost small" onclick="editRealProfile()">Modifica profilo</button><button class="btn danger small" style="margin-left:5px" onclick="logoutLookado()">Esci</button></div><div class="panel"><div class="eyebrow">LOOKADO</div><h2>Il tuo spazio</h2><div class="summary-row"><span>Account</span><strong>Attivo</strong></div><div class="summary-row"><span>Attività collegate</span><strong>${myBusinesses.length}</strong></div>${myBusinesses.length?`<div class="summary-row"><span>LOOKADO Pro</span><button class="btn dark small" onclick="location.hash='#/pro/dashboard'">Apri</button></div>`:`<div style="margin-top:18px"><button class="btn primary" onclick="location.hash='#/create-business'">Crea attività</button></div>`}</div></div></div>`
}
function editRealProfile(){
  openModal("Modifica profilo",`<form id="realProfileForm" class="form-grid"><div class="field full"><label>Nome e cognome</label><input name="full_name" value="${escapeHtml(authProfile?.full_name||"")}" required></div><div class="field full"><label>Telefono</label><input name="phone" value="${escapeHtml(authProfile?.phone||"")}"></div></form>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button><button class="btn primary" onclick="saveRealProfile()">Salva</button>`)
}
async function saveRealProfile(){const f=document.getElementById("realProfileForm");if(!f.reportValidity())return;const fd=new FormData(f);const {error}=await db.from("profiles").update({full_name:fd.get("full_name"),phone:fd.get("phone"),updated_at:new Date().toISOString()}).eq("id",authUser.id);if(error){toast(error.message);return}await loadAccountContext();closeModal();updateAccountHeader();render();toast("Profilo aggiornato")}

document.addEventListener("click",e=>{const m=document.getElementById("accountMenu");if(m&&!m.contains(e.target))document.getElementById("accountPopover")?.classList.add("hidden")});
// v10 real availability helpers
async function getLookadoAvailability(businessId,serviceId,teamId,date){
 const rpc=teamId?["get_available_slots",{p_team_member_id:teamId,p_service_id:serviceId,p_date:date}]:["get_first_available_slots",{p_business_id:businessId,p_service_id:serviceId,p_date:date}];
 const {data,error}=await db.rpc(rpc[0],rpc[1]);if(error)throw error;return data||[]
}
window.getLookadoAvailability=getLookadoAvailability;

// v11 Real marketplace booking flow
window.realBooking={business:null,service:null,teamMode:"any",teamId:null,date:null,slots:[],slot:null};
async function startRealBooking(businessId,serviceId){
 if(!authUser){openAuth("login");toast("Accedi per prenotare.");return}
 const [b,s,t,l]=await Promise.all([
  db.from("businesses").select("*").eq("id",businessId).single(),
  db.from("services").select("*").eq("id",serviceId).eq("active",true).single(),
  db.from("team_members").select("*").eq("business_id",businessId).eq("active",true).order("display_name"),
  db.from("service_team").select("*").eq("service_id",serviceId)
 ]);
 if(b.error||s.error){toast("Servizio non disponibile.");return}
 const allowed=(l.data||[]).length?(t.data||[]).filter(x=>l.data.some(y=>y.team_member_id===x.id)):(t.data||[]);
 realBooking={business:b.data,service:s.data,team:allowed,teamMode:"any",teamId:null,date:null,slots:[],slot:null};
 renderRealBookingTeam()
}
function renderRealBookingTeam(){
 const r=realBooking;openModal("Prenota · "+r.service.name,`<div class="booking-real"><div class="booking-progress"><b>1</b><span></span><i>2</i><span></span><i>3</i></div><div class="eyebrow">PROFESSIONISTA</div><h2>Con chi vuoi prenotare?</h2><p>${escapeHtml(r.service.name)} · ${r.service.duration_minutes} min · ${money(Number(r.service.price))}</p><div class="pro-choice-grid"><button class="pro-choice featured" onclick="chooseBookingTeam('any')"><strong>Indifferente</strong><small>Primo professionista disponibile</small><em>Più disponibilità</em></button>${r.team.map(t=>`<button class="pro-choice" onclick="chooseBookingTeam('${t.id}')"><span class="mini-avatar">${escapeHtml(t.display_name.slice(0,1))}</span><strong>${escapeHtml(t.display_name)}</strong><small>${escapeHtml(t.role_title||"Professionista")}</small></button>`).join("")}</div></div>`,`<button class="btn ghost" onclick="closeModal()">Annulla</button>`)
}
function chooseBookingTeam(id){realBooking.teamMode=id==="any"?"any":"specific";realBooking.teamId=id==="any"?null:id;renderRealBookingDate()}
function renderRealBookingDate(){const r=realBooking,today=new Date(),days=Array.from({length:14},(_,i)=>{const d=new Date(today);d.setDate(d.getDate()+i);return d});openModal("Scegli il giorno",`<div class="booking-real"><div class="booking-progress"><i>✓</i><span></span><b>2</b><span></span><i>3</i></div><div class="eyebrow">DATA</div><h2>Quando vuoi venire?</h2><div class="date-choice-grid">${days.map(d=>`<button onclick="loadBookingSlots('${isoDay(d)}')"><small>${d.toLocaleDateString("it-IT",{weekday:"short"})}</small><strong>${d.getDate()}</strong><span>${d.toLocaleDateString("it-IT",{month:"short"})}</span></button>`).join("")}</div></div>`,`<button class="btn ghost" onclick="renderRealBookingTeam()">← Indietro</button>`)}
async function loadBookingSlots(date){
 realBooking.date=date;openModal("Disponibilità",`<div class="booking-real loading-slots"><div class="spinner"></div><h2>Cerco gli orari disponibili…</h2><p>LOOKADO sta controllando l'agenda reale del team.</p></div>`);
 try{
  const rows=await getLookadoAvailability(realBooking.business.id,realBooking.service.id,realBooking.teamId,date);
  realBooking.slots=rows;renderBookingSlots();
 }catch(e){openModal("Disponibilità",`<div class="notice error">${escapeHtml(e.message||"Errore disponibilità")}</div>`,`<button class="btn ghost" onclick="renderRealBookingDate()">Indietro</button>`)}
}
function renderBookingSlots(){
 const r=realBooking, unique=[];const seen=new Set();for(const x of r.slots){const key=new Date(x.slot_start).toISOString();if(r.teamMode==="any"&&seen.has(key))continue;seen.add(key);unique.push(x)}
 openModal("Scegli l'orario",`<div class="booking-real"><div class="booking-progress"><i>✓</i><span></span><i>✓</i><span></span><b>3</b></div><div class="eyebrow">ORARIO</div><h2>${new Date(r.date+"T12:00").toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"})}</h2>${unique.length?`<div class="slot-grid">${unique.slice(0,30).map((x,i)=>`<button onclick="selectBookingSlot(${i})"><strong>${new Date(x.slot_start).toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}</strong>${r.teamMode==="any"?`<small>${escapeHtml(x.team_member_name||"Disponibile")}</small>`:""}</button>`).join("")}</div>`:`<div class="empty-slots"><strong>Nessun orario libero</strong><p>Prova un altro giorno${r.teamMode!=="any"?" oppure scegli “Indifferente”":""}.</p></div>`}</div>`,`<button class="btn ghost" onclick="renderRealBookingDate()">← Altro giorno</button>`)
 realBooking._uniqueSlots=unique
}
function selectBookingSlot(i){const x=realBooking._uniqueSlots[i];realBooking.slot=x;if(realBooking.teamMode==="any")realBooking.teamId=x.team_member_id;renderBookingConfirm()}
function renderBookingConfirm(){const r=realBooking,t=r.team.find(x=>x.id===r.teamId);openModal("Conferma prenotazione",`<div class="booking-confirm"><div class="confirm-check">✓</div><div class="eyebrow">RIEPILOGO</div><h2>${escapeHtml(r.business.name)}</h2><div class="confirm-card"><div><span>Servizio</span><strong>${escapeHtml(r.service.name)}</strong></div><div><span>Professionista</span><strong>${escapeHtml(t?.display_name||"Primo disponibile")}</strong></div><div><span>Quando</span><strong>${new Date(r.slot.slot_start).toLocaleString("it-IT",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</strong></div><div><span>Prezzo</span><strong>${money(Number(r.service.price))}</strong></div></div><form id="bookingConfirmForm" class="form-grid"><div class="field"><label>Nome *</label><input name="name" value="${escapeHtml(authProfile?.full_name||authUser?.user_metadata?.full_name||"")}" required></div><div class="field"><label>Telefono</label><input name="phone" value="${escapeHtml(authProfile?.phone||"")}"></div><div class="field full"><label>Nota per l'attività</label><textarea name="notes" placeholder="Facoltativo"></textarea></div></form><p class="booking-policy">La richiesta sarà inviata all'attività. Riceverai conferma quando verrà accettata.</p></div>`,`<button class="btn ghost" onclick="renderBookingSlots()">← Indietro</button><button class="btn primary" onclick="confirmRealBooking()">Invia richiesta</button>`)}
async function confirmRealBooking(){const f=document.getElementById("bookingConfirmForm");if(!f.reportValidity())return;const fd=new FormData(f),r=realBooking;const btn=document.querySelector(".modal-footer .btn.primary");if(btn){btn.disabled=true;btn.textContent="Prenotazione…"}const {data,error}=await db.rpc("book_appointment",{p_business_id:r.business.id,p_service_id:r.service.id,p_team_member_id:r.teamId,p_starts_at:r.slot.slot_start,p_customer_name:fd.get("name"),p_customer_phone:fd.get("phone")||null,p_notes:fd.get("notes")||null});if(error){if(error.message.includes("SLOT_NOT_AVAILABLE")){toast("Questo orario è appena stato occupato. Scegline un altro.");await loadBookingSlots(r.date);return}toast(error.message);if(btn){btn.disabled=false;btn.textContent="Invia richiesta"}return}openModal("Richiesta inviata",`<div class="booking-success"><div class="success-ring">✓</div><h2>Prenotazione inviata</h2><p>${escapeHtml(r.business.name)} ha ricevuto la tua richiesta per <strong>${escapeHtml(r.service.name)}</strong>.</p><div class="confirm-card"><div><span>Data</span><strong>${new Date(r.slot.slot_start).toLocaleString("it-IT",{weekday:"long",day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"})}</strong></div><div><span>Stato</span><strong>In attesa di conferma</strong></div></div></div>`,`<button class="btn primary" onclick="closeModal();location.hash='#/appointments'">I miei appuntamenti</button>`)}
window.startRealBooking=startRealBooking;

function appointmentsPage(){setTimeout(loadMyRealAppointments,0);return `<div class="consumer-page"><div class="section-head"><div><div class="eyebrow">IL MIO LOOKADO</div><h1>I miei appuntamenti</h1><p>Tutte le tue prenotazioni e il loro stato, in un unico posto.</p></div></div><div id="myRealAppointments"><div class="panel empty">Caricamento appuntamenti…</div></div></div>`}
async function loadMyRealAppointments(){const root=document.getElementById("myRealAppointments");if(!root)return;if(!authUser){root.innerHTML=`<div class="panel empty">Accedi per vedere i tuoi appuntamenti.</div>`;return}const {data,error}=await db.from("appointments").select("*,business:businesses(name,slug,address,city),service:services(name,price,duration_minutes),team:team_members(display_name)").eq("customer_user_id",authUser.id).order("starts_at",{ascending:false});if(error){root.innerHTML=`<div class="notice error">${escapeHtml(error.message)}</div>`;return}const rows=data||[];root.innerHTML=rows.length?`<div class="my-appts">${rows.map(a=>renderMyAppointment(a)).join("")}</div>`:`<div class="panel empty"><h3>Ancora nessun appuntamento</h3><p>Quando prenoti su LOOKADO, lo troverai qui.</p><a class="btn primary" href="#/home">Scopri attività</a></div>`}
function apptStatusLabel(s){return {pending:"In attesa",confirmed:"Confermato",proposed:"Nuovo orario proposto",completed:"Completato",cancelled:"Annullato",rejected:"Rifiutato",no_show:"No-show"}[s]||s}
function renderMyAppointment(a){const future=new Date(a.starts_at)>new Date();return `<article class="my-appt-card"><div class="appt-datebox"><strong>${new Date(a.starts_at).getDate()}</strong><span>${new Date(a.starts_at).toLocaleDateString("it-IT",{month:"short"})}</span></div><div class="appt-main"><div class="appt-top"><div><h3>${escapeHtml(a.business?.name||"Attività")}</h3><p>${escapeHtml(a.service?.name||"Servizio")} · ${escapeHtml(a.team?.display_name||"Professionista")}</p></div><span class="appt-status ${a.status}">${apptStatusLabel(a.status)}</span></div><div class="appt-info"><strong>${new Date(a.starts_at).toLocaleString("it-IT",{weekday:"long",day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"})}</strong>${a.business?.address?`<span>${escapeHtml(a.business.address)} ${escapeHtml(a.business.city||"")}</span>`:""}</div>${a.status==="proposed"?`<div class="proposal-box"><div><small>L'attività propone</small><strong>${new Date(a.proposed_starts_at).toLocaleString("it-IT",{weekday:"long",day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"})}</strong>${a.status_note?`<p>${escapeHtml(a.status_note)}</p>`:""}</div><div><button class="btn ghost small" onclick="respondProposal('${a.id}',false)">Rifiuta</button><button class="btn primary small" onclick="respondProposal('${a.id}',true)">Accetta</button></div></div>`:""}${a.status_note&&a.status!=="proposed"?`<div class="status-note">${escapeHtml(a.status_note)}</div>`:""}<div class="appt-actions">${future&&["pending","confirmed"].includes(a.status)?`<button class="btn ghost small" onclick="cancelCustomerAppointment('${a.id}')">Annulla prenotazione</button>`:""}${a.status==="completed"?`<button class="btn ghost small">Lascia una recensione</button>`:""}</div></div></article>`}
async function cancelCustomerAppointment(id){if(!confirm("Vuoi annullare questa prenotazione?"))return;const {data,error}=await db.rpc("customer_cancel_appointment",{p_appointment_id:id});if(error||!data){toast(error?.message||"Non è possibile annullare.");return}toast("Prenotazione annullata");await loadMyRealAppointments()}
async function respondProposal(id,accept){const {data,error}=await db.rpc("customer_respond_proposal",{p_appointment_id:id,p_accept:accept});if(error||!data){toast(error?.message||"Impossibile aggiornare la prenotazione.");return}toast(accept?"Nuovo orario confermato":"Proposta rifiutata");await loadMyRealAppointments()}


bootLookado();
