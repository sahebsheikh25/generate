/* Courses data + UI (adapted from store.js) - Vercel-friendly relative paths */
const products = [
  {id:1,name:'Complete AI Agent Practical Course',url:'https://www.udemy.com/course/complete-ai-agent-practical-course-c-aipc/?couponCode=NEW_YEAR_2026',category:'AI',desc:'7h 46m',rating:'4.97',students:1638,img:'./assets/store/cyberdeck-mini.svg'},
  {id:2,name:'Ethically Hack the Planet - Part 4',url:'https://www.udemy.com/course/ethically-hack-the-planet-part-4/?couponCode=8C12DB659D1613146683',category:'Cybersecurity',desc:'52m',rating:'3.95',students:51250,img:'./assets/logo.svg'},
  {id:3,name:'Ethically Hack the Planet - Part 2',url:'https://www.udemy.com/course/ethically-hack-the-planet-part-2/?couponCode=EFE5F6F953ABC1DD9142',category:'Cybersecurity',desc:'34m',rating:'4.07',students:52397,img:'./assets/store/packet-sniffer-pro.svg'},
  {id:4,name:'Ethically Hack the Planet - Part 1',url:'https://www.udemy.com/course/ethically-hack-the-planet-part-1/?couponCode=CBCA631965D29EF54854',category:'Cybersecurity',desc:'1h 7m',rating:'4.04',students:63606,img:'./assets/store/rf-explorer-kit.svg'},
  {id:5,name:'Complete Java Programming Bootcamp',url:'https://www.udemy.com/course/complete-java-programming-bootcamp-learn-to-code-in-java/?couponCode=A2DC16BD316F4F05E2AE',category:'Java',desc:'4h 39m',rating:'4.1',students:22138,img:'./assets/store/vm-appliance-homelab.svg'},
  {id:6,name:'BASE44 Mastery – AI Workflow Automation',url:'https://www.udemy.com/course/base44-mastery-build-enterprise-ai-workflow-automations/?couponCode=8FE4BBB6DA539C76B223',category:'AI',desc:'7h 11m',rating:'4.65',students:3011,img:'./assets/store/oled-badge.svg'},
  {id:7,name:'Complete JavaScript Course',url:'https://www.udemy.com/course/the-complete-javascript-course-from-zero-to-expert-o/?couponCode=00CAEBF36C4332FFA1E7',category:'JavaScript',desc:'3h 23m',rating:'4.33',students:46816,img:'./assets/store/neon-keycap-set.svg'},
  {id:8,name:'Fundamentals of Cloud Computing',url:'https://www.udemy.com/course/fundamentals-of-cloud-computing-a/?couponCode=265C6B1DF107AB8B0F71',category:'Cloud',desc:'4h 3m',rating:'4.39',students:54973,img:'./assets/store/pro-license-snort-dash.svg'},
  {id:9,name:'Mastering Kali Linux for Ethical Hackers',url:'https://www.udemy.com/course/mastering-kali-linux-for-ethical-hackers/?couponCode=D7DB2033853077A62219',category:'Cybersecurity',desc:'6h 21m',rating:'4.22',students:65344,img:'./assets/store/oled-badge.svg'},
  {id:10,name:'Complete Python Bootcamp',url:'https://www.udemy.com/course/the-complete-python-bootcamp-from-zero-to-expert/?couponCode=AE3667B2EEADEFEAB7D2',category:'Python',desc:'16h 20m',rating:'3.81',students:56124,img:'./assets/store/cable-organizer-pro.svg'}
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
let _previousActive = null;
const filterBtns = document.querySelectorAll('.filter-btn');

function renderProducts(){
  const q = (searchInput.value||'').trim().toLowerCase();
  const activeCat = document.querySelector('.filter-btn.active')?.dataset.cat || 'all';
  productGrid.innerHTML = '';

  const filtered = products.filter(p => {
    const matchesCat = activeCat === 'all' || p.category === activeCat;
    const matchesQuery = q === '' || (p.name + ' ' + p.desc + ' ' + p.category).toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  if(filtered.length === 0){
    productGrid.innerHTML = '<div class="muted">No courses found.</div>';
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-media">
        <img loading="lazy" src="${p.img}" alt="${p.name}" onerror="this.onerror=null;this.src='./assets/logo.svg'">
        <span class="duration-badge">${p.desc}</span>
      </div>
      <div>
        <h3>${p.name}</h3>
        <div class="muted"><span class="rating">⭐ ${p.rating}</span> &middot; <span class="students">${p.students.toLocaleString()} students</span></div>
      </div>
      <div class="card-footer">
        <div>
          <div class="label">${p.category}</div>
        </div>
        <div style="text-align:right">
          <div class="price">Free</div>
          <div style="margin-top:8px;display:flex;gap:8px;justify-content:flex-end;align-items:center">
            <button class="btn ghost fav" data-id="${p.id}" aria-label="Save course ${p.name}">♡</button>
            <button class="btn ghost details" data-id="${p.id}" aria-label="View details for ${p.name}">Details</button>
            <button class="btn neon buy" data-id="${p.id}" data-url="${p.url}" aria-label="Enroll in ${p.name}">Enroll Free</button>
          </div>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // attach listeners
  document.querySelectorAll('.details').forEach(btn => btn.addEventListener('click', e => openModal(Number(e.currentTarget.dataset.id))));
  document.querySelectorAll('.buy').forEach(btn => btn.addEventListener('click', e => openCourse(e.currentTarget.dataset.url)));
  document.querySelectorAll('.fav').forEach(btn => btn.addEventListener('click', e => toggleFav(Number(e.currentTarget.dataset.id), e.currentTarget)));

  // restore favorite states after rendering
  try{ loadFavs(); }catch(e){}
}

function openModal(id){
  const p = products.find(x=>x.id===id); if(!p) return;
  const modal = document.getElementById('productModal');
  _previousActive = document.activeElement;
  modal.querySelector('#modalImg').src = p.img;
  modal.querySelector('#modalImg').setAttribute('loading','eager');
  modal.querySelector('#modalTitle').textContent = p.name;
  modal.querySelector('#modalCategory').textContent = p.category.toUpperCase();
  modal.querySelector('#modalDesc').textContent = p.desc + ' — Free';
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';

  setTimeout(()=>{
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if(focusable) focusable.focus();
  },60);

  modal.querySelector('.modal-close').onclick = closeModal;
  modal.querySelector('#modalClose').onclick = closeModal;
  modal.querySelector('#modalBuy').onclick = () => { openCourse(p.url); closeModal(); };
}

function closeModal(){
  const modal = document.getElementById('productModal');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  if(_previousActive) try{ _previousActive.focus(); }catch(e){}
}

function openCourse(url){
  if(!url) return showToast('No course URL available');
  window.open(url, '_blank', 'noopener');
  showToast('Opening course...');
}

function toggleFav(id, btn){
  const p = products.find(x=>x.id===id); if(!p) return;
  // persistent favorites in localStorage
  const key = 'sn:favorites';
  const raw = localStorage.getItem(key);
  const favs = raw ? new Set(JSON.parse(raw)) : new Set();
  if(favs.has(String(id))){
    favs.delete(String(id));
    btn.classList.remove('active'); btn.textContent = '♡';
    showToast('Removed ❤️');
  } else {
    favs.add(String(id));
    btn.classList.add('active'); btn.textContent = '❤️';
    showToast('Saved ❤️');
  }
  localStorage.setItem(key, JSON.stringify(Array.from(favs)));
}

function loadFavs(){
  const key = 'sn:favorites';
  const raw = localStorage.getItem(key);
  const favs = raw ? new Set(JSON.parse(raw)) : new Set();
  document.querySelectorAll('.fav').forEach(btn => {
    const id = btn.dataset.id;
    if(favs.has(String(id))){ btn.classList.add('active'); btn.textContent = '❤️'; } else { btn.classList.remove('active'); btn.textContent = '♡'; }
  });
}

function showToast(msg,timeout=2400){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show'); t.setAttribute('aria-hidden','false');
  clearTimeout(t._h);
  t._h = setTimeout(()=>{ t.classList.remove('show'); t.setAttribute('aria-hidden','true'); }, timeout);
}

// search + clear
searchInput && searchInput.addEventListener('input',()=>{ renderProducts(); updateClear(); });
clearSearch && clearSearch.addEventListener('click',()=>{searchInput.value='';renderProducts();searchInput.focus();updateClear();});

function updateClear(){ if(!clearSearch || !searchInput) return; clearSearch.style.display = (searchInput.value && searchInput.value.length>0) ? 'block' : 'none'; }

// close modal when clicking on overlay
const modalRoot = document.getElementById('productModal');
if(modalRoot) modalRoot.addEventListener('click', (e)=>{ if(e.target && e.target.id === 'productModal') closeModal(); });

// filters
filterBtns.forEach(b=>b.addEventListener('click', e=>{
  filterBtns.forEach(x=>x.classList.remove('active'));
  e.currentTarget.classList.add('active');
  renderProducts();
}));

// keyboard: escape closes modal
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

// initial render
document.addEventListener('DOMContentLoaded',()=>{ renderProducts(); try{ updateClear(); }catch(e){} });
document.addEventListener('DOMContentLoaded',()=>{ setTimeout(loadFavs,50); });
