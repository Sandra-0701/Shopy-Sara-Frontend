import { useState, useEffect } from "react";
import { FiX, FiUpload, FiPackage, FiTag, FiPlus } from "react-icons/fi";

export default function AddProductModal({ closeModal }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    subcategoryId: "",
    items: "",
    stock: "Full",
    description: "",
    images: []
  });
  
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [API_BASE_URL]);

  // Fetch subcategories when categoryId changes
  useEffect(() => {
    if (!formData.categoryId) {
      setSubcategories([]);
      return;
    }

    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/subcategories/${formData.categoryId}/subcategories`);
        const data = await response.json();
        setSubcategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [formData.categoryId, API_BASE_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...files]
      }));

      // Create previews for all new images
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.categoryId) newErrors.categoryId = "Please select a category";
    if (!formData.subcategoryId) newErrors.subcategoryId = "Please select a subcategory";
    if (!formData.items) newErrors.items = "Items quantity is required";
    else if (isNaN(formData.items) || parseInt(formData.items) <= 0) {
      newErrors.items = "Items must be a positive number";
    }
    if (!formData.stock) newErrors.stock = "Stock level is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("subcategoryId", formData.subcategoryId);
      formDataToSend.append("items", formData.items);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("description", formData.description);
      
      // Append all images
      formData.images.forEach((image, index) => {
        formDataToSend.append(`images`, image);
      });

      const response = await fetch(`${API_BASE_URL}/api/admin/products/add`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Product added successfully!");
        closeModal();
      } else {
        alert("❌ Error: " + (data.message || "Failed to add product"));
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("⚠️ Something went wrong while adding the product!");
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
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 appearance-none ${
                    errors.categoryId ? "border-red-500" : "border-gray-700"
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-gray-400 mb-2">Subcategory</label>
              <div className="relative">
                <FiTag className="absolute left-3 top-3 text-gray-500" />
                <select
                  name="subcategoryId"
                  value={formData.subcategoryId}
                  onChange={handleInputChange}
                  disabled={!formData.categoryId}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 appearance-none ${
                    errors.subcategoryId ? "border-red-500" : "border-gray-700"
                  } ${!formData.categoryId ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <option value="">Select subcategory</option>
                  {subcategories.map(sub => (
                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                  ))}
                </select>
              </div>
              {errors.subcategoryId && <p className="text-red-500 text-sm mt-1">{errors.subcategoryId}</p>}
            </div>

            {/* Items */}
            <div>
              <label className="block text-gray-400 mb-2">Number of Items</label>
              <input
                type="text"
                name="items"
                placeholder="0"
                value={formData.items}
                onChange={handleInputChange}
                className={`w-full bg-gray-800/50 backdrop-blur-sm text-white border rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 ${
                  errors.items ? "border-red-500" : "border-gray-700"
                }`}
              />
              {errors.items && <p className="text-red-500 text-sm mt-1">{errors.items}</p>}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-gray-400 mb-2">Stock Level</label>
              <select
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className={`w-full bg-gray-800/50 backdrop-blur-sm text-white border rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 ${
                  errors.stock ? "border-red-500" : "border-gray-700"
                }`}
              >
                <option value="Full">Full</option>
                <option value="Average">Average</option>
                <option value="Limited">Limited</option>
              </select>
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
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
              <label className="block text-gray-400 mb-2">Product Images</label>
              <div className="flex flex-wrap gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={preview} 
                      alt={`Product preview ${index + 1}`} 
                      className="w-24 h-24 object-cover rounded-lg border border-gray-700" 
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
                <label className="w-24 h-24 bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-700/50 transition-colors">
                  <FiPlus className="text-gray-500" size={24} />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-gray-500 text-sm">Click the plus icon to add images</p>
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