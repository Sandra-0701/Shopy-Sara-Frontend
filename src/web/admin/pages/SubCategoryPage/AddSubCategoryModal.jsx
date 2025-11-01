import { useState } from "react";
import { FiX, FiUpload, FiTag } from "react-icons/fi";

export default function AddSubCategoryModal({ closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: true,
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field-specific errors while typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "SubCategory name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Add Sub Category:", formData);
      closeModal();
    } catch (error) {
      console.error("Error adding Sub category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-md rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">Add New Sub Category</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Sub Category Name */}
          <div>
            <label className="block text-gray-400 mb-2">Sub Category Name</label>
            <div className="relative">
              <FiTag className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Enter Sub category name"
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

          {/* Description */}
          <div>
            <label className="block text-gray-400 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter Sub category description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className={`w-full bg-gray-800/50 text-white border rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 resize-none ${
                errors.description ? "border-red-500" : "border-gray-700"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="status"
              id="status"
              checked={formData.status}
              onChange={handleInputChange}
              className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
            />
            <label htmlFor="status" className="ml-2 text-gray-400">
              Active (sub category will be visible)
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-400 mb-2">Sub Category Image</label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Sub Category preview"
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
              {isSubmitting ? "Adding..." : "Add Sub Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
