import { useState } from "react";
import { FiX, FiUpload, FiTag } from "react-icons/fi";

export default function AddCategoryModal({ closeModal }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: true,
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // ✅ Handle input fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Simple validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Category name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare form data
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("status", formData.status ? 1 : 0);
      if (formData.image) formDataToSend.append("image", formData.image);

      console.log("📤 Sending:", Object.fromEntries(formDataToSend));

      const response = await fetch(
  `${API_BASE_URL}/api/admin/categories/add`,
  {
    method: "POST",
    body: formDataToSend,
  }
);

      const data = await response.json();
      

      if (response.ok) {
        alert("✅ Category added successfully!");
        closeModal();
      } else {
        alert("❌ Error: " + (data.message || "Failed to add category"));
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("⚠️ Something went wrong while adding the category!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-md rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">Add New Category</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category Name */}
          <div>
            <label className="block text-gray-400 mb-2">Category Name</label>
            <div className="relative">
              <FiTag className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Enter category name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full bg-gray-800/50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 ${
                  errors.name ? "border-red-500" : "border-gray-700"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-400 mb-2">Category Image</label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUpload className="text-gray-500" size={24} />
                )}
              </div>
              <label className="bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-700/50 transition-colors">
                <span>Choose Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
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
              {isSubmitting ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}