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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 flex flex-col font-sans">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <header
          className={`flex justify-between items-center mb-12 transition-all duration-700 ${
            isAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <div>
            <img
              src={logo}
              alt="Sara Shopy Logo"
              className="h-16 w-auto mx-auto lg:mx-0 mb-2"
            />
          </div>
          <div className="bg-yellow-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-md transform transition-transform hover:scale-105">
            <FiZap className="text-yellow-600" />
            Delivery in 30 minutes
          </div>
        </header>



        <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div
            className={`lg:w-1/2 text-center lg:text-left transition-all duration-700 delay-200 ${
              isAnimated
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
              Groceries delivered in{" "}
              <span className="text-purple-800">30 minutes</span>
            </h2>
            <p className="text-lg mb-10 text-gray-600 max-w-lg">
              Get your favorite products from local stores delivered to your
              door. Fresh, fast, and supporting your community.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-purple-100 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:border-purple-300 transform hover:-translate-y-1">
                <FiShoppingBag className="text-purple-800 text-2xl mb-3" />
                <h3 className="font-semibold mb-1 text-gray-900">
                  Local Stores
                </h3>
                <p className="text-sm text-gray-600">
                  Support neighborhood businesses
                </p>
              </div>
              <div className="bg-white border border-purple-100 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:border-purple-300 transform hover:-translate-y-1">
                <FiZap className="text-purple-800 text-2xl mb-3" />
                <h3 className="font-semibold mb-1 text-gray-900">
                  Fast Delivery
                </h3>
                <p className="text-sm text-gray-600">30 minutes or less</p>
              </div>
              <div className="bg-white border border-purple-100 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:border-purple-300 transform hover:-translate-y-1">
                <FiShield className="text-purple-800 text-2xl mb-3" />
                <h3 className="font-semibold mb-1 text-gray-900">Secure</h3>
                <p className="text-sm text-gray-600">
                  Safe and reliable service
                </p>
              </div>
              <div className="bg-white border border-purple-100 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:border-purple-300 transform hover:-translate-y-1">
                <FiTag className="text-purple-800 text-2xl mb-3" />
                <h3 className="font-semibold mb-1 text-gray-900">
                  Best Prices
                </h3>
                <p className="text-sm text-gray-600">
                  Competitive local pricing
                </p>
              </div>
            </div>
          </div>

          <div
            className={`lg:w-1/2 w-full max-w-md transition-all duration-700 delay-300 ${
              isAnimated
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
          >
            <div className="bg-white rounded-xl shadow-xl p-8 border border-purple-100">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Get Started
              </h3>

              {/* Success Message */}
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-pulse">
                  <FiCheck className="text-green-600 text-xl" />
                  <div>
                    <p className="font-medium text-green-800">
                      Welcome {formData.userName}!
                    </p>
                    <p className="text-sm text-green-600">
                      Setting up your Sara Shopy experience for {formData.place}
                      ...
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
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
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
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
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <div className="relative">
                      <FiMapPin
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
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
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area
                    </label>
                    <div className="relative">
                      <FiMapPin
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
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
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
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
                  className="w-full mt-6 flex items-center justify-center bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:bg-purple-900 disabled:opacity-70 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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

        <footer
          className={`mt-16 text-center text-sm text-gray-600 transition-all duration-700 delay-500 ${
            isAnimated ? "opacity-100" : "opacity-0"
          }`}
        >
          <p>
            &copy; 2025 Sara Shopy. Connecting you with local stores in your
            neighborhood.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
