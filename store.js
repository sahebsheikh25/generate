/* Store data + UI interactions */
const products = [
    {id:1,name:'Cyberdeck Mini',price:249.00,category:'hardware',desc:'Compact pocket cyberdeck with GPIO and Wi‑Fi pentesting support.',img:'assets/store/cyberdeck-mini.svg', amazonUrl:'https://www.amazon.com/s?k=Cyberdeck+Mini'},
    {id:2,name:'PacketSniffer Pro',price:79.00,category:'software',desc:'Lightweight network capture & analysis suite for pros.',img:'assets/store/packet-sniffer-pro.svg', amazonUrl:'https://www.amazon.com/s?k=PacketSniffer+Pro'},
    {id:3,name:'Neon Keycap Set',price:29.00,category:'accessories',desc:'PBT keycaps with neon legends and glow finish.',img:'assets/store/neon-keycap-set.svg', amazonUrl:'https://www.amazon.com/s?k=neon+keycap+set'},
    {id:4,name:'RF Explorer Kit',price:179.00,category:'hardware',desc:'Portable RF scanner kit with spectrum waterfall and antenna set.',img:'assets/store/rf-explorer-kit.svg', amazonUrl:'https://www.amazon.com/s?k=RF+Explorer+Kit'},
    {id:5,name:'VM Appliance - HomeLab',price:39.00,category:'software',desc:'Prebuilt VM image with pentest tools and learning labs.',img:'assets/store/vm-appliance-homelab.svg', amazonUrl:''},
    {id:6,name:'Cable Organizer Pro',price:14.00,category:'accessories',desc:'Magnetic cable clips and braided sleeves — tidy & stealthy.',img:'assets/store/cable-organizer-pro.svg', amazonUrl:'https://www.amazon.com/s?k=cable+organizer+pro'},
    {id:7,name:'OLED Badge',price:54.00,category:'hardware',desc:'Wearable OLED badge with USB-C & programmable display.',img:'assets/store/oled-badge.svg', amazonUrl:'https://www.amazon.com/s?k=oled+badge'},
    {id:8,name:'Pro License: Snort+Dash',price:129.00,category:'software',desc:'Enterprise IDS rules and advanced dashboard license.',img:'assets/store/pro-license-snort-dash.svg', amazonUrl:''}
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
let _previousActive = null;
const filterBtns = document.querySelectorAll('.filter-btn');

function formatPrice(p){return '$' + p.toFixed(2)}

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
        productGrid.innerHTML = '<div class="muted">No products found.</div>';
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-media"><img loading="lazy" src="${p.img}" alt="${p.name}"></div>
            <div>
                <h3>${p.name}</h3>
                <div class="muted">${p.desc}</div>
            </div>
            <div class="card-footer">
                <div>
                    <div class="label">${p.category.toUpperCase()}</div>
                </div>
                <div style="text-align:right">
                    <div class="price">${formatPrice(p.price)}</div>
                    <div style="margin-top:8px;display:flex;gap:8px;justify-content:flex-end">
                        <button class="btn ghost details" data-id="${p.id}">Details</button>
                        <button class="btn neon buy" data-id="${p.id}" data-amazon="${p.amazonUrl}">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });

    // attach listeners
    document.querySelectorAll('.details').forEach(btn => btn.addEventListener('click', e => openModal(Number(e.currentTarget.dataset.id))));
    document.querySelectorAll('.buy').forEach(btn => btn.addEventListener('click', e => buyProduct(Number(e.currentTarget.dataset.id))));
}

function openModal(id){
    const p = products.find(x=>x.id===id); if(!p) return;
    const modal = document.getElementById('productModal');
    _previousActive = document.activeElement;
    modal.querySelector('#modalImg').src = p.img;
    modal.querySelector('#modalImg').setAttribute('loading','eager');
    modal.querySelector('#modalTitle').textContent = p.name;
    modal.querySelector('#modalCategory').textContent = p.category.toUpperCase();
    modal.querySelector('#modalDesc').textContent = p.desc + ' — Price: ' + formatPrice(p.price);
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';

    // focus first focusable inside modal
    setTimeout(()=>{
        const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if(focusable) focusable.focus();
    },60);

    // modal buttons
    modal.querySelector('.modal-close').onclick = closeModal;
    modal.querySelector('#modalClose').onclick = closeModal;
    modal.querySelector('#modalBuy').onclick = () => { buyProduct(p.id); closeModal(); };
}

function closeModal(){
    const modal = document.getElementById('productModal');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(_previousActive) try{ _previousActive.focus(); }catch(e){}
}

function buyProduct(id){
    const p = products.find(x=>x.id===id); if(!p) return;
    if(p.amazonUrl && p.amazonUrl.trim().length > 0){
        // open Amazon link in a new tab/window
        window.open(p.amazonUrl, '_blank', 'noopener');
        showToast(`Opening Amazon for ${p.name}`);
    } else {
        // fallback: show toast as a mock purchase
        showToast(`Purchased ${p.name} — ${formatPrice(p.price)}`);
    }
}

function showToast(msg,timeout=2800){
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show'); t.setAttribute('aria-hidden','false');
    clearTimeout(t._h);
    t._h = setTimeout(()=>{ t.classList.remove('show'); t.setAttribute('aria-hidden','true'); }, timeout);
}

// search + clear
searchInput.addEventListener('input',()=>{ renderProducts(); updateClear(); });
clearSearch.addEventListener('click',()=>{searchInput.value='';renderProducts();searchInput.focus();updateClear();});

function updateClear(){ clearSearch.style.display = (searchInput.value && searchInput.value.length>0) ? 'block' : 'none'; }

// close modal when clicking on overlay
document.getElementById('productModal').addEventListener('click', (e)=>{ if(e.target && e.target.id === 'productModal') closeModal(); });

// filters
filterBtns.forEach(b=>b.addEventListener('click', e=>{
    filterBtns.forEach(x=>x.classList.remove('active'));
    e.currentTarget.classList.add('active');
    renderProducts();
}));

// keyboard: escape closes modal
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

// initial render
document.addEventListener('DOMContentLoaded',()=>{
    renderProducts();
    // show/hide clear button appropriately on load
    try{ updateClear(); }catch(e){}
});
