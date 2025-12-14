// House of Marwa — script.js
// Responsibilities:
// - Load products.json
// - Populate featured, latest and category pages
// - Provide simple cart (localStorage)
// - Smooth animations and basic interactivity

const ASSET_BASE = 'assets';
let PRODUCTS = [];

// Helper: fetch JSON products
async function loadProducts(){
  try{
    const res = await fetch('products.json');
    PRODUCTS = await res.json();
    renderFeatured();
    renderLatest();
    renderByPage();
    renderAdminProducts();
  }catch(e){
    console.error('Failed to load products.json', e);
  }
}

// Render featured products (site-wide)
function renderFeatured(){
  const holder = document.getElementById('featured-products');
  if(!holder) return;
  const featured = PRODUCTS.filter(p => p.featured).slice(0,6);
  holder.innerHTML = featured.map(cardHTML).join('');
  attachAddButtons(holder);
}

// Render latest (all)
function renderLatest(){
  const holder = document.getElementById('latest-products');
  if(!holder) return;
  const latest = PRODUCTS.slice(0,9);
  holder.innerHTML = latest.map(cardHTML).join('');
  attachAddButtons(holder);
}

// Render products by page/category
function renderByPage(){
  const mapping = [
    { el: 'couture-products', cat: 'couture' },
    { el: 'beauty-products', cat: 'beauty' },
    { el: 'accessories-products', cat: 'accessories' },
    { el: 'digital-products', cat: 'digital' },
    { el: 'couture-products', cat: 'couture' } // fallback if duplicates
  ];
  mapping.forEach(m=>{
    const holder = document.getElementById(m.el);
    if(!holder) return;
    const items = PRODUCTS.filter(p => p.category === m.cat);
    if(items.length === 0){
      holder.innerHTML = `<p class="muted">No products found for ${m.cat} yet.</p>`;
    } else {
      holder.innerHTML = items.map(cardHTML).join('');
      attachAddButtons(holder);
    }
  });
}

// Admin products list
function renderAdminProducts(){
  const holder = document.getElementById('adminProducts');
  if(!holder) return;
  holder.innerHTML = PRODUCTS.map(p => {
    return `<div class="product admin">
      <div class="product-media" style="background-image:url('${p.image}')"></div>
      <h3>${escapeHtml(p.title)}</h3>
      <p class="muted">${escapeHtml(p.category)}</p>
      <p class="price">${escapeHtml(p.price)}</p>
    </div>`;
  }).join('');
}

// Product card markup
function cardHTML(p){
  return `<article class="product" data-id="${p.id}">
    <div class="product-media" style="background-image:url('${p.image}')"></div>
    <h3>${escapeHtml(p.title)}</h3>
    <p class="muted">${escapeHtml(p.description)}</p>
    <div class="price">${escapeHtml(p.price)}</div>
    <div class="actions">
      <button class="btn btn-outline view" data-id="${p.id}">View</button>
      <button class="btn btn-primary add-to-cart" data-id="${p.id}">Add</button>
    </div>
  </article>`;
}

// Attach add-to-cart handlers for container
function attachAddButtons(container){
  container.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      addToCart(id);
      animateAdd(btn);
    });
  });
  container.querySelectorAll('.view').forEach(btn=>{
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const p = PRODUCTS.find(x=>x.id === id);
      alert(`${p.title}\n\n${p.description}\n\nPrice: ${p.price}`);
    });
  });
}

// Simple cart
function getCart(){ return JSON.parse(localStorage.getItem('hom_cart') || '[]') }
function saveCart(c){ localStorage.setItem('hom_cart', JSON.stringify(c)) }

function addToCart(id){
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if(item) item.qty += 1;
  else cart.push({id, qty:1});
  saveCart(cart);
  showCartToast();
  renderCartPage();
}

function showCartToast(){
  // Quick visual feedback (console + small ephemeral overlay)
  console.info('Added to cart');
  const t = document.createElement('div');
  t.textContent = 'Added to cart';
  t.style.position='fixed';
  t.style.right='18px';
  t.style.bottom='18px';
  t.style.background='linear-gradient(90deg,var(--gold),#DDBE9B)';
  t.style.color='var(--blackpearl)';
  t.style.padding='10px 14px';
  t.style.borderRadius='8px';
  t.style.boxShadow='0 8px 24px rgba(0,0,0,0.5)';
  document.body.appendChild(t);
  setTimeout(()=> t.remove(),1500);
}

function renderCartPage(){
  const el = document.getElementById('cartContents');
  if(!el) return;
  const cart = getCart();
  if(cart.length === 0){
    el.innerHTML = '<p class="muted">Your cart is empty.</p>';
    return;
  }
  el.innerHTML = cart.map(ci => {
    const prod = PRODUCTS.find(p => p.id === ci.id) || {};
    return `<div class="cart-item">
      <div class="cart-thumb" style="background-image:url('${prod.image}')"></div>
      <div class="cart-meta">
        <h4>${escapeHtml(prod.title||'Unknown')}</h4>
        <p class="muted">${escapeHtml(prod.price||'')}</p>
        <p>Qty: ${ci.qty}</p>
      </div>
      <div><button class="btn btn-outline remove" data-id="${ci.id}">Remove</button></div>
    </div>`;
  }).join('');
  // attach remove
  el.querySelectorAll('.remove').forEach(btn=>{
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      let cart = getCart();
      cart = cart.filter(i => i.id !== id);
      saveCart(cart);
      renderCartPage();
    });
  });
}

// small animation for add
function animateAdd(btn){
  btn.animate([{ transform: 'scale(1)'}, { transform: 'scale(0.95)'}, { transform:'scale(1)'}], { duration:250, easing:'ease-out' });
}

// Escape HTML for safety in the static environment
function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g, (m)=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

// Smooth scroll for same-page anchors
document.addEventListener('click',(e)=>{
  const a = e.target.closest('a');
  if(!a) return;
  if(a.getAttribute('href') && a.getAttribute('href').startsWith('#')){
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth'});
  }
});

// Contact form stub
document.addEventListener('submit', (e)=>{
  if(e.target && e.target.id === 'contactForm'){
    e.preventDefault();
    const msg = document.getElementById('contactMsg');
    msg.textContent = 'Thanks — message received (demo).';
    msg.classList.remove('muted');
    setTimeout(()=> msg.textContent = '', 4000);
  }
  if(e.target && e.target.id === 'checkoutForm'){
    e.preventDefault();
    const m = document.getElementById('checkoutMsg');
    m.textContent = 'Order placed (demo). Thank you!';
    setTimeout(()=> m.textContent = '', 4000);
    localStorage.removeItem('hom_cart');
    renderCartPage();
  }
  if(e.target && e.target.id === 'adminLoginForm'){
    e.preventDefault();
    const msg = document.getElementById('adminMsg');
    msg.textContent = 'Login accepted (demo). Redirecting...';
    setTimeout(()=> location.href = 'admin-dashboard.html', 800);
  }
});

// On load: fetch products and show cart if on cart page
window.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  renderCartPage();
});
