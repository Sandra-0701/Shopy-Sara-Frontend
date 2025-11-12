import { useState } from "react";
import {
  FiSearch,
  FiMapPin,
  FiClock,
  FiStar,
  FiTruck,
  FiHeart,
  FiArrowRight,
  FiPackage,
  FiPhone,
  FiAward,
  FiCoffee,
} from "react-icons/fi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import bannerImage from "../../assets/img/banner.jpeg";

const popularVendors = [
  { id: 1, name: "Veggie Delights", img: "https://picsum.photos/seed/veg1/300/300", rating: 4.8, time: "25 min" },
  { id: 2, name: "Fresh Breads", img: "https://picsum.photos/seed/bread1/300/300", rating: 4.9, time: "20 min" },
  { id: 3, name: "Spicy Meals", img: "https://picsum.photos/seed/spicy1/300/300", rating: 4.7, time: "30 min" },
  { id: 4, name: "Sweet Treats", img: "https://picsum.photos/seed/sweet1/300/300", rating: 4.6, time: "35 min" },
  { id: 5, name: "Dairy Farm", img: "https://picsum.photos/seed/dairy/300/300", rating: 4.9, time: "22 min" },
  { id: 6, name: "Organic Greens", img: "https://picsum.photos/seed/org1/300/300", rating: 4.8, time: "28 min" },
  { id: 7, name: "Meat Masters", img: "https://picsum.photos/seed/meat/300/300", rating: 4.7, time: "32 min" },
  { id: 8, name: "Juice Bar", img: "https://picsum.photos/seed/juice/300/300", rating: 4.9, time: "18 min" },
];

const nearbyStores = [
  {
    id: 1,
    name: "The Daily Grind",
    vendor: "Neemtree & Treefarm",
    isAvailable: false,
    icon: <FiCoffee className="text-5xl text-amber-700" />,
    bgColor: "bg-amber-100",
  },
  {
    id: 2,
    name: "Green Acres Grocer",
    vendor: "EcoHarvest & Sons",
    isAvailable: false,
    icon: <FiCoffee className="text-5xl text-amber-700" />,
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    name: "Sunrise Bakery",
    vendor: "Golden Loaf Co.",
    rating: 4.8,
    reviews: 890,
    isAvailable: true,
    closesAt: "10 PM",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Fresh Fish Market",
    vendor: "Ocean Catch",
    rating: 4.6,
    reviews: 234,
    isAvailable: true,
    closesAt: "7 PM",
    img: "https://img.freepik.com/free-photo/photorealistic-wild-tuna-day-celebration_23-2151307893.jpg",
  },
  {
    id: 5,
    name: "Pure Dairy Hub",
    vendor: "FarmFresh Dairy",
    rating: 4.9,
    reviews: 567,
    isAvailable: true,
    closesAt: "9 PM",
    img: "https://img.freepik.com/free-photo/dairy-products_114579-8756.jpg",
  },
  {
    id: 6,
    name: "Spice Route",
    vendor: "Masala King",
    rating: 4.7,
    reviews: 412,
    isAvailable: true,
    closesAt: "11 PM",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Fruit Basket",
    vendor: "Nature's Best",
    rating: 4.8,
    reviews: 789,
    isAvailable: true,
    closesAt: "10 PM",
    img: "https://img.freepik.com/free-photo/fresh-fruit-market-display_23-2151973381.jpg?uid=R134718628&ga=GA1.1.443530477.1762798144&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 8,
    name: "Quick Mart",
    vendor: "Daily Needs Co.",
    rating: 4.5,
    reviews: 1023,
    isAvailable: true,
    closesAt: "24 Hours",
    img: "https://img.freepik.com/premium-photo/vacation-package-deal_87720-88859.jpg",
  },
];

function StorePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-[#faf9f6] flex flex-col font-sans">
      <Header />

      {/* Hero */}
<section className="relative mx-6 sm:mx-12 h-[450px] sm:h-[500px] md:h-[550px] overflow-hidden py-12 sm:py-16 rounded-3xl shadow-xl">
      {/* Background Image */}
      <img
        src={bannerImage}
        alt="Farm fresh produce"
        className="absolute inset-0 w-full h-full object-cover rounded-3xl"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-900/70 to-transparent rounded-3xl" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Farm Fresh
          <br />
          to Your Doorstep
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-8">
          Search for products or stores
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search for lassi, bread, vegetables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-full bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 text-gray-800 placeholder-gray-500 text-lg"
          />
        </div>

        {/* Delivery Info */}
        <div className="mt-5 flex items-center gap-2 text-white/80">
          <FiMapPin className="text-xl" />
          <span>Delivery in 20 minutes</span>
        </div>
      </div>
    </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Popular Vendors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Vendors</h2>
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide -mx-4 p-4">
            <div className="inline-flex gap-8">
              {popularVendors.map((vendor) => (
                <div key={vendor.id} className="flex-shrink-0 w-28 text-center group cursor-pointer">
                  <div className="relative">
                    <img
                      src={vendor.img}
                      alt={vendor.name}
                      className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md px-3 py-1.5 flex items-center gap-1">
                      <FiClock className="text-green-600 text-xs" />
                      <span className="text-xs font-bold text-gray-800">{vendor.time}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1 shadow-lg">
                      <FiStar className="fill-current text-xs" />
                      {vendor.rating}
                    </div>
                  </div>
                  <p className="mt-6 font-semibold text-gray-800 text-sm">{vendor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Stores - EXACT DESIGN MATCH */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nearby Stores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyStores.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
              >
                {/* Image or Icon */}
                <div className="h-48 relative">
                  {store.isAvailable ? (
                    <img
                      src={store.img}
                      alt={store.name}
                      className="w-full h-full object-cover rounded-t-3xl"
                    />
                  ) : (
                    <div className={`w-full h-full ${store.bgColor} flex items-center justify-center rounded-t-3xl`}>
                      {store.icon}
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 text-lg">{store.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{store.vendor}</p>

                  {/* Status */}
                  {!store.isAvailable ? (
                    <p className="text-gray-500 text-sm mt-3">— CURRENTLY UNAVAILABLE</p>
                  ) : (
                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                          <FiStar className="text-amber-600 fill-current text-sm" />
                          <span className="font-bold text-sm">{store.rating}</span>
                        </div>
                        <span className="text-xs text-gray-600">({store.reviews})</span>
                      </div>
                      <p className="text-green-600 text-sm font-medium mt-2">
                        Open • Closes {store.closesAt}
                      </p>
                    </div>
                  )}

                  {/* Button */}
                  <button
                    className={`mt-4 w-full py-3 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      store.isAvailable
                        ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!store.isAvailable}
                  >
                    {store.isAvailable ? (
                      <>Shop Now <FiArrowRight /></>
                    ) : (
                      "Unavailable"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Shop With Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Shop With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FiTruck />, title: "Fast Delivery", desc: "30 minutes or less" },
              { icon: <FiAward />, title: "Quality Guaranteed", desc: "Fresh from farm" },
              { icon: <FiHeart />, title: "Support Local", desc: "Help small vendors" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-10 text-center shadow-lg">
                <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center text-4xl text-purple-700">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-purple-900 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Didn't Find What you Need?
          </h2>
          <p className="mb-10 max-w-2xl mx-auto text-white/90 text-lg">
            We're always adding new stores and fresh products. Help us grow!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-10 rounded-full transition-all flex items-center justify-center gap-3 text-lg">
              <FiPackage /> Suggest a Store
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-purple-900 font-bold py-4 px-10 rounded-full transition-all flex items-center justify-center gap-3 text-lg">
              <FiPhone /> Contact Support
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default StorePage;