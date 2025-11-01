import { useState } from "react";
import { FiX, FiUpload, FiDollarSign, FiPackage, FiTag } from "react-icons/fi";

export default function AddProductModal({ closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    status: true,
    image: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Electronics",
    "Clothing",
    "Sports",
    "Accessories",
    "Home",
    "Food",
    "Books",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.price) newErrors.price = "Price is required";
    else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    if (!formData.stock) newErrors.stock = "Stock is required";
    else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = "Stock must be a non-negative number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Add Product:", formData);
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-md rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">Add New Product</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-400 mb-2">Product Name</label>
              <div className="relative">
                <FiPackage className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  }`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-400 mb-2">Category</label>
              <div className="relative">
                <FiTag className="absolute left-3 top-3 text-gray-500" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 appearance-none ${
                    errors.category ? "border-red-500" : "border-gray-700"
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-400 mb-2">Price</label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="price"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 ${
                    errors.price ? "border-red-500" : "border-gray-700"
                  }`}
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-gray-400 mb-2">Stock Quantity</label>
              <input
                type="text"
                name="stock"
                placeholder="0"
                value={formData.stock}
                onChange={handleInputChange}
                className={`w-full bg-gray-800/50 backdrop-blur-sm text-white border rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 ${
                  errors.stock ? "border-red-500" : "border-gray-700"
                }`}
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
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
                Active (product will be visible to customers)
              </label>
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-400 mb-2">Product Image</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Product preview" className="w-full h-full object-cover" />
                  ) : (
                    <FiUpload className="text-gray-500" size={24} />
                  )}
                </div>
                <label className="bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-700/50 transition-colors">
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
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800/50 backdrop-blur-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-yellow-500 text-black font-medium hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}