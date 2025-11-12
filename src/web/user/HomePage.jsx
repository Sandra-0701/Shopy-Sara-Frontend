import { useState, useEffect, useRef } from "react";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiShoppingBag,
  FiZap,
  FiShield,
  FiTag,
  FiCheck,
  FiArrowRight,
  FiLoader,
  FiAlertCircle,
  FiSearch,
  FiDownload,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiTruck,
  FiPackage,
  FiClock,
  FiStar,
  FiAward,
  FiHeadphones,
  FiChevronRight,
  FiMail,
  FiMap,
  FiGrid,
  FiHome,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import logo from "../../assets/img/logo/sara-new-logo.png";

function HomePage() {
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    pincode: "",
    place: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [searchPincode, setSearchPincode] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    setIsAnimated(true);
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleInputFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleInputBlur = () => {
    setFocusedField(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Name is required";
    } else if (formData.userName.trim().length < 2) {
      newErrors.userName = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.userName.trim())) {
      newErrors.userName = "Name should only contain letters";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode.replace(/\D/g, ""))) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    if (!formData.place.trim()) {
      newErrors.place = "Area is required";
    } else if (formData.place.trim().length < 2) {
      newErrors.place = "Area must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          userName: "",
          phoneNumber: "",
          pincode: "",
          place: "",
        });
      }, 3000);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  const handleSearchStores = () => {
    console.log("Searching stores for pincode:", searchPincode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 flex flex-col font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex-1 flex flex-col">
        {/* Header - As Provided */}
        <header
          className={`flex justify-between items-center mb-8 sm:mb-12 transition-all duration-700 ${
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

        {/* Hero Section with Store Search */}
        <div 
          className={`rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 transition-all duration-700 delay-100 ${
            isAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ backgroundColor: '#8C6CC5' }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-white">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Local store to door</h1>
              <p className="text-purple-100 mb-4 sm:mb-6 text-sm sm:text-base">From 30 minutes delivery</p>
              <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-xl p-2 w-full max-w-md mx-auto lg:mx-0 shadow-2xl">
                <FiSearch className="text-purple-600 ml-2 sm:ml-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Enter your pincode"
                  value={searchPincode}
                  onChange={(e) => setSearchPincode(e.target.value)}
                  className="px-2 sm:px-3 py-2 sm:py-3 text-gray-800 rounded-lg outline-none flex-1 text-sm"
                />
                <button
                  onClick={handleSearchStores}
                  className="bg-yellow-400 text-gray-900 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300 flex items-center gap-1 sm:gap-2 shadow-md text-xs sm:text-sm"
                  style={{ backgroundColor: '#E9E04A' }}
                >
                  <span className="hidden sm:inline">Search Stores</span>
                  <span className="sm:hidden">Search</span>
                  <FiArrowRight className="text-sm sm:text-base" />
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center mt-6 lg:mt-0">
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
                <div className="text-center group cursor-pointer transition-transform duration-300 hover:scale-110">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mb-1 sm:mb-2 group-hover:bg-white/30 transition-all duration-300">
                    <FiPackage className="text-xl sm:text-3xl" />
                  </div>
                  <p className="text-xs font-medium">Groceries</p>
                </div>
                <div className="text-center group cursor-pointer transition-transform duration-300 hover:scale-110">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mb-1 sm:mb-2 group-hover:bg-white/30 transition-all duration-300">
                    <FiShoppingBag className="text-xl sm:text-3xl" />
                  </div>
                  <p className="text-xs font-medium">Fresh Food</p>
                </div>
                <div className="text-center group cursor-pointer transition-transform duration-300 hover:scale-110">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mb-1 sm:mb-2 group-hover:bg-white/30 transition-all duration-300">
                    <FiTag className="text-xl sm:text-3xl" />
                  </div>
                  <p className="text-xs font-medium">Offers</p>
                </div>
                <div className="text-center group cursor-pointer transition-transform duration-300 hover:scale-110">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mb-1 sm:mb-2 group-hover:bg-white/30 transition-all duration-300">
                    <FiStar className="text-xl sm:text-3xl" />
                  </div>
                  <p className="text-xs font-medium">Premium</p>
                </div>
                <div className="text-center group cursor-pointer transition-transform duration-300 hover:scale-110">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mb-1 sm:mb-2 group-hover:bg-white/30 transition-all duration-300">
                    <FiAward className="text-xl sm:text-3xl" />
                  </div>
                  <p className="text-xs font-medium">Rewards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-1 flex flex-col xl:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Side - Service Description */}
          <div
            className={`w-full xl:w-1/2 text-center xl:text-left transition-all duration-700 delay-200 ${
              isAnimated
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900">
              Groceries delivered in{" "}
              <span 
                className="inline-block"
                style={{ color: '#8C6CC5' }}
              >
                30 minutes
              </span>
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-10 text-gray-600 max-w-lg mx-auto xl:mx-0">
              Get your favorite products from local stores delivered to your
              door. Fresh, fast, and supporting your community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
                <FiShoppingBag 
                  className="text-2xl sm:text-3xl mb-2 sm:mb-3"
                  style={{ color: '#8C6CC5' }}
                />
                <h3 className="font-bold mb-1 text-gray-900 text-sm sm:text-base">
                  Local Stores
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Support neighborhood businesses
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
                <FiZap 
                  className="text-2xl sm:text-3xl mb-2 sm:mb-3"
                  style={{ color: '#8C6CC5' }}
                />
                <h3 className="font-bold mb-1 text-gray-900 text-sm sm:text-base">
                  Fast Delivery
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">30 minutes or less</p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
                <FiShield 
                  className="text-2xl sm:text-3xl mb-2 sm:mb-3"
                  style={{ color: '#8C6CC5' }}
                />
                <h3 className="font-bold mb-1 text-gray-900 text-sm sm:text-base">Secure</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Safe and reliable service
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
                <FiTag 
                  className="text-2xl sm:text-3xl mb-2 sm:mb-3"
                  style={{ color: '#8C6CC5' }}
                />
                <h3 className="font-bold mb-1 text-gray-900 text-sm sm:text-base">
                  Best Prices
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Competitive local pricing
                </p>
              </div>
            </div>

            {/* Delivery Person Image Section */}
            <div className="flex justify-center xl:justify-start">
              <div className="relative">
                <div 
                  className="rounded-full p-1"
                  style={{ backgroundColor: '#8C6CC5' }}
                >
                  <div className="bg-white rounded-full p-4 sm:p-8">
                    <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-yellow-100">
                      <FiTruck className="text-4xl sm:text-6xl" style={{ color: '#8C6CC5' }} />
                    </div>
                  </div>
                </div>
                <div 
                  className="absolute -bottom-2 -right-2 rounded-full p-2 sm:p-3 shadow-lg"
                  style={{ backgroundColor: '#E9E04A' }}
                >
                  <FiZap className="text-white text-lg sm:text-2xl" style={{ color: '#8C6CC5' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div
            className={`w-full xl:w-1/2 max-w-md mx-auto xl:mx-0 transition-all duration-700 delay-300 ${
              isAnimated
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                Get Started
              </h3>

              {/* Success Message */}
              {showSuccess && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 sm:gap-3 animate-pulse">
                  <FiCheck className="text-green-600 text-lg sm:text-xl flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800 text-sm sm:text-base">
                      Welcome {formData.userName}!
                    </p>
                    <p className="text-xs sm:text-sm text-green-600">
                      Setting up your Sara Shopy experience for {formData.place}
                      ...
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser
                      className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 transition-colors text-lg sm:text-xl ${
                        focusedField === "userName"
                          ? "text-purple-600"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      ref={firstInputRef}
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus("userName")}
                      onBlur={handleInputBlur}
                      onKeyPress={handleKeyPress}
                      className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base ${
                        errors.userName
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-purple-600"
                      }`}
                      placeholder="Enter your name"
                      aria-required="true"
                      aria-describedby={
                        errors.userName ? "userName-error" : null
                      }
                    />
                  </div>
                  {errors.userName && (
                    <p
                      id="userName-error"
                      className="text-red-500 text-xs mt-1 flex items-center gap-1"
                    >
                      <FiAlertCircle className="text-xs" />
                      {errors.userName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone
                      className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 transition-colors text-lg sm:text-xl ${
                        focusedField === "phoneNumber"
                          ? "text-purple-600"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus("phoneNumber")}
                      onBlur={handleInputBlur}
                      onKeyPress={handleKeyPress}
                      className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base ${
                        errors.phoneNumber
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-purple-600"
                      }`}
                      placeholder="Enter your phone number"
                      aria-required="true"
                      aria-describedby={
                        errors.phoneNumber ? "phoneNumber-error" : null
                      }
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p
                      id="phoneNumber-error"
                      className="text-red-500 text-xs mt-1 flex items-center gap-1"
                    >
                      <FiAlertCircle className="text-xs" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      Pincode
                    </label>
                    <div className="relative">
                      <FiMapPin
                        className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 transition-colors text-lg sm:text-xl ${
                          focusedField === "pincode"
                            ? "text-purple-600"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus("pincode")}
                        onBlur={handleInputBlur}
                        onKeyPress={handleKeyPress}
                        className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base ${
                          errors.pincode
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-purple-600"
                        }`}
                        placeholder="123456"
                        aria-required="true"
                        aria-describedby={
                          errors.pincode ? "pincode-error" : null
                        }
                      />
                    </div>
                    {errors.pincode && (
                      <p
                        id="pincode-error"
                        className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      >
                        <FiAlertCircle className="text-xs" />
                        {errors.pincode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      Area
                    </label>
                    <div className="relative">
                      <FiMapPin
                        className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 transition-colors text-lg sm:text-xl ${
                          focusedField === "place"
                            ? "text-purple-600"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus("place")}
                        onBlur={handleInputBlur}
                        onKeyPress={handleKeyPress}
                        className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl border bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base ${
                          errors.place
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-purple-600"
                        }`}
                        placeholder="Your area"
                        aria-required="true"
                        aria-describedby={errors.place ? "place-error" : null}
                      />
                    </div>
                    {errors.place && (
                      <p
                        id="place-error"
                        className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      >
                        <FiAlertCircle className="text-xs" />
                        {errors.place}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  className="w-full mt-4 sm:mt-6 flex items-center justify-center text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:shadow-xl disabled:opacity-70 transform hover:-translate-y-1 text-sm sm:text-base"
                  style={{ backgroundColor: '#8C6CC5' }}
                  onClick={handleContinue}
                  disabled={isLoading}
                  aria-label="Start shopping"
                >
                  {isLoading ? (
                    <>
                      Setting Up <FiLoader className="ml-2 animate-spin" />
                    </>
                  ) : (
                    <>
                      Start Shopping <FiArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-gray-900">Why Choose Sara Shopy</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
              <div 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                style={{ backgroundColor: 'rgba(140, 108, 197, 0.1)' }}
              >
                <FiClock className="text-2xl sm:text-3xl" style={{ color: '#8C6CC5' }} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Quick Delivery</h4>
              <p className="text-xs sm:text-sm text-gray-600">Get your orders in 30 minutes or less</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
              <div 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                style={{ backgroundColor: 'rgba(233, 224, 74, 0.1)' }}
              >
                <FiDollarSign className="text-2xl sm:text-3xl" style={{ color: '#E9E04A' }} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Best Prices</h4>
              <p className="text-xs sm:text-sm text-gray-600">Competitive pricing on all products</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
              <div 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                style={{ backgroundColor: 'rgba(140, 108, 197, 0.1)' }}
              >
                <FiUsers className="text-2xl sm:text-3xl" style={{ color: '#8C6CC5' }} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Support Local</h4>
              <p className="text-xs sm:text-sm text-gray-600">Help your neighborhood businesses thrive</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
              <div 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                style={{ backgroundColor: 'rgba(233, 224, 74, 0.1)' }}
              >
                <FiTrendingUp className="text-2xl sm:text-3xl" style={{ color: '#E9E04A' }} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Growing Network</h4>
              <p className="text-xs sm:text-sm text-gray-600">Expanding to serve more communities</p>
            </div>
          </div>
        </div>

        {/* Store Partner Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Partner with us as a store
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Join our network of local stores and reach more customers in your area. 
                Increase your revenue and grow your business with Sara Shopy.
              </p>
              <button 
                className="text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm sm:text-base mx-auto md:mx-0"
                style={{ backgroundColor: '#8C6CC5' }}
              >
                Become a Partner Store
                <FiChevronRight />
              </button>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div 
                className="rounded-2xl p-6 sm:p-8"
                style={{ backgroundColor: '#E9E04A' }}
              >
                <FiShoppingBag className="text-4xl sm:text-6xl text-purple-700" />
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Download our app for a better experience
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button className="bg-gray-900 text-white flex items-center gap-2 sm:gap-3 py-3 px-4 sm:px-6 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto sm:mx-0">
              <FiDownload className="text-lg sm:text-xl" />
              <div className="text-left">
                <p className="text-xs">Download on the</p>
                <p className="font-bold text-sm sm:text-base">App Store</p>
              </div>
            </button>
            <button className="bg-gray-900 text-white flex items-center gap-2 sm:gap-3 py-3 px-4 sm:px-6 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto sm:mx-0">
              <FiDownload className="text-lg sm:text-xl" />
              <div className="text-left">
                <p className="text-xs">Get it on</p>
                <p className="font-bold text-sm sm:text-base">Google Play</p>
              </div>
            </button>
          </div>
          <div className="flex justify-center gap-3 sm:gap-4">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-110"
              style={{ backgroundColor: '#8C6CC5' }}
            >
              <FiFacebook className="text-lg sm:text-xl" />
            </div>
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-110"
              style={{ backgroundColor: '#8C6CC5' }}
            >
              <FiTwitter className="text-lg sm:text-xl" />
            </div>
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-110"
              style={{ backgroundColor: '#8C6CC5' }}
            >
              <FiInstagram className="text-lg sm:text-xl" />
            </div>
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-110"
              style={{ backgroundColor: '#8C6CC5' }}
            >
              <FiLinkedin className="text-lg sm:text-xl" />
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <footer
          className={`mt-12 sm:mt-16 transition-all duration-700 delay-500 ${
            isAnimated ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="border-t border-gray-200 pt-6 sm:pt-8 mb-4 sm:mb-6">
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
          <div className="text-center text-xs sm:text-sm text-gray-600 pb-4 sm:pb-8">
            <p>
              &copy; 2025 Sara Shopy. Connecting you with local stores in your
              neighborhood.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;