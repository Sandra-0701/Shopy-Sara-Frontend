import { useState, useEffect } from "react";
import {
  FiShoppingBag,
  FiMapPin,
  FiClock,
  FiStar,
  FiZap,
  FiTruck,
  FiSearch,
  FiFilter,
  FiChevronRight,
  FiHeart,
  FiTrendingUp,
  FiAward,
  FiPackage,
  FiHome,
  FiArrowRight,
  FiGrid,
  FiList,
  FiCheck,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import logo from "../../assets/img/logo/sara-new-logo.png";

const trendingVendors = [
  {
    id: 1,
    name: "Fresh Farms",
    image: "https://picsum.photos/seed/vendor1/200/200.jpg",
    rating: 4.8,
    deliveryTime: "30 min",
  },
  {
    id: 2,
    name: "The Butcher's Block",
    image: "https://picsum.photos/seed/vendor2/200/200.jpg",
    rating: 4.9,
    deliveryTime: "25 min",
  },
  {
    id: 3,
    name: "Seafood Supreme",
    image: "https://picsum.photos/seed/vendor3/200/200.jpg",
    rating: 4.7,
    deliveryTime: "35 min",
  },
  {
    id: 4,
    name: "Bakery Bliss",
    image: "https://picsum.photos/seed/vendor4/200/200.jpg",
    rating: 4.6,
    deliveryTime: "20 min",
  },
  {
    id: 5,
    name: "Dairy Delight",
    image: "https://picsum.photos/seed/vendor5/200/200.jpg",
    rating: 4.8,
    deliveryTime: "30 min",
  },
];

const availableStores = [
  {
    id: 1,
    storeName: "Quick Mart",
    vendorName: "Retail Giants Co.",
    rating: 4.5,
    deliveryTime: "30 min",
    minOrder: "₹100",
    deliveryFee: "₹20",
    category: "Grocery",
    isOpen: true,
  },
  {
    id: 2,
    storeName: "Green Grocer",
    vendorName: "Fresh Farms",
    rating: 4.7,
    deliveryTime: "25 min",
    minOrder: "₹150",
    deliveryFee: "Free",
    category: "Organic",
    isOpen: true,
  },
  {
    id: 3,
    storeName: "Corner Store",
    vendorName: "Local Vendors LLC",
    rating: 4.3,
    deliveryTime: "40 min",
    minOrder: "₹80",
    deliveryFee: "₹15",
    category: "Convenience",
    isOpen: false,
  },
  {
    id: 4,
    storeName: "SuperValue",
    vendorName: "Value Retail Inc.",
    rating: 4.6,
    deliveryTime: "35 min",
    minOrder: "₹200",
    deliveryFee: "Free",
    category: "Supermarket",
    isOpen: true,
  },
  {
    id: 5,
    storeName: "PharmaPlus",
    vendorName: "HealthMasters",
    rating: 4.8,
    deliveryTime: "20 min",
    minOrder: "₹100",
    deliveryFee: "₹25",
    category: "Pharmacy",
    isOpen: true,
  },
  {
    id: 6,
    storeName: "Pet Paradise",
    vendorName: "Animal Lovers Inc.",
    rating: 4.7,
    deliveryTime: "45 min",
    minOrder: "₹250",
    deliveryFee: "₹30",
    category: "Pet Supplies",
    isOpen: false,
  },
  {
    id: 7,
    storeName: "The Crafted Cauldron",
    vendorName: "Willow & Thyme",
    rating: 4.9,
    deliveryTime: "40 min",
    minOrder: "₹300",
    deliveryFee: "Free",
    category: "Specialty",
    isOpen: true,
  },
  {
    id: 8,
    storeName: "Tech World",
    vendorName: "Gadget Geeks",
    rating: 4.4,
    deliveryTime: "50 min",
    minOrder: "₹500",
    deliveryFee: "₹40",
    category: "Electronics",
    isOpen: true,
  },
];

function StorePage() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteStores, setFavoriteStores] = useState([]);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleShopNow = (storeName) => {
    alert(`Shopping at ${storeName}...`);
  };

  const toggleFavorite = (storeId) => {
    setFavoriteStores((prev) =>
      prev.includes(storeId)
        ? prev.filter((id) => id !== storeId)
        : [...prev, storeId]
    );
  };

  const categories = [
    "All",
    "Grocery",
    "Organic",
    "Convenience",
    "Supermarket",
    "Pharmacy",
    "Pet Supplies",
    "Specialty",
    "Electronics",
  ];

  const filteredStores = availableStores.filter(
    (store) =>
      (selectedCategory === "All" || store.category === selectedCategory) &&
      (searchQuery === "" ||
        store.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.vendorName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 flex flex-col font-sans">
      <header
        className={`container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-6 sm:py-8 transition-all duration-700 ${
          isAnimated
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
      >
        <div>
          <img
            src={logo}
            alt="Sara Shopy Logo"
            className="h-12 sm:h-14 lg:h-16 w-auto mx-auto lg:mx-0"
          />
        </div>
        <div 
          className="text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transform transition-all hover:scale-105"
          style={{ backgroundColor: '#E9E04A' }}
        >
          <FiZap className="text-purple-700" />
          <span className="hidden sm:inline">Delivery in 30 minutes</span>
          <span className="sm:hidden">30 min</span>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Banner Section */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(140, 108, 197, 0.8) 0%, rgba(140, 108, 197, 0.4) 100%)",
            }}
          ></div>
          <img
            src="https://img.freepik.com/free-photo/woman-with-tablet-checking-shopping-cart-see-if-she-has-everything-she-needs-lunch_342744-1111.jpg"
            alt="Store Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Shop from Your Favorite Stores
              </h1>
              <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                Everything you need, delivered in 30 minutes. Quality products from
                local stores at your doorstep.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stores or vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-purple-600 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-purple-600 transition-colors"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-white shadow-sm"
                        : "text-gray-600"
                    }`}
                  >
                    <FiGrid />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-white shadow-sm"
                        : "text-gray-600"
                    }`}
                  >
                    <FiList />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trending Vendors Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Trending Vendors
              </h2>
              <button className="text-purple-700 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View All <FiArrowRight />
              </button>
            </div>
            <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4">
              {trendingVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex flex-col items-center flex-shrink-0 group cursor-pointer"
                >
                  <div className="relative mb-3">
                    <div
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 group-hover:scale-105 transition-transform shadow-lg"
                      style={{ backgroundColor: '#8C6CC5' }}
                    >
                      <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="rounded-full w-full h-full object-cover border-4 border-white"
                      />
                    </div>
                    {/* Large Rating Badge */}
                    <div
                      className="absolute -top-2 -right-2 bg-white rounded-full shadow-lg px-2.5 py-1 flex items-center gap-1 border-2"
                      style={{ borderColor: '#E9E04A' }}
                    >
                      <FiStar className="text-yellow-500 text-sm fill-current" />
                      <span className="text-sm font-bold text-gray-900">{vendor.rating}</span>
                    </div>
                    {/* Delivery Time Badge */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-md px-3 py-1 flex items-center gap-1 whitespace-nowrap">
                      <FiClock className="text-green-600 text-xs" />
                      <span className="text-xs font-semibold text-gray-900">{vendor.deliveryTime}</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900 text-center mt-4 max-w-[100px]">
                    {vendor.name}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Available Stores Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Available Stores Near You
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiMapPin />
                <span>Delivering to your area</span>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group relative ${
                      store.isOpen 
                        ? 'hover:shadow-xl hover:-translate-y-1' 
                        : 'opacity-75'
                    }`}
                  >
                    {/* Status Overlay for Closed Stores */}
                    {!store.isOpen && (
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 z-10 flex items-center justify-center">
                        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
                          <p className="text-gray-900 font-bold text-sm">Currently Closed</p>
                        </div>
                      </div>
                    )}
                    
                    <div
                      className={`h-2 ${store.isOpen ? '' : 'bg-gray-400'}`}
                      style={store.isOpen ? { backgroundColor: '#8C6CC5' } : {}}
                    ></div>
                    <div className={`p-6 ${!store.isOpen ? 'filter grayscale' : ''}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: 'rgba(140, 108, 197, 0.1)' }}
                          >
                            <FiShoppingBag className="text-xl" style={{ color: '#8C6CC5' }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 mb-0.5 truncate">
                              {store.storeName}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">by {store.vendorName}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFavorite(store.id)}
                          className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                            favoriteStores.includes(store.id)
                              ? "text-red-500"
                              : "text-gray-400 hover:text-red-500"
                          }`}
                        >
                          <FiHeart className={favoriteStores.includes(store.id) ? "fill-current" : ""} />
                        </button>
                      </div>

                      {/* Prominent Rating and Delivery */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-200">
                          <FiStar className="text-yellow-500 text-base fill-current" />
                          <span className="text-base font-bold text-gray-900">{store.rating}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 flex-1 min-w-0">
                          <FiClock className="text-green-600 text-sm flex-shrink-0" />
                          <span className="text-sm font-semibold text-gray-900 truncate">{store.deliveryTime}</span>
                        </div>
                      </div>

                      {/* Pricing Information - High Contrast */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600 font-medium">Minimum Order</span>
                          <span className="text-base font-bold text-gray-900">{store.minOrder}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 font-medium">Delivery Fee</span>
                          <span className={`text-base font-bold ${
                            store.deliveryFee === "Free" 
                              ? "text-green-600" 
                              : "text-gray-900"
                          }`}>
                            {store.deliveryFee}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span
                          className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold border"
                          style={{
                            backgroundColor: 'rgba(233, 224, 74, 0.15)',
                            color: '#8C6CC5',
                            borderColor: 'rgba(140, 108, 197, 0.3)'
                          }}
                        >
                          {store.category}
                        </span>
                      </div>

                      <button
                        onClick={() => handleShopNow(store.storeName)}
                        disabled={!store.isOpen}
                        className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                          store.isOpen
                            ? 'text-white hover:shadow-lg hover:scale-105'
                            : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                        }`}
                        style={store.isOpen ? { backgroundColor: '#8C6CC5' } : {}}
                      >
                        {store.isOpen ? (
                          <>Shop Now <FiArrowRight className="text-base" /></>
                        ) : (
                          'Closed'
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 relative ${
                      store.isOpen 
                        ? 'hover:shadow-xl' 
                        : 'opacity-75'
                    }`}
                  >
                    {/* Status Overlay for Closed Stores */}
                    {!store.isOpen && (
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 z-10 flex items-center justify-center">
                        <div className="bg-white rounded-lg px-6 py-3 shadow-lg">
                          <p className="text-gray-900 font-bold">Currently Closed</p>
                        </div>
                      </div>
                    )}
                    
                    <div className={`p-4 sm:p-6 ${!store.isOpen ? 'filter grayscale' : ''}`}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-md"
                            style={{ backgroundColor: 'rgba(140, 108, 197, 0.1)' }}
                          >
                            <FiShoppingBag className="text-3xl" style={{ color: '#8C6CC5' }} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                                {store.storeName}
                              </h3>
                              <p className="text-sm text-gray-600 truncate">by {store.vendorName}</p>
                            </div>
                            <button
                              onClick={() => toggleFavorite(store.id)}
                              className={`p-2 rounded-full transition-colors self-start flex-shrink-0 ${
                                favoriteStores.includes(store.id)
                                  ? "text-red-500"
                                  : "text-gray-400 hover:text-red-500"
                              }`}
                            >
                              <FiHeart className={favoriteStores.includes(store.id) ? "fill-current" : ""} />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            {/* Prominent Rating */}
                            <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                              <FiStar className="text-yellow-500 fill-current" />
                              <span className="text-base font-bold text-gray-900">{store.rating}</span>
                            </div>
                            {/* Delivery Time */}
                            <div className="flex items-center gap-1.5 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                              <FiClock className="text-green-600" />
                              <span className="text-sm font-semibold text-gray-900">{store.deliveryTime}</span>
                            </div>
                            {/* Category Badge */}
                            <span
                              className="inline-block px-3 py-2 rounded-lg text-xs font-semibold border"
                              style={{
                                backgroundColor: 'rgba(233, 224, 74, 0.15)',
                                color: '#8C6CC5',
                                borderColor: 'rgba(140, 108, 197, 0.3)'
                              }}
                            >
                              {store.category}
                            </span>
                          </div>

                          {/* Pricing Section - High Contrast */}
                          <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-xs text-gray-600 font-medium block mb-1">Minimum Order</span>
                                <span className="text-lg font-bold text-gray-900">{store.minOrder}</span>
                              </div>
                              <div>
                                <span className="text-xs text-gray-600 font-medium block mb-1">Delivery Fee</span>
                                <span className={`text-lg font-bold ${
                                  store.deliveryFee === "Free" 
                                    ? "text-green-600" 
                                    : "text-gray-900"
                                }`}>
                                  {store.deliveryFee}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <button
                              onClick={() => handleShopNow(store.storeName)}
                              disabled={!store.isOpen}
                              className={`font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                                store.isOpen
                                  ? 'text-white hover:shadow-lg hover:scale-105'
                                  : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                              }`}
                              style={store.isOpen ? { backgroundColor: '#8C6CC5' } : {}}
                            >
                              {store.isOpen ? (
                                <>Shop Now <FiArrowRight /></>
                              ) : (
                                'Closed'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Benefits Section */}
          <section className="mt-16 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              Why Shop With Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(140, 108, 197, 0.1)' }}
                >
                  <FiTruck className="text-2xl" style={{ color: '#8C6CC5' }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Get your orders in 30 minutes or less</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(233, 224, 74, 0.2)' }}
                >
                  <FiAward className="text-2xl" style={{ color: '#E9E04A' }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Quality Products</h3>
                <p className="text-sm text-gray-600">Carefully selected from trusted local stores</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(140, 108, 197, 0.1)' }}
                >
                  <FiHeart className="text-2xl" style={{ color: '#8C6CC5' }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Support Local</h3>
                <p className="text-sm text-gray-600">Help your neighborhood businesses thrive</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(233, 224, 74, 0.2)' }}
                >
                  <FiCheck className="text-2xl" style={{ color: '#E9E04A' }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Satisfaction Guaranteed</h3>
                <p className="text-sm text-gray-600">Easy returns and refunds if you're not happy</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 mb-12">
            <div
              className="rounded-2xl p-8 sm:p-12 text-center text-white"
              style={{ backgroundColor: '#8C6CC5' }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="mb-6 max-w-2xl mx-auto">
                We're constantly adding new stores and products. Let us know what you'd like to see.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-white text-purple-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <FiMail />
                  Request a Store
                </button>
                <button
                  className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FiPhone />
                  Contact Support
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer
        className={`mt-12 sm:mt-16 transition-all duration-700 delay-500 ${
          isAnimated ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200 pt-6 sm:pt-8 mb-4 sm:mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">About Us</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Our Story</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Careers</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Food & Alcohol Delivery</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Grocery Delivery</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Pharmacy Delivery</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Partner</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Become a Partner</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Partner Portal</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Partner Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Help Center</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1"><FiChevronRight className="text-xs" />Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs sm:text-sm text-gray-600 pb-4 sm:pb-8">
          <p>
            &copy; 2025 Sara Shopy. Connecting you with local stores in your
            neighborhood.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default StorePage;