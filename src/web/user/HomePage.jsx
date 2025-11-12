
import { FiSearch } from "react-icons/fi";
import heroImage from "../../assets/img/hero-illustration.png";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FaApple, FaGooglePlay, FaMotorcycle, FaStoreAlt, FaShippingFast, FaLeaf, FaHandshake } from "react-icons/fa";



const HomePage = () => {
  const steps = [
    {
      icon: <FaStoreAlt className="text-green-500 w-16 h-16" />,
      title: "SELECT LOCAL",
      desc: "Choose your neighborhood outlet — 30 minutes or less",
    },
    {
      icon: <FaShippingFast className="text-yellow-400 w-16 h-16" />,
      title: "FAST DELIVERY",
      desc: "Get your order quickly and easily",
    },
    {
      icon: <FaLeaf className="text-blue-500 w-16 h-16" />,
      title: "ENJOY FRESH",
      desc: "Get fresh groceries delivered daily",
    },
  ];
  return (
    <div className="font-sans bg-[#fffdf8] text-gray-800">
      {/* ===== NAVBAR ===== */}
      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between">
          {/* Left */}
          <div className="w-full lg:w-1/2 z-10">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Local Groceries,<br />
              Delivered in <span className="text-purple-600">30 minutes</span>
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg">
              Support your neighborhood. Get fresh food daily delivered right to your door.
            </p>

            {/* Search bar */}
            <div className="flex items-center bg-white shadow-xl rounded-full overflow-hidden max-w-xl border border-purple-200">
              <FiSearch className="ml-6 text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Enter Pincode or Address"
                className="flex-1 px-4 py-4 text-gray-800 outline-none"
              />
              <button className="bg-yellow-400 hover:bg-yellow-300 px-8 py-4 font-bold text-gray-900 transition">
                Find Local Stores
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Trusted by 1,000+ shoppers and supporting 500+ local stores
            </p>
          </div>
          {/* Right - Hero illustration with circular background */}
          <div className="relative w-full lg:w-1/2 mt-12 lg:mt-0">
            {/* The existing purple circle can stay */}
            <div className="absolute -top-10 -right-20 w-96 h-96 bg-purple-100 rounded-full opacity-60"></div>

            <div className="relative z-10 w-full max-w-lg mx-auto overflow-hidden drop-shadow-2xl h-96 
                 /* This creates a smooth, asymmetrical blob shape */
                 rounded-[40%_60%_/_60%_40%_40%_60%]">
              <img
                src={heroImage}
                alt="Delivery Illustration"
                /* Image itself should cover the container */
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            How it Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-transform hover:-translate-y-2 duration-300"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GROW YOUR BUSINESS ===== */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Text Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              Grow Your Local Business
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Join our network of local stores and restaurants in your area. Increase your revenue and grow your business with Sara Shopy.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 justify-center lg:justify-start transition">
              <FaHandshake className="text-xl" />
              Join the Partner Network
            </button>
          </div>

          {/* Right Icon Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-yellow-400 p-10 rounded-3xl shadow-xl flex items-center justify-center">
              <FaStoreAlt className="text-white text-8xl drop-shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== APP DOWNLOAD ===== */}
      <section className="mt-12 sm:mt-16 text-center px-4">
        {/* Delivery Partner CTA */}
        <div className="mb-10 sm:mb-14">
          <div className="flex justify-center items-center gap-3 mb-3">
            <FaMotorcycle className="text-purple-600 text-3xl sm:text-4xl" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Want to become a delivery partner?
            </h2>
          </div>

          <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
            Join our fast-growing network of delivery riders and start earning today!
            Flexible hours, competitive pay, and a friendly team await you.
          </p>

          <button className="mt-5 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
            Apply Now
          </button>
        </div>

        {/* App Download Section */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Download our app for a better experience
          </h3>

          {/* App Store + Google Play Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* App Store Button */}
            <button className="bg-gray-900 text-white flex items-center gap-2 sm:gap-3 py-3 px-4 sm:px-6 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto sm:mx-0">
              <FaApple className="text-lg sm:text-xl" />
              <div className="text-left">
                <p className="text-xs">Download on the</p>
                <p className="font-bold text-sm sm:text-base">App Store</p>
              </div>
            </button>

            {/* Google Play Button */}
            <button className="bg-gray-900 text-white flex items-center gap-2 sm:gap-3 py-3 px-4 sm:px-6 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto sm:mx-0">
              <FaGooglePlay className="text-lg sm:text-xl" />
              <div className="text-left">
                <p className="text-xs">Get it on</p>
                <p className="font-bold text-sm sm:text-base">Google Play</p>
              </div>
            </button>
          </div>
        </div>
      </section>
      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
};

export default HomePage;