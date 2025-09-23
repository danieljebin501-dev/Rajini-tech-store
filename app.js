// Product data - Rajinikanth approved PC components! 🔥
const PRODUCTS = [
  { id: 'cpu-ryzen7', name: 'AMD Ryzen 7 7800X3D', category: 'CPU', brand: 'AMD', price: 399.99, rating: 4.9, stock: 14, popular: true, image: 'https://images.unsplash.com/photo-1611095775121-cc62f54f9f5b?q=80&w=800&auto=format&fit=crop', tags: ['AM5','8-Core','Superstar Power'] },
  { id: 'cpu-i7', name: 'Intel Core i7-13700K', category: 'CPU', brand: 'Intel', price: 379.99, rating: 4.8, stock: 7, popular: true, image: 'https://images.unsplash.com/photo-1591539267860-5a31a104ad42?q=80&w=800&auto=format&fit=crop', tags: ['LGA1700','16-Core','Simply Superb'] },
  { id: 'gpu-rtx4070', name: 'NVIDIA GeForce RTX 4070', category: 'GPU', brand: 'NVIDIA', price: 599.00, rating: 4.7, stock: 9, popular: true, image: 'https://images.unsplash.com/photo-1616077168079-7e09a9a1a8c8?q=80&w=1000&auto=format&fit=crop', tags: ['12GB GDDR6X','Rajini Approved'] },
  { id: 'gpu-rx7800', name: 'AMD Radeon RX 7800 XT', category: 'GPU', brand: 'AMD', price: 499.00, rating: 4.6, stock: 0, popular: false, image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=1000&auto=format&fit=crop', tags: ['16GB GDDR6','Superstar GPU'] },
  { id: 'mb-x670e', name: 'ASUS ROG Crosshair X670E', category: 'Motherboard', brand: 'ASUS', price: 459.99, rating: 4.7, stock: 5, popular: false, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop', tags: ['AM5','PCIe 5.0','Rajini Tech'] },
  { id: 'ram-32-ddr5', name: 'Corsair Vengeance 32GB DDR5-6000', category: 'RAM', brand: 'Corsair', price: 109.99, rating: 4.8, stock: 24, popular: true, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1000&auto=format&fit=crop', tags: ['2×16GB','Superstar Speed'] },
  { id: 'ssd-1tb', name: 'Samsung 990 Pro 1TB NVMe', category: 'Storage', brand: 'Samsung', price: 129.99, rating: 4.9, stock: 18, popular: true, image: 'https://images.unsplash.com/photo-1587825140400-9c61870d0e5b?q=80&w=1000&auto=format&fit=crop', tags: ['PCIe 4.0','Lightning Fast'] },
  { id: 'psu-850', name: 'Seasonic Focus 850W Gold', category: 'Power Supply', brand: 'Seasonic', price: 129.99, rating: 4.7, stock: 13, popular: false, image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1000&auto=format&fit=crop', tags: ['80+ Gold','Superstar Power'] },
  { id: 'case-lianli', name: 'Lian Li O11 Dynamic', category: 'Case', brand: 'Lian Li', price: 159.99, rating: 4.8, stock: 6, popular: true, image: 'https://images.unsplash.com/photo-1563211377-72f1e5b561a6?q=80&w=1000&auto=format&fit=crop', tags: ['ATX','Rajini Style'] },
  { id: 'cooler-nh15', name: 'Noctua NH‑D15 Chromax', category: 'Cooling', brand: 'Noctua', price: 99.99, rating: 4.9, stock: 8, popular: false, image: 'https://images.unsplash.com/photo-1565514020179-026b92b89a12?q=80&w=1000&auto=format&fit=crop', tags: ['Air','Cool as Rajini'] },
  { id: 'monitor-4k', name: 'Samsung Odyssey G7 4K 144Hz', category: 'Monitor', brand: 'Samsung', price: 699.99, rating: 4.8, stock: 12, popular: true, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop', tags: ['4K','144Hz','Superstar Display'] },
  { id: 'keyboard-mech', name: 'Corsair K100 RGB Mechanical', category: 'Keyboard', brand: 'Corsair', price: 199.99, rating: 4.7, stock: 15, popular: false, image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=1000&auto=format&fit=crop', tags: ['RGB','Mechanical','Rajini Typing'] }
];

const state = {
  query: '',
  category: 'all',
  sort: 'popularity',
  inStockOnly: false,
  cart: new Map(), // id -> { product, qty }
};

const els = {
  year: document.getElementById('year'),
  grid: document.getElementById('productGrid'),
  search: document.getElementById('searchInput'),
  category: document.getElementById('categorySelect'),
  sort: document.getElementById('sortSelect'),
  inStock: document.getElementById('inStockToggle'),
  cartOpen: document.getElementById('cartOpen'),
  cartClose: document.getElementById('cartClose'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartItems: document.getElementById('cartItems'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  cartCount: document.getElementById('cartCount'),
  checkout: document.getElementById('checkoutBtn'),
  backdrop: document.getElementById('drawerBackdrop'),
  themeToggle: document.getElementById('themeToggle'),
};

function init(){
  els.year.textContent = new Date().getFullYear();
  populateCategories();
  bindEvents();
  render();
}

function populateCategories(){
  const cats = Array.from(new Set(PRODUCTS.map(p => p.category))).sort();
  for(const c of cats){
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c; els.category.appendChild(opt);
  }
}

function bindEvents(){
  els.search.addEventListener('input', e=>{ state.query = e.target.value.trim().toLowerCase(); render(); });
  els.category.addEventListener('change', e=>{ state.category = e.target.value; render(); });
  els.sort.addEventListener('change', e=>{ state.sort = e.target.value; render(); });
  els.inStock.addEventListener('change', e=>{ state.inStockOnly = e.target.checked; render(); });

  els.cartOpen.addEventListener('click', openCart);
  els.cartClose.addEventListener('click', closeCart);
  els.backdrop.addEventListener('click', closeCart);
  els.checkout.addEventListener('click', ()=>{
    if(state.cart.size === 0) {
      alert('Rajinikanth says: "Even I cannot checkout with an empty cart! Add some superstar components first!" 🛒');
      return;
    }
    const checkoutMessages = [
      "Rajinikanth says: 'Your order is being processed with superstar speed!' 🚀",
      "Superstar checkout initiated! Your components will arrive with the power of a thousand suns! ☀️",
      "Rajinikanth approved your purchase! Prepare for the ultimate PC experience! ⚡",
      "Your order is now powered by Rajinikanth energy! Simply superb! 🔥"
    ];
    const randomCheckout = checkoutMessages[Math.floor(Math.random() * checkoutMessages.length)];
    alert(`${randomCheckout}\n\nTotal: ${els.cartSubtotal.textContent}\n\n(Note: This is a demo - no actual payment will be processed)`);
  });

  els.themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('light');
  });
}

function filterAndSortProducts(){
  let list = PRODUCTS.slice();
  if(state.query){
    list = list.filter(p => (p.name + ' ' + p.brand + ' ' + p.tags.join(' ')).toLowerCase().includes(state.query));
  }
  if(state.category !== 'all'){
    list = list.filter(p => p.category === state.category);
  }
  if(state.inStockOnly){
    list = list.filter(p => p.stock > 0);
  }
  switch(state.sort){
    case 'price-asc': list.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': list.sort((a,b)=>b.price-a.price); break;
    case 'rating-desc': list.sort((a,b)=>b.rating-a.rating); break;
    case 'name-asc': list.sort((a,b)=>a.name.localeCompare(b.name)); break;
    default: list.sort((a,b)=>Number(b.popular)-Number(a.popular));
  }
  return list;
}

function money(n){ return `$${n.toFixed(2)}`; }

function render(){
  const items = filterAndSortProducts();
  els.grid.innerHTML = '';
  if(items.length === 0){
    const empty = document.createElement('div');
    empty.textContent = 'No products match your filters.';
    empty.className = 'tag';
    els.grid.appendChild(empty);
    return;
  }
  for(const p of items){
    els.grid.appendChild(renderCard(p));
  }
}

function renderCard(p){
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-media">
      ${p.popular ? '<div class="pill">🔥 Popular</div>' : ''}
      <img alt="${p.name}" src="${p.image}">
    </div>
    <div class="card-body">
      <h3 class="title">${p.name}</h3>
      <p class="subtitle">${p.brand} • ${p.category}</p>
      <div class="price-row">
        <span class="price">${money(p.price)}</span>
        <span class="rating">★ ${p.rating.toFixed(1)}</span>
      </div>
      <div class="tag">${p.tags.join(' • ')}</div>
      <div class="price-row">
        <span class="stock ${p.stock>0?'in':'out'}">${p.stock>0? 'In stock' : 'Out of stock'}</span>
        <div class="actions">
          <button class="btn btn-ghost" data-id="${p.id}" data-act="details">Details</button>
          <button class="btn btn-primary" data-id="${p.id}" data-act="add" ${p.stock===0?'disabled':''}>Add to cart</button>
        </div>
      </div>
    </div>`;

  card.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = e.currentTarget.getAttribute('data-id');
      const act = e.currentTarget.getAttribute('data-act');
      if(act === 'add') addToCart(id);
      if(act === 'details') showDetails(id);
    });
  });
  return card;
}

function showDetails(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  const messages = [
    "Superstar approved! This component is simply superb! 🔥",
    "Rajinikanth says: 'This is not just a component, it's a phenomenon!' ⚡",
    "Even Rajinikanth would be impressed by this power! 🚀",
    "This component has the energy of a thousand suns! ☀️",
    "Rajinikanth approved - guaranteed to blow your mind! 💥"
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  alert(`${p.name}\n\nBrand: ${p.brand}\nCategory: ${p.category}\nPrice: ${money(p.price)}\nRating: ${p.rating}\n\n${randomMessage}`);
}

function addToCart(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  const entry = state.cart.get(id) || { product: p, qty: 0 };
  if(p.stock === 0){ 
    alert('Rajinikanth says: "Even I cannot create something from nothing! This item is out of stock." 😔'); 
    return; 
  }
  entry.qty = Math.min(entry.qty + 1, p.stock);
  state.cart.set(id, entry);
  
  // Rajinikanth-style success message
  const successMessages = [
    "Superstar power added to cart! 🔥",
    "Rajinikanth approved! Item added! ⚡",
    "Simply superb! Added to your cart! 🚀",
    "This component now has your cart's energy! 💥"
  ];
  const randomSuccess = successMessages[Math.floor(Math.random() * successMessages.length)];
  
  // Create a temporary notification
  const notification = document.createElement('div');
  notification.textContent = randomSuccess;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #d4af37, #ff6b35);
    color: #000;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 800;
    z-index: 1000;
    box-shadow: 0 8px 20px rgba(212,175,55,.4);
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2000);
  
  syncCartUI();
}

function removeFromCart(id){
  state.cart.delete(id);
  syncCartUI();
}

function changeQty(id, delta){
  const entry = state.cart.get(id);
  if(!entry) return;
  entry.qty = Math.max(1, Math.min(entry.qty + delta, entry.product.stock));
  if(entry.qty <= 0) state.cart.delete(id);
  syncCartUI();
}

function syncCartUI(){
  // count
  let count = 0; let subtotal = 0;
  els.cartItems.innerHTML = '';
  for(const [id, {product, qty}] of state.cart.entries()){
    count += qty; subtotal += qty * product.price;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img alt="${product.name}" src="${product.image}">
      <div class="meta">
        <strong>${product.name}</strong>
        <span class="tag">${money(product.price)} • ${product.brand}</span>
        <div class="qty">
          <button class="btn btn-ghost" data-id="${id}" data-act="dec">−</button>
          <span>${qty}</span>
          <button class="btn btn-ghost" data-id="${id}" data-act="inc">+</button>
        </div>
      </div>
      <div>
        <div><strong>${money(product.price*qty)}</strong></div>
        <button class="btn btn-ghost" data-id="${id}" data-act="rm">Remove</button>
      </div>`;
    row.querySelectorAll('button').forEach(b=>{
      b.addEventListener('click', (e)=>{
        const iid = e.currentTarget.getAttribute('data-id');
        const act = e.currentTarget.getAttribute('data-act');
        if(act==='dec') changeQty(iid, -1);
        if(act==='inc') changeQty(iid, 1);
        if(act==='rm') removeFromCart(iid);
      });
    });
    els.cartItems.appendChild(row);
  }
  els.cartSubtotal.textContent = money(subtotal);
  els.cartCount.textContent = String(count);
}

function openCart(){
  els.cartDrawer.classList.add('open');
  els.cartDrawer.setAttribute('aria-hidden','false');
  els.backdrop.hidden = false;
}
function closeCart(){
  els.cartDrawer.classList.remove('open');
  els.cartDrawer.setAttribute('aria-hidden','true');
  els.backdrop.hidden = true;
}

document.addEventListener('DOMContentLoaded', init);


