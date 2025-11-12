import { useState, useEffect } from "react";
import { FiX, FiUser, FiPhone, FiMapPin, FiMail, FiLock } from "react-icons/fi";

export default function AddAgentModal({ closeModal, onAgentAdded }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    pincode: "",
    panchayath: "",
    place: "",
    state: "Kerala",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [panchayaths, setPanchayaths] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Fetch districts on component mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/districts/list`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch districts');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setDistricts(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching districts:", err);
        alert("Failed to load districts. Please try again.");
      });
  }, []);

  // Fetch panchayaths when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(d => d.District === selectedDistrict);
      if (district && Array.isArray(district.Panchayaths)) {
        setPanchayaths(district.Panchayaths);
      } else {
        setPanchayaths([]);
      }
    } else {
      setPanchayaths([]);
    }
  }, [selectedDistrict, districts]);

  // Handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle district change
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setFormData((prev) => ({
      ...prev,
      place: district,
      panchayath: "", // Reset panchayath when district changes
    }));
  };

  // Simple validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.place.trim()) {
      newErrors.place = "District is required";
    }
    
    if (!formData.panchayath.trim()) {
      newErrors.panchayath = "Panchayath is required";
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before validation:", formData);
    
    if (!validateForm()) {
      console.log("Validation failed:", errors);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Sending data to server:", formData);
      
      const response = await fetch(`${API_BASE_URL}/api/admin/agent/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        alert("✅ Agent added successfully! Login credentials sent to agent's email.");
        onAgentAdded(); // Refresh agent list
        closeModal();
      } else {
        alert("❌ Error: " + (data.message || "Failed to add agent"));
      }
    } catch (error) {
      console.error("Error adding agent:", error);
      alert("⚠️ Something went wrong while adding agent!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-md rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">Add New Agent</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Account Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Account Information</h4>
            
            {/* Username */}
            <div>
              <label className="block text-gray-400 mb-2">Username *</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 ${
                    errors.username ? "border-red-500" : "border-gray-700"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 mb-2">Password *</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-400 mb-2">Email *</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-400 mb-2">Phone Number *</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 ${
                    errors.phone ? "border-red-500" : "border-gray-700"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Location Information</h4>
            
            {/* District Dropdown */}
            <div>
              <label className="block text-gray-400 mb-2">District *</label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-gray-500" />
                <select
                  name="place"
                  value={formData.place}
                  onChange={handleDistrictChange}
                  className={`w-full bg-gray-800/50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 appearance-none ${
                    errors.place ? "border-red-500" : "border-gray-700"
                  }`}
                >
                  <option value="">Select District</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district.District}>
                      {district.District}
                    </option>
                  ))}
                </select>
              </div>
              {errors.place && (
                <p className="text-red-500 text-sm mt-1">{errors.place}</p>
              )}
            </div>

            {/* Panchayath Dropdown */}
            <div>
              <label className="block text-gray-400 mb-2">Panchayath *</label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-gray-500" />
                <select
                  name="panchayath"
                  value={formData.panchayath}
                  onChange={handleInputChange}
                  disabled={!selectedDistrict}
                  className={`w-full bg-gray-800/50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 appearance-none ${
                    errors.panchayath ? "border-red-500" : "border-gray-700"
                  } ${!selectedDistrict ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <option value="">Select Panchayath</option>
                  {panchayaths.map((panchayath, index) => (
                    <option key={index} value={panchayath}>
                      {panchayath}
                    </option>
                  ))}
                </select>
              </div>
              {errors.panchayath && (
                <p className="text-red-500 text-sm mt-1">{errors.panchayath}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-gray-400 mb-2">Pincode *</label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter 6-digit pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className={`w-full bg-gray-800/50 text-white border rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 ${
                  errors.pincode ? "border-red-500" : "border-gray-700"
                }`}
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="block text-gray-400 mb-2">State</label>
              <input
                type="text"
                name="state"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-yellow-500 text-black font-medium hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Agent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}