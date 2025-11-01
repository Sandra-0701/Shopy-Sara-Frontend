const trendingVendors = [
  {
    id: 1,
    name: "Fresh Farms",
    image: "https://picsum.photos/seed/vendor1/200/200.jpg",
  },
  {
    id: 2,
    name: "The Butcher's Block",
    image: "https://picsum.photos/seed/vendor2/200/200.jpg",
  },
  {
    id: 3,
    name: "Seafood Supreme",
    image: "https://picsum.photos/seed/vendor3/200/200.jpg",
  },
  {
    id: 4,
    name: "Bakery Bliss",
    image: "https://picsum.photos/seed/vendor4/200/200.jpg",
  },
  {
    id: 5,
    name: "Dairy Delight",
    image: "https://picsum.photos/seed/vendor5/200/200.jpg",
  },
];

const availableStores = [
  {
    id: 1,
    storeName: "Quick Mart",
    vendorName: "Retail Giants Co.",
  },
  {
    id: 2,
    storeName: "Green Grocer",
    vendorName: "Fresh Farms",
  },
  {
    id: 3,
    storeName: "Corner Store",
    vendorName: "Local Vendors LLC",
  },
  {
    id: 4,
    storeName: "SuperValue",
    vendorName: "Value Retail Inc.",
  },
  {
    id: 5,
    storeName: "PharmaPlus",
    vendorName: "HealthMasters",
  },
  {
    id: 6,
    storeName: "Pet Paradise",
    vendorName: "Animal Lovers Inc.",
  },
  {
    id: 7,
    storeName: "The Crafted Cauldron",
    vendorName: "Willow & Thyme",
  },
  {
    id: 8,
    storeName: "Tech World",
    vendorName: "Gadget Geeks",
  },
];

function StorePage() {
  const handleShopNow = (storeName) => {
    alert(`Shopping at ${storeName}...`);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Banner Section */}
      <div className="relative w-full h-64 lg:h-96">
        <img
          src="https://picsum.photos/seed/banner/1920/600.jpg"
          alt="Store Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Shop from Your Favorite Stores
            </h1>
            <p className="text-lg lg:text-xl">
              Everything you need, delivered fast.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Trending Vendors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Trending Vendors
          </h2>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {trendingVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#f5a25d] to-[#e3b26b] p-[3px]">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="rounded-full w-full h-full object-cover border-4 border-[#f8e9d6]"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800">
                  {vendor.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Available Stores Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Stores Near You
          </h2>
          {/* Updated Grid for the new taller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {availableStores.map((store) => (
              // New card design based on your HTML
              <div
                key={store.id}
                className="bg-[#1e2530] text-center text-white rounded-2xl shadow-lg p-8 max-w-sm w-full"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#f5a25d] flex items-center justify-center">
                    {/* Shopping Bag Icon (converted to JSX) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="#f5a25d"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 2l1 5h10l1-5M3 7h18l-1 14H4L3 7z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 10a3 3 0 006 0"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-[#f5a25d] text-xl font-bold tracking-wide">
                  {store.storeName.toUpperCase()}
                </h1>

                {/* Subtitle */}
                <p className="text-[#f8e9d6] italic text-sm mb-6">
                  by {store.vendorName}
                </p>

                {/* Button */}
                <button
                  onClick={() => handleShopNow(store.storeName)}
                  className="bg-gradient-to-r from-[#ff7a5c] to-[#ff4f4f] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                >
                  SHOP NOW
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default StorePage;
