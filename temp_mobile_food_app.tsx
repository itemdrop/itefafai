// DEMO 5: FOOD DELIVERY - Mobile App version with location services
function FoodDeliveryApp() {
  const [tab, setTab] = useState<'browse'|'cart'|'orders'|'tracking'|'location'|'profile'>('location');
  const [location, setLocation] = useState<{latitude?: number, longitude?: number, address?: string}>({});
  const [locationPermission, setLocationPermission] = useState<'pending'|'granted'|'denied'>('pending');
  const [nearbyRestaurants, setNearbyRestaurants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'distance'|'rating'|'deliveryTime'|'price'>('distance');
  const [userProfile] = useState({
    name: 'Erik Andersson',
    email: 'erik@malmoeats.se',
    phone: '+46 70 123 45 67',
    address: 'Västra Hamngatan 15, 211 25 Malmö',
    memberSince: '2024-03-15',
    totalOrders: 47,
    loyaltyPoints: 1250
  });
  
  const [cart, setCart] = useState<any[]>([]);
  
  const [malmöRestaurants] = useState([
    { 
      id: 1, 
      name: 'Bastard Malmö', 
      img: '🔥', 
      rating: 4.8,
      specialty: 'Fine Dining • Modern European', 
      deliveryTime: '25-35 min',
      deliveryFee: 49,
      minOrder: 300,
      priceRange: '💰💰💰',
      estimatedPrice: '400-800 SEK per person',
      distance: 2.3,
      openHours: '17:00 - 00:00',
      address: 'Master Johansgatan 11, 211 21 Malmö',
      description: 'Award-winning restaurant serving innovative Nordic cuisine with international influences.',
      features: ['🏆 Michelin Guide', '🍷 Wine Pairing', '🌱 Organic Options', '👨‍🍳 Chef\'s Table'],
      category: 'fine-dining'
    },
    { 
      id: 2, 
      name: 'Bloom in the Park', 
      img: '🌸', 
      rating: 4.7,
      specialty: 'Fine Dining • Botanical Cuisine', 
      deliveryTime: '30-40 min',
      deliveryFee: 59,
      minOrder: 350,
      priceRange: '💰💰💰💰',
      estimatedPrice: '600-1200 SEK per person',
      distance: 3.1,
      openHours: '18:00 - 23:00',
      address: 'Pildammsparken, 214 31 Malmö',
      description: 'Exceptional botanical-inspired fine dining in the heart of Pildammsparken.',
      features: ['🌟 Michelin Star', '🌿 Botanical Garden', '🍾 Premium Wine List', '🎨 Artistic Presentation'],
      category: 'fine-dining'
    },
    { 
      id: 3, 
      name: 'Saltimporten Canteen', 
      img: '🧂', 
      rating: 4.6,
      specialty: 'Modern Swedish • Local Ingredients', 
      deliveryTime: '20-30 min',
      deliveryFee: 39,
      minOrder: 250,
      priceRange: '💰💰',
      estimatedPrice: '300-500 SEK per person',
      distance: 1.8,
      openHours: '11:30 - 22:00',
      address: 'Sundspromenaden 7, 211 16 Malmö',
      description: 'Sustainable Swedish cuisine focusing on local and seasonal ingredients.',
      features: ['🇸🇪 Local Sourcing', '♻️ Sustainable', '🌾 Seasonal Menu', '🏭 Industrial Chic'],
      category: 'swedish'
    },
    { 
      id: 4, 
      name: 'Malmö Saluhall Food Court', 
      img: '🏪', 
      rating: 4.4,
      specialty: 'International Food Court', 
      deliveryTime: '15-25 min',
      deliveryFee: 29,
      minOrder: 150,
      priceRange: '💰',
      estimatedPrice: '120-300 SEK per person',
      distance: 1.2,
      openHours: '10:00 - 21:00',
      address: 'Gibraltargatan 6, 211 18 Malmö',
      description: 'Diverse food court with multiple vendors offering global cuisines.',
      features: ['🌍 Global Cuisine', '⚡ Fast Service', '💝 Variety Options', '👥 Group Friendly'],
      category: 'fast'
    },
    { 
      id: 5, 
      name: 'Lyran Restaurant', 
      img: '🎵', 
      rating: 4.5,
      specialty: 'Swedish • Traditional', 
      deliveryTime: '25-35 min',
      deliveryFee: 45,
      minOrder: 200,
      priceRange: '💰💰',
      estimatedPrice: '250-450 SEK per person',
      distance: 2.7,
      openHours: '17:00 - 23:00',
      address: 'Tegelgårdsgatan 15, 211 33 Malmö',
      description: 'Classic Swedish restaurant with traditional dishes and cozy atmosphere.',
      features: ['🇸🇪 Traditional Swedish', '🏠 Cozy Atmosphere', '🍺 Local Beers', '👨‍👩‍👧‍👦 Family Friendly'],
      category: 'swedish'
    }
  ]);

  // Location permission logic
  const requestLocation = () => {
    setLocationPermission('pending');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ 
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude,
            address: 'Malmö Centrum, Skåne County, Sweden' 
          });
          setLocationPermission('granted');
          setNearbyRestaurants(malmöRestaurants);
        },
        () => {
          setLocationPermission('denied');
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

  // Filter and sort restaurants
  const filteredRestaurants = (nearbyRestaurants.length > 0 ? nearbyRestaurants : malmöRestaurants)
    .filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           restaurant.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || restaurant.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance': return (a.distance || 0) - (b.distance || 0);
        case 'rating': return b.rating - a.rating;
        case 'deliveryTime': return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case 'price': return a.priceRange.length - b.priceRange.length;
        default: return 0;
      }
    });

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
      </header>

      {/* Mobile Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {tab === 'location' && (
          <div className="p-4 space-y-6 animate-fadeIn pb-20">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-6 shadow-xl">
                📍
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Find Food Near You</h2>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">Enable location to discover the best restaurants and get faster delivery in Malmö</p>
              
              <div className="space-y-4">
                {locationPermission === 'pending' && (
                  <div className="text-blue-600 flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">Getting your location...</span>
                  </div>
                )}
                
                {locationPermission === 'denied' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <p className="text-red-800 text-sm font-medium">Location access denied</p>
                    <p className="text-red-600 text-xs mt-1">Showing all Malmö restaurants</p>
                  </div>
                )}
                
                {locationPermission === 'granted' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <p className="text-green-800 text-sm font-medium">✓ Location enabled</p>
                    <p className="text-green-600 text-xs mt-1">{location.address}</p>
                  </div>
                )}
                
                <button 
                  onClick={requestLocation}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-bold text-lg active:scale-95 transition-all duration-200 shadow-xl"
                >
                  📍 {locationPermission === 'granted' ? 'Update Location' : 'Enable Location'}
                </button>
                
                <button 
                  onClick={() => setTab('browse')}
                  className="w-full bg-gray-100 text-gray-800 px-6 py-4 rounded-xl font-bold text-lg active:scale-95 transition-all duration-200"
                >
                  🍽️ Browse Restaurants
                </button>
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
                  🍽️ {filteredRestaurants.length} Restaurants
                </h2>
                <button 
                  onClick={() => setTab('location')}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold active:scale-95 transition-transform"
                >
                  📍 Location
                </button>
              </div>
              
              {/* Mobile Quick Filters */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-3">
                {[
                  { key: 'all', label: '🍽️ All', value: 'all' },
                  { key: 'popular', label: '🔥 Popular', value: 'popular' },
                  { key: 'fast', label: '⚡ Fast', value: 'fast' },
                  { key: 'swedish', label: '🇸🇪 Swedish', value: 'swedish' },
                  { key: 'fine', label: '⭐ Fine Dining', value: 'fine-dining' }
                ].map(({ key, label, value }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(value)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all active:scale-95 ${
                      selectedCategory === value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              
              {/* Mobile Sort Dropdown */}
              <div>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="distance">📍 Nearest First</option>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="deliveryTime">🚚 Fastest Delivery</option>
                  <option value="price">💰 Lowest Price</option>
                </select>
              </div>
            </div>

            {/* Mobile Restaurant Cards */}
            <div className="px-4 py-3 space-y-4">
              {filteredRestaurants.map((restaurant, idx) => (
                <div key={restaurant.id} className="bg-white rounded-2xl shadow-lg overflow-hidden active:scale-95 transition-all duration-200 border border-gray-200">
                  <div className="flex p-4 gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="text-3xl">
                        {restaurant.img}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 truncate">{restaurant.name}</h3>
                          <p className="text-blue-600 font-medium text-sm truncate">{restaurant.specialty}</p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <span className="text-yellow-500 text-sm">⭐</span>
                          <span className="text-sm font-bold text-gray-800">{restaurant.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>🕒</span>
                          <span>{restaurant.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🚚</span>
                          <span>{restaurant.deliveryFee} SEK</span>
                        </div>
                        {location.latitude && (
                          <div className="flex items-center gap-1">
                            <span>📍</span>
                            <span>{restaurant.distance}km</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {restaurant.priceRange} • {restaurant.openHours.split(' - ')[0]}
                        </div>
                        <button 
                          onClick={() => {
                            setCart([...cart, { ...restaurant, quantity: 1 }]);
                            // Mobile haptic feedback simulation
                            if (navigator.vibrate) navigator.vibrate(50);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm active:scale-95 transition-all duration-200 shadow-lg"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'cart' && (
          <div className="p-4 pb-20">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart</h2>
              <p className="text-gray-600">{cart.length} items</p>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some delicious food to get started!</p>
                <button 
                  onClick={() => setTab('browse')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold active:scale-95 transition-all duration-200"
                >
                  Browse Restaurants
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{item.img}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-blue-600">{item.specialty}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <button 
                        onClick={() => setCart(cart.filter((_, i) => i !== idx))}
                        className="text-red-500 p-2 active:scale-95 transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="bg-blue-50 rounded-xl p-4 mt-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-900">Total: {cart.length * 150} SEK</p>
                    <p className="text-sm text-blue-600 mb-4">Estimated delivery: 25-35 min</p>
                    <button className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg active:scale-95 transition-all duration-200 shadow-xl">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'orders' && (
          <div className="p-4 pb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
            <div className="space-y-4">
              {[
                { id: '#12345', restaurant: 'Bastard Malmö', date: 'Today, 13:45', status: 'Delivered', total: '450 SEK' },
                { id: '#12344', restaurant: 'Saltimporten', date: 'Yesterday, 19:20', status: 'Delivered', total: '320 SEK' },
                { id: '#12343', restaurant: 'Malmö Saluhall', date: 'Nov 22, 12:15', status: 'Delivered', total: '180 SEK' }
              ].map((order, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{order.restaurant}</h3>
                      <p className="text-sm text-gray-600">{order.id} • {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{order.total}</p>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'profile' && (
          <div className="p-4 pb-20">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{userProfile.name}</h2>
                <p className="text-blue-600 font-medium">Premium Member</p>
                <p className="text-sm text-gray-600">{userProfile.loyaltyPoints} loyalty points</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{userProfile.email}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium">{userProfile.phone}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-medium">{userProfile.totalOrders}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">{userProfile.memberSince}</span>
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