"use client";
"use client";


import DemoAppTemplate from "../DemoAppTemplate";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

// --- Demo Mini-Apps (copied from main portfolio page) ---
import { useState } from "react";

function ECommerceApp() {
  // Tabs and state
  const [tab, setTab] = useState<'catalog'|'cart'|'orders'|'profile'|'admin'|'wishlist'|'analytics'|'reviews'|'support'>('catalog');
  // Product catalog
  const [products] = useState([
    { id: 1, name: 'Premium Cotton T-Shirt', price: 29.99, img: '👕', desc: 'Soft organic cotton T-shirt with sustainable materials', rating: 4.8, category: 'Clothing', stock: 45, reviews: 128, colors: ['Black', 'White', 'Gray'], sizes: ['S', 'M', 'L', 'XL'] },
    { id: 2, name: 'Designer Slim Jeans', price: 89.99, img: '👖', desc: 'Premium slim fit jeans with stretch comfort', rating: 4.6, category: 'Clothing', stock: 23, reviews: 89, colors: ['Blue', 'Black'], sizes: ['28', '30', '32', '34', '36'] },
    { id: 3, name: 'Athletic Sneakers Pro', price: 149.99, img: '👟', desc: 'High-performance sneakers with advanced cushioning', rating: 4.9, category: 'Footwear', stock: 12, reviews: 247, colors: ['White', 'Black', 'Blue'], sizes: ['7', '8', '9', '10', '11', '12'] },
    { id: 4, name: 'Winter Jacket Deluxe', price: 199.99, img: '🧥', desc: 'Waterproof winter jacket with premium insulation', rating: 4.7, category: 'Outerwear', stock: 8, reviews: 156, colors: ['Black', 'Navy', 'Gray'], sizes: ['S', 'M', 'L', 'XL'] },
    { id: 5, name: 'Baseball Cap Classic', price: 24.99, img: '🧢', desc: 'Adjustable baseball cap with embroidered logo', rating: 4.3, category: 'Accessories', stock: 67, reviews: 43, colors: ['Black', 'White', 'Red', 'Blue'], sizes: ['One Size'] },
    { id: 6, name: 'Leather Wallet Premium', price: 79.99, img: '💼', desc: 'Genuine leather wallet with RFID protection', rating: 4.8, category: 'Accessories', stock: 34, reviews: 92, colors: ['Brown', 'Black'], sizes: ['One Size'] },
    { id: 7, name: 'Wireless Headphones', price: 199.99, img: '🎧', desc: 'Noise-canceling wireless headphones with 30h battery', rating: 4.9, category: 'Electronics', stock: 19, reviews: 312, colors: ['Black', 'White', 'Silver'], sizes: ['One Size'] },
    { id: 8, name: 'Smart Watch Sport', price: 299.99, img: '⌚', desc: 'Fitness tracking smartwatch with GPS and heart rate', rating: 4.7, category: 'Electronics', stock: 15, reviews: 189, colors: ['Black', 'Silver', 'Rose Gold'], sizes: ['38mm', '42mm'] },
  ]);
  // Cart
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number; img: string; size?: string; color?: string }[]>([]);
  // Orders
  const [orders, setOrders] = useState<any[]>([
    { id: 1001, items: [{ name: 'Premium Cotton T-Shirt', qty: 2, price: 29.99 }], date: '2025-11-05', total: 67.98, status: 'Delivered' },
    { id: 1002, items: [{ name: 'Athletic Sneakers Pro', qty: 1, price: 149.99 }], date: '2025-11-03', total: 159.98, status: 'Shipped' }
  ]);
  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>([3, 7]);
  // Profile
  const [profile] = useState({ name: 'Jane Customer', email: 'jane@email.com', address: '123 Main St, Downtown', phone: '(555) 123-4567', memberSince: '2023', totalOrders: 47, totalSpent: 2847.50 });
  // Admin analytics
  const [analytics] = useState({ sales: 1247, revenue: 125400, users: 2847, conversionRate: 3.2, avgOrderValue: 89.50, topProduct: 'Athletic Sneakers Pro' });
  // Filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  // Reviews
  const [reviews] = useState([
    { id: 1, productId: 3, user: 'Mike R.', rating: 5, text: 'Amazing sneakers! Great comfort and style.', date: '2025-11-08', verified: true },
    { id: 2, productId: 1, user: 'Sarah L.', rating: 4, text: 'Good quality t-shirt, fits perfectly.', date: '2025-11-07', verified: true },
    { id: 3, productId: 7, user: 'Alex K.', rating: 5, text: 'Best headphones I ever owned!', date: '2025-11-06', verified: false }
  ]);

  // Cart handlers
  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  }
  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }
  function checkout() {
    if (cart.length > 0) {
      setOrders([{ id: Date.now(), items: cart, date: new Date().toLocaleDateString(), total: cart.reduce((sum, i) => sum + i.price * i.qty, 0) }, ...orders]);
      setCart([]);
    }
  }
  // Wishlist
  function toggleWishlist(id: number) {
    setWishlist((prev) => prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]);
  }

  // UI
  return (
  <div className="flex flex-row gap-8 min-h-[700px] max-w-[1400px] mx-auto w-full px-6 py-8 overflow-x-auto">
      {/* Sidebar */}
  <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-pink-600 via-pink-500 to-pink-400 rounded-2xl p-6 shadow-2xl flex flex-col min-h-[700px] sticky left-0 top-0 h-fit border border-pink-300/30 backdrop-blur-sm animate-slideInLeft">
        <div className="font-extrabold text-white text-2xl mb-8 tracking-wide animate-glow">✨ ShopEase</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='catalog'?'bg-gradient-to-r from-white to-pink-50 text-pink-700 shadow-xl border-2 border-pink-200':'text-white hover:bg-pink-500/80 hover:shadow-pink-500/50'}`} onClick={()=>setTab('catalog')}>🛍️ Catalog</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='cart'?'bg-gradient-to-r from-white to-pink-50 text-pink-700 shadow-xl border-2 border-pink-200':'text-white hover:bg-pink-500/80 hover:shadow-pink-500/50'}`} onClick={()=>setTab('cart')}>🛒 Cart ({cart.length})</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='orders'?'bg-gradient-to-r from-white to-pink-50 text-pink-700 shadow-xl border-2 border-pink-200':'text-white hover:bg-pink-500/80 hover:shadow-pink-500/50'}`} onClick={()=>setTab('orders')}>📦 Orders</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='wishlist'?'bg-gradient-to-r from-white to-pink-50 text-pink-700 shadow-xl border-2 border-pink-200':'text-white hover:bg-pink-500/80 hover:shadow-pink-500/50'}`} onClick={()=>setTab('wishlist')}>💖 Wishlist ({wishlist.length})</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='reviews'?'bg-gradient-to-r from-white to-pink-50 text-pink-700 shadow-xl border-2 border-pink-200':'text-white hover:bg-pink-500/80 hover:shadow-pink-500/50'}`} onClick={()=>setTab('reviews')}>⭐ Reviews</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='profile'?'bg-gradient-to-r from-white to-pink-50 text-pink-700 shadow-xl border-2 border-pink-200':'text-white hover:bg-pink-500/80 hover:shadow-pink-500/50'}`} onClick={()=>setTab('profile')}>👤 Profile</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='analytics'?'bg-gradient-to-r from-white to-pink-50 text-pink-700 shadow-xl border-2 border-pink-200':'text-white hover:bg-pink-500/80 hover:shadow-pink-500/50'}`} onClick={()=>setTab('analytics')}>📈 Analytics</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='support'?'bg-gradient-to-r from-white to-pink-50 text-pink-700 shadow-xl border-2 border-pink-200':'text-white hover:bg-pink-500/80 hover:shadow-pink-500/50'}`} onClick={()=>setTab('support')}>💬 Support</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='admin'?'bg-gradient-to-r from-white to-pink-50 text-pink-700 shadow-xl border-2 border-pink-200':'text-white hover:bg-pink-500/80 hover:shadow-pink-500/50'}`} onClick={()=>setTab('admin')}>� Admin</button></li>
          </ul>
        </nav>
        <div className="mt-8 text-xs text-pink-100 opacity-80 animate-pulse">© 2025 ShopEase. All rights reserved.</div>
      </aside>
      {/* Main Content */}
  <main className="flex-1 bg-gradient-to-br from-white via-pink-50/30 to-white rounded-2xl px-8 py-8 shadow-2xl overflow-x-auto min-w-0 border border-pink-100/50 backdrop-blur-sm animate-slideInRight min-h-[700px]">
        {tab === 'catalog' && (
          <div>
            <div className="text-4xl font-black mb-8 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">🛍️ Product Catalog</div>
            
            {/* Advanced Search and Filters */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-8 border border-pink-100/50 shadow-lg animate-fadeInUp">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="🔍 Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="col-span-2 px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                />
                <select 
                  value={categoryFilter} 
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                >
                  <option value="">All Categories</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Outerwear">Outerwear</option>
                </select>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Price: $0-500</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter(p => 
                  (!searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.desc.toLowerCase().includes(searchTerm.toLowerCase())) &&
                  (!categoryFilter || p.category === categoryFilter) &&
                  (p.price >= priceRange[0] && p.price <= priceRange[1])
                )
                .sort((a, b) => {
                  switch(sortBy) {
                    case 'price-low': return a.price - b.price;
                    case 'price-high': return b.price - a.price;
                    case 'rating': return b.rating - a.rating;
                    case 'newest': return b.id - a.id;
                    default: return 0;
                  }
                })
                .map((p, idx) => (
                <div key={p.id} className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 shadow-xl hover:shadow-2xl flex flex-col items-center border border-pink-100/50 transform hover:scale-105 hover:shadow-pink-500/30 transition-all duration-500 hover:-rotate-1 animate-fadeInUp group" style={{animationDelay: `${idx * 100}ms`}}>
                  <div className="relative mb-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center text-5xl group-hover:animate-bounce transition-all duration-300">{p.img}</div>
                    {p.stock < 10 && <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">Low Stock!</div>}
                    <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">{p.category}</div>
                  </div>
                  <div className="font-bold text-lg mb-1 text-gray-800 text-center leading-tight">{p.name}</div>
                  <div className="text-3xl font-black mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">${p.price}</div>
                  <div className="text-gray-700 text-sm mb-3 text-center leading-relaxed">{p.desc}</div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="text-yellow-500 text-lg">{'★'.repeat(Math.floor(p.rating))}{'☆'.repeat(5-Math.floor(p.rating))}</div>
                    <span className="text-xs text-gray-600 font-medium">({p.rating}) • {p.reviews} reviews</span>
                  </div>
                  <div className="mb-3 text-center">
                    <div className="text-xs text-gray-700 mb-1">Colors: {p.colors.slice(0,3).join(', ')}{p.colors.length > 3 && '...'}</div>
                    <div className="text-xs text-gray-700">Stock: {p.stock} available</div>
                  </div>
                  <div className="flex gap-2 w-full mt-auto">
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 font-bold shadow-lg hover:shadow-pink-500/50 disabled:opacity-50" onClick={()=>addToCart(p)} disabled={p.stock === 0}>
                      {p.stock === 0 ? '❌ Sold Out' : '🛒 Add to Cart'}
                    </button>
                    <button className={`px-4 py-3 rounded-xl transform hover:scale-105 transition-all duration-300 font-bold shadow-lg ${wishlist.includes(p.id)?'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-yellow-500/50':'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-yellow-100 hover:to-yellow-200'}`} onClick={()=>toggleWishlist(p.id)}>
                      {wishlist.includes(p.id)?'💖':'🤍'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'cart' && (
          <div>
            <div className="text-4xl font-black mb-8 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-shimmer bg-300%">🛒 Your Cart</div>
            {cart.length === 0 ? (
              <div className="text-center py-16 animate-fadeIn">
                <div className="text-6xl mb-4 animate-bounce">🛒</div>
                <div className="text-gray-700 text-xl font-medium">Your cart is empty</div>
                <button className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 font-bold shadow-lg" onClick={()=>setTab('catalog')}>
                  Start Shopping ✨
                </button>
              </div>
            ) : (
              <>
                <ul className="space-y-4 mb-6">
                  {cart.map((item, idx) => (
                    <li key={item.id} className="flex items-center justify-between bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl shadow-xl border border-pink-100/50 animate-slideInUp hover:shadow-2xl transition-all duration-300" style={{animationDelay: `${idx * 100}ms`}}>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl animate-pulse">{item.img || '📦'}</div>
                        <span className="font-bold">{item.name}</span>
                        <span className="text-pink-700">${item.price}</span>
                        <span className="text-gray-800">x {item.qty}</span>
                      </div>
                      <button className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition" onClick={()=>removeFromCart(item.id)}>Remove</button>
                    </li>
                  ))}
                </ul>
                <div className="font-bold text-xl mb-4">Total: ${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}</div>
                <button className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700" onClick={checkout}>Checkout</button>
              </>
            )}
          </div>
        )}
        {tab === 'orders' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-pink-700">Order History</div>
            {orders.length === 0 ? (
              <div className="text-gray-500">No orders yet.</div>
            ) : (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order.id} className="bg-pink-50 p-4 rounded shadow">
                    <div className="mb-2 font-bold">Order #{order.id} - {order.date}</div>
                    <ul className="mb-2">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex items-center gap-2">
                          <img src={item.img} alt={item.name} className="w-8 h-8 object-cover rounded" />
                          <span>{item.name} x {item.qty}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="font-semibold">Total: ${order.total}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {tab === 'wishlist' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-pink-700">Wishlist</div>
            {wishlist.length === 0 ? (
              <div className="text-gray-700">No items in wishlist.</div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.filter(p=>wishlist.includes(p.id)).map((p) => (
                  <li key={p.id} className="bg-yellow-50 rounded-xl p-6 shadow flex flex-col items-center">
                    <img src={p.img} alt={p.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <div className="font-bold text-lg mb-1">{p.name}</div>
                    <div className="text-pink-700 font-semibold mb-2">${p.price}</div>
                    <button className="px-4 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500" onClick={()=>addToCart(p)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {tab === 'profile' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-pink-700">User Profile</div>
            <div className="bg-pink-50 rounded-xl p-8 shadow w-full max-w-lg mx-auto">
              <div className="font-bold text-lg mb-2">{profile.name}</div>
              <div className="mb-1">Email: <span className="text-gray-700">{profile.email}</span></div>
              <div className="mb-1">Address: <span className="text-gray-700">{profile.address}</span></div>
              <button className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">Edit Profile</button>
            </div>
          </div>
        )}
        {tab === 'admin' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-pink-700">Admin Analytics</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-pink-100 rounded-xl p-8 text-center shadow">
                <div className="text-lg font-semibold text-pink-700">Total Sales</div>
                <div className="text-4xl font-extrabold mt-2">{analytics.sales}</div>
              </div>
              <div className="bg-pink-100 rounded-xl p-8 text-center shadow">
                <div className="text-lg font-semibold text-pink-700">Revenue</div>
                <div className="text-4xl font-extrabold mt-2">${analytics.revenue}</div>
              </div>
              <div className="bg-pink-100 rounded-xl p-8 text-center shadow">
                <div className="text-lg font-semibold text-pink-700">Users</div>
                <div className="text-4xl font-extrabold mt-2">{analytics.users}</div>
              </div>
            </div>
            <div className="bg-white border rounded-xl p-8 shadow">
              <div className="font-bold mb-2">Recent Orders</div>
              {orders.length === 0 ? <div className="text-gray-500">No orders yet.</div> : (
                <ul className="space-y-2">
                  {orders.slice(0,3).map((order) => (
                    <li key={order.id} className="flex justify-between">
                      <span>Order #{order.id}</span>
                      <span>${order.total}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
function BankingApp() {
  // Tabs and state
  const [tab, setTab] = useState<'dashboard'|'accounts'|'transfer'|'transactions'|'bills'|'budget'|'analytics'|'notifications'|'support'>('dashboard');
  // Accounts
  const [accounts, setAccounts] = useState([
    { id: 1, type: 'Checking', balance: 3200.50, number: '****1234', interestRate: 0.01, accountType: 'Primary', openDate: '2023-01-15', lastActivity: '2025-11-09' },
    { id: 2, type: 'Savings', balance: 8200.00, number: '****5678', interestRate: 2.15, accountType: 'High-Yield', openDate: '2023-03-22', lastActivity: '2025-11-08' },
    { id: 3, type: 'Investment', balance: 15750.25, number: '****9012', interestRate: 7.25, accountType: 'Portfolio', openDate: '2023-06-10', lastActivity: '2025-11-09' },
  ]);
  // Transfers
  const [transfer, setTransfer] = useState({ from: 1, to: 2, amount: 0 });
  // Transactions
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Deposit', amount: 2500, date: '2025-11-09', account: 'Checking', description: 'Salary Deposit', category: 'Income', status: 'Completed' },
    { id: 2, type: 'Withdrawal', amount: 350, date: '2025-11-08', account: 'Checking', description: 'ATM Withdrawal', category: 'Cash', status: 'Completed' },
    { id: 3, type: 'Transfer', amount: 1000, date: '2025-11-07', account: 'Savings', description: 'Monthly Savings', category: 'Transfer', status: 'Completed' },
    { id: 4, type: 'Payment', amount: 125.50, date: '2025-11-06', account: 'Checking', description: 'Electric Bill', category: 'Utilities', status: 'Completed' },
    { id: 5, type: 'Purchase', amount: 89.99, date: '2025-11-05', account: 'Checking', description: 'Online Shopping', category: 'Shopping', status: 'Completed' },
    { id: 6, type: 'Deposit', amount: 75.00, date: '2025-11-04', account: 'Savings', description: 'Interest Payment', category: 'Interest', status: 'Completed' },
    { id: 7, type: 'Transfer', amount: 500, date: '2025-11-03', account: 'Investment', description: 'Investment Contribution', category: 'Investment', status: 'Completed' },
  ]);
  // Bills
  const [bills, setBills] = useState([
    { id: 1, name: 'Electricity', due: '2025-11-20', amount: 120.50, paid: false },
    { id: 2, name: 'Internet', due: '2025-11-22', amount: 60.00, paid: false },
  ]);
  // Budget
  const [budget, setBudget] = useState({ income: 5000, expenses: 3200, savings: 1800 });
  // Analytics (dummy chart data)
  const [analytics] = useState({
    months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    balances: [2000, 2500, 3000, 3500, 3200],
    expenses: [1200, 1400, 1100, 1300, 1250],
  });
  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your bill for Electricity is due soon.', date: '2025-11-10' },
    { id: 2, text: 'Transfer of $500 completed.', date: '2025-11-05' },
  ]);
  // Support chat
  const [messages, setMessages] = useState([
    { from: 'Support', text: 'How can we help you today?' },
  ]);
  const [newMsg, setNewMsg] = useState('');

  // Handlers
  function handleTransfer() {
    if (transfer.amount > 0 && transfer.from !== transfer.to) {
      setAccounts(accs => accs.map(a =>
        a.id === transfer.from ? { ...a, balance: a.balance - transfer.amount } :
        a.id === transfer.to ? { ...a, balance: a.balance + transfer.amount } : a
      ));
      setTransactions([{ 
        id: Date.now(), 
        type: 'Transfer', 
        amount: transfer.amount, 
        date: new Date().toLocaleDateString(), 
        account: accounts.find(a=>a.id===transfer.to)?.type || '', 
        description: `Transfer to ${accounts.find(a=>a.id===transfer.to)?.type}`,
        category: 'Transfer',
        status: 'Completed'
      }, ...transactions]);
      setTransfer({ ...transfer, amount: 0 });
    }
  }
  function payBill(id: number) {
    const bill = bills.find(b=>b.id===id);
    setBills(bs => bs.map(b => b.id === id ? { ...b, paid: true } : b));
    setTransactions([{ 
      id: Date.now(), 
      type: 'Bill Pay', 
      amount: bill?.amount || 0, 
      date: new Date().toLocaleDateString(), 
      account: 'Checking',
      description: `Payment for ${bill?.name}`,
      category: 'Bills',
      status: 'Completed'
    }, ...transactions]);
  }
  function sendMessage() {
    if (newMsg.trim()) {
      setMessages([...messages, { from: 'You', text: newMsg }]);
      setNewMsg('');
    }
  }

  // UI
  return (
    <div className="flex flex-row gap-8 min-h-[700px] max-w-[1400px] mx-auto w-full px-6 py-8 overflow-x-auto">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 rounded-2xl p-6 shadow-2xl flex flex-col min-h-[700px] sticky left-0 top-0 h-fit border border-blue-300/30 backdrop-blur-sm animate-slideInLeft">
        <div className="font-extrabold text-white text-2xl mb-8 tracking-wide animate-glow">💳 BankPro</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='dashboard'?'bg-gradient-to-r from-white to-blue-50 text-blue-700 shadow-xl border-2 border-blue-200':'text-white hover:bg-blue-600/80 hover:shadow-blue-500/50'}`} onClick={()=>setTab('dashboard')}>📊 Dashboard</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='accounts'?'bg-gradient-to-r from-white to-blue-50 text-blue-700 shadow-xl border-2 border-blue-200':'text-white hover:bg-blue-600/80 hover:shadow-blue-500/50'}`} onClick={()=>setTab('accounts')}>🏦 Accounts</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='transfer'?'bg-gradient-to-r from-white to-blue-50 text-blue-700 shadow-xl border-2 border-blue-200':'text-white hover:bg-blue-600/80 hover:shadow-blue-500/50'}`} onClick={()=>setTab('transfer')}>💸 Transfer</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='transactions'?'bg-gradient-to-r from-white to-blue-50 text-blue-700 shadow-xl border-2 border-blue-200':'text-white hover:bg-blue-600/80 hover:shadow-blue-500/50'}`} onClick={()=>setTab('transactions')}>📝 Transactions</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='bills'?'bg-gradient-to-r from-white to-blue-50 text-blue-700 shadow-xl border-2 border-blue-200':'text-white hover:bg-blue-600/80 hover:shadow-blue-500/50'}`} onClick={()=>setTab('bills')}>💰 Bill Pay</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='budget'?'bg-gradient-to-r from-white to-blue-50 text-blue-700 shadow-xl border-2 border-blue-200':'text-white hover:bg-blue-600/80 hover:shadow-blue-500/50'}`} onClick={()=>setTab('budget')}>📈 Budget</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='analytics'?'bg-gradient-to-r from-white to-blue-50 text-blue-700 shadow-xl border-2 border-blue-200':'text-white hover:bg-blue-600/80 hover:shadow-blue-500/50'}`} onClick={()=>setTab('analytics')}>📊 Analytics</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='notifications'?'bg-gradient-to-r from-white to-blue-50 text-blue-700 shadow-xl border-2 border-blue-200':'text-white hover:bg-blue-600/80 hover:shadow-blue-500/50'}`} onClick={()=>setTab('notifications')}>🔔 Notifications</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='support'?'bg-gradient-to-r from-white to-blue-50 text-blue-700 shadow-xl border-2 border-blue-200':'text-white hover:bg-blue-600/80 hover:shadow-blue-500/50'}`} onClick={()=>setTab('support')}>💬 Support</button></li>
          </ul>
        </nav>
        <div className="mt-8 text-xs text-blue-100 opacity-80 animate-pulse">© 2025 BankPro. All rights reserved.</div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl px-8 py-8 shadow-2xl overflow-x-auto min-w-0 border border-blue-100/50 backdrop-blur-sm animate-slideInRight min-h-[700px]">
        {tab === 'dashboard' && (
          <div>
            <div className="text-4xl font-black mb-8 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">💳 Account Overview</div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl border border-green-100/50 animate-fadeInUp">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-green-700 font-semibold">Total Balance</div>
                  <div className="text-2xl">💰</div>
                </div>
                <div className="text-3xl font-black text-green-600">${accounts.reduce((sum, a) => sum + a.balance, 0).toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-xl border border-blue-100/50 animate-fadeInUp" style={{animationDelay: '100ms'}}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-blue-700 font-semibold">This Month</div>
                  <div className="text-2xl">�</div>
                </div>
                <div className="text-3xl font-black text-blue-600">+$2,487</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-xl border border-purple-100/50 animate-fadeInUp" style={{animationDelay: '200ms'}}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-purple-700 font-semibold">Avg. Interest</div>
                  <div className="text-2xl">📊</div>
                </div>
                <div className="text-3xl font-black text-purple-600">{(accounts.reduce((sum, a) => sum + a.interestRate, 0) / accounts.length).toFixed(2)}%</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 shadow-xl border border-orange-100/50 animate-fadeInUp" style={{animationDelay: '300ms'}}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-orange-700 font-semibold">Credit Score</div>
                  <div className="text-2xl">⭐</div>
                </div>
                <div className="text-3xl font-black text-orange-600">785</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {accounts.map((a, idx) => (
                <div key={a.id} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl flex flex-col border border-blue-100/50 transform hover:scale-105 hover:shadow-blue-500/30 transition-all duration-500 animate-fadeInUp group" style={{animationDelay: `${idx * 200}ms`}}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-lg text-gray-800">{a.type} Account</div>
                    <div className="text-3xl group-hover:animate-bounce transition-all duration-300">{a.type === 'Checking' ? '💳' : a.type === 'Savings' ? '💰' : '📈'}</div>
                  </div>
                  <div className="text-blue-700 font-semibold mb-2 opacity-70">{a.number}</div>
                  <div className="text-3xl font-black mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">${a.balance.toLocaleString()}</div>
                  <div className="text-gray-600 text-sm mb-3">Available Balance</div>
                  <div className="mb-3 p-3 bg-white/60 rounded-lg">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Interest Rate</span>
                      <span className="font-bold text-green-600">{a.interestRate}% APY</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Account Type</span>
                      <span className="font-bold">{a.accountType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Activity</span>
                      <span className="text-gray-500">{a.lastActivity}</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" style={{width: '85%'}}></div>
                    </div>
                    <div className="text-xs text-gray-500 text-center">Account Health: Excellent</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border rounded-xl p-6 shadow flex flex-col">
                <div className="font-bold text-blue-700 mb-2">Recent Transactions</div>
                <ul className="space-y-2">
                  {transactions.slice(0,3).map((tx, idx) => (
                    <li key={idx} className="flex justify-between bg-blue-50 p-3 rounded">
                      <span>{tx.type}</span>
                      <span>${tx.amount}</span>
                      <span className="text-xs text-gray-400">{tx.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border rounded-xl p-6 shadow flex flex-col">
                <div className="font-bold text-blue-700 mb-2">Notifications</div>
                <ul className="space-y-2">
                  {notifications.map(n => (
                    <li key={n.id} className="flex justify-between bg-blue-50 p-3 rounded">
                      <span>{n.text}</span>
                      <span className="text-xs text-gray-400">{n.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {tab === 'accounts' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-blue-700">Accounts</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {accounts.map(a => (
                <div key={a.id} className="bg-blue-50 rounded-xl p-6 shadow flex flex-col">
                  <div className="font-bold text-lg mb-1">{a.type} Account</div>
                  <div className="text-blue-700 font-semibold mb-2">{a.number}</div>
                  <div className="text-2xl font-extrabold mb-2">${a.balance.toLocaleString()}</div>
                  <div className="text-gray-600 text-sm">Available Balance</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'transfer' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-blue-700">Transfer Funds</div>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <select value={transfer.from} onChange={e=>setTransfer(t=>({...t,from:Number(e.target.value)}))} className="border rounded px-3 py-2">
                {accounts.map(a=>(<option key={a.id} value={a.id}>From: {a.type}</option>))}
              </select>
              <select value={transfer.to} onChange={e=>setTransfer(t=>({...t,to:Number(e.target.value)}))} className="border rounded px-3 py-2">
                {accounts.map(a=>(<option key={a.id} value={a.id}>To: {a.type}</option>))}
              </select>
              <input type="number" min={1} value={transfer.amount} onChange={e=>setTransfer(t=>({...t,amount:Number(e.target.value)}))} className="border rounded px-3 py-2 w-32" placeholder="Amount" />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleTransfer}>Transfer</button>
            </div>
          </div>
        )}
        {tab === 'transactions' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-blue-700">Transaction History</div>
            <ul className="space-y-2">
              {transactions.map((tx, idx) => (
                <li key={idx} className="flex justify-between bg-blue-50 p-3 rounded shadow">
                  <span>{tx.type}</span>
                  <span>${tx.amount}</span>
                  <span>{tx.account}</span>
                  <span className="text-xs text-gray-400">{tx.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'bills' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-blue-700">Bill Pay</div>
            <ul className="space-y-4">
              {bills.map(bill => (
                <li key={bill.id} className="flex items-center justify-between bg-blue-50 p-4 rounded shadow">
                  <div>
                    <div className="font-bold">{bill.name}</div>
                    <div className="text-gray-600 text-sm">Due: {bill.due}</div>
                  </div>
                  <div className="font-bold text-blue-700">${bill.amount}</div>
                  <button className={`ml-4 px-4 py-1 rounded ${bill.paid?'bg-green-400 text-white':'bg-blue-600 text-white hover:bg-blue-700'}`} onClick={()=>payBill(bill.id)} disabled={bill.paid}>{bill.paid?'Paid':'Pay'}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'budget' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-blue-700">Budget</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
                <div className="font-bold text-lg mb-1">Income</div>
                <div className="text-2xl font-extrabold mb-2">${budget.income}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
                <div className="font-bold text-lg mb-1">Expenses</div>
                <div className="text-2xl font-extrabold mb-2">${budget.expenses}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
                <div className="font-bold text-lg mb-1">Savings</div>
                <div className="text-2xl font-extrabold mb-2">${budget.savings}</div>
              </div>
            </div>
          </div>
        )}
        {tab === 'analytics' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-blue-700">Analytics</div>
            <div className="bg-blue-50 rounded-xl p-8 shadow flex flex-col items-center">
              <div className="font-bold text-lg mb-4">Balance Over Time</div>
              <div className="w-full h-40 flex items-end gap-4">
                {analytics.balances.map((bal, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div className="bg-blue-600 rounded-t w-8" style={{height: `${bal/50}px`}}></div>
                    <div className="text-xs mt-2">{analytics.months[idx]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 shadow flex flex-col items-center mt-8">
              <div className="font-bold text-lg mb-4">Expenses Over Time</div>
              <div className="w-full h-40 flex items-end gap-4">
                {analytics.expenses.map((exp, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div className="bg-red-400 rounded-t w-8" style={{height: `${exp/20}px`}}></div>
                    <div className="text-xs mt-2">{analytics.months[idx]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === 'notifications' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-blue-700">Notifications</div>
            <ul className="space-y-2">
              {notifications.map(n => (
                <li key={n.id} className="flex justify-between bg-blue-50 p-3 rounded">
                  <span>{n.text}</span>
                  <span className="text-xs text-gray-400">{n.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'support' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-blue-700">Support Chat</div>
            <div className="mb-4 max-h-56 overflow-y-auto flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-center gap-3 ${msg.from==='You'?'justify-end':'justify-start'}`}>
                  <div className={`p-3 rounded-xl shadow ${msg.from==='You'?'bg-blue-100 text-blue-800':'bg-gray-100 text-gray-800'}`}><span className="font-semibold">{msg.from}: </span>{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input type="text" value={newMsg} onChange={e=>setNewMsg(e.target.value)} className="border rounded px-3 py-2 flex-1" placeholder="Type a message..." />
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
function HealthcareApp() {
  // Tabs and state
  const [tab, setTab] = useState<'dashboard'|'appointments'|'vitals'|'patients'|'messages'>('dashboard');
  const [appointments, setAppointments] = useState([
    { id: 1, date: '2025-11-12', time: '09:30 AM', doctor: 'Dr. Sarah Smith', patient: 'John Doe', type: 'Cardiology', status: 'Confirmed', avatar: '👨‍⚕️', duration: '30 min', room: '205A' },
    { id: 2, date: '2025-11-15', time: '02:15 PM', doctor: 'Dr. Michael Lee', patient: 'Jane Roe', type: 'General Checkup', status: 'Pending', avatar: '👩‍⚕️', duration: '45 min', room: '102B' },
    { id: 3, date: '2025-11-18', time: '11:00 AM', doctor: 'Dr. Emily Chen', patient: 'Robert Johnson', type: 'Dermatology', status: 'Confirmed', avatar: '👨‍⚕️', duration: '25 min', room: '301C' },
  ]);
  const [newAppt, setNewAppt] = useState({ date: '', time: '', doctor: '', patient: '', type: '', room: '' });
  const [vitals, setVitals] = useState({ heartRate: 72, bloodPressure: '120/80', temp: 98.6 });
  const [patients, setPatients] = useState([
    { name: 'John Doe', age: 34, condition: 'Diabetes', avatar: '/avatar1.png' },
    { name: 'Jane Roe', age: 28, condition: 'Hypertension', avatar: '/avatar2.png' },
  ]);
  const [messages, setMessages] = useState([
    { from: 'Dr. Smith', text: 'Please review your latest test results.', avatar: '/avatar1.png' },
    { from: 'Nurse Joy', text: 'Your appointment is confirmed.', avatar: '/avatar3.png' },
  ]);
  const [newMsg, setNewMsg] = useState('');

  // Handlers
  function addAppointment() {
    if (newAppt.date && newAppt.doctor && newAppt.patient && newAppt.time && newAppt.type) {
      setAppointments([{ 
        id: Date.now(), 
        ...newAppt, 
        avatar: '👨‍⚕️', 
        status: 'Pending',
        duration: '30 min'
      }, ...appointments]);
      setNewAppt({ date: '', time: '', doctor: '', patient: '', type: '', room: '' });
    }
  }
  function updateVitals() {
    setVitals({
      heartRate: 60 + Math.floor(Math.random() * 40),
      bloodPressure: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 20)}`,
      temp: 97 + Math.random() * 3,
    });
  }
  function sendMessage() {
    if (newMsg.trim()) {
      setMessages([...messages, { from: 'You', text: newMsg, avatar: '/avatar4.png' }]);
      setNewMsg('');
    }
  }

  // UI
  return (
  <div className="flex flex-row gap-8 min-h-[700px] max-w-[1400px] mx-auto w-full px-6 py-8 overflow-x-auto">
      {/* Sidebar */}
  <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-emerald-600 via-teal-600 to-cyan-500 rounded-2xl p-6 shadow-2xl flex flex-col min-h-[700px] sticky left-0 top-0 h-fit border border-emerald-300/30 backdrop-blur-sm animate-slideInLeft">
        <div className="font-extrabold text-white text-2xl mb-8 tracking-wide animate-glow">🏥 HealthPro</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='dashboard'?'bg-gradient-to-r from-white to-emerald-50 text-emerald-700 shadow-xl border-2 border-emerald-200':'text-white hover:bg-emerald-500/80 hover:shadow-emerald-500/50'}`} onClick={()=>setTab('dashboard')}>📊 Dashboard</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='appointments'?'bg-gradient-to-r from-white to-emerald-50 text-emerald-700 shadow-xl border-2 border-emerald-200':'text-white hover:bg-emerald-500/80 hover:shadow-emerald-500/50'}`} onClick={()=>setTab('appointments')}>📅 Appointments</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='vitals'?'bg-gradient-to-r from-white to-emerald-50 text-emerald-700 shadow-xl border-2 border-emerald-200':'text-white hover:bg-emerald-500/80 hover:shadow-emerald-500/50'}`} onClick={()=>setTab('vitals')}>💓 Vitals</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='patients'?'bg-gradient-to-r from-white to-emerald-50 text-emerald-700 shadow-xl border-2 border-emerald-200':'text-white hover:bg-emerald-500/80 hover:shadow-emerald-500/50'}`} onClick={()=>setTab('patients')}>👥 Patients</button></li>
            <li><button className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${tab==='messages'?'bg-gradient-to-r from-white to-emerald-50 text-emerald-700 shadow-xl border-2 border-emerald-200':'text-white hover:bg-emerald-500/80 hover:shadow-emerald-500/50'}`} onClick={()=>setTab('messages')}>💬 Messages</button></li>
          </ul>
        </nav>
        <div className="mt-8 text-xs text-emerald-100 opacity-80 animate-pulse">© 2025 HealthPro. All rights reserved.</div>
      </aside>
      {/* Main Content */}
  <main className="flex-1 bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-2xl px-8 py-8 shadow-2xl overflow-x-auto min-w-0 border border-emerald-100/50 backdrop-blur-sm animate-slideInRight min-h-[700px]">
        {tab === 'dashboard' && (
          <div>
            <div className="text-4xl font-black mb-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">🏥 Welcome, Dr. Smith</div>
            <div className="mb-8 text-gray-600 text-lg">Your comprehensive healthcare management dashboard</div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-xl border border-blue-100/50 transform hover:scale-105 transition-all duration-300 animate-fadeInUp">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-blue-700 font-bold">Today's Appointments</div>
                  <div className="text-3xl animate-pulse">📅</div>
                </div>
                <div className="text-4xl font-black text-blue-600">{appointments.filter(a => a.date === '2025-11-12').length}</div>
                <div className="text-sm text-blue-500 mt-1">Next: 9:30 AM</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl border border-green-100/50 transform hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{animationDelay: '100ms'}}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-green-700 font-bold">Active Patients</div>
                  <div className="text-3xl animate-bounce">👥</div>
                </div>
                <div className="text-4xl font-black text-green-600">{patients.length}</div>
                <div className="text-sm text-green-500 mt-1">+3 this week</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-xl border border-yellow-100/50 transform hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{animationDelay: '200ms'}}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-yellow-700 font-bold">Pending Messages</div>
                  <div className="text-3xl animate-pulse">💬</div>
                </div>
                <div className="text-4xl font-black text-yellow-600">{messages.length}</div>
                <div className="text-sm text-yellow-500 mt-1">2 urgent</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-xl border border-purple-100/50 transform hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{animationDelay: '300ms'}}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-purple-700 font-bold">Health Score</div>
                  <div className="text-3xl animate-float">⚡</div>
                </div>
                <div className="text-4xl font-black text-purple-600">94%</div>
                <div className="text-sm text-purple-500 mt-1">Excellent</div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-6 shadow-xl border border-emerald-100/50 mb-8 animate-fadeInUp" style={{animationDelay: '400ms'}}>
              <h3 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                📋 Today's Schedule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {appointments.filter(a => a.date === '2025-11-12').map((appt, idx) => (
                  <div key={appt.id} className="bg-white/80 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl">{appt.avatar}</div>
                      <div className={`px-2 py-1 rounded-full text-xs font-bold ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {appt.status}
                      </div>
                    </div>
                    <div className="font-bold text-gray-800">{appt.patient}</div>
                    <div className="text-sm text-gray-700">{appt.type}</div>
                    <div className="text-sm text-emerald-600 font-semibold">{appt.time} • Room {appt.room}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-xl p-6 shadow flex flex-col items-center">
                <div className="font-bold text-blue-700 mb-2">Latest Vitals</div>
                <div className="flex flex-col gap-2 w-full">
                  <div>Heart Rate: <span className="font-bold">{vitals.heartRate} bpm</span></div>
                  <div>Blood Pressure: <span className="font-bold">{vitals.bloodPressure}</span></div>
                  <div>Temperature: <span className="font-bold">{vitals.temp.toFixed(1)}°F</span></div>
                </div>
                <button className="mt-4 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={updateVitals}>Refresh</button>
              </div>
              <div className="bg-white border rounded-xl p-6 shadow flex flex-col">
                <div className="font-bold text-blue-700 mb-2">Recent Messages</div>
                <div className="flex-1 overflow-y-auto max-h-32">
                  {messages.slice(-3).map((msg, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-2">
                      <img src={msg.avatar} alt="avatar" className="w-7 h-7 rounded-full border" />
                      <span className="text-gray-700 text-sm">{msg.from}: {msg.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 'appointments' && (
          <div>
            <div className="text-2xl font-bold mb-6 text-blue-700">Appointments</div>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input type="date" value={newAppt.date} onChange={e=>setNewAppt(a=>({...a,date:e.target.value}))} className="border rounded px-3 py-2" />
              <input type="text" value={newAppt.doctor} onChange={e=>setNewAppt(a=>({...a,doctor:e.target.value}))} className="border rounded px-3 py-2" placeholder="Doctor's Name" />
              <input type="text" value={newAppt.patient} onChange={e=>setNewAppt(a=>({...a,patient:e.target.value}))} className="border rounded px-3 py-2" placeholder="Patient Name" />
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={addAppointment}>Add</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Doctor</th>
                    <th className="py-2 px-4 text-left">Patient</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-4">{appt.date}</td>
                      <td className="py-2 px-4">{appt.doctor}</td>
                      <td className="py-2 px-4 flex items-center gap-2"><img src={appt.avatar} alt="avatar" className="w-6 h-6 rounded-full border" />{appt.patient}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'vitals' && (
          <div>
            <div className="text-2xl font-bold mb-6 text-blue-700">Vitals</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 text-center shadow">
                <div className="text-lg font-semibold text-blue-700">Heart Rate</div>
                <div className="text-3xl font-extrabold mt-2">{vitals.heartRate} bpm</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center shadow">
                <div className="text-lg font-semibold text-green-700">Blood Pressure</div>
                <div className="text-3xl font-extrabold mt-2">{vitals.bloodPressure}</div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-6 text-center shadow">
                <div className="text-lg font-semibold text-yellow-700">Temperature</div>
                <div className="text-3xl font-extrabold mt-2">{vitals.temp.toFixed(1)}°F</div>
              </div>
            </div>
            <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={updateVitals}>Update Vitals</button>
          </div>
        )}
        {tab === 'patients' && (
          <div>
            <div className="text-2xl font-bold mb-6 text-blue-700">Patient Records</div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Age</th>
                    <th className="py-2 px-4 text-left">Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-4 flex items-center gap-2"><img src={p.avatar} alt="avatar" className="w-6 h-6 rounded-full border" />{p.name}</td>
                      <td className="py-2 px-4">{p.age}</td>
                      <td className="py-2 px-4">{p.condition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'messages' && (
          <div>
            <div className="text-2xl font-bold mb-6 text-blue-700">Messages</div>
            <div className="mb-4 max-h-56 overflow-y-auto flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-center gap-3 ${msg.from==='You'?'justify-end':'justify-start'}`}>
                  {msg.from!=='You' && <img src={msg.avatar} alt="avatar" className="w-7 h-7 rounded-full border" />}
                  <div className={`p-3 rounded-xl shadow ${msg.from==='You'?'bg-blue-100 text-blue-800':'bg-gray-100 text-gray-800'}`}><span className="font-semibold">{msg.from}: </span>{msg.text}</div>
                  {msg.from==='You' && <img src={msg.avatar} alt="avatar" className="w-7 h-7 rounded-full border" />}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input type="text" value={newMsg} onChange={e=>setNewMsg(e.target.value)} className="border rounded px-3 py-2 flex-1" placeholder="Type a message..." />
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
function RealEstateApp() {
  // Tabs and state
  const [tab, setTab] = useState<'search'|'favorites'|'market'|'tools'|'chat'>('search');
  const [properties, setProperties] = useState([
    { id: 1, address: '2847 Oceanview Drive', price: 1250000, bedrooms: 4, bathrooms: 3, sqft: 2800, type: 'House', image: '🏖️', description: 'Stunning oceanfront home with panoramic views', amenities: ['Ocean View', 'Private Beach', 'Pool', 'Garage'], yearBuilt: 2018, status: 'For Sale', agent: 'Sarah Mitchell', daysOnMarket: 12, virtualTour: true },
    { id: 2, address: '1456 Mountain Ridge', price: 875000, bedrooms: 3, bathrooms: 2, sqft: 2100, type: 'House', image: '🏔️', description: 'Modern mountain home with spectacular views', amenities: ['Mountain View', 'Fireplace', 'Deck', 'Hiking Trails'], yearBuilt: 2020, status: 'For Sale', agent: 'Michael Chen', daysOnMarket: 8, virtualTour: true },
    { id: 3, address: '789 Downtown Loft', price: 650000, bedrooms: 2, bathrooms: 2, sqft: 1400, type: 'Condo', image: '🏙️', description: 'Luxury downtown loft in the heart of the city', amenities: ['City View', 'Gym', 'Concierge', 'Rooftop'], yearBuilt: 2019, status: 'For Sale', agent: 'Emily Rodriguez', daysOnMarket: 25, virtualTour: false },
    { id: 4, address: '3421 Suburban Circle', price: 485000, bedrooms: 3, bathrooms: 2, sqft: 1800, type: 'House', image: '🏡', description: 'Perfect family home in quiet neighborhood', amenities: ['Garden', 'Garage', 'Playground Nearby', 'Good Schools'], yearBuilt: 2015, status: 'For Sale', agent: 'David Wilson', daysOnMarket: 18, virtualTour: true },
  ]);
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', bedrooms: '', type: '', sortBy: 'price-asc' });
  const [favorites, setFavorites] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [showDetails, setShowDetails] = useState<number|null>(null);
  // Chat
  const [messages, setMessages] = useState([{ from: 'Agent', text: 'Hi! How can I help you find your dream home?' }]);
  const [newMsg, setNewMsg] = useState('');
  // Mortgage calculator
  const [mortgage, setMortgage] = useState({ price: '', down: '', rate: '', result: null });

  function toggleFavorite(id: number) {
    setFavorites((prev) => prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]);
  }
  function sendMessage() {
    if (newMsg.trim()) {
      setMessages([...messages, { from: 'You', text: newMsg }]);
      setNewMsg('');
    }
  }
  function calcMortgage() {
    const P = Number(mortgage.price) - Number(mortgage.down);
    const r = Number(mortgage.rate) / 100 / 12;
    const n = 30 * 12;
    if (P > 0 && r > 0) {
      const m = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMortgage({ ...mortgage, result: m ? m.toFixed(2) : null });
    }
  }
  // Filtered properties
  const filtered = properties.filter(p =>
    (!filters.minPrice || p.price >= Number(filters.minPrice)) &&
    (!filters.maxPrice || p.price <= Number(filters.maxPrice)) &&
    (!filters.bedrooms || p.bedrooms >= Number(filters.bedrooms)) &&
    (!filters.type || p.type === filters.type) &&
    (!search || p.address.toLowerCase().includes(search.toLowerCase()))
  ).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'size-asc': return a.sqft - b.sqft;
      case 'size-desc': return b.sqft - a.sqft;
      case 'newest': return b.yearBuilt - a.yearBuilt;
      default: return 0;
    }
  });

  return (
    <div className="flex flex-row gap-8 min-h-[700px] max-w-[1400px] mx-auto w-full px-6 py-8 overflow-x-auto">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-orange-600 to-orange-400 rounded-2xl p-6 shadow-2xl flex flex-col min-h-[700px] sticky left-0 top-0 h-fit border border-orange-300/30 backdrop-blur-sm animate-slideInLeft">
        <div className="font-extrabold text-white text-2xl mb-8 tracking-wide">HomeFinder</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='search'?'bg-white text-orange-700 shadow':'text-white hover:bg-orange-500/70'}`} onClick={()=>setTab('search')}>Search</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='favorites'?'bg-white text-orange-700 shadow':'text-white hover:bg-orange-500/70'}`} onClick={()=>setTab('favorites')}>Favorites</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='market'?'bg-white text-orange-700 shadow':'text-white hover:bg-orange-500/70'}`} onClick={()=>setTab('market')}>Market</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='tools'?'bg-white text-orange-700 shadow':'text-white hover:bg-orange-500/70'}`} onClick={()=>setTab('tools')}>Tools</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='chat'?'bg-white text-orange-700 shadow':'text-white hover:bg-orange-500/70'}`} onClick={()=>setTab('chat')}>Agent Chat</button></li>
          </ul>
        </nav>
        <div className="mt-8 text-xs text-orange-100 opacity-80 animate-pulse">© 2025 HomeFinder. All rights reserved.</div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-white via-orange-50/30 to-white rounded-2xl px-8 py-8 shadow-2xl overflow-x-auto min-w-0 border border-orange-100/50 backdrop-blur-sm animate-slideInRight min-h-[700px]">
        {tab === 'search' && (
          <div>
            <div className="text-4xl font-black mb-8 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">🏡 Property Search</div>
            
            {/* Advanced Search Filters */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 mb-8 border border-orange-100/50 shadow-lg animate-fadeInUp">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search address..." className="col-span-2 border rounded px-3 py-2" />
                <input type="number" value={filters.minPrice} onChange={e=>setFilters(f=>({...f,minPrice:e.target.value}))} placeholder="Min Price" className="border rounded px-3 py-2" />
                <input type="number" value={filters.maxPrice} onChange={e=>setFilters(f=>({...f,maxPrice:e.target.value}))} placeholder="Max Price" className="border rounded px-3 py-2" />
                <select value={filters.bedrooms} onChange={e=>setFilters(f=>({...f,bedrooms:e.target.value}))} className="border rounded px-3 py-2">
                  <option value="">Any Beds</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
                <select value={filters.type} onChange={e=>setFilters(f=>({...f,type:e.target.value}))} className="border rounded px-3 py-2">
                  <option value="">Any Type</option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                </select>
                <select value={filters.sortBy} onChange={e=>setFilters(f=>({...f,sortBy:e.target.value}))} className="border rounded px-3 py-2">
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                  <option value="size-asc">Size ↑</option>
                  <option value="size-desc">Size ↓</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map(property => (
                <div key={property.id} className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow flex flex-col relative">
                  <div className="absolute top-2 right-2 text-3xl">{property.image}</div>
                  <div className="mb-2">
                    <h4 className="text-lg font-semibold text-orange-800 mb-1">{property.address}</h4>
                    <p className="text-2xl font-bold text-green-600 mb-2">${property.price.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm mb-2">{property.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {property.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="bg-orange-600 text-white px-2 py-1 rounded text-xs">{amenity}</span>
                      ))}
                      {property.amenities.length > 3 && (
                        <span className="text-gray-400 text-xs">+{property.amenities.length - 3} more</span>
                      )}
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>{property.bedrooms} bed, {property.bathrooms} bath</span>
                      <span>{property.sqft.toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                      <span>Agent: {property.agent}</span>
                      <span>{property.daysOnMarket} days on market</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className={`px-3 py-1 rounded ${favorites.includes(property.id)?'bg-yellow-400 text-white':'bg-gray-200 text-gray-700'}`} onClick={()=>toggleFavorite(property.id)}>{favorites.includes(property.id)?'★ Saved':'☆ Save'}</button>
                    <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={()=>setShowDetails(property.id)}>Details</button>
                  </div>
                  {property.virtualTour && <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">360° Tour</div>}
                  {showDetails===property.id && (
                    <div className="absolute inset-0 bg-white bg-opacity-95 rounded-xl p-6 shadow-xl z-10 flex flex-col">
                      <button className="self-end text-gray-400 hover:text-orange-600 mb-2" onClick={()=>setShowDetails(null)}>✕</button>
                      <h4 className="text-xl font-bold mb-2">{property.address}</h4>
                      <div className="mb-2">{property.description}</div>
                      <div className="mb-2">Price: <span className="font-semibold text-green-600">${property.price.toLocaleString()}</span></div>
                      <div className="mb-2">Bedrooms: {property.bedrooms}, Bathrooms: {property.bathrooms}, Sqft: {property.sqft}</div>
                      <div className="mb-2">Amenities: {property.amenities.join(', ')}</div>
                      <div className="mb-2">Agent: {property.agent}</div>
                      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={()=>alert('Agent will contact you soon!')}>Contact Agent</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'favorites' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-orange-700">Favorites</div>
            {favorites.length === 0 ? (
              <div className="text-gray-500">No favorites yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {properties.filter(p=>favorites.includes(p.id)).map(property => (
                  <div key={property.id} className="bg-green-50 border border-green-200 rounded-xl p-6 shadow flex flex-col relative">
                    <div className="absolute top-2 right-2 text-3xl">{property.image}</div>
                    <h4 className="text-lg font-semibold text-green-800 mb-1">{property.address}</h4>
                    <p className="text-2xl font-bold text-green-600 mb-2">${property.price.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm mb-2">{property.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {property.amenities.map((amenity, index) => (
                        <span key={index} className="bg-green-600 text-white px-2 py-1 rounded text-xs">{amenity}</span>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>{property.bedrooms} bed, {property.bathrooms} bath</span>
                      <span>{property.sqft.toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                      <span>Agent: {property.agent}</span>
                      <span>{property.daysOnMarket} days on market</span>
                    </div>
                    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={()=>alert('Agent will contact you soon!')}>Contact Agent</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab === 'market' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-orange-700">Market Overview</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-orange-100 rounded-xl p-8 text-center shadow">
                <div className="text-lg font-semibold text-orange-700">Avg. Price</div>
                <div className="text-4xl font-extrabold mt-2">$815,000</div>
              </div>
              <div className="bg-orange-100 rounded-xl p-8 text-center shadow">
                <div className="text-lg font-semibold text-orange-700">Inventory</div>
                <div className="text-4xl font-extrabold mt-2">1,247</div>
              </div>
              <div className="bg-orange-100 rounded-xl p-8 text-center shadow">
                <div className="text-lg font-semibold text-orange-700">Sold Last Month</div>
                <div className="text-4xl font-extrabold mt-2">89</div>
              </div>
            </div>
            <div className="bg-white border rounded-xl p-8 shadow">
              <div className="font-bold mb-2">Recent Sales</div>
              <ul className="space-y-2">
                <li className="flex justify-between"><span>123 Main St</span><span>$1,200,000</span></li>
                <li className="flex justify-between"><span>456 Oak Ave</span><span>$950,000</span></li>
                <li className="flex justify-between"><span>789 Pine Rd</span><span>$780,000</span></li>
              </ul>
            </div>
          </div>
        )}
        {tab === 'tools' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-orange-700">Tools</div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
                <h5 className="text-xl font-semibold text-orange-600 mb-4">🏦 Mortgage Calculator</h5>
                <div className="space-y-4">
                  <input type="number" placeholder="Home Price" value={mortgage.price} onChange={e=>setMortgage(m=>({...m,price:e.target.value}))} className="w-full border border-gray-300 p-2 rounded" />
                  <input type="number" placeholder="Down Payment" value={mortgage.down} onChange={e=>setMortgage(m=>({...m,down:e.target.value}))} className="w-full border border-gray-300 p-2 rounded" />
                  <input type="number" placeholder="Interest Rate %" value={mortgage.rate} onChange={e=>setMortgage(m=>({...m,rate:e.target.value}))} className="w-full border border-gray-300 p-2 rounded" />
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded" onClick={calcMortgage}>Calculate Payment</button>
                  {mortgage.result && <div className="mt-2 text-green-700 font-bold">Monthly Payment: ${mortgage.result}</div>}
                </div>
              </div>
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
                <h5 className="text-xl font-semibold text-orange-600 mb-4">🗓️ Schedule a Tour</h5>
                <div className="space-y-4">
                  <input type="text" placeholder="Property Address" className="w-full border border-gray-300 p-2 rounded" />
                  <input type="date" className="w-full border border-gray-300 p-2 rounded" />
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded" onClick={()=>alert('Tour scheduled!')}>Schedule</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 'chat' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-orange-700">Agent Chat</div>
            <div className="mb-4 max-h-56 overflow-y-auto flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-center gap-3 ${msg.from==='You'?'justify-end':'justify-start'}`}>
                  <div className={`p-3 rounded-xl shadow ${msg.from==='You'?'bg-orange-100 text-orange-800':'bg-gray-100 text-gray-800'}`}><span className="font-semibold">{msg.from}: </span>{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input type="text" value={newMsg} onChange={e=>setNewMsg(e.target.value)} className="border rounded px-3 py-2 flex-1" placeholder="Type a message..." />
              <button className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700" onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
function FoodDeliveryApp() {
  // Tabs and state
  const [tab, setTab] = useState<'browse'|'cart'|'orders'|'tracking'|'profile'|'reviews'>('browse');
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'Pizza Palace', cuisine: 'Italian', rating: 4.5, deliveryTime: '25-35 min', deliveryFee: 2.99, image: '🍕', menu: [ { id: 1, name: 'Margherita Pizza', price: 18.99, desc: 'Fresh mozzarella, basil, tomato sauce', rating: 4.7 }, { id: 2, name: 'Pepperoni Pizza', price: 21.99, desc: 'Classic pepperoni with cheese', rating: 4.8 } ] },
    { id: 2, name: 'Burger Barn', cuisine: 'American', rating: 4.2, deliveryTime: '20-30 min', deliveryFee: 1.99, image: '🍔', menu: [ { id: 3, name: 'Classic Cheeseburger', price: 14.99, desc: 'Beef patty, cheese, lettuce, tomato', rating: 4.3 }, { id: 4, name: 'Veggie Burger', price: 13.99, desc: 'Plant-based patty with fresh veggies', rating: 4.1 } ] },
    { id: 3, name: 'Sushi Spot', cuisine: 'Japanese', rating: 4.8, deliveryTime: '30-40 min', deliveryFee: 3.99, image: '🍣', menu: [ { id: 5, name: 'Dragon Roll', price: 16.99, desc: 'Eel, cucumber, avocado, topped with eel sauce', rating: 4.9 }, { id: 6, name: 'Salmon Sashimi', price: 19.99, desc: 'Fresh salmon slices (8 pieces)', rating: 4.8 } ] },
    { id: 4, name: 'Taco Fiesta', cuisine: 'Mexican', rating: 4.4, deliveryTime: '15-25 min', deliveryFee: 1.49, image: '🌮', menu: [ { id: 7, name: 'Chicken Tacos', price: 12.99, desc: '3 tacos with grilled chicken, onions, cilantro', rating: 4.5 }, { id: 8, name: 'Beef Burrito', price: 15.99, desc: 'Large burrito with seasoned beef and beans', rating: 4.3 } ] },
  ]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number; restaurant: string }[]>([]);
  const [orders, setOrders] = useState([
    { id: 1, restaurant: 'Pizza Palace', total: 28.50, date: '2025-11-05', status: 'Delivered', items: ['Margherita Pizza', 'Pepperoni Pizza'] },
    { id: 2, restaurant: 'Sushi Spot', total: 45.75, date: '2025-11-03', status: 'Delivered', items: ['Dragon Roll', 'Salmon Sashimi'] }
  ]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [profile] = useState({ name: 'Jane Customer', email: 'jane@email.com', address: '123 Main St, Downtown', phone: '(555) 123-4567' });
  const [reviews, setReviews] = useState([
    { id: 1, restaurant: 'Pizza Palace', rating: 5, text: 'Amazing pizza! Fast delivery.', date: '2025-11-05' },
    { id: 2, restaurant: 'Sushi Spot', rating: 4, text: 'Fresh sushi, good quality.', date: '2025-11-03' }
  ]);

  function addToCart(item) {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      } else {
        return [...prev, { ...item, qty: 1, restaurant: selectedRestaurant?.name || 'Unknown' }];
      }
    });
  }
  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  }
  function checkout() {
    if (cart.length > 0) {
      const newOrder = { 
        id: Date.now(), 
        restaurant: cart[0].restaurant, 
        total: cart.reduce((sum, i) => sum + i.price * i.qty, 0) + (selectedRestaurant?.deliveryFee || 0), 
        date: new Date().toLocaleDateString(), 
        status: 'Preparing', 
        items: cart.map(i => i.name) 
      };
      setOrders([newOrder, ...orders]);
      setCurrentOrder(newOrder);
      setCart([]);
      setTab('tracking');
    }
  }

  const filteredRestaurants = restaurants.filter(r =>
    (!search || r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase())) &&
    (!filter || r.cuisine === filter)
  );

  return (
    <div className="flex flex-row gap-8 min-h-[700px] max-w-[1400px] mx-auto w-full px-6 py-8 overflow-x-auto">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-red-600 to-red-400 rounded-2xl p-6 shadow-2xl flex flex-col min-h-[700px] sticky left-0 top-0 h-fit border border-red-300/30 backdrop-blur-sm animate-slideInLeft">
        <div className="font-extrabold text-white text-2xl mb-8 tracking-wide">QuickEats</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='browse'?'bg-white text-red-700 shadow':'text-white hover:bg-red-500/70'}`} onClick={()=>setTab('browse')}>Browse</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='cart'?'bg-white text-red-700 shadow':'text-white hover:bg-red-500/70'}`} onClick={()=>setTab('cart')}>Cart ({cart.length})</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='orders'?'bg-white text-red-700 shadow':'text-white hover:bg-red-500/70'}`} onClick={()=>setTab('orders')}>Orders</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='tracking'?'bg-white text-red-700 shadow':'text-white hover:bg-red-500/70'}`} onClick={()=>setTab('tracking')}>Tracking</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='reviews'?'bg-white text-red-700 shadow':'text-white hover:bg-red-500/70'}`} onClick={()=>setTab('reviews')}>Reviews</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='profile'?'bg-white text-red-700 shadow':'text-white hover:bg-red-500/70'}`} onClick={()=>setTab('profile')}>Profile</button></li>
          </ul>
        </nav>
        <div className="mt-8 text-xs text-red-100 opacity-80 animate-pulse">© 2025 QuickEats. All rights reserved.</div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-white via-red-50/30 to-white rounded-2xl px-8 py-8 shadow-2xl overflow-x-auto min-w-0 border border-red-100/50 backdrop-blur-sm animate-slideInRight min-h-[700px]">
        {tab === 'browse' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-red-700">Browse Restaurants</div>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search restaurants or cuisine..." className="flex-1 border rounded px-3 py-2" />
              <select value={filter} onChange={e=>setFilter(e.target.value)} className="border rounded px-3 py-2">
                <option value="">All Cuisines</option>
                <option value="Italian">Italian</option>
                <option value="American">American</option>
                <option value="Japanese">Japanese</option>
                <option value="Mexican">Mexican</option>
              </select>
            </div>
            {!selectedRestaurant ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredRestaurants.map(restaurant => (
                  <div key={restaurant.id} className="bg-red-50 border border-red-200 rounded-xl p-6 shadow flex flex-col relative cursor-pointer hover:shadow-lg transition" onClick={()=>setSelectedRestaurant(restaurant)}>
                    <div className="absolute top-2 right-2 text-4xl">{restaurant.image}</div>
                    <h4 className="text-lg font-semibold text-red-800 mb-1">{restaurant.name}</h4>
                    <p className="text-gray-700 text-sm mb-2">{restaurant.cuisine} Cuisine</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500">{'★'.repeat(Math.floor(restaurant.rating))}</span>
                      <span className="text-gray-700 text-sm">{restaurant.rating} ({Math.floor(Math.random()*200)+50} reviews)</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 mb-2">
                      <span>🕒 {restaurant.deliveryTime}</span>
                      <span>🚚 ${restaurant.deliveryFee} delivery</span>
                    </div>
                    <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={(e)=>{e.stopPropagation(); setSelectedRestaurant(restaurant);}}>View Menu</button>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-6">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-4" onClick={()=>setSelectedRestaurant(null)}>← Back</button>
                  <div className="text-2xl mr-4">{selectedRestaurant.image}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-red-700">{selectedRestaurant.name}</h3>
                    <p className="text-gray-700">{selectedRestaurant.cuisine} • {selectedRestaurant.deliveryTime} • ${selectedRestaurant.deliveryFee} delivery</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedRestaurant.menu.map(item => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow">
                      <h4 className="font-semibold text-lg mb-1">{item.name}</h4>
                      <p className="text-gray-700 text-sm mb-2">{item.desc}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500">{'★'.repeat(Math.floor(item.rating))}</span>
                        <span className="text-gray-700 text-sm">{item.rating}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-green-600">${item.price}</span>
                        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={()=>addToCart(item)}>Add to Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {tab === 'cart' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-red-700">Your Cart</div>
            {cart.length === 0 ? (
              <div className="text-gray-700 text-center py-8">Your cart is empty. <button className="text-red-600 underline" onClick={()=>setTab('browse')}>Browse restaurants</button></div>
            ) : (
              <>
                <ul className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-center justify-between bg-red-50 p-4 rounded shadow">
                      <div>
                        <span className="font-bold">{item.name}</span>
                        <div className="text-sm text-gray-700">{item.restaurant}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>x {item.qty}</span>
                        <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={()=>removeFromCart(item.id)}>Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Delivery Fee:</span>
                    <span>${selectedRestaurant?.deliveryFee || 2.99}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total:</span>
                    <span>${(cart.reduce((sum, item) => sum + item.price * item.qty, 0) + (selectedRestaurant?.deliveryFee || 2.99)).toFixed(2)}</span>
                  </div>
                  <button className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold" onClick={checkout}>Place Order</button>
                </div>
              </>
            )}
          </div>
        )}
        {tab === 'orders' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-red-700">Order History</div>
            {orders.length === 0 ? (
              <div className="text-gray-700">No orders yet.</div>
            ) : (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order.id} className="bg-red-50 p-4 rounded shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold">Order #{order.id}</div>
                        <div className="text-gray-600">{order.restaurant} • {order.date}</div>
                      </div>
                      <div className={`px-3 py-1 rounded text-sm ${order.status==='Delivered'?'bg-green-100 text-green-800':'bg-yellow-100 text-yellow-800'}`}>
                        {order.status}
                      </div>
                    </div>
                    <ul className="mb-2 text-sm">
                      {order.items.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                    <div className="font-semibold">Total: ${order.total}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {tab === 'tracking' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-red-700">Order Tracking</div>
            {currentOrder ? (
              <div className="bg-red-50 p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold mb-2">Order #{currentOrder.id}</h3>
                <p className="text-gray-700 mb-4">{currentOrder.restaurant} • ${currentOrder.total}</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Order Confirmed</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Preparing</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>Out for Delivery</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span>Delivered</span>
                </div>
                <div className="text-green-600 font-bold">Estimated delivery: 25-35 minutes</div>
              </div>
            ) : (
              <div className="text-gray-700">No active orders to track.</div>
            )}
          </div>
        )}
        {tab === 'reviews' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-red-700">Reviews</div>
            <ul className="space-y-4">
              {reviews.map(review => (
                <li key={review.id} className="bg-red-50 p-4 rounded shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold">{review.restaurant}</div>
                    <div className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.text}</p>
                  <div className="text-xs text-gray-600">{review.date}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'profile' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-red-700">Profile</div>
            <div className="bg-red-50 rounded-xl p-8 shadow max-w-lg">
              <div className="font-bold text-lg mb-2">{profile.name}</div>
              <div className="mb-1">Email: <span className="text-gray-700">{profile.email}</span></div>
              <div className="mb-1">Phone: <span className="text-gray-700">{profile.phone}</span></div>
              <div className="mb-4">Address: <span className="text-gray-700">{profile.address}</span></div>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Edit Profile</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
function LearningApp() {
  // Tabs and state
  const [tab, setTab] = useState<'courses'|'quizzes'|'progress'|'certificates'|'forum'|'assignments'|'analytics'>('courses');
  const [courses, setCourses] = useState([
    { id: 1, title: 'JavaScript Fundamentals', progress: 85, duration: '8 hours', difficulty: 'Beginner', instructor: 'Dr. Sarah Johnson', rating: 4.8, enrolled: 1240, modules: ['Variables & Functions', 'DOM Manipulation', 'Async Programming'], image: '📚' },
    { id: 2, title: 'React Advanced Patterns', progress: 60, duration: '12 hours', difficulty: 'Advanced', instructor: 'Mike Chen', rating: 4.9, enrolled: 890, modules: ['Hooks Deep Dive', 'Context & State', 'Performance Optimization'], image: '⚛️' },
    { id: 3, title: 'Machine Learning Basics', progress: 30, duration: '20 hours', difficulty: 'Intermediate', instructor: 'Prof. AI Watson', rating: 4.7, enrolled: 650, modules: ['Linear Regression', 'Neural Networks', 'Data Processing'], image: '🤖' },
    { id: 4, title: 'Python for Data Science', progress: 0, duration: '15 hours', difficulty: 'Intermediate', instructor: 'Dr. Data Smith', rating: 4.6, enrolled: 980, modules: ['Pandas & NumPy', 'Data Visualization', 'Statistical Analysis'], image: '🐍' },
  ]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [quiz, setQuiz] = useState({
    questions: [
      { q: "What is the capital of France?", a: "Paris", options: ["Paris", "London", "Berlin", "Madrid"] },
      { q: "Which method adds an element to the end of an array?", a: "push()", options: ["push()", "pop()", "shift()", "unshift()"] },
      { q: "What does 'AI' stand for?", a: "Artificial Intelligence", options: ["Artificial Intelligence", "Advanced Integration", "Automated Intelligence", "Applied Innovation"] },
    ],
    step: 0,
    score: 0,
    selected: null as string | null,
    showResult: false,
  });
  const [certificates] = useState([
    { id: 1, course: 'JavaScript Fundamentals', date: '2025-10-15', instructor: 'Dr. Sarah Johnson' },
    { id: 2, course: 'HTML & CSS Mastery', date: '2025-09-22', instructor: 'Jane Designer' },
  ]);
  const [forumPosts] = useState([
    { id: 1, title: 'Best practices for React hooks?', author: 'Alex Student', replies: 12, date: '2025-11-08' },
    { id: 2, title: 'Machine Learning project ideas', author: 'Sam Learner', replies: 8, date: '2025-11-07' },
    { id: 3, title: 'Python vs JavaScript for beginners', author: 'Taylor Code', replies: 24, date: '2025-11-06' },
  ]);
  const [assignments] = useState([
    { id: 1, title: 'Build a Todo App with React', course: 'React Advanced Patterns', due: '2025-11-15', status: 'In Progress' },
    { id: 2, title: 'Linear Regression Analysis', course: 'Machine Learning Basics', due: '2025-11-20', status: 'Not Started' },
    { id: 3, title: 'JavaScript Calculator', course: 'JavaScript Fundamentals', due: '2025-11-10', status: 'Completed' },
  ]);
  const [analytics] = useState({
    totalHours: 45,
    coursesCompleted: 3,
    averageScore: 87,
    streak: 12,
    weeklyHours: [3, 5, 4, 6, 5, 7, 4],
    skillLevels: { JavaScript: 85, React: 70, Python: 40, ML: 25 },
  });

  // Quiz handlers
  function handleSelect(option: string) {
    setQuiz(q => ({ ...q, selected: option }));
  }
  function handleNext() {
    if (quiz.selected === quiz.questions[quiz.step].a) {
      setQuiz(q => ({ ...q, score: q.score + 1 }));
    }
    setQuiz(q => ({ ...q, selected: null }));
    if (quiz.step < quiz.questions.length - 1) {
      setQuiz(q => ({ ...q, step: q.step + 1 }));
    } else {
      setQuiz(q => ({ ...q, showResult: true }));
    }
  }
  function handleRestart() {
    setQuiz({ ...quiz, step: 0, score: 0, selected: null, showResult: false });
  }

  return (
    <div className="flex flex-row gap-8 min-h-[700px] max-w-[1400px] mx-auto w-full px-6 py-8 overflow-x-auto">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-purple-600 to-purple-400 rounded-2xl p-6 shadow-2xl flex flex-col min-h-[700px] sticky left-0 top-0 h-fit border border-purple-300/30 backdrop-blur-sm animate-slideInLeft">
        <div className="font-extrabold text-white text-2xl mb-8 tracking-wide">LearnAI</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='courses'?'bg-white text-purple-700 shadow':'text-white hover:bg-purple-500/70'}`} onClick={()=>setTab('courses')}>Courses</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='quizzes'?'bg-white text-purple-700 shadow':'text-white hover:bg-purple-500/70'}`} onClick={()=>setTab('quizzes')}>Quizzes</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='progress'?'bg-white text-purple-700 shadow':'text-white hover:bg-purple-500/70'}`} onClick={()=>setTab('progress')}>Progress</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='certificates'?'bg-white text-purple-700 shadow':'text-white hover:bg-purple-500/70'}`} onClick={()=>setTab('certificates')}>Certificates</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='forum'?'bg-white text-purple-700 shadow':'text-white hover:bg-purple-500/70'}`} onClick={()=>setTab('forum')}>Forum</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='assignments'?'bg-white text-purple-700 shadow':'text-white hover:bg-purple-500/70'}`} onClick={()=>setTab('assignments')}>Assignments</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='analytics'?'bg-white text-purple-700 shadow':'text-white hover:bg-purple-500/70'}`} onClick={()=>setTab('analytics')}>Analytics</button></li>
          </ul>
        </nav>
        <div className="mt-8 text-xs text-purple-100 opacity-80 animate-pulse">© 2025 LearnAI. All rights reserved.</div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-white via-purple-50/30 to-white rounded-2xl px-8 py-8 shadow-2xl overflow-x-auto min-w-0 border border-purple-100/50 backdrop-blur-sm animate-slideInRight min-h-[700px]">
        {tab === 'courses' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-purple-700">My Courses</div>
            {!selectedCourse ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {courses.map(course => (
                  <div key={course.id} className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow flex flex-col relative cursor-pointer hover:shadow-lg transition" onClick={()=>setSelectedCourse(course)}>
                    <div className="absolute top-2 right-2 text-3xl">{course.image}</div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-1">{course.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">by {course.instructor}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500">{'★'.repeat(Math.floor(course.rating))}</span>
                      <span className="text-gray-600 text-sm">{course.rating} ({course.enrolled} students)</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>🕒 {course.duration}</span>
                      <span className={`px-2 py-1 rounded text-xs ${course.difficulty==='Beginner'?'bg-green-100 text-green-800':course.difficulty==='Intermediate'?'bg-yellow-100 text-yellow-800':'bg-red-100 text-red-800'}`}>{course.difficulty}</span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full transition-all" style={{width: `${course.progress}%`}}></div>
                      </div>
                    </div>
                    <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700" onClick={(e)=>{e.stopPropagation(); setSelectedCourse(course);}}>Continue Learning</button>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-6">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-4" onClick={()=>setSelectedCourse(null)}>← Back</button>
                  <div className="text-2xl mr-4">{selectedCourse.image}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-700">{selectedCourse.title}</h3>
                    <p className="text-gray-600">by {selectedCourse.instructor} • {selectedCourse.duration} • {selectedCourse.difficulty}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Course Progress</span>
                    <span>{selectedCourse.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full transition-all" style={{width: `${selectedCourse.progress}%`}}></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <h4 className="text-xl font-bold text-purple-700 mb-4">Course Modules</h4>
                  {selectedCourse.modules.map((module, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 shadow flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-700 font-bold">{idx + 1}</span>
                        </div>
                        <span className="font-semibold">{module}</span>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Start</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {tab === 'quizzes' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-purple-700">Interactive Quiz</div>
            {quiz.showResult ? (
              <div className="text-center bg-purple-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Quiz Complete! 🎉</h2>
                <div className="text-4xl font-bold text-purple-700 mb-2">{quiz.score} / {quiz.questions.length}</div>
                <div className="text-gray-600 mb-4">{Math.round((quiz.score/quiz.questions.length)*100)}% Correct</div>
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700" onClick={handleRestart}>Try Again</button>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Question {quiz.step + 1} of {quiz.questions.length}</span>
                    <span>Score: {quiz.score}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-purple-500 h-2 rounded-full transition-all" style={{width: `${((quiz.step + (quiz.selected ? 1 : 0)) / quiz.questions.length) * 100}%`}}></div>
                  </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-bold mb-4">{quiz.questions[quiz.step].q}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {quiz.questions[quiz.step].options.map((option) => (
                      <button key={option} className={`px-4 py-3 rounded-lg border text-left transition ${quiz.selected === option ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-800 border-gray-300 hover:bg-purple-50"}`} onClick={() => handleSelect(option)} disabled={quiz.selected !== null}>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50" onClick={handleNext} disabled={quiz.selected === null}>
                    {quiz.step === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {tab === 'progress' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-purple-700">Learning Progress</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-purple-100 rounded-xl p-6 text-center shadow">
                <div className="text-2xl font-bold text-purple-700">{analytics.totalHours}</div>
                <div className="text-sm text-gray-600">Hours Learned</div>
              </div>
              <div className="bg-purple-100 rounded-xl p-6 text-center shadow">
                <div className="text-2xl font-bold text-purple-700">{analytics.coursesCompleted}</div>
                <div className="text-sm text-gray-600">Courses Completed</div>
              </div>
              <div className="bg-purple-100 rounded-xl p-6 text-center shadow">
                <div className="text-2xl font-bold text-purple-700">{analytics.averageScore}%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="bg-purple-100 rounded-xl p-6 text-center shadow">
                <div className="text-2xl font-bold text-purple-700">{analytics.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border rounded-xl p-6 shadow">
                <h4 className="font-bold mb-4">Weekly Learning Hours</h4>
                <div className="flex items-end gap-2 h-32">
                  {analytics.weeklyHours.map((hours, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1">
                      <div className="bg-purple-600 rounded-t w-8" style={{height: `${hours*15}px`}}></div>
                      <div className="text-xs mt-2">Day {idx+1}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border rounded-xl p-6 shadow">
                <h4 className="font-bold mb-4">Skill Levels</h4>
                <div className="space-y-4">
                  {Object.entries(analytics.skillLevels).map(([skill, level]) => (
                    <div key={skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill}</span>
                        <span>{level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full transition-all" style={{width: `${level}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 'certificates' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-purple-700">Certificates</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certificates.map(cert => (
                <div key={cert.id} className="bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 rounded-xl p-6 shadow">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">🏆</div>
                    <h4 className="text-lg font-bold text-purple-800">{cert.course}</h4>
                  </div>
                  <div className="text-center text-sm text-gray-600 mb-4">
                    <div>Completed on {cert.date}</div>
                    <div>Instructor: {cert.instructor}</div>
                  </div>
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Download Certificate</button>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'forum' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-purple-700">Discussion Forum</div>
            <ul className="space-y-4">
              {forumPosts.map(post => (
                <li key={post.id} className="bg-purple-50 p-4 rounded-xl shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-purple-800">{post.title}</h4>
                    <div className="text-xs text-gray-400">{post.date}</div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>by {post.author}</span>
                    <span>{post.replies} replies</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'assignments' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-purple-700">Assignments</div>
            <ul className="space-y-4">
              {assignments.map(assignment => (
                <li key={assignment.id} className="bg-purple-50 p-4 rounded-xl shadow flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-purple-800">{assignment.title}</h4>
                    <div className="text-sm text-gray-600">{assignment.course} • Due: {assignment.due}</div>
                  </div>
                  <div className={`px-3 py-1 rounded text-sm ${assignment.status==='Completed'?'bg-green-100 text-green-800':assignment.status==='In Progress'?'bg-yellow-100 text-yellow-800':'bg-red-100 text-red-800'}`}>
                    {assignment.status}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'analytics' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-purple-700">Learning Analytics</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border rounded-xl p-6 shadow">
                <h4 className="font-bold mb-4">Learning Streak</h4>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-700 mb-2">{analytics.streak} Days</div>
                  <div className="text-gray-600">Keep it up! 🔥</div>
                </div>
              </div>
              <div className="bg-white border rounded-xl p-6 shadow">
                <h4 className="font-bold mb-4">This Week's Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Hours Studied:</span><span className="font-bold">{analytics.weeklyHours.reduce((a,b)=>a+b,0)}h</span></div>
                  <div className="flex justify-between"><span>Avg. Daily:</span><span className="font-bold">{(analytics.weeklyHours.reduce((a,b)=>a+b,0)/7).toFixed(1)}h</span></div>
                  <div className="flex justify-between"><span>Best Day:</span><span className="font-bold">{Math.max(...analytics.weeklyHours)}h</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const projects = [
  { appType: "ecommerce", title: "E-Commerce Platform" },
  { appType: "banking", title: "Mobile Banking App" },
  { appType: "healthcare", title: "Healthcare Management System" },
  { appType: "realestate", title: "Real Estate Portal" },
  { appType: "food", title: "Food Delivery App" },
  { appType: "learning", title: "AI Learning Platform" },
];

function renderMiniApp(appType) {
  switch (appType) {
    case "ecommerce":
      return <ECommerceApp />;
    case "banking":
      return <BankingApp />;
    case "healthcare":
      return <HealthcareApp />;
    case "realestate":
      return <RealEstateApp />;
    case "food":
      return <FoodDeliveryApp />;
    case "learning":
      return <LearningApp />;
    default:
      return <div className="p-8 text-center">App not found</div>;
  }
}

type DemoAppTemplateProps = { title: string; children: ReactNode };

export default function DemoPage() {
  const router = useRouter();
  // Get the id param from the URL: /portfolio/demo/[id]
  // The path is available as router.asPath, e.g. /portfolio/demo/2
  // We'll extract the last segment as the id
  let idx = null;
  if (typeof window !== "undefined") {
    const match = window.location.pathname.match(/\/portfolio\/demo\/(\d+)/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (!isNaN(n) && n >= 0 && n < projects.length) idx = n;
    }
  }

  if (idx === null) {
    const props: DemoAppTemplateProps = {
      title: "Demo Not Found",
      children: <div className="text-gray-600">The requested demo does not exist.</div>,
    };
    return <DemoAppTemplate {...props} />;
  }

  const props: DemoAppTemplateProps = {
    title: projects[idx].title,
    children: (
      <div>
        {renderMiniApp(projects[idx].appType)}
        <p className="text-gray-500 text-sm mt-4 animate-fadeIn">✨ This is the real interactive demo for this project ✨</p>
        
        {/* Global Animations */}
        <style jsx global>{`
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glow {
            0%, 100% { text-shadow: 0 0 5px rgba(255,255,255,0.5); }
            50% { text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-15px); }
            70% { transform: translateY(-7px); }
            90% { transform: translateY(-3px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          .animate-shimmer { 
            animation: shimmer 3s ease-in-out infinite; 
            background-size: 300% 300%; 
          }
          .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
          .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
          .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
          .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
          .animate-slideInUp { animation: slideInUp 0.8s ease-out; }
          .animate-glow { animation: glow 2s ease-in-out infinite; }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-bounce { animation: bounce 2s infinite; }
          .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
          
          .bg-300% { background-size: 300% 300%; }
          
          .hover\\:shadow-glow:hover {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(236, 72, 153, 0.3), 0 0 60px rgba(236, 72, 153, 0.1);
          }
        `}</style>
      </div>
    ),
  };
  return <DemoAppTemplate {...props} />;
}
