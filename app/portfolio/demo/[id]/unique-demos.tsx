"use client";

import { useState } from "react";

// DEMO 1: E-COMMERCE - Mobile-First Card Layout with Floating Elements
function ECommerceApp() {
  const [authMode, setAuthMode] = useState<'landing'|'login'|'register'|'guest'|'authenticated'>('landing');
  const [tab, setTab] = useState<'catalog'|'cart'|'orders'|'profile'>('catalog');
  const [user, setUser] = useState<{name: string; email: string; isGuest: boolean} | null>(null);
  const [products] = useState([
    { id: 1, name: 'Premium Cotton T-Shirt', price: 29.99, img: '👕', desc: 'Soft organic cotton T-shirt with premium finish', rating: 4.8, category: 'Clothing', stock: 45, brand: 'ComfortWear' },
    { id: 2, name: 'Designer Slim Jeans', price: 89.99, img: '👖', desc: 'Premium slim fit jeans with stretch fabric', rating: 4.6, category: 'Clothing', stock: 23, brand: 'DenimCo' },
    { id: 3, name: 'Athletic Sneakers Pro', price: 149.99, img: '👟', desc: 'High-performance sneakers with advanced cushioning', rating: 4.9, category: 'Footwear', stock: 12, brand: 'SportTech' },
    { id: 4, name: 'Winter Jacket Deluxe', price: 199.99, img: '🧥', desc: 'Waterproof winter jacket with thermal insulation', rating: 4.7, category: 'Outerwear', stock: 8, brand: 'WarmCore' },
    { id: 5, name: 'Classic Polo Shirt', price: 39.99, img: '👔', desc: 'Timeless polo shirt in premium pique cotton', rating: 4.5, category: 'Clothing', stock: 32, brand: 'ClassicFit' },
    { id: 6, name: 'Running Shorts', price: 24.99, img: '🩳', desc: 'Lightweight running shorts with moisture-wicking fabric', rating: 4.3, category: 'Activewear', stock: 28, brand: 'RunFast' },
  ]);
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number; img: string }[]>([]);
  const [orders, setOrders] = useState([
    { id: 1001, items: [{ name: 'Premium Cotton T-Shirt', qty: 2, price: 29.99 }], date: '2025-11-05', total: 67.98, status: 'Delivered' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });

  function handleGuestAccess() {
    setUser({ name: 'Guest User', email: '', isGuest: true });
    setAuthMode('authenticated');
  }

  function handleLogin(email: string, password: string) {
    // Simulate login
    setUser({ name: 'John Doe', email: email, isGuest: false });
    setAuthMode('authenticated');
  }

  function handleRegister(name: string, email: string, password: string) {
    // Simulate registration
    setUser({ name: name, email: email, isGuest: false });
    setAuthMode('authenticated');
  }

  function addToCart(product: any) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item));
    } else {
      setCart([...cart, {...product, qty: 1}]);
    }
  }

  function removeFromCart(productId: number) {
    setCart(cart.filter(item => item.id !== productId));
  }

  function updateCartQuantity(productId: number, newQty: number) {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => item.id === productId ? {...item, qty: newQty} : item));
    }
  }

  function checkout() {
    if (cart.length === 0) return;
    
    const newOrder = {
      id: Date.now(),
      items: cart.map(item => ({ name: item.name, qty: item.qty, price: item.price })),
      date: new Date().toISOString().split('T')[0],
      total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
      status: 'Processing'
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    setTab('orders');
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return a.name.localeCompare(b.name);
    }
  });

  // Landing/Auth Screen
  if (authMode === 'landing') {
    return (
      <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-5xl mx-auto bg-white min-h-[700px] flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">ShopEase</h1>
              <p className="text-gray-600">Professional E-Commerce Platform</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => setAuthMode('login')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In to Your Account
              </button>
              
              <button
                onClick={() => setAuthMode('register')}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Create New Account
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              
              <button
                onClick={handleGuestAccess}
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen
  if (authMode === 'login') {
    return (
      <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-5xl mx-auto bg-white min-h-[700px] flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your ShopEase account</p>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(loginForm.email, loginForm.password); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="Enter your email" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="Enter your password" 
                  required
                />
              </div>
              
              <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button onClick={() => setAuthMode('landing')} className="text-gray-600 hover:text-gray-900 text-sm">
                ← Back to options
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Register Screen
  if (authMode === 'register') {
    return (
      <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-5xl mx-auto bg-white min-h-[700px] flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Join ShopEase today</p>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleRegister(registerForm.name, registerForm.email, registerForm.password); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="Enter your full name" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="Enter your email" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="Create a password" 
                  required
                />
              </div>
              
              <button type="submit" className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Create Account
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button onClick={() => setAuthMode('landing')} className="text-gray-600 hover:text-gray-900 text-sm">
                ← Back to options
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main App (Authenticated)
  return (
    <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-5xl mx-auto bg-white min-h-[700px] flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">ShopEase</h1>
            {user?.isGuest && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Guest</span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setTab('cart')}
                className="p-2 text-gray-600 hover:text-gray-900 relative"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9M7 13l-1.5 9m0 0h4m-4 0h4" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
            
            {user?.isGuest && (
              <button
                onClick={() => setAuthMode('register')}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            )}
            
            <div className="text-sm text-gray-600">
              Hello, {user?.name}
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-4">
          <div className="flex space-x-8">
            {[
              { key: 'catalog', label: 'Products' },
              { key: 'cart', label: 'Cart' },
              { key: 'orders', label: 'Orders' },
              { key: 'profile', label: 'Profile' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key as any)}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  tab === key 
                    ? 'text-blue-600 border-blue-600' 
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          
          {tab === 'catalog' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Featured Products</h2>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-48"
                  />
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Sort by Rating</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="text-6xl text-center mb-4">{product.img}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{product.desc}</p>
                      <div className="flex items-center mb-3">
                        <span className="text-yellow-400 text-sm">★★★★★</span>
                        <span className="text-gray-600 text-sm ml-2">({product.rating})</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        <span className="text-sm text-gray-500">{product.stock} in stock</span>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'cart' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <div className="text-gray-600 mb-4">Your cart is empty</div>
                  <button 
                    onClick={() => setTab('catalog')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{item.img}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.qty - 1)}
                                className="px-2 py-1 text-gray-600 hover:text-gray-900"
                              >
                                −
                              </button>
                              <span className="px-3 py-1 border-x border-gray-300">{item.qty}</span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.qty + 1)}
                                className="px-2 py-1 text-gray-600 hover:text-gray-900"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            ${(item.price * item.qty).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-600">
                            ${item.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-gray-900 text-white rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold">
                        ${cart.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2)}
                      </span>
                    </div>
                    <button 
                      onClick={checkout}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-gray-600">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    Total: ${order.total}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">👤</div>
                  <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
                  {!user?.isGuest && <p className="text-gray-600">{user?.email}</p>}
                </div>
                
                {user?.isGuest ? (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">You are browsing as a guest</p>
                    <button 
                      onClick={() => setAuthMode('register')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Create Account to Save Preferences
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Total Orders</div>
                      <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Total Spent</div>
                      <div className="text-2xl font-bold text-green-600">
                        ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// DEMO 2: MOBILE BANKING - Advanced Security & Professional Banking Platform
function BankingApp() {
  const [authStep, setAuthStep] = useState<'login'|'register'|'2fa'|'biometric'|'dashboard'>('login');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    firstName: '', lastName: '', email: '', phone: '', 
    username: '', password: '', confirmPassword: '', 
    dateOfBirth: '', address: '' 
  });
  const [twoFACode, setTwoFACode] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [tab, setTab] = useState<'dashboard'|'transfer'|'bills'|'analytics'|'security'|'accounts'>('dashboard');
  
  // Load stored users and accounts from localStorage
  const [storedUsers, setStoredUsers] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bankingUsers');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [accounts, setAccounts] = useState(() => {
    if (currentUser) {
      return currentUser.accounts || [];
    }
    return [
      { id: 1, type: 'Premier Checking', balance: 15420.80, account: '**** 2847', iban: 'US29 NWBK 6016 1331 9268 19', color: 'from-blue-600 to-indigo-600', status: 'Active' },
      { id: 2, type: 'High-Yield Savings', balance: 87350.45, account: '**** 9173', iban: 'US64 SVBK 0000 0000 0001 2345', color: 'from-green-600 to-emerald-600', status: 'Active' },
      { id: 3, type: 'Investment Portfolio', balance: 234750.20, account: '**** 5029', iban: 'US35 INWB 0928 4756 3821 0945', color: 'from-purple-600 to-pink-600', status: 'Active' },
      { id: 4, type: 'Business Account', balance: 45892.15, account: '**** 7461', iban: 'US72 BZBK 2847 5920 1847 3625', color: 'from-orange-600 to-red-600', status: 'Active' }
    ];
  });
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'ACH Credit', amount: 8500, date: '2025-11-24', time: '09:15 AM', merchant: 'Salary Deposit - TechCorp Inc', category: 'Income', status: 'Completed', account: '**** 2847' },
    { id: 2, type: 'Card Purchase', amount: -1250.00, date: '2025-11-23', time: '02:30 PM', merchant: 'Apple Store - MacBook Pro', category: 'Technology', status: 'Completed', account: '**** 2847' },
    { id: 3, type: 'Wire Transfer', amount: -5000, date: '2025-11-23', time: '11:45 AM', merchant: 'Investment Transfer - Vanguard', category: 'Investment', status: 'Completed', account: '**** 2847' },
    { id: 4, type: 'Bill Payment', amount: -289.99, date: '2025-11-22', time: '06:00 AM', merchant: 'Electric Company - Auto Pay', category: 'Utilities', status: 'Completed', account: '**** 2847' },
    { id: 5, type: 'Mobile Deposit', amount: 2450.75, date: '2025-11-21', time: '03:20 PM', merchant: 'Check Deposit - Client Payment', category: 'Income', status: 'Pending', account: '**** 2847' }
  ]);
  const [transferForm, setTransferForm] = useState({ from: '', to: '', amount: '', memo: '' });
  const [securitySettings, setSecuritySettings] = useState({
    twoFA: true,
    biometric: true,
    notifications: true,
    loginAlerts: true,
    transactionLimits: true
  });

  // Save users to localStorage
  function saveUsers(users: any[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bankingUsers', JSON.stringify(users));
      setStoredUsers(users);
    }
  }

  function generateAccountNumber() {
    return Math.floor(Math.random() * 9000 + 1000).toString();
  }

  function generateIBAN() {
    const bankCode = 'NWBK';
    const accountNum = Math.floor(Math.random() * 100000000000000).toString().padStart(14, '0');
    return `US29 ${bankCode} ${accountNum.slice(0, 4)} ${accountNum.slice(4, 8)} ${accountNum.slice(8, 12)} ${accountNum.slice(12)}`;
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Check if username already exists
    if (storedUsers.find((u: any) => u.username === registerForm.username)) {
      alert('Username already exists');
      return;
    }

    // Create new user with initial accounts
    const newUser = {
      id: Date.now(),
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      email: registerForm.email,
      phone: registerForm.phone,
      username: registerForm.username,
      password: registerForm.password, // In real app, this would be hashed
      dateOfBirth: registerForm.dateOfBirth,
      address: registerForm.address,
      createdAt: new Date().toISOString(),
      accounts: [
        {
          id: 1,
          type: 'Checking Account',
          balance: 100.00, // Initial deposit
          account: `**** ${generateAccountNumber()}`,
          iban: generateIBAN(),
          color: 'from-blue-600 to-indigo-600',
          status: 'Active'
        }
      ],
      transactions: [
        {
          id: 1,
          type: 'Initial Deposit',
          amount: 100.00,
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          merchant: 'Account Opening Bonus',
          category: 'Banking',
          status: 'Completed',
          account: `**** ${generateAccountNumber()}`
        }
      ]
    };

    const updatedUsers = [...storedUsers, newUser];
    saveUsers(updatedUsers);
    setCurrentUser(newUser);
    setAccounts(newUser.accounts);
    setTransactions(newUser.transactions);
    setAuthStep('2fa');
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const user = storedUsers.find((u: any) => 
      u.username === loginForm.username && u.password === loginForm.password
    );
    
    if (user) {
      setCurrentUser(user);
      setAccounts(user.accounts || []);
      setTransactions(user.transactions || []);
      setAuthStep('2fa');
    } else {
      alert('Invalid username or password');
    }
  }

  function handle2FA(e: React.FormEvent) {
    e.preventDefault();
    if (twoFACode === '123456') {
      if (biometricEnabled) {
        setAuthStep('biometric');
      } else {
        setIsAuthenticated(true);
        setAuthStep('dashboard');
      }
    }
  }

  function handleBiometric() {
    // Simulate biometric authentication
    setTimeout(() => {
      setIsAuthenticated(true);
      setAuthStep('dashboard');
    }, 1500);
  }

  function handleTransfer(e: React.FormEvent) {
    e.preventDefault();
    if (transferForm.from && transferForm.to && transferForm.amount) {
      const newTransaction = {
        id: Date.now(),
        type: 'Transfer',
        amount: -parseFloat(transferForm.amount),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        merchant: `Transfer to ${transferForm.to}`,
        category: 'Transfer',
        status: 'Processing',
        account: transferForm.from
      };
      
      const updatedTransactions = [newTransaction, ...transactions];
      setTransactions(updatedTransactions);
      
      // Update stored user data
      if (currentUser) {
        const updatedUser = { ...currentUser, transactions: updatedTransactions };
        const updatedUsers = storedUsers.map((u: any) => 
          u.id === currentUser.id ? updatedUser : u
        );
        saveUsers(updatedUsers);
        setCurrentUser(updatedUser);
      }
      
      setTransferForm({ from: '', to: '', amount: '', memo: '' });
      setTab('dashboard');
    }
  }

  function createNewAccount(accountType: string) {
    if (!currentUser) return;
    
    const accountColors = {
      'Savings': 'from-green-600 to-emerald-600',
      'Investment': 'from-purple-600 to-pink-600', 
      'Business': 'from-orange-600 to-red-600',
      'Credit': 'from-red-600 to-rose-600'
    };
    
    const newAccount = {
      id: Date.now(),
      type: accountType,
      balance: 0.00,
      account: `**** ${generateAccountNumber()}`,
      iban: generateIBAN(),
      color: accountColors[accountType as keyof typeof accountColors] || 'from-gray-600 to-gray-700',
      status: 'Active'
    };
    
    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    
    const updatedUser = { ...currentUser, accounts: updatedAccounts };
    const updatedUsers = storedUsers.map((u: any) => 
      u.id === currentUser.id ? updatedUser : u
    );
    saveUsers(updatedUsers);
    setCurrentUser(updatedUser);
  }

  // Registration Screen
  if (authStep === 'register') {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white min-h-[700px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-6">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Create Your Account</h1>
            <p className="text-green-50 font-medium text-lg">Join SecureBank Pro Today</p>
          </div>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">First Name</label>
                <input
                  type="text"
                  value={registerForm.firstName}
                  onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Last Name</label>
                <input
                  type="text"
                  value={registerForm.lastName}
                  onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base font-medium"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">Email Address</label>
              <input
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">Phone Number</label>
              <input
                type="tel"
                value={registerForm.phone}
                onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="(555) 123-4567"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Username</label>
                <input
                  type="text"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={registerForm.dateOfBirth}
                  onChange={(e) => setRegisterForm({...registerForm, dateOfBirth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">Address</label>
              <textarea
                value={registerForm.address}
                onChange={(e) => setRegisterForm({...registerForm, address: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base font-medium"
                rows={2}
                placeholder="123 Main St, City, State 12345"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Password</label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base font-medium"
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setAuthStep('login')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Login Screen
  if (authStep === 'login') {
    return (
      <div className="w-full max-w-sm sm:max-w-md mx-auto bg-white min-h-[700px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zm14 6H2v6a2 2 0 002 2h12a2 2 0 002-2v-6zM4 8a1 1 0 011-1h1a1 1 0 010 2H5a1 1 0 01-1-1zm5-1a1 1 0 000 2h1a1 1 0 000-2H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">SecureBank Pro</h1>
            <p className="text-blue-100 font-medium text-lg">Advanced Mobile Banking</p>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Secure Login</h2>
            <p className="text-gray-700 text-base font-medium">Please enter your credentials to access your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</button>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue to 2FA
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-base font-medium text-gray-700 mb-4">Don't have an account?</p>
            <button
              onClick={() => setAuthStep('register')}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Create New Account
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold">256-bit SSL</span>
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold">FDIC Insured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2FA Verification Screen
  if (authStep === '2fa') {
    return (
      <div className="w-full max-w-sm sm:max-w-md mx-auto bg-white min-h-[700px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h2>
            <p className="text-green-100">Enhanced Security Verification</p>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-4">We've sent a 6-digit verification code to your registered mobile device ending in ***-456.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm"><strong>Demo Code:</strong> 123456</p>
            </div>
          </div>
          
          <form onSubmit={handle2FA} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
              <input
                type="text"
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value)}
                className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent tracking-widest"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Verify & Continue
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button className="text-sm text-gray-600 hover:text-gray-900">Didn't receive code? Resend</button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button 
              onClick={() => setAuthStep('login')}
              className="w-full text-gray-600 hover:text-gray-900 text-sm"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Biometric Authentication Screen
  if (authStep === 'biometric') {
    return (
      <div className="w-full max-w-sm sm:max-w-md mx-auto bg-white min-h-[700px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0 1 1 0 11-2 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 7a4 4 0 100 8 4 4 0 000-8zM6 11a4 4 0 118 0 4 4 0 01-8 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Biometric Verification</h2>
            <p className="text-purple-100">Final Security Check</p>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="animate-pulse mb-6">
              <svg className="w-24 h-24 text-purple-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
            <p className="text-gray-700 mb-6">Please place your finger on the sensor or use Face ID to complete authentication.</p>
            <button
              onClick={handleBiometric}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Authenticate with Biometric
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Banking Dashboard
  return (
    <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-6xl mx-auto bg-white min-h-[700px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
      {/* Professional Banking Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-lg p-2">
              <svg className="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zm14 6H2v6a2 2 0 002 2h12a2 2 0 002-2v-6zM4 8a1 1 0 011-1h1a1 1 0 010 2H5a1 1 0 01-1-1zm5-1a1 1 0 000 2h1a1 1 0 000-2H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">SecureBank Pro</h1>
              <p className="text-blue-200 text-sm">Welcome back, Alexander Johnson</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors relative">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
            </div>
            
            <button 
              onClick={() => setTab('security')}
              className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="text-right">
              <div className="text-sm font-medium">Online</div>
              <div className="text-xs text-green-300 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                Secure Session
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Navigation */}
        <nav className="mt-6">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {[
              { key: 'dashboard', icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z', label: 'Dashboard' },
              { key: 'accounts', icon: 'M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zm14 6H2v6a2 2 0 002 2h12a2 2 0 002-2v-6z', label: 'Accounts' },
              { key: 'transfer', icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z', label: 'Transfer' },
              { key: 'bills', icon: 'M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5z', label: 'Bills & Payments' },
              { key: 'analytics', icon: 'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z', label: 'Analytics' },
              { key: 'security', icon: 'M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z', label: 'Security' }
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setTab(key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  tab === key 
                    ? 'bg-white text-blue-900 shadow-lg' 
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d={icon} clipRule="evenodd" />
                </svg>
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6 bg-gray-50">
        <div className="space-y-6">
          
          {tab === 'dashboard' && (
            <div className="space-y-6">
              {/* Account Overview */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Account Overview</h2>
                <p className="text-gray-600">Manage your accounts and view recent activity</p>
              </div>
              
              {/* Account Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {accounts.map(account => (
                  <div key={account.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className={`h-2 bg-gradient-to-r ${account.color} rounded-t-xl`}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{account.type}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          account.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="mb-3">
                        <div className="text-2xl font-bold text-gray-900">
                          ${account.balance.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">{account.account}</div>
                      </div>
                      <div className="text-sm font-medium text-gray-600 mb-3">
                        {account.iban}
                      </div>
                      <button className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg text-base font-semibold hover:bg-gray-200 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-base font-semibold">
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {transactions.slice(0, 8).map(transaction => (
                    <div key={transaction.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        transaction.amount > 0 ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        {transaction.amount > 0 ? '↓' : '↑'}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-semibold text-gray-900 truncate">{transaction.merchant}</div>
                        <div className="text-sm font-medium text-gray-700">
                          {transaction.date} at {transaction.time} • {transaction.account}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'transfer' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Transfer Funds</h2>
                <p className="text-gray-600">Send money securely to other accounts</p>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <form onSubmit={handleTransfer} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From Account</label>
                      <select 
                        value={transferForm.from}
                        onChange={(e) => setTransferForm({...transferForm, from: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select source account</option>
                        {accounts.map(account => (
                          <option key={account.id} value={account.account}>
                            {account.type} - {account.account} (${account.balance.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">To Account/Recipient</label>
                      <input
                        type="text"
                        value={transferForm.to}
                        onChange={(e) => setTransferForm({...transferForm, to: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Account number or email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="number"
                      value={transferForm.amount}
                      onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                      min="0.01"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Memo (Optional)</label>
                    <input
                      type="text"
                      value={transferForm.memo}
                      onChange={(e) => setTransferForm({...transferForm, memo: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What's this for?"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Transfer Funds
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Save as Template
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {tab === 'accounts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Account Management</h2>
                <button
                  onClick={() => {
                    const accountType = prompt('Enter account type (Savings, Investment, Business, Credit):');
                    if (accountType) createNewAccount(accountType);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  + Add Account
                </button>
              </div>
              
              {/* User Information */}
              {currentUser && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <h3 className="text-xl font-bold text-black mb-4">Account Holder Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                    <div><span className="font-bold text-black">Name:</span> <span className="font-semibold text-gray-900">{currentUser.firstName} {currentUser.lastName}</span></div>
                    <div><span className="font-bold text-black">Email:</span> <span className="font-semibold text-gray-900">{currentUser.email}</span></div>
                    <div><span className="font-bold text-black">Phone:</span> <span className="font-semibold text-gray-900">{currentUser.phone}</span></div>
                    <div><span className="font-bold text-black">Username:</span> <span className="font-semibold text-gray-900">{currentUser.username}</span></div>
                    <div><span className="font-bold text-black">Member Since:</span> <span className="font-semibold text-gray-900">{new Date(currentUser.createdAt).toLocaleDateString()}</span></div>
                    <div><span className="font-bold text-black">Customer ID:</span> <span className="font-semibold text-gray-900">{currentUser.id}</span></div>
                  </div>
                </div>
              )}
              
              {/* All Accounts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map(account => (
                  <div key={account.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className={`h-3 bg-gradient-to-r ${account.color} rounded-t-xl`}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{account.type}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          account.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="mb-4">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          ${account.balance.toLocaleString()}
                        </div>
                        <div className="text-base font-semibold text-gray-700 mb-2">{account.account}</div>
                        <div className="text-sm font-medium text-gray-600">{account.iban}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                          Manage
                        </button>
                        <button className="flex-1 bg-gray-50 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                          Statement
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'security' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Security Settings</h2>
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">All Security Features Active</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Authentication Settings */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                    </svg>
                    Authentication
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-600">SMS + Authenticator App</div>
                      </div>
                      <button 
                        onClick={() => setSecuritySettings({...securitySettings, twoFA: !securitySettings.twoFA})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securitySettings.twoFA ? 'bg-blue-600' : 'bg-gray-200'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${securitySettings.twoFA ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Biometric Login</div>
                        <div className="text-sm text-gray-600">Fingerprint & Face ID</div>
                      </div>
                      <button 
                        onClick={() => setSecuritySettings({...securitySettings, biometric: !securitySettings.biometric})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securitySettings.biometric ? 'bg-blue-600' : 'bg-gray-200'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${securitySettings.biometric ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Recent Security Activity */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Activity</h3>
                  <div className="space-y-3">
                    {[
                      { action: 'Successful login', device: 'iPhone 15 Pro', location: 'San Francisco, CA', time: '2 minutes ago', status: 'success' },
                      { action: '2FA verification', device: 'MacBook Pro', location: 'San Francisco, CA', time: '1 hour ago', status: 'success' },
                      { action: 'Password updated', device: 'iPad Pro', location: 'San Francisco, CA', time: '2 days ago', status: 'info' },
                      { action: 'Failed login attempt', device: 'Unknown device', location: 'New York, NY', time: '1 week ago', status: 'warning' }
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-500' :
                          activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{activity.action}</div>
                          <div className="text-sm text-gray-600">{activity.device} • {activity.location}</div>
                        </div>
                        <div className="text-sm text-gray-500">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'bills' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Bills & Payments</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <p className="text-gray-600 text-center py-8">Bills and payments functionality coming soon.</p>
              </div>
            </div>
          )}

          {tab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Financial Analytics</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <p className="text-gray-600 text-center py-8">Analytics dashboard coming soon.</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// DEMO 4: REAL ESTATE - Property Gallery Layout with Map Integration Style
function RealEstateApp() {
  const [tab, setTab] = useState<'browse'|'favorites'|'search'|'virtual'>('browse');
  const [properties] = useState([
    { id: 1, title: 'Modern Downtown Condo', price: 450000, beds: 2, baths: 2, sqft: 1200, img: '🏢', location: 'Downtown', type: 'Condo' },
    { id: 2, title: 'Suburban Family Home', price: 650000, beds: 4, baths: 3, sqft: 2400, img: '🏠', location: 'Suburbs', type: 'House' },
    { id: 3, title: 'Luxury Penthouse', price: 1200000, beds: 3, baths: 3, sqft: 1800, img: '🏙️', location: 'City Center', type: 'Penthouse' },
    { id: 4, title: 'Cozy Townhouse', price: 380000, beds: 3, baths: 2, sqft: 1600, img: '🏘️', location: 'Midtown', type: 'Townhouse' }
  ]);
  const [favorites, setFavorites] = useState<number[]>([1, 3]);

  function toggleFavorite(id: number) {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 min-h-[700px] rounded-2xl overflow-hidden shadow-2xl">
      {/* Property Header with Map Style */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-4 text-4xl animate-bounce">🏠</div>
          <div className="absolute top-4 right-8 text-3xl animate-pulse">🗺️</div>
          <div className="absolute bottom-2 left-12 text-2xl animate-float">📍</div>
          <div className="absolute bottom-4 right-4 text-3xl animate-spin" style={{animationDuration: '6s'}}>🔍</div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl animate-bounce">🏡</div>
              <div>
                <h1 className="text-3xl font-bold animate-slideInLeft">EstateView</h1>
                <p className="text-amber-100">Find Your Dream Home</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 animate-fadeIn">
              <div className="text-sm text-amber-100 mb-1">Properties</div>
              <div className="font-bold text-2xl">2,847</div>
            </div>
          </div>
          
          {/* Map-Style Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { key: 'browse', icon: '🏠', label: 'Browse', description: 'All Properties' },
              { key: 'favorites', icon: '❤️', label: 'Favorites', description: 'Saved Homes' },
              { key: 'search', icon: '🔍', label: 'Search', description: 'Find Specific' },
              { key: 'virtual', icon: '🥽', label: 'Virtual Tours', description: '360° Views' }
            ].map(({ key, icon, label, description }) => (
              <button
                key={key}
                onClick={() => setTab(key as any)}
                className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  tab === key 
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-md' 
                    : 'text-amber-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="text-2xl mb-1 animate-bounce">{icon}</div>
                <div className="text-sm font-bold">{label}</div>
                <div className="text-xs opacity-80">{description}</div>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Property Gallery */}
      <main className="p-6">
        {tab === 'browse' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="animate-bounce">🏠</span> Featured Properties
              </h2>
              <div className="flex gap-2">
                <button className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-sm font-medium animate-pulse">
                  📍 Map View
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
                  📋 List View
                </button>
              </div>
            </div>
            
            {/* Property Cards with Flip Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.map((property, idx) => (
                <div key={property.id} className={`group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-slideInUp`} style={{animationDelay: `${idx * 0.2}s`}}>
                  {/* Property Image Area */}
                  <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-8xl opacity-80 animate-float">{property.img}</div>
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                        favorites.includes(property.id) 
                          ? 'bg-red-500 text-white animate-heartbeat' 
                          : 'bg-white/80 text-gray-600 hover:bg-red-100'
                      }`}
                    >
                      ❤️
                    </button>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-amber-700">{property.type}</span>
                    </div>
                  </div>
                  
                  {/* Property Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                    <p className="text-gray-600 mb-4 flex items-center gap-2">
                      <span className="animate-pulse">📍</span> {property.location}
                    </p>
                    
                    {/* Property Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl mb-1 animate-bounce">🛏️</div>
                        <div className="text-sm text-gray-600">{property.beds} Beds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-1 animate-bounce">🚿</div>
                        <div className="text-sm text-gray-600">{property.baths} Baths</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-1 animate-bounce">📏</div>
                        <div className="text-sm text-gray-600">{property.sqft} sqft</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-amber-600 animate-glow">
                        ${property.price.toLocaleString()}
                      </div>
                      <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'favorites' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="animate-heartbeat">❤️</span> Your Favorites
            </h2>
            {favorites.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-4 animate-bounce">💔</div>
                <div className="text-xl text-gray-700 mb-4">No favorites yet</div>
                <button 
                  onClick={() => setTab('browse')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Browse Properties
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.filter(p => favorites.includes(p.id)).map((property, idx) => (
                  <div key={property.id} className={`bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slideInLeft`} style={{animationDelay: `${idx * 0.1}s`}}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl animate-bounce">{property.img}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{property.title}</h3>
                        <p className="text-gray-600 text-sm">{property.location}</p>
                      </div>
                      <div className="text-xl font-bold text-amber-600">
                        ${property.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'search' && (
          <div className="space-y-6 animate-slideInRight">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="animate-spin" style={{animationDuration: '3s'}}>🔍</span> Search Properties
            </h2>
            
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="animate-slideInLeft">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300">
                    <option>All Locations</option>
                    <option>Downtown</option>
                    <option>Suburbs</option>
                    <option>City Center</option>
                  </select>
                </div>
                
                <div className="animate-slideInUp">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300">
                    <option>Any Price</option>
                    <option>$0 - $400k</option>
                    <option>$400k - $800k</option>
                    <option>$800k+</option>
                  </select>
                </div>
                
                <div className="animate-slideInDown">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300">
                    <option>Any</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                  </select>
                </div>
                
                <div className="animate-slideInRight">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300">
                    <option>All Types</option>
                    <option>House</option>
                    <option>Condo</option>
                    <option>Townhouse</option>
                  </select>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse">
                🔍 Search Properties
              </button>
            </div>
          </div>
        )}

        {tab === 'virtual' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="animate-spin" style={{animationDuration: '2s'}}>🥽</span> Virtual Tours
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.slice(0, 2).map((property, idx) => (
                <div key={property.id} className={`bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-bounceIn`} style={{animationDelay: `${idx * 0.3}s`}}>
                  <div className="h-64 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center relative">
                    <div className="text-8xl animate-float">{property.img}</div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button className="bg-white/90 backdrop-blur-md text-gray-800 p-6 rounded-full text-4xl hover:bg-white transition-all duration-300 transform hover:scale-110 animate-pulse">
                        ▶️
                      </button>
                    </div>
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                      🔴 LIVE
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                    <p className="text-gray-600 mb-4">360° Virtual Tour Available</p>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        🥽 Start Tour
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300">
                        📱 AR View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// DEMO 5: FOOD DELIVERY - Mobile App version with location services  
function FoodDeliveryApp() {
  const [tab, setTab] = useState<'browse'|'cart'|'orders'|'tracking'|'location'|'profile'>('location');
  const [location, setLocation] = useState<{latitude?: number, longitude?: number, address?: string}>({});
  const [locationPermission, setLocationPermission] = useState<'pending'|'granted'|'denied'>('pending');
  const [nearbyRestaurants, setNearbyRestaurants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'distance'|'rating'|'deliveryTime'|'price'>('distance');
  const [cart, setCart] = useState<any[]>([]);
  
  const [userProfile] = useState({
    name: 'Erik Andersson',
    email: 'erik@malmoeats.se',
    phone: '+46 70 123 45 67',
    address: 'Västra Hamngatan 15, 211 25 Malmö',
    memberSince: '2024-03-15',
    totalOrders: 47,
    loyaltyPoints: 1250
  });
  
  const [malmöRestaurants] = useState([
    { 
      id: 1, 
      name: 'Bastard Malmö', 
      cuisine: 'Swedish Fine Dining', 
      rating: 4.7, 
      reviewCount: 324,
      deliveryTime: '45-60 min', 
      deliveryFee: 49, 
      minOrder: 200,
      img: '🥘', 
      popular: true, 
      distance: 1.2, 
      address: 'Mäster Johansgatan 11, 211 25 Malmö', 
      specialty: 'Modern Nordic Cuisine',
      description: 'Award-winning restaurant featuring modern interpretations of traditional Nordic dishes',
      priceRange: '💰💰💰',
      openHours: '17:00 - 23:00',
      features: ['Organic', 'Local Sourced', 'Wine Pairing'],
      estimatedPrice: '450-650 SEK per person'
    },
    { 
      id: 2, 
      name: 'Falafel No. 1', 
      cuisine: 'Middle Eastern', 
      rating: 4.8, 
      reviewCount: 892,
      deliveryTime: '20-30 min', 
      deliveryFee: 29, 
      minOrder: 80,
      img: '🧆', 
      popular: true, 
      distance: 0.8, 
      address: 'Bergsgatan 23, 211 54 Malmö', 
      specialty: 'Authentic Lebanese Falafel',
      description: 'Malmö\'s most beloved falafel spot serving authentic Middle Eastern cuisine since 1987',
      priceRange: '💰',
      openHours: '11:00 - 22:00',
      features: ['Vegetarian', 'Vegan Options', 'Halal'],
      estimatedPrice: '80-150 SEK per person'
    },
    { 
      id: 3, 
      name: 'Surf Shack', 
      cuisine: 'Swedish Seafood', 
      rating: 4.5, 
      reviewCount: 156,
      deliveryTime: '35-45 min', 
      deliveryFee: 39, 
      minOrder: 150,
      img: '🦐', 
      popular: false, 
      distance: 2.1, 
      address: 'Västra Hamnen 12, 211 19 Malmö', 
      specialty: 'Fresh Öresund Seafood',
      description: 'Waterfront location serving the freshest seafood from local Öresund waters',
      priceRange: '💰💰',
      openHours: '12:00 - 21:00',
      features: ['Fresh Daily', 'Sustainable', 'Waterfront View'],
      estimatedPrice: '250-400 SEK per person'
    },
    { 
      id: 4, 
      name: 'Mando Steakhouse', 
      cuisine: 'Steakhouse', 
      rating: 4.6, 
      reviewCount: 278,
      deliveryTime: '40-55 min', 
      deliveryFee: 45, 
      minOrder: 250,
      img: '🥩', 
      popular: true, 
      distance: 1.5, 
      address: 'Engelbrektsgatan 17, 211 33 Malmö', 
      specialty: 'Premium Aged Steaks',
      description: 'Premium steakhouse featuring dry-aged beef and an extensive wine selection',
      priceRange: '💰💰💰',
      openHours: '17:00 - 22:30',
      features: ['Dry-Aged', 'Wine Cellar', 'Premium Cuts'],
      estimatedPrice: '400-700 SEK per person'
    },
    { 
      id: 5, 
      name: 'Krua Thai', 
      cuisine: 'Thai', 
      rating: 4.4, 
      reviewCount: 203,
      deliveryTime: '25-35 min', 
      deliveryFee: 35, 
      minOrder: 120,
      img: '🍜', 
      popular: false, 
      distance: 1.8, 
      address: 'Södergatan 32, 211 34 Malmö', 
      specialty: 'Authentic Thai Street Food',
      description: 'Family-owned restaurant bringing authentic Thai flavors to Malmö since 2010',
      priceRange: '💰💰',
      openHours: '16:00 - 21:30',
      features: ['Spicy Options', 'Fresh Herbs', 'Family Recipe'],
      estimatedPrice: '180-280 SEK per person'
    },
    { 
      id: 6, 
      name: 'Da Enzo', 
      cuisine: 'Italian', 
      rating: 4.3, 
      reviewCount: 167,
      deliveryTime: '30-40 min', 
      deliveryFee: 42, 
      minOrder: 160,
      img: '🍝', 
      popular: false, 
      distance: 2.3, 
      address: 'Stortorget 15, 211 22 Malmö', 
      specialty: 'Traditional Neapolitan',
      description: 'Authentic Italian trattoria with traditional recipes from Naples and Sicily',
      priceRange: '💰💰',
      openHours: '17:00 - 22:00',
      features: ['Wood-Fired Oven', 'Imported Ingredients', 'Traditional'],
      estimatedPrice: '220-350 SEK per person'
    },
    { 
      id: 7, 
      name: 'Salt & Brygga', 
      cuisine: 'Swedish Modern', 
      rating: 4.8, 
      reviewCount: 445,
      deliveryTime: '50-65 min', 
      deliveryFee: 55, 
      minOrder: 300,
      img: '🍤', 
      popular: true, 
      distance: 2.5, 
      address: 'Sundspromenaden 7, 211 18 Malmö', 
      specialty: 'Modern Scandinavian Waterfront',
      description: 'Upscale waterfront dining with panoramic views of the Öresund Bridge',
      priceRange: '💰💰💰',
      openHours: '18:00 - 23:00',
      features: ['Waterfront View', 'Tasting Menu', 'Cocktail Bar'],
      estimatedPrice: '500-800 SEK per person'
    },
    { 
      id: 8, 
      name: 'Vollmers', 
      cuisine: 'Michelin Star', 
      rating: 4.9, 
      reviewCount: 89,
      deliveryTime: '60-75 min', 
      deliveryFee: 75, 
      minOrder: 400,
      img: '⭐', 
      popular: true, 
      distance: 1.9, 
      address: 'Tegelgårdsgatan 5, 211 33 Malmö', 
      specialty: 'Michelin Starred Fine Dining',
      description: 'Malmö\'s only Michelin-starred restaurant offering an exceptional tasting menu experience',
      priceRange: '💰💰💰💰',
      openHours: '18:30 - 22:00',
      features: ['Michelin Star', 'Tasting Menu Only', 'Wine Pairing'],
      estimatedPrice: '1200-1800 SEK per person'
    }
  ]);
  const [orders] = useState([
    { id: 1001, restaurant: 'Bastard Malmö', items: ['Reindeer Tartare', 'Nordic Salmon'], total: 485, status: 'Delivered', time: '1 hour ago' },
    { id: 1002, restaurant: 'Falafel No. 1', items: ['Falafel Plate', 'Hummus'], total: 149, status: 'Preparing', time: '5 min ago' }
  ]);

  const requestLocation = () => {
    setLocationPermission('pending');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude, address: 'Malmö, Sweden' });
          setLocationPermission('granted');
          // Filter restaurants by distance (simulate based on Malmö location)
          const nearby = malmöRestaurants.filter(r => r.distance <= 3).sort((a, b) => a.distance - b.distance);
          setNearbyRestaurants(nearby);
          setTab('browse');
        },
        (error) => {
          console.error('Location error:', error);
          setLocationPermission('denied');
          // Use mock Malmö location
          setLocation({ address: 'Malmö Central, Sweden' });
          setNearbyRestaurants(malmöRestaurants);
        }
      );
    } else {
      setLocationPermission('denied');
      setLocation({ address: 'Malmö, Sweden' });
      setNearbyRestaurants(malmöRestaurants);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white min-h-screen flex flex-col overflow-hidden shadow-2xl">
      {/* Mobile App Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-6 relative shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 text-lg font-bold shadow-lg">
              🇸🇪
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MalmöEats</h1>
              <p className="text-blue-200 text-xs font-medium">
                📍 {location.address ? location.address.split(',')[0] : 'Malmö'}
                {locationPermission === 'granted' && (
                  <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">Live</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setTab('cart')}
                className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl transition-all duration-200 active:scale-95 shadow-lg"
              >
                <span className="text-lg">🛒</span>
              </button>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Tab Search */}
        {tab === 'browse' && (
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-blue-200 font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200 text-lg">🔍</span>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </header>      {/* Mobile Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {tab === 'location' && (
          <div className="p-4 space-y-6 animate-fadeIn pb-20">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-6 shadow-xl">
                📍
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Find Food Near You</h2>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">Enable location to discover the best restaurants and get faster delivery in Malmö</p>
              
              {locationPermission === 'pending' && (
                <div className="space-y-4">
                  <button 
                    onClick={requestLocation}
                    className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    📍 Access Location
                  </button>
                  <p className="text-sm text-gray-500">We need your location to show nearby restaurants</p>
                </div>
              )}
              
              {locationPermission === 'granted' && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                    <span className="text-xl">✅</span>
                    <span className="font-semibold">Location Found!</span>
                  </div>
                  <p className="text-gray-700 mb-4">{location.address}</p>
                  <p className="text-sm text-gray-500 mb-4">Found {nearbyRestaurants.length} restaurants nearby</p>
                  <button 
                    onClick={() => setTab('browse')}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    🍽️ Browse Restaurants
                  </button>
                </div>
              )}
              
              {locationPermission === 'denied' && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-center gap-2 text-orange-600 mb-4">
                    <span className="text-xl">⚠️</span>
                    <span className="font-semibold">Location Access Denied</span>
                  </div>
                  <p className="text-gray-700 mb-4">Showing all Malmö restaurants</p>
                  <button 
                    onClick={() => setTab('browse')}
                    className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    🍽️ Browse All Restaurants
                  </button>
                </div>
              )}
            </div>
            
            {/* Malmö Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🇸🇪 About Malmö Food Scene
              </h3>
              <p className="text-gray-600 mb-4">
                Malmö offers an incredible diversity of restaurants, from traditional Swedish cuisine to international flavors. 
                Our city is known for its innovative food scene and sustainable dining options.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-2xl mb-2">🥘</div>
                  <div className="font-semibold text-gray-800">Nordic Cuisine</div>
                  <div className="text-sm text-gray-600">Traditional & Modern</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl">
                  <div className="text-2xl mb-2">🌍</div>
                  <div className="font-semibold text-gray-800">International</div>
                  <div className="text-sm text-gray-600">Global Flavors</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {tab === 'browse' && (
          <div className="pb-20">
            {/* Mobile Filters */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">
                  🍽️ {(nearbyRestaurants.length > 0 ? nearbyRestaurants : malmöRestaurants).length} Restaurants
                </h2>
                <button 
                  onClick={() => setTab('location')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-xl transform hover:scale-105"
                >
                  📍 Update Location
                </button>
              </div>
              
              {/* Professional Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search restaurants, cuisines, or dishes in Malmö..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pl-16 bg-gray-50 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 font-medium text-lg shadow-lg"
                  />
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                    🔍
                  </div>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              
              {/* Professional Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sort Restaurants</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-semibold text-gray-800 shadow-lg"
                  >
                    <option value="distance">📍 Sort by Distance</option>
                    <option value="rating">⭐ Sort by Rating</option>
                    <option value="deliveryTime">🚚 Sort by Delivery Time</option>
                    <option value="price">💰 Sort by Price</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Cuisine Type</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-semibold text-gray-800 shadow-lg"
                  >
                    <option value="all">🍽️ All Cuisines</option>
                    <option value="swedish">🇸🇪 Swedish</option>
                    <option value="fine-dining">⭐ Fine Dining</option>
                    <option value="fast">⚡ Quick Delivery</option>
                    <option value="popular">🔥 Popular</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price Range</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-semibold text-gray-800 shadow-lg">
                    <option>💰 Budget Friendly</option>
                    <option>💰💰 Mid Range</option>
                    <option>💰💰💰 Premium</option>
                    <option>💰💰💰💰 Luxury</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Professional Restaurant Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {(nearbyRestaurants.length > 0 ? nearbyRestaurants : malmöRestaurants)
                .filter(restaurant => {
                  const matchesSearch = searchQuery === '' || 
                    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    restaurant.specialty.toLowerCase().includes(searchQuery.toLowerCase());
                  
                  const matchesCategory = selectedCategory === 'all' ||
                    (selectedCategory === 'swedish' && restaurant.cuisine.includes('Swedish')) ||
                    (selectedCategory === 'fine-dining' && (restaurant.cuisine.includes('Fine') || restaurant.cuisine.includes('Michelin'))) ||
                    (selectedCategory === 'fast' && parseInt(restaurant.deliveryTime.split('-')[0]) <= 25) ||
                    (selectedCategory === 'popular' && restaurant.popular);
                    
                  return matchesSearch && matchesCategory;
                })
                .sort((a, b) => {
                  switch(sortBy) {
                    case 'rating': return b.rating - a.rating;
                    case 'deliveryTime': return parseInt(a.deliveryTime.split('-')[0]) - parseInt(b.deliveryTime.split('-')[0]);
                    case 'price': return a.deliveryFee - b.deliveryFee;
                    default: return a.distance - b.distance;
                  }
                })
                .map((restaurant, idx) => (
                <div key={restaurant.id} className={`bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] animate-slideInUp border-2 border-gray-100 hover:border-blue-200`} style={{animationDelay: `${idx * 0.1}s`}}>
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center border-b-2 border-gray-200">
                      <div className="text-8xl transform hover:scale-110 transition-transform duration-300" style={{filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))'}}>
                        {restaurant.img}
                      </div>
                    </div>
                    {/* Professional Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {restaurant.popular && (
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          🔥 Popular Choice
                        </div>
                      )}
                      {restaurant.cuisine.includes('Michelin') && (
                        <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          ⭐ Michelin Star
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-full shadow-lg">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 font-bold">⭐</span>
                        <span className="font-bold text-gray-800">{restaurant.rating}</span>
                        <span className="text-gray-500 text-sm">({restaurant.reviewCount})</span>
                      </div>
                    </div>
                    
                    {location.latitude && (
                      <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        📍 {restaurant.distance}km away
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{restaurant.name}</h3>
                        <p className="text-blue-600 font-semibold text-sm">{restaurant.specialty}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">{restaurant.priceRange}</div>
                        <div className="text-xs text-gray-500">{restaurant.estimatedPrice}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">{restaurant.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <span>🕒</span>
                        <span className="font-medium">{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <span>🚚</span>
                        <span className="font-medium">{restaurant.deliveryFee} SEK</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <span>📦</span>
                        <span className="font-medium">Min {restaurant.minOrder} SEK</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.features.map((feature, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <div className="font-semibold">{restaurant.openHours}</div>
                        <div className="text-xs">{restaurant.address.split(',')[0]}</div>
                      </div>
                      <button 
                        onClick={() => {
                          setCart([...cart, { ...restaurant, quantity: 1 }]);
                          alert(`✅ ${restaurant.name} added to your cart!`);
                        }}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quick Food Categories */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">🍴 Popular Categories in Malmö</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: '🥘', label: 'Nordic', color: 'from-blue-400 to-blue-500' },
                  { icon: '🧆', label: 'Falafel', color: 'from-green-400 to-teal-500' },
                  { icon: '🦐', label: 'Seafood', color: 'from-cyan-400 to-blue-500' },
                  { icon: '⭐', label: 'Fine Dining', color: 'from-yellow-400 to-orange-500' }
                ].map((category, idx) => (
                  <button 
                    key={category.label} 
                    onClick={() => {
                      const filtered = malmöRestaurants.filter(r => 
                        r.cuisine.toLowerCase().includes(category.label.toLowerCase()) || 
                        r.specialty.toLowerCase().includes(category.label.toLowerCase())
                      );
                      setNearbyRestaurants(filtered);
                    }}
                    className={`bg-gradient-to-br ${category.color} text-white p-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-bounceIn`} 
                    style={{animationDelay: `${idx * 0.1}s`}}
                  >
                    <div className="text-2xl mb-1 animate-bounce">{category.icon}</div>
                    <div className="text-xs font-bold">{category.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'cart' && (
          <div className="space-y-4 animate-slideInRight">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">🛒 Your Cart</h2>
              {cart.length > 0 && (
                <button 
                  onClick={() => setCart([])}
                  className="text-red-500 text-sm font-medium"
                >
                  Clear Cart
                </button>
              )}
            </div>
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4 animate-bounce">🛒</div>
                <div className="text-gray-700 mb-4">Your cart is empty</div>
                <button 
                  onClick={() => setTab('browse')}
                  className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Start Ordering 🍽️
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg p-4 animate-slideInLeft" style={{animationDelay: `${idx * 0.1}s`}}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{item.img}</div>
                        <div>
                          <h3 className="font-bold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.specialty}</p>
                          <p className="text-xs text-gray-500">{item.address}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-800">{item.deliveryFee} SEK</div>
                        <button 
                          onClick={() => setCart(cart.filter((_, i) => i !== idx))}
                          className="text-red-500 text-sm mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-white rounded-2xl shadow-lg p-4 border-t-4 border-blue-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-xl text-blue-600">
                      {cart.reduce((sum, item) => sum + item.deliveryFee, 0)} SEK
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      alert('Order placed successfully! 🎉');
                      setCart([]);
                      setTab('orders');
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-yellow-500 text-white py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Place Order 🇸🇪
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'orders' && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-800">📦 Your Orders</h2>
            {orders.map((order, idx) => (
              <div key={order.id} className={`bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 animate-slideInLeft`} style={{animationDelay: `${idx * 0.1}s`}}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800">{order.restaurant}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-700' 
                      : order.status === 'Preparing'
                      ? 'bg-blue-100 text-blue-700 animate-pulse'
                      : 'bg-orange-100 text-orange-700 animate-pulse'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{order.items.join(', ')}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800">{order.total} SEK</span>
                  <span className="text-sm text-gray-500">{order.time}</span>
                </div>
                {order.status !== 'Delivered' && (
                  <button 
                    onClick={() => setTab('tracking')}
                    className="mt-3 w-full bg-gradient-to-r from-blue-600 to-yellow-500 text-white py-2 rounded-full text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    🚚 Track Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'tracking' && (
          <div className="space-y-4 animate-slideInUp">
            <h2 className="text-lg font-bold text-gray-800">🚚 Order Tracking</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 animate-bounce">🚚</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Order #1002</h3>
                <p className="text-gray-600">Falafel No. 1</p>
                <p className="text-sm text-blue-600">📍 Bergsgatan 23, Malmö</p>
              </div>
              
              {/* Tracking Steps */}
              <div className="space-y-4">
                {[
                  { step: 'Order Placed', time: '14:45', completed: true, icon: '✅' },
                  { step: 'Preparing Falafel', time: '14:50', completed: true, icon: '👨‍🍳' },
                  { step: 'Out for Delivery', time: '15:10', completed: false, icon: '🚚', active: true },
                  { step: 'Delivered', time: 'ETA 15:25', completed: false, icon: '🎉' }
                ].map((tracking, idx) => (
                  <div key={tracking.step} className={`flex items-center gap-4 animate-slideInLeft`} style={{animationDelay: `${idx * 0.1}s`}}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      tracking.completed 
                        ? 'bg-green-100 text-green-600' 
                        : tracking.active
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'
                    } ${tracking.active ? 'animate-pulse' : ''}`}>
                      {tracking.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${tracking.completed || tracking.active ? 'text-gray-800' : 'text-gray-400'}`}>
                        {tracking.step}
                      </div>
                      <div className="text-sm text-gray-500">{tracking.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-3">
                <button 
                  onClick={() => alert('Calling delivery driver... 📞')}
                  className="w-full bg-gradient-to-r from-blue-600 to-yellow-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  📞 Contact Driver
                </button>
                <div className="text-center text-sm text-gray-500">
                  Estimated delivery: 15 minutes
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-2 py-2 flex justify-around items-center shadow-2xl">
        {[
          { key: 'location', icon: '📍', label: 'Location' },
          { key: 'browse', icon: '🍽️', label: 'Browse' },
          { key: 'cart', icon: '🛒', label: 'Cart' },
          { key: 'orders', icon: '📦', label: 'Orders' },
          { key: 'profile', icon: '👤', label: 'Profile' }
        ].map(({ key, icon, label }) => (
          <button
            key={key}
            onClick={() => setTab(key as any)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 active:scale-95 min-w-0 flex-1 relative ${
              tab === key 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-500'
            }`}
          >
            <span className="text-lg">{icon}</span>
            <span className="text-xs font-semibold truncate">{label}</span>
            {key === 'cart' && cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

// DEMO 6: LEARNING PLATFORM - Course Progress with Interactive Elements
function LearningApp() {
  const [tab, setTab] = useState<'courses'|'progress'|'achievements'|'quiz'>('courses');
  const [courses] = useState([
    { id: 1, title: 'JavaScript Fundamentals', progress: 75, lessons: 24, duration: '8 weeks', img: '📚', level: 'Beginner', enrolled: true },
    { id: 2, title: 'React Development', progress: 45, lessons: 18, duration: '6 weeks', img: '⚛️', level: 'Intermediate', enrolled: true },
    { id: 3, title: 'Python for Data Science', progress: 0, lessons: 32, duration: '12 weeks', img: '🐍', level: 'Advanced', enrolled: false },
    { id: 4, title: 'UI/UX Design Basics', progress: 90, lessons: 16, duration: '4 weeks', img: '🎨', level: 'Beginner', enrolled: true }
  ]);
  const [achievements] = useState([
    { id: 1, title: 'First Course Completed', desc: 'Complete your first course', icon: '🎓', earned: true },
    { id: 2, title: 'Week Streak', desc: 'Study for 7 consecutive days', icon: '🔥', earned: true },
    { id: 3, title: 'Quiz Master', desc: 'Score 100% on 5 quizzes', icon: '🏆', earned: false },
    { id: 4, title: 'Speed Learner', desc: 'Complete a course in under 30 days', icon: '⚡', earned: false }
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 min-h-[700px] rounded-3xl overflow-hidden shadow-2xl">
      {/* Learning Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-4 text-4xl animate-bounce">📚</div>
          <div className="absolute top-6 right-8 text-3xl animate-pulse">🎓</div>
          <div className="absolute bottom-2 left-12 text-2xl animate-spin" style={{animationDuration: '5s'}}>⚛️</div>
          <div className="absolute bottom-4 right-4 text-3xl animate-float">🧠</div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl animate-bounce">🧠</div>
              <div>
                <h1 className="text-3xl font-bold animate-slideInLeft">LearnHub</h1>
                <p className="text-indigo-100">Interactive Learning Platform</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-indigo-100 mb-1">Learning Streak</div>
              <div className="text-2xl font-bold animate-glow">12 days 🔥</div>
            </div>
          </div>
          
          {/* Learning Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { key: 'courses', icon: '📚', label: 'My Courses', desc: 'Continue Learning' },
              { key: 'progress', icon: '📊', label: 'Progress', desc: 'Track Growth' },
              { key: 'achievements', icon: '🏆', label: 'Achievements', desc: 'Unlock Badges' },
              { key: 'quiz', icon: '🧩', label: 'Quiz', desc: 'Test Knowledge' }
            ].map(({ key, icon, label, desc }) => (
              <button
                key={key}
                onClick={() => setTab(key as any)}
                className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  tab === key 
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-md' 
                    : 'text-indigo-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="text-2xl mb-2 animate-bounce">{icon}</div>
                <div className="text-sm font-bold">{label}</div>
                <div className="text-xs opacity-80">{desc}</div>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Learning Content */}
      <main className="p-6">
        {tab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="animate-bounce">📚</span> My Courses
              </h2>
              <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl text-sm font-medium animate-pulse">
                Browse All Courses
              </button>
            </div>
            
            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.filter(c => c.enrolled).map((course, idx) => (
                <div key={course.id} className={`bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp`} style={{animationDelay: `${idx * 0.2}s`}}>
                  <div className="h-32 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center relative">
                    <div className="text-6xl animate-bounce" style={{animationDelay: `${idx * 0.3}s`}}>
                      {course.img}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-indigo-600">{course.level}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>📖 {course.lessons} lessons</span>
                      <span>⏰ {course.duration}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-bold text-indigo-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-1000 animate-pulse" 
                          style={{width: `${course.progress}%`}}
                        />
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      Continue Learning →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'progress' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="animate-bounce">📊</span> Learning Progress
            </h2>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Courses Completed', value: '2', icon: '🎓', color: 'text-green-600' },
                { label: 'Hours Learned', value: '47', icon: '⏰', color: 'text-blue-600' },
                { label: 'Quizzes Passed', value: '18', icon: '✅', color: 'text-purple-600' },
                { label: 'Certificates', value: '1', icon: '📜', color: 'text-orange-600' }
              ].map((stat, idx) => (
                <div key={stat.label} className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slideInUp`} style={{animationDelay: `${idx * 0.1}s`}}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl animate-bounce">{stat.icon}</span>
                    <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Weekly Activity */}
            <div className="bg-white rounded-3xl shadow-lg p-6 animate-slideInLeft">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Weekly Activity</h3>
              <div className="flex items-end justify-between h-32 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                  const height = Math.random() * 80 + 20;
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg w-full transition-all duration-1000 animate-pulse"
                        style={{height: `${height}%`, animationDelay: `${idx * 0.1}s`}}
                      />
                      <div className="text-xs text-gray-600 mt-2">{day}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === 'achievements' && (
          <div className="space-y-6 animate-slideInRight">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="animate-bounce">🏆</span> Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, idx) => (
                <div key={achievement.id} className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${achievement.earned ? 'animate-glow' : 'animate-fadeIn'}`} style={{animationDelay: `${idx * 0.1}s`}}>
                  <div className="flex items-center gap-4">
                    <div className={`text-4xl ${achievement.earned ? 'animate-bounce' : 'grayscale animate-pulse'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${achievement.earned ? 'text-gray-800' : 'text-gray-400'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.desc}
                      </p>
                      {achievement.earned && (
                        <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                          ✅ Earned
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'quiz' && (
          <div className="space-y-6 animate-bounceIn">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="animate-spin" style={{animationDuration: '3s'}}>🧩</span> Interactive Quiz
            </h2>
            
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 animate-bounce">🤔</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">JavaScript Fundamentals Quiz</h3>
                <p className="text-gray-600">Question 3 of 10</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000" style={{width: '30%'}} />
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  What is the correct way to declare a variable in JavaScript?
                </h4>
                
                <div className="space-y-3">
                  {[
                    'var myVariable = "Hello";',
                    'let myVariable = "Hello";',
                    'const myVariable = "Hello";',
                    'All of the above'
                  ].map((option, idx) => (
                    <button key={idx} className={`w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 animate-slideInLeft`} style={{animationDelay: `${idx * 0.1}s`}}>
                      <span className="font-medium text-gray-800">
                        {String.fromCharCode(65 + idx)}. {option}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300">
                  Previous
                </button>
                <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse">
                  Next Question →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// DEMO 3: HEALTHCARE MANAGEMENT SYSTEM - Professional Medical Interface
function HealthcareApp() {
  const [authStep, setAuthStep] = useState<'login'|'register'|'dashboard'>('login');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [tab, setTab] = useState<'dashboard'|'patients'|'appointments'|'medical-records'|'prescriptions'|'analytics'|'settings'>('dashboard');
  
  // Healthcare Data
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Smith', age: 45, gender: 'Male', condition: 'Hypertension', lastVisit: '2025-11-20', bloodType: 'O+', phone: '(555) 123-4567', email: 'john.smith@email.com', insurance: 'BlueCross Premium', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', age: 32, gender: 'Female', condition: 'Diabetes Type 2', lastVisit: '2025-11-18', bloodType: 'A+', phone: '(555) 234-5678', email: 'sarah.j@email.com', insurance: 'Aetna Health', status: 'Active' },
    { id: 3, name: 'Michael Brown', age: 67, gender: 'Male', condition: 'Heart Disease', lastVisit: '2025-11-15', bloodType: 'B-', phone: '(555) 345-6789', email: 'michael.b@email.com', insurance: 'Medicare', status: 'Critical' },
    { id: 4, name: 'Emily Davis', age: 28, gender: 'Female', condition: 'Anxiety', lastVisit: '2025-11-22', bloodType: 'AB+', phone: '(555) 456-7890', email: 'emily.d@email.com', insurance: 'UnitedHealth', status: 'Active' }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'John Smith', doctor: 'Dr. Wilson', date: '2025-11-25', time: '09:00 AM', type: 'Routine Checkup', status: 'Confirmed', room: 'A101', duration: '30 min' },
    { id: 2, patientName: 'Sarah Johnson', doctor: 'Dr. Martinez', date: '2025-11-25', time: '10:30 AM', type: 'Blood Sugar Check', status: 'Confirmed', room: 'B205', duration: '20 min' },
    { id: 3, patientName: 'Michael Brown', doctor: 'Dr. Chen', date: '2025-11-25', time: '02:00 PM', type: 'Cardiology Consultation', status: 'Pending', room: 'C301', duration: '45 min' },
    { id: 4, patientName: 'Emily Davis', doctor: 'Dr. Thompson', date: '2025-11-26', time: '11:00 AM', type: 'Therapy Session', status: 'Confirmed', room: 'D102', duration: '60 min' }
  ]);

  const [prescriptions, setPrescriptions] = useState([
    { id: 1, patient: 'John Smith', medication: 'Lisinopril 10mg', dosage: 'Once daily', prescribed: '2025-11-20', doctor: 'Dr. Wilson', refills: 3, status: 'Active' },
    { id: 2, patient: 'Sarah Johnson', medication: 'Metformin 500mg', dosage: 'Twice daily', prescribed: '2025-11-18', doctor: 'Dr. Martinez', refills: 2, status: 'Active' },
    { id: 3, patient: 'Michael Brown', medication: 'Atorvastatin 40mg', dosage: 'Once daily', prescribed: '2025-11-15', doctor: 'Dr. Chen', refills: 5, status: 'Active' }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    patientName: '', doctor: '', date: '', time: '', type: '', room: ''
  });

  const [newPatient, setNewPatient] = useState({
    name: '', age: '', gender: '', condition: '', bloodType: '', phone: '', email: '', insurance: ''
  });

  // Login Handler
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setCurrentUser({ name: 'Dr. Sarah Wilson', role: 'Primary Care Physician', id: 'DOC001' });
    setAuthStep('dashboard');
  }

  // Add New Appointment
  function addAppointment() {
    if (newAppointment.patientName && newAppointment.doctor && newAppointment.date && newAppointment.time) {
      setAppointments([{
        id: Date.now(),
        ...newAppointment,
        status: 'Pending',
        duration: '30 min'
      }, ...appointments]);
      setNewAppointment({ patientName: '', doctor: '', date: '', time: '', type: '', room: '' });
    }
  }

  // Add New Patient
  function addPatient() {
    if (newPatient.name && newPatient.age && newPatient.condition) {
      setPatients([{
        id: Date.now(),
        ...newPatient,
        age: parseInt(newPatient.age),
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'Active'
      }, ...patients]);
      setNewPatient({ name: '', age: '', gender: '', condition: '', bloodType: '', phone: '', email: '', insurance: '' });
    }
  }

  // Login Screen
  if (authStep === 'login') {
    return (
      <div className="w-full max-w-sm mx-auto bg-white min-h-screen flex flex-col overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">MediCare Pro</h1>
            <p className="text-emerald-100 font-medium text-lg">Healthcare Management System</p>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Medical Login</h2>
            <p className="text-gray-700 text-base font-medium">Secure access to patient management system</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">Medical ID</label>
              <input
                type="text"
                placeholder="DOC001"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium"
                required
              />
            </div>
            
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-lg"
            >
              Access Patient System
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold">HIPAA Compliant</span>
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold">Secure Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 min-h-[700px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">MediCare Pro</h1>
              <p className="text-emerald-100 font-medium">Welcome, {currentUser?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium">Today's Date</div>
              <div className="text-lg font-bold">{new Date().toLocaleDateString()}</div>
            </div>
            <button
              onClick={() => setAuthStep('login')}
              className="bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6">
        <div className="flex space-x-8 overflow-x-auto">
          {[
            { key: 'dashboard', icon: '🏥', label: 'Dashboard' },
            { key: 'patients', icon: '👥', label: 'Patients' },
            { key: 'appointments', icon: '📅', label: 'Appointments' },
            { key: 'medical-records', icon: '📋', label: 'Medical Records' },
            { key: 'prescriptions', icon: '💊', label: 'Prescriptions' },
            { key: 'analytics', icon: '📊', label: 'Analytics' },
            { key: 'settings', icon: '⚙️', label: 'Settings' }
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setTab(key as any)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-base whitespace-nowrap transition-colors ${
                tab === key
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {tab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Total Patients</h3>
                    <p className="text-3xl font-bold text-blue-600">{patients.length}</p>
                    <p className="text-sm font-medium text-gray-600">Active in system</p>
                  </div>
                  <div className="text-4xl text-blue-500">👥</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Today's Appointments</h3>
                    <p className="text-3xl font-bold text-green-600">{appointments.filter(a => a.date === '2025-11-25').length}</p>
                    <p className="text-sm font-medium text-gray-600">Scheduled visits</p>
                  </div>
                  <div className="text-4xl text-green-500">📅</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-yellow-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Active Prescriptions</h3>
                    <p className="text-3xl font-bold text-yellow-600">{prescriptions.filter(p => p.status === 'Active').length}</p>
                    <p className="text-sm font-medium text-gray-600">Current medications</p>
                  </div>
                  <div className="text-4xl text-yellow-500">💊</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Critical Patients</h3>
                    <p className="text-3xl font-bold text-red-600">{patients.filter(p => p.status === 'Critical').length}</p>
                    <p className="text-sm font-medium text-gray-600">Require attention</p>
                  </div>
                  <div className="text-4xl text-red-500">🚨</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Appointments</h3>
                <div className="space-y-4">
                  {appointments.slice(0, 4).map(appointment => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-base">{appointment.patientName}</h4>
                        <p className="text-sm font-medium text-gray-600">{appointment.type} with {appointment.doctor}</p>
                        <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Critical Patients</h3>
                <div className="space-y-4">
                  {patients.filter(p => p.status === 'Critical' || p.condition.includes('Heart')).map(patient => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-base">{patient.name}</h4>
                        <p className="text-sm font-medium text-gray-700">{patient.condition}</p>
                        <p className="text-sm text-gray-600">Last visit: {patient.lastVisit}</p>
                      </div>
                      <div className="text-2xl text-red-500">🚨</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'patients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
              <button
                onClick={() => {
                  const name = prompt('Patient Name:');
                  const age = prompt('Age:');
                  const condition = prompt('Medical Condition:');
                  if (name && age && condition) {
                    setPatients([{
                      id: Date.now(),
                      name,
                      age: parseInt(age),
                      gender: 'Unknown',
                      condition,
                      lastVisit: new Date().toISOString().split('T')[0],
                      bloodType: 'Unknown',
                      phone: '',
                      email: '',
                      insurance: '',
                      status: 'Active'
                    }, ...patients]);
                  }
                }}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                + Add Patient
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Patient</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Age</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Condition</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Blood Type</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Last Visit</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.map(patient => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-base font-semibold text-gray-900">{patient.name}</div>
                            <div className="text-sm text-gray-600">{patient.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-base font-medium text-gray-900">{patient.age}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{patient.condition}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{patient.bloodType}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{patient.lastVisit}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            patient.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            patient.status === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                            View Records
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Appointment Schedule</h2>
              <button
                onClick={addAppointment}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                + Schedule Appointment
              </button>
            </div>

            {/* Add Appointment Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Schedule New Appointment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                  placeholder="Patient Name"
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium"
                />
                <input
                  type="text"
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                  placeholder="Doctor"
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium"
                />
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium"
                />
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium"
                />
                <input
                  type="text"
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                  placeholder="Appointment Type"
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium"
                />
                <input
                  type="text"
                  value={newAppointment.room}
                  onChange={(e) => setNewAppointment({...newAppointment, room: e.target.value})}
                  placeholder="Room"
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium"
                />
              </div>
              <button
                onClick={addAppointment}
                className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Schedule Appointment
              </button>
            </div>

            {/* Appointments List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Patient</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Doctor</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Date & Time</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Type</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Room</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map(appointment => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-base font-semibold text-gray-900">{appointment.patientName}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{appointment.doctor}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{appointment.date} at {appointment.time}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{appointment.type}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{appointment.room}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm mr-3">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-700 font-semibold text-sm">
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'prescriptions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Prescription Management</h2>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                + New Prescription
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Patient</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Medication</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Dosage</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Prescribed Date</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Doctor</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Refills</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {prescriptions.map(prescription => (
                      <tr key={prescription.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-base font-semibold text-gray-900">{prescription.patient}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{prescription.medication}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{prescription.dosage}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{prescription.prescribed}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{prescription.doctor}</td>
                        <td className="px-6 py-4 text-base font-medium text-gray-700">{prescription.refills} remaining</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                            {prescription.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'medical-records' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const recordType = prompt('Record Type (e.g., Blood Test, X-Ray, MRI):');
                    if (recordType) {
                      alert(`${recordType} record would be added to the system`);
                    }
                  }}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  + Add Record
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  📁 Export All
                </button>
              </div>
            </div>

            {/* Records Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🧪 Laboratory Results
                </h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 text-base">Complete Blood Count</h4>
                    <p className="text-sm text-gray-600">Date: 2025-11-20 | Dr. Wilson</p>
                    <p className="text-sm text-gray-700 mt-2">WBC: 7,200/μL, RBC: 4.8M/μL, Platelets: 250K/μL</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Normal</span>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold">View Details</button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 text-base">Lipid Panel</h4>
                    <p className="text-sm text-gray-600">Date: 2025-11-18 | Dr. Martinez</p>
                    <p className="text-sm text-gray-700 mt-2">Total Cholesterol: 180 mg/dL, HDL: 60 mg/dL, LDL: 100 mg/dL</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Optimal</span>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold">View Details</button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 text-base">Glucose Test</h4>
                    <p className="text-sm text-gray-600">Date: 2025-11-15 | Lab Services</p>
                    <p className="text-sm text-gray-700 mt-2">Fasting Glucose: 95 mg/dL, HbA1c: 5.2%</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Normal</span>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold">View Details</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  📸 Imaging Studies
                </h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 text-base">Chest X-Ray</h4>
                    <p className="text-sm text-gray-600">Date: 2025-11-15 | Dr. Chen</p>
                    <p className="text-sm text-gray-700 mt-2">Clear lung fields, no abnormalities detected</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Clear</span>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold">View Image</button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 text-base">MRI Brain</h4>
                    <p className="text-sm text-gray-600">Date: 2025-10-22 | Dr. Thompson</p>
                    <p className="text-sm text-gray-700 mt-2">No acute findings, normal brain anatomy</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Normal</span>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold">View Image</button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 text-base">Ultrasound Abdomen</h4>
                    <p className="text-sm text-gray-600">Date: 2025-10-10 | Dr. Rodriguez</p>
                    <p className="text-sm text-gray-700 mt-2">Liver, kidneys, and gallbladder appear normal</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Normal</span>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold">View Image</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  📋 Clinical Notes
                </h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 text-base">Annual Physical Exam</h4>
                    <p className="text-sm text-gray-600">Date: 2025-11-22 | Dr. Wilson</p>
                    <p className="text-sm text-gray-700 mt-2">Overall health status excellent. Continue current exercise routine.</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Complete</span>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold">Read Notes</button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 text-base">Cardiology Consultation</h4>
                    <p className="text-sm text-gray-600">Date: 2025-11-10 | Dr. Brown</p>
                    <p className="text-sm text-gray-700 mt-2">EKG normal, recommend continued monitoring of blood pressure</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Follow-up</span>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold">Read Notes</button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 text-base">Vaccination Record</h4>
                    <p className="text-sm text-gray-600">Date: 2025-10-15 | Nurse Johnson</p>
                    <p className="text-sm text-gray-700 mt-2">Annual flu vaccine administered, no adverse reactions</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">Immunization</span>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold">View Record</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Records Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Medical History Timeline</h3>
              <div className="space-y-4">
                {[
                  { date: '2025-11-22', type: 'Physical Exam', doctor: 'Dr. Wilson', status: 'Complete', color: 'bg-green-500' },
                  { date: '2025-11-20', type: 'Blood Test', doctor: 'Dr. Wilson', status: 'Normal', color: 'bg-blue-500' },
                  { date: '2025-11-15', type: 'X-Ray', doctor: 'Dr. Chen', status: 'Clear', color: 'bg-green-500' },
                  { date: '2025-11-10', type: 'Cardiology', doctor: 'Dr. Brown', status: 'Follow-up', color: 'bg-yellow-500' },
                  { date: '2025-10-22', type: 'MRI', doctor: 'Dr. Thompson', status: 'Normal', color: 'bg-green-500' },
                  { date: '2025-10-15', type: 'Vaccination', doctor: 'Nurse Johnson', status: 'Complete', color: 'bg-purple-500' }
                ].map((record, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-4 h-4 rounded-full ${record.color}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{record.type}</h4>
                          <p className="text-sm text-gray-600">by {record.doctor}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{record.date}</p>
                          <p className="text-sm text-gray-600">{record.status}</p>
                        </div>
                      </div>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Healthcare Analytics</h2>
              <div className="flex gap-2">
                <select className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium">
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                  <option>Last Year</option>
                </select>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  📊 Generate Report
                </button>
              </div>
            </div>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Total Visits</h3>
                    <p className="text-4xl font-bold text-blue-600">247</p>
                    <p className="text-sm font-medium text-gray-600">+12% from last month</p>
                  </div>
                  <div className="text-5xl text-blue-500">📈</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Treatment Success</h3>
                    <p className="text-4xl font-bold text-green-600">94%</p>
                    <p className="text-sm font-medium text-gray-600">+2% improvement</p>
                  </div>
                  <div className="text-5xl text-green-500">✅</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-yellow-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Avg. Wait Time</h3>
                    <p className="text-4xl font-bold text-yellow-600">15m</p>
                    <p className="text-sm font-medium text-gray-600">-3 min reduction</p>
                  </div>
                  <div className="text-5xl text-yellow-500">⏰</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Patient Satisfaction</h3>
                    <p className="text-4xl font-bold text-purple-600">4.8</p>
                    <p className="text-sm font-medium text-gray-600">Out of 5.0 stars</p>
                  </div>
                  <div className="text-5xl text-purple-500">⭐</div>
                </div>
              </div>
            </div>

            {/* Charts and Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Patient Volume</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => {
                    const height = Math.random() * 80 + 20;
                    return (
                      <div key={month} className="flex-1 flex flex-col items-center">
                        <div 
                          className="bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-lg w-full"
                          style={{height: `${height}%`}}
                        />
                        <div className="text-xs text-gray-600 mt-2">{month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Department Utilization</h3>
                <div className="space-y-4">
                  {[
                    { dept: 'Cardiology', percentage: 85, color: 'bg-red-500' },
                    { dept: 'Orthopedics', percentage: 72, color: 'bg-blue-500' },
                    { dept: 'Neurology', percentage: 68, color: 'bg-purple-500' },
                    { dept: 'Pediatrics', percentage: 91, color: 'bg-green-500' },
                    { dept: 'Emergency', percentage: 95, color: 'bg-yellow-500' }
                  ].map((dept) => (
                    <div key={dept.dept} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-900">{dept.dept}</span>
                        <span className="text-sm font-bold text-gray-700">{dept.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${dept.color} h-2 rounded-full`} 
                          style={{width: `${dept.percentage}%`}}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-3xl mb-2">🩺</div>
                  <h4 className="font-semibold text-gray-900">Doctor Efficiency</h4>
                  <p className="text-2xl font-bold text-emerald-600">89%</p>
                  <p className="text-sm text-gray-600">Average consultation time: 18 min</p>
                </div>

                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-3xl mb-2">💊</div>
                  <h4 className="font-semibold text-gray-900">Prescription Accuracy</h4>
                  <p className="text-2xl font-bold text-blue-600">97%</p>
                  <p className="text-sm text-gray-600">Zero critical medication errors</p>
                </div>

                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-3xl mb-2">🏥</div>
                  <h4 className="font-semibold text-gray-900">Bed Occupancy</h4>
                  <p className="text-2xl font-bold text-purple-600">78%</p>
                  <p className="text-sm text-gray-600">Optimal utilization range</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                💾 Save Changes
              </button>
            </div>

            {/* User Profile Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                👤 Profile Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">Full Name</label>
                  <input
                    type="text"
                    value="Dr. Sarah Wilson"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">Medical License</label>
                  <input
                    type="text"
                    value="MD-2019-789456"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">Specialty</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium">
                    <option>Primary Care Physician</option>
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Pediatrics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">Department</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium">
                    <option>Internal Medicine</option>
                    <option>Emergency Department</option>
                    <option>Surgery</option>
                    <option>Pediatrics</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                🔔 Notification Preferences
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Appointment Reminders', desc: 'Get notified 30 minutes before appointments' },
                  { label: 'Critical Lab Results', desc: 'Immediate alerts for abnormal test results' },
                  { label: 'Patient Messages', desc: 'Notifications when patients send messages' },
                  { label: 'System Maintenance', desc: 'Alerts about scheduled system updates' },
                  { label: 'Emergency Alerts', desc: 'High-priority notifications for urgent cases' }
                ].map((setting, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{setting.label}</h4>
                      <p className="text-sm text-gray-600">{setting.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                🔐 Security & Privacy
              </h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Enabled</span>
                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">Manage</button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Session Timeout</h4>
                  <p className="text-sm text-gray-600 mb-3">Automatically log out after period of inactivity</p>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                  </select>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Data Access Logging</h4>
                  <p className="text-sm text-gray-600 mb-3">Track all access to patient medical records</p>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Active</span>
                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">View Logs</button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Password Policy</h4>
                  <p className="text-sm text-gray-600 mb-3">Enforce strong password requirements</p>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* System Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                ⚙️ System Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">Language</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">Time Zone</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium">
                    <option>Eastern Time (UTC-5)</option>
                    <option>Central Time (UTC-6)</option>
                    <option>Mountain Time (UTC-7)</option>
                    <option>Pacific Time (UTC-8)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">Date Format</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">Theme</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base font-medium">
                    <option>Light Mode</option>
                    <option>Dark Mode</option>
                    <option>Auto (System)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Export all the updated functions
export { ECommerceApp, BankingApp, HealthcareApp, RealEstateApp, FoodDeliveryApp, LearningApp };