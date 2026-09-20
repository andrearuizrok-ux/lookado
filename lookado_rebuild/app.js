const VERSION = '18.1-repo';

const state = {
  route: 'home',
  deferredInstall: null,
  supabase: null,
  demoBusiness: {
    name: 'Atelier Beauty',
    city: 'Milano',
    plan: 'LOOKADO Pro',
    rating: 4.9,
    clients: 284,
    bookings: 38,
    revenue: 4860
  }
};

const salons = [
  { name: 'Studio 01', type: 'Hair · Color', city: 'Milano', rating: 4.9, next: 'Oggi 15:30', icon: '✂' },
  { name: 'Beauty Lab', type: 'Nails · Brows', city: 'Milano', rating: 4.8, next: 'Oggi 17:00', icon: '◒' },
  { name: 'Skin Atelier', type: 'Viso · Skincare', city: 'Milano', rating: 4.9, next: 'Domani 10:00', icon: '✦' },
  { name: 'Barber No.7', type: 'Barber · Grooming', city: 'Milano', rating: 4.7, next: 'Domani 11:30', icon: '◆' }
];

const appointments = [
  { time: '09:00', client: 'Cliente 01', service: 'Piega + trattamento', status: 'Confermato' },
  { time: '10:30', client: 'Cliente 02', service: 'Manicure semipermanente', status: 'Confermato' },
  { time: '12:00', client: 'Cliente 03', service: 'Taglio + styling', status: 'In attesa' },
  { time: '15:30', client: 'Cliente 04', service: 'Colore completo', status: 'Confermato' }
];

const routes = {
  home: renderHome,
  discover: renderDiscover,
  bookings: renderBookings,
  proBusiness: renderProBusiness,
  proBusinessHub: () => navigate('proBusiness', { replace: true }),
  profile: renderProfile,
  proAgenda: renderProAgenda,
  proClients: renderProClients,
  proAnalytics: renderProAnalytics,
  proProfile: renderProProfile
};

function qs(sel, root = document) { return root.querySelector(sel); }
function qsa(sel, root = document) { return [...root.querySelectorAll(sel)]; }
function money(value) { return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value); }

function toast(message) {
  const el = qs('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2200);
}

function normalizeRoute(value) {
  const route = String(value || '').replace(/^#\/?/, '').trim();
  if (route === 'proBusinessHub') return 'proBusiness';
  return routes[route] ? route : 'home';
}

function navigate(route, options = {}) {
  const safe = normalizeRoute(route);
  state.route = safe;
  const hash = `#/${safe}`;
  if (options.replace) history.replaceState(null, '', hash);
  else if (location.hash !== hash) history.pushState(null, '', hash);
  render();
}

function updateNav() {
  qsa('.bottom-nav button').forEach(btn => {
    const route = btn.dataset.route;
    const active = route === state.route || (route === 'proBusiness' && state.route.startsWith('pro'));
    btn.classList.toggle('active', active);
  });
}

function render() {
  const fn = routes[state.route] || renderHome;
  qs('#view').innerHTML = fn();
  updateNav();
  bindViewEvents();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderHome() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">Beauty, senza complicazioni</span>
        <h1>Il tuo prossimo appuntamento, più semplice.</h1>
        <p>Scopri professionisti, confronta disponibilità e prenota in pochi tocchi. LOOKADO tiene insieme cliente e attività in un'unica esperienza.</p>
        <div class="btn-row">
          <button class="btn light" data-route="discover">Trova un servizio</button>
          <button class="btn ghost" data-route="bookings">Le mie prenotazioni</button>
        </div>
      </div>
      <aside class="hero-card">
        <div>
          <span class="badge">LOOKADO Pro</span>
          <h2>Hai un'attività beauty?</h2>
          <p>Agenda, clienti, disponibilità, profilo pubblico e numeri del business in un unico spazio.</p>
        </div>
        <button class="btn rose" data-route="proBusiness">Apri LOOKADO Pro →</button>
      </aside>
    </section>

    <div class="section-head">
      <div><span class="eyebrow">Esplora</span><h2>Cosa vuoi prenotare?</h2></div>
    </div>
    <section class="category-grid">
      ${[['✂','Capelli'],['◒','Unghie'],['✦','Skincare'],['⌁','Sopracciglia'],['◆','Barber'],['♡','Wellness']]
        .map(([icon,label]) => `<button class="category" data-route="discover"><span>${icon}</span>${label}</button>`).join('')}
    </section>

    <div class="section-head">
      <div><span class="eyebrow">Vicino a te</span><h2>Disponibili presto</h2></div>
      <button class="btn ghost small" data-route="discover">Vedi tutti</button>
    </div>
    <section class="list">
      ${salons.slice(0,3).map(salonCard).join('')}
    </section>
  `;
}

function salonCard(s) {
  return `<article class="list-item">
    <div class="thumb">${s.icon}</div>
    <div>
      <h3>${s.name}</h3>
      <p>${s.type} · ${s.city}</p>
      <span class="rating">★ ${s.rating}</span>
    </div>
    <button class="btn small" data-book="${s.name}">${s.next}</button>
  </article>`;
}

function renderDiscover() {
  return `
    <span class="eyebrow">Scopri</span>
    <h1 class="page-title">Trova il posto giusto.</h1>
    <p class="page-sub">Ricerca rapida tra attività, servizi e disponibilità.</p>
    <div class="searchbox">
      <input id="salonSearch" placeholder="Cerca salone, servizio o città…" autocomplete="off" />
      <button class="btn small">Cerca</button>
    </div>
    <div class="section-head"><div><h2>Risultati</h2><p id="resultCount">${salons.length} attività</p></div></div>
    <section id="salonList" class="list">${salons.map(salonCard).join('')}</section>
  `;
}

function renderBookings() {
  return `
    <span class="eyebrow">Prenotazioni</span>
    <h1 class="page-title">I tuoi appuntamenti.</h1>
    <p class="page-sub">Tutto quello che hai prenotato, in ordine.</p>
    <section class="cards">
      <article class="card"><span class="badge green">Confermato</span><div class="big">24 set</div><h3>Studio 01</h3><p>15:30 · Piega + trattamento</p></article>
      <article class="card"><span class="badge">Da pagare</span><div class="big">29 set</div><h3>Beauty Lab</h3><p>11:00 · Manicure semipermanente</p></article>
    </section>
    <div class="section-head"><div><h2>Storico</h2></div></div>
    <div class="empty"><div class="emoji">♡</div><h3>Qui troverai i tuoi appuntamenti passati</h3><p>Le prenotazioni concluse resteranno disponibili per ritrovare velocemente i tuoi professionisti preferiti.</p></div>
  `;
}

function renderProBusiness() {
  const b = state.demoBusiness;
  return `
    <section class="pro-hero">
      <div>
        <div class="kicker"><span class="dot"></span><span class="eyebrow" style="color:#f3bfd4">Business online</span></div>
        <h1>${b.name}</h1>
        <p>Questa è la tua area operativa. Agenda, clienti e performance restano separati dall'esperienza cliente, ma collegati allo stesso account.</p>
        <div class="btn-row" style="margin-top:18px">
          <button class="btn light" data-route="proAgenda">Apri agenda</button>
          <button class="btn ghost" data-route="proProfile">Modifica profilo</button>
        </div>
      </div>
      <div class="pro-logo">L</div>
    </section>

    <section class="pro-grid">
      <div class="panel">
        <h2>Oggi</h2>
        <div class="stat-grid">
          <div class="stat"><small>Prenotazioni</small><strong>${b.bookings}</strong></div>
          <div class="stat"><small>Clienti</small><strong>${b.clients}</strong></div>
          <div class="stat"><small>Ricavi mese</small><strong>${money(b.revenue)}</strong></div>
        </div>
        <div class="section-head" style="margin-top:24px"><div><h2>Prossimi appuntamenti</h2></div><button class="btn ghost small" data-route="proAgenda">Agenda completa</button></div>
        <div class="agenda">
          ${appointments.slice(0,3).map(a => `<div class="slot"><time>${a.time}</time><div><div class="who">${a.client}</div><small>${a.service}</small></div><span class="badge ${a.status === 'Confermato' ? 'green' : ''}">${a.status}</span></div>`).join('')}
        </div>
      </div>
      <div class="panel">
        <h2>LOOKADO Pro</h2>
        <div class="pro-menu">
          <button class="pro-link" data-route="proAgenda"><span>▣</span><strong>Agenda</strong><small>Turni e disponibilità</small></button>
          <button class="pro-link" data-route="proClients"><span>◎</span><strong>Clienti</strong><small>CRM e storico</small></button>
          <button class="pro-link" data-route="proAnalytics"><span>↗</span><strong>Analytics</strong><small>Ricavi e crescita</small></button>
          <button class="pro-link" data-route="proProfile"><span>✦</span><strong>Profilo</strong><small>Foto e vetrina</small></button>
        </div>
      </div>
    </section>
  `;
}

function renderProAgenda() {
  return `
    <span class="eyebrow">LOOKADO Pro · Agenda</span>
    <h1 class="page-title">La giornata sotto controllo.</h1>
    <p class="page-sub">Vista operativa di appuntamenti e disponibilità.</p>
    <div class="panel">
      <div class="agenda">
        ${appointments.map(a => `<div class="slot"><time>${a.time}</time><div><div class="who">${a.client}</div><small>${a.service}</small></div><span class="badge ${a.status === 'Confermato' ? 'green' : ''}">${a.status}</span></div>`).join('')}
      </div>
      <div class="btn-row" style="margin-top:16px"><button class="btn rose" id="newAppointment">+ Nuovo appuntamento</button><button class="btn ghost" data-route="proBusiness">Torna alla dashboard</button></div>
    </div>
  `;
}

function renderProClients() {
  const clients = [
    ['Cliente 01','8 appuntamenti','€ 640'],['Cliente 02','5 appuntamenti','€ 390'],
    ['Cliente 03','12 appuntamenti','€ 910'],['Cliente 04','3 appuntamenti','€ 210']
  ];
  return `
    <span class="eyebrow">LOOKADO Pro · Clienti</span>
    <h1 class="page-title">Conosci chi ritorna.</h1>
    <p class="page-sub">Una base clienti leggibile, utile per servizio e fidelizzazione.</p>
    <section class="list">${clients.map((c,i)=>`<article class="list-item"><div class="thumb">${String(i+1).padStart(2,'0')}</div><div><h3>${c[0]}</h3><p>${c[1]}</p></div><span class="badge">${c[2]}</span></article>`).join('')}</section>
  `;
}

function renderProAnalytics() {
  return `
    <span class="eyebrow">LOOKADO Pro · Analytics</span>
    <h1 class="page-title">Numeri che puoi usare.</h1>
    <p class="page-sub">Indicatori essenziali per capire domanda, ritorno e valore.</p>
    <section class="cards">
      <article class="card"><span class="meta">Ricavi mese</span><div class="big">${money(4860)}</div><p>+12% vs mese precedente</p></article>
      <article class="card"><span class="meta">Ticket medio</span><div class="big">${money(64)}</div><p>su appuntamenti conclusi</p></article>
      <article class="card"><span class="meta">Ritorno clienti</span><div class="big">68%</div><p>clienti con nuova prenotazione</p></article>
      <article class="card"><span class="meta">Riempimento agenda</span><div class="big">81%</div><p>slot occupati disponibili</p></article>
    </section>
  `;
}

function renderProProfile() {
  const b = state.demoBusiness;
  return `
    <span class="eyebrow">LOOKADO Pro · Profilo pubblico</span>
    <h1 class="page-title">La tua vetrina.</h1>
    <p class="page-sub">Aggiorna le informazioni che il cliente vede prima di prenotare.</p>
    <section class="pro-grid">
      <div class="panel">
        <div class="form-grid">
          <div class="field"><label>Nome attività</label><input id="businessName" value="${b.name}"></div>
          <div class="field"><label>Città</label><input id="businessCity" value="${b.city}"></div>
          <div class="field span-2"><label>Descrizione</label><textarea id="businessBio">Beauty studio contemporaneo. Prenotazioni semplici, cura dei dettagli e servizi su appuntamento.</textarea></div>
        </div>
        <div class="btn-row" style="margin-top:16px"><button class="btn rose" id="saveBusiness">Salva modifiche</button><button class="btn ghost" data-route="proBusiness">Annulla</button></div>
      </div>
      <div class="panel">
        <h2>Foto attività</h2>
        <div class="upload-box">
          <p>Carica una foto per il profilo. Con Supabase configurato verrà salvata nel bucket <strong>business-media</strong>.</p>
          <input id="businessPhoto" type="file" accept="image/*">
          <img id="uploadPreview" class="upload-preview" alt="Anteprima foto attività">
          <div style="margin-top:12px"><button class="btn small" id="uploadPhoto" disabled>Carica foto</button></div>
        </div>
      </div>
    </section>
  `;
}

function renderProfile() {
  return `
    <span class="eyebrow">Account</span>
    <h1 class="page-title">Il tuo profilo.</h1>
    <p class="page-sub">Un account, due esperienze: cliente e business.</p>
    <section class="cards">
      <article class="card"><span class="badge">Cliente</span><div class="big">Andrea</div><p>Prenotazioni, preferiti e storico.</p><div style="margin-top:14px"><button class="btn small" data-route="bookings">Apri</button></div></article>
      <article class="card"><span class="badge dark">Pro</span><div class="big">Atelier Beauty</div><p>Dashboard e gestione attività.</p><div style="margin-top:14px"><button class="btn small rose" data-route="proBusiness">Apri LOOKADO Pro</button></div></article>
    </section>
    <p style="color:var(--muted);font-size:12px;margin-top:22px">Build ${VERSION}</p>
  `;
}

function bindViewEvents() {
  qsa('[data-route]').forEach(el => el.addEventListener('click', () => navigate(el.dataset.route)));
  qsa('[data-book]').forEach(el => el.addEventListener('click', () => toast(`Slot selezionato · ${el.dataset.book}`)));

  const search = qs('#salonSearch');
  if (search) {
    search.addEventListener('input', () => {
      const term = search.value.toLowerCase().trim();
      const filtered = salons.filter(s => `${s.name} ${s.type} ${s.city}`.toLowerCase().includes(term));
      qs('#salonList').innerHTML = filtered.map(salonCard).join('') || `<div class="empty"><div class="emoji">⌕</div><h3>Nessun risultato</h3><p>Prova con un altro servizio o nome.</p></div>`;
      qs('#resultCount').textContent = `${filtered.length} attività`;
      qsa('[data-book]', qs('#salonList')).forEach(el => el.addEventListener('click', () => toast(`Slot selezionato · ${el.dataset.book}`)));
    });
  }

  const add = qs('#newAppointment');
  if (add) add.addEventListener('click', () => toast('Nuovo appuntamento · flusso pronto da collegare a Supabase'));

  const save = qs('#saveBusiness');
  if (save) save.addEventListener('click', () => {
    state.demoBusiness.name = qs('#businessName').value.trim() || state.demoBusiness.name;
    state.demoBusiness.city = qs('#businessCity').value.trim() || state.demoBusiness.city;
    toast('Profilo aggiornato');
  });

  const photo = qs('#businessPhoto');
  const upload = qs('#uploadPhoto');
  const preview = qs('#uploadPreview');
  if (photo && upload && preview) {
    photo.addEventListener('change', () => {
      const file = photo.files?.[0];
      if (!file) return;
      preview.src = URL.createObjectURL(file);
      preview.style.display = 'block';
      upload.disabled = false;
    });
    upload.addEventListener('click', uploadBusinessPhoto);
  }
}

async function initSupabase() {
  const cfg = window.LOOKADO_CONFIG || {};
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || !window.supabase?.createClient) return;
  state.supabase = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
}

async function uploadBusinessPhoto() {
  const input = qs('#businessPhoto');
  const file = input?.files?.[0];
  if (!file) return;
  if (!state.supabase) {
    toast('Anteprima pronta · configura Supabase per caricare online');
    return;
  }
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const key = `demo-business/${crypto.randomUUID()}.${ext}`;
  const button = qs('#uploadPhoto');
  button.disabled = true;
  button.textContent = 'Caricamento…';
  try {
    const { error } = await state.supabase.storage.from('business-media').upload(key, file, { upsert: false });
    if (error) throw error;
    toast('Foto caricata su business-media');
  } catch (error) {
    console.error(error);
    toast(error?.message || 'Caricamento non riuscito');
  } finally {
    button.disabled = false;
    button.textContent = 'Carica foto';
  }
}

window.addEventListener('hashchange', () => {
  state.route = normalizeRoute(location.hash);
  render();
});

document.addEventListener('click', event => {
  const target = event.target.closest('[data-route]');
  if (!target || target.closest('#view')) return;
  navigate(target.dataset.route);
});

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  state.deferredInstall = event;
  const btn = qs('#installBtn');
  btn.hidden = false;
  btn.onclick = async () => {
    await state.deferredInstall.prompt();
    state.deferredInstall = null;
    btn.hidden = true;
  };
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(console.error));
}

await initSupabase();
state.route = normalizeRoute(location.hash);
if (!location.hash) history.replaceState(null, '', '#/home');
render();
