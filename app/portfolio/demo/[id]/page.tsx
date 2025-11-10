"use client";
"use client";


import DemoAppTemplate from "../DemoAppTemplate";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

// --- Demo Mini-Apps (copied from main portfolio page) ---
import { useState } from "react";

function ECommerceApp() {
  // Tabs and state
  const [tab, setTab] = useState<'catalog'|'cart'|'orders'|'profile'|'admin'|'wishlist'>('catalog');
  // Product catalog
  const [products] = useState([
    { id: 1, name: 'T-Shirt', price: 20, img: '/product1.png', desc: 'Soft cotton T-shirt', rating: 4.5 },
    { id: 2, name: 'Jeans', price: 40, img: '/product2.png', desc: 'Slim fit jeans', rating: 4.2 },
    { id: 3, name: 'Sneakers', price: 60, img: '/product3.png', desc: 'Comfortable sneakers', rating: 4.8 },
    { id: 4, name: 'Jacket', price: 80, img: '/product4.png', desc: 'Warm winter jacket', rating: 4.7 },
    { id: 5, name: 'Cap', price: 15, img: '/product5.png', desc: 'Stylish cap', rating: 4.1 },
  ]);
  // Cart
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number; img: string }[]>([]);
  // Orders
  const [orders, setOrders] = useState<any[]>([]);
  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>([]);
  // Profile
  const [profile] = useState({ name: 'Jane Customer', email: 'jane@email.com', address: '123 Main St, City' });
  // Admin analytics
  const [analytics] = useState({ sales: 120, revenue: 5400, users: 320 });

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
  <div className="flex flex-row gap-8 min-h-[600px] max-w-[1200px] mx-auto w-full px-4 py-6 overflow-x-auto">
      {/* Sidebar */}
  <aside className="w-60 flex-shrink-0 bg-gradient-to-b from-pink-600 to-pink-400 rounded-2xl p-6 shadow-2xl flex flex-col min-h-[600px] sticky left-0 top-0 h-fit">
        <div className="font-extrabold text-white text-2xl mb-8 tracking-wide">ShopEase</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='catalog'?'bg-white text-pink-700 shadow':'text-white hover:bg-pink-500/70'}`} onClick={()=>setTab('catalog')}>Catalog</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='cart'?'bg-white text-pink-700 shadow':'text-white hover:bg-pink-500/70'}`} onClick={()=>setTab('cart')}>Cart</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='orders'?'bg-white text-pink-700 shadow':'text-white hover:bg-pink-500/70'}`} onClick={()=>setTab('orders')}>Orders</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='wishlist'?'bg-white text-pink-700 shadow':'text-white hover:bg-pink-500/70'}`} onClick={()=>setTab('wishlist')}>Wishlist</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='profile'?'bg-white text-pink-700 shadow':'text-white hover:bg-pink-500/70'}`} onClick={()=>setTab('profile')}>Profile</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='admin'?'bg-white text-pink-700 shadow':'text-white hover:bg-pink-500/70'}`} onClick={()=>setTab('admin')}>Admin</button></li>
          </ul>
        </nav>
        <div className="mt-8 text-xs text-pink-100">© 2025 ShopEase. All rights reserved.</div>
      </aside>
      {/* Main Content */}
  <main className="flex-1 bg-white rounded-2xl px-6 py-6 shadow-2xl overflow-x-auto min-w-0">
        {tab === 'catalog' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-pink-700">Product Catalog</div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((p) => (
                <div key={p.id} className="bg-pink-50 rounded-xl p-6 shadow flex flex-col items-center">
                  <img src={p.img} alt={p.name} className="w-32 h-32 object-cover rounded mb-4" />
                  <div className="font-bold text-lg mb-1">{p.name}</div>
                  <div className="text-pink-700 font-semibold mb-2">${p.price}</div>
                  <div className="text-gray-600 text-sm mb-2">{p.desc}</div>
                  <div className="mb-2">{'★'.repeat(Math.floor(p.rating))}{'☆'.repeat(5-Math.floor(p.rating))} <span className="text-xs text-gray-400">({p.rating})</span></div>
                  <div className="flex gap-2">
                    <button className="px-4 py-1 bg-pink-600 text-white rounded hover:bg-pink-700" onClick={()=>addToCart(p)}>Add to Cart</button>
                    <button className={`px-3 py-1 rounded ${wishlist.includes(p.id)?'bg-yellow-400 text-white':'bg-gray-200 text-gray-700'}`} onClick={()=>toggleWishlist(p.id)}>{wishlist.includes(p.id)?'★':'☆'} Wishlist</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'cart' && (
          <div>
            <div className="text-3xl font-extrabold mb-8 text-pink-700">Your Cart</div>
            {cart.length === 0 ? (
              <div className="text-gray-500">Your cart is empty.</div>
            ) : (
              <>
                <ul className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-center justify-between bg-pink-50 p-4 rounded shadow">
                      <div className="flex items-center gap-4">
                        <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <span className="font-bold">{item.name}</span>
                        <span className="text-pink-700">${item.price}</span>
                        <span className="text-gray-600">x {item.qty}</span>
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
              <div className="text-gray-500">No items in wishlist.</div>
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
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState<{ type: string; amount: number; date: string }[]>([]);

  function handleTransfer() {
    if (amount > 0 && amount <= balance) {
      setBalance(balance - amount);
      setTransactions([
        { type: "Transfer", amount, date: new Date().toLocaleString() },
        ...transactions,
      ]);
      setAmount(0);
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
        <div className="text-3xl font-bold mb-4">${balance.toFixed(2)}</div>
        <div className="mb-4">
          <input
            type="number"
            min="1"
            max={balance}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            className="border rounded px-3 py-1 mr-2 w-32"
            placeholder="Amount"
          />
          <button
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleTransfer}
            disabled={amount <= 0 || amount > balance}
          >
            Transfer
          </button>
        </div>
        {amount > balance && <div className="text-red-500 text-sm">Insufficient funds</div>}
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        {transactions.length === 0 ? (
          <div className="text-gray-500">No transactions yet.</div>
        ) : (
          <ul className="space-y-2">
            {transactions.map((tx, idx) => (
              <li key={idx} className="flex justify-between bg-gray-50 p-3 rounded shadow">
                <span>{tx.type}</span>
                <span>-${tx.amount.toFixed(2)}</span>
                <span className="text-xs text-gray-400">{tx.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
function HealthcareApp() {
  // Tabs and state
  const [tab, setTab] = useState<'dashboard'|'appointments'|'vitals'|'patients'|'messages'>('dashboard');
  const [appointments, setAppointments] = useState([
    { date: '2025-11-12', doctor: 'Dr. Smith', patient: 'John Doe', avatar: '/avatar1.png' },
    { date: '2025-11-15', doctor: 'Dr. Lee', patient: 'Jane Roe', avatar: '/avatar2.png' },
  ]);
  const [newAppt, setNewAppt] = useState({ date: '', doctor: '', patient: '', avatar: '' });
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
    if (newAppt.date && newAppt.doctor && newAppt.patient) {
      setAppointments([{ ...newAppt, avatar: '/avatar1.png' }, ...appointments]);
      setNewAppt({ date: '', doctor: '', patient: '', avatar: '' });
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
  <div className="flex flex-row gap-16 min-h-[500px] max-w-[2400px] mx-auto w-full px-20 py-4 overflow-x-auto">
      {/* Sidebar */}
  <aside className="w-96 flex-shrink-0 bg-gradient-to-b from-blue-700 to-blue-500 rounded-2xl p-8 shadow-2xl flex flex-col min-h-[600px] sticky left-0 top-0 h-fit">
        <div className="font-extrabold text-white text-2xl mb-8 tracking-wide">HealthPro</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='dashboard'?'bg-white text-blue-700 shadow':'text-white hover:bg-blue-600/70'}`} onClick={()=>setTab('dashboard')}>Dashboard</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='appointments'?'bg-white text-blue-700 shadow':'text-white hover:bg-blue-600/70'}`} onClick={()=>setTab('appointments')}>Appointments</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='vitals'?'bg-white text-blue-700 shadow':'text-white hover:bg-blue-600/70'}`} onClick={()=>setTab('vitals')}>Vitals</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='patients'?'bg-white text-blue-700 shadow':'text-white hover:bg-blue-600/70'}`} onClick={()=>setTab('patients')}>Patients</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-medium ${tab==='messages'?'bg-white text-blue-700 shadow':'text-white hover:bg-blue-600/70'}`} onClick={()=>setTab('messages')}>Messages</button></li>
          </ul>
        </nav>
        <div className="mt-8 text-xs text-blue-100">© 2025 HealthPro. All rights reserved.</div>
      </aside>
      {/* Main Content */}
  <main className="flex-1 bg-white rounded-2xl px-20 py-8 shadow-2xl overflow-x-auto min-w-[1600px]">
        {tab === 'dashboard' && (
          <div>
            <div className="text-3xl font-extrabold mb-2 text-blue-700">Welcome, Dr. Smith</div>
            <div className="mb-6 text-gray-600">Your professional healthcare dashboard overview.</div>
            <div className="flex flex-row gap-16 mb-10 w-full">
              <div className="flex-1 bg-blue-100 rounded-2xl px-16 py-8 text-center shadow-lg min-w-[350px]">
                <div className="text-lg font-semibold text-blue-700">Upcoming Appointments</div>
                <div className="text-4xl font-extrabold mt-2">{appointments.length}</div>
              </div>
              <div className="flex-1 bg-green-100 rounded-2xl px-16 py-8 text-center shadow-lg min-w-[350px]">
                <div className="text-lg font-semibold text-green-700">Patients</div>
                <div className="text-4xl font-extrabold mt-2">{patients.length}</div>
              </div>
              <div className="flex-1 bg-yellow-100 rounded-2xl px-16 py-8 text-center shadow-lg min-w-[350px]">
                <div className="text-lg font-semibold text-yellow-700">Messages</div>
                <div className="text-4xl font-extrabold mt-2">{messages.length}</div>
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
  const properties = [
    { id: 1, name: "Modern Loft", price: 350000 },
    { id: 2, name: "Family House", price: 500000 },
    { id: 3, name: "Downtown Condo", price: 420000 },
  ];
  const [favorites, setFavorites] = useState<number[]>([]);

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Properties</h2>
        <ul className="space-y-4">
          {properties.map((property) => (
            <li key={property.id} className="flex items-center justify-between bg-gray-50 p-4 rounded shadow">
              <span>{property.name} - ${property.price.toLocaleString()}</span>
              <button
                className={`ml-4 px-3 py-1 rounded transition ${favorites.includes(property.id) ? "bg-yellow-400 text-white" : "bg-gray-300 text-gray-700"}`}
                onClick={() => toggleFavorite(property.id)}
              >
                {favorites.includes(property.id) ? "★ Saved" : "☆ Save"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Favorites</h2>
        {favorites.length === 0 ? (
          <div className="text-gray-500">No favorites yet.</div>
        ) : (
          <ul className="space-y-4">
            {properties.filter(p => favorites.includes(p.id)).map((property) => (
              <li key={property.id} className="flex items-center justify-between bg-green-50 p-4 rounded shadow">
                <span>{property.name}</span>
                <span>${property.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
function FoodDeliveryApp() {
  const restaurants = [
    { id: 1, name: "Pizza Palace", menu: [ { id: 1, name: "Pepperoni Pizza", price: 15 }, { id: 2, name: "Veggie Pizza", price: 13 } ] },
    { id: 2, name: "Burger Barn", menu: [ { id: 3, name: "Cheeseburger", price: 10 }, { id: 4, name: "Veggie Burger", price: 9 } ] },
    { id: 3, name: "Sushi Spot", menu: [ { id: 5, name: "Salmon Roll", price: 12 }, { id: 6, name: "Avocado Roll", price: 11 } ] },
  ];
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]);
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number }[]>([]);

  function addToCart(item) {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Restaurants</h2>
        <ul className="space-y-2 mb-6">
          {restaurants.map((r) => (
            <li key={r.id}>
              <button
                className={`px-4 py-2 rounded ${selectedRestaurant.id === r.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                onClick={() => setSelectedRestaurant(r)}
              >
                {r.name}
              </button>
            </li>
          ))}
        </ul>
        <h3 className="font-semibold mb-2">Menu</h3>
        <ul className="space-y-2">
          {selectedRestaurant.menu.map((item) => (
            <li key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded shadow">
              <span>{item.name} - ${item.price}</span>
              <button
                className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={() => addToCart(item)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <div className="text-gray-500">Your cart is empty.</div>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between bg-green-50 p-3 rounded shadow">
                <span>{item.name} x {item.qty}</span>
                <span>${item.price * item.qty}</span>
                <button
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 font-bold">Total: ${total}</div>
      </div>
    </div>
  );
}
function LearningApp() {
  const questions = [
    { q: "What is the capital of France?", a: "Paris", options: ["Paris", "London", "Berlin", "Madrid"] },
    { q: "2 + 2 = ?", a: "4", options: ["3", "4", "5", "6"] },
    { q: "What color is the sky?", a: "Blue", options: ["Green", "Blue", "Red", "Yellow"] },
  ];
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  function handleSelect(option: string) {
    setSelected(option);
  }

  function handleNext() {
    if (selected === questions[step].a) setScore(score + 1);
    setSelected(null);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  function handleRestart() {
    setStep(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <div className="mb-2">Your score: <span className="font-bold">{score} / {questions.length}</span></div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleRestart}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 w-full">
        <div className="mb-2 font-semibold">Question {step + 1} of {questions.length}</div>
        <div className="mb-4 text-lg">{questions[step].q}</div>
        <div className="flex flex-col gap-2">
          {questions[step].options.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded border ${selected === option ? "bg-blue-600 text-white" : "bg-white text-gray-800 border-gray-300"}`}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        onClick={handleNext}
        disabled={selected === null}
      >
        {step === questions.length - 1 ? "Finish" : "Next"}
      </button>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${((step + (selected ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>
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
        <p className="text-gray-500 text-sm mt-4">This is the real interactive demo for this project.</p>
      </div>
    ),
  };
  return <DemoAppTemplate {...props} />;
}
