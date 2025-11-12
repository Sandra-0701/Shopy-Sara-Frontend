import { useState } from "react";
import { FiX, FiPlus, FiMapPin, FiMail } from "react-icons/fi";

export default function AddDistrictPanchayathModal({ closeModal }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    District: "",
    Panchayaths: [],
    PinCodes: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPanchayath, setNewPanchayath] = useState("");
  const [newPinCode, setNewPinCode] = useState("");

  // Handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Add panchayath to form
  const handleAddPanchayath = () => {
    if (newPanchayath.trim() && !formData.Panchayaths.includes(newPanchayath.trim())) {
      setFormData((prev) => ({
        ...prev,
        Panchayaths: [...prev.Panchayaths, newPanchayath.trim()],
      }));
      setNewPanchayath("");
    }
  };

  // Add pin code to form
  const handleAddPinCode = () => {
    if (newPinCode.trim() && !formData.PinCodes.includes(newPinCode.trim())) {
      setFormData((prev) => ({
        ...prev,
        PinCodes: [...prev.PinCodes, newPinCode.trim()],
      }));
      setNewPinCode("");
    }
  };

  // Remove panchayath from form
  const handleRemovePanchayath = (panchayath) => {
    setFormData((prev) => ({
      ...prev,
      Panchayaths: prev.Panchayaths.filter((p) => p !== panchayath),
    }));
  };

  // Remove pin code from form
  const handleRemovePinCode = (pinCode) => {
    setFormData((prev) => ({
      ...prev,
      PinCodes: prev.PinCodes.filter((p) => p !== pinCode),
    }));
  };

  // Simple validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.District.trim()) newErrors.District = "District name is required";
    if (formData.Panchayaths.length === 0 && formData.PinCodes.length === 0) {
      newErrors.items = "At least one panchayath or pin code is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Send each panchayath and pin code individually as expected by the backend
      for (const panchayath of formData.Panchayaths) {
        const response = await fetch(`${API_BASE_URL}/api/admin/districts/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            District: formData.District,
            Panchayath: panchayath,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to add panchayath");
        }
      }

      for (const pinCode of formData.PinCodes) {
        const response = await fetch(`${API_BASE_URL}/api/admin/districts/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            District: formData.District,
            PinCode: pinCode,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to add pin code");
        }
      }

      alert("✅ District, panchayaths, and pin codes added successfully!");
      closeModal();
    } catch (error) {
      console.error("Error adding district:", error);
      alert("⚠️ Something went wrong while adding the district!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-md rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">Add New District</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* District Name */}
          <div>
            <label className="block text-gray-400 mb-2">District Name</label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="District"
                placeholder="Enter district name"
                value={formData.District}
                onChange={handleInputChange}
                className={`w-full bg-gray-800/50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 ${
                  errors.District ? "border-red-500" : "border-gray-700"
                }`}
              />
            </div>
            {errors.District && (
              <p className="text-red-500 text-sm mt-1">{errors.District}</p>
            )}
          </div>

          {/* Panchayaths */}
          <div>
            <label className="block text-gray-400 mb-2">Panchayaths</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPanchayath}
                  onChange={(e) => setNewPanchayath(e.target.value)}
                  placeholder="Enter panchayath name"
                  className="flex-1 bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
                />
                <button
                  type="button"
                  onClick={handleAddPanchayath}
                  className="bg-yellow-500 text-black p-3 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <FiPlus />
                </button>
              </div>
              
              {formData.Panchayaths.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.Panchayaths.map((panchayath, index) => (
                    <div key={index} className="bg-gray-700 px-3 py-2 rounded flex items-center gap-2">
                      {panchayath}
                      <button
                        type="button"
                        onClick={() => handleRemovePanchayath(panchayath)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pin Codes */}
          <div>
            <label className="block text-gray-400 mb-2">Pin Codes</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPinCode}
                  onChange={(e) => setNewPinCode(e.target.value)}
                  placeholder="Enter pin code"
                  className="flex-1 bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
                />
                <button
                  type="button"
                  onClick={handleAddPinCode}
                  className="bg-yellow-500 text-black p-3 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <FiPlus />
                </button>
              </div>
              
              {formData.PinCodes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.PinCodes.map((pinCode, index) => (
                    <div key={index} className="bg-gray-700 px-3 py-2 rounded flex items-center gap-2">
                      {pinCode}
                      <button
                        type="button"
                        onClick={() => handleRemovePinCode(pinCode)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {errors.items && (
            <p className="text-red-500 text-sm">{errors.items}</p>
          )}

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
              {isSubmitting ? "Adding..." : "Add District"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}