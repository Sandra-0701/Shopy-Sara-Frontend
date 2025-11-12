import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiImage } from "react-icons/fi";

export default function ProductTable() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    items: "",
    stock: "Full",
    categoryId: "",
    subcategoryId: "",
    description: "",
    images: [],
  });
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products, categories, and subcategories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch products
        const productsRes = await fetch(`${API_BASE_URL}/api/admin/products`);
        if (!productsRes.ok) throw new Error('Failed to fetch products');
        const productsData = await productsRes.json();
        setProducts(productsData);
        
        // Fetch categories
        const categoriesRes = await fetch(`${API_BASE_URL}/api/admin/categories`);
        if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
        
        // Fetch subcategories
        const subcategoriesRes = await fetch(`${API_BASE_URL}/api/admin/subcategories`);
        if (!subcategoriesRes.ok) throw new Error('Failed to fetch subcategories');
        const subcategoriesData = await subcategoriesRes.json();
        setSubcategories(subcategoriesData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/admin/products/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        alert("✅ " + (data.message || "Product deleted successfully!"));
      } else {
        alert("❌ " + (data.message || "Failed to delete product"));
      }
    } catch (err) {
      console.error("Error deleting:", err);
      alert("⚠️ Something went wrong while deleting the product!");
    }
  };

  // Edit mode
  const handleEdit = (product) => {
    console.log("Editing product:", product);
    setEditingId(product._id);
    setEditForm({
      name: product.name || "",
      items: product.items || "",
      stock: product.stock || "Full",
      categoryId: product.categoryId?._id || product.categoryId || "",
      subcategoryId: product.subcategoryId?._id || product.subcategoryId || "",
      description: product.description || "",
      images: product.images || [],
    });
    setNewImages([]);
    setImagePreviews([]);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      items: "",
      stock: "Full",
      categoryId: "",
      subcategoryId: "",
      description: "",
      images: [],
    });
    setNewImages([]);
    setImagePreviews([]);
  };

  // Handle image change for new images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewImages([...newImages, ...files]);

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

  // Remove new image
  const removeNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  // Update product
  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append('name', editForm.name);
      formData.append('items', editForm.items);
      formData.append('stock', editForm.stock);
      formData.append('categoryId', editForm.categoryId);
      formData.append('subcategoryId', editForm.subcategoryId);
      formData.append('description', editForm.description);
      formData.append('existingImages', JSON.stringify(editForm.images));
      
      // Add new images if any
      newImages.forEach((image) => {
        formData.append('images', image);
      });

      const res = await fetch(
        `${API_BASE_URL}/api/admin/products/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      
      const data = await res.json();
      console.log("Update response:", data);

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? data : p))
        );
        alert("✅ Product updated successfully!");
        setEditingId(null);
      } else {
        alert("❌ " + (data.message || "Failed to update product"));
      }
    } catch (err) {
      console.error("Error updating:", err);
      alert("⚠️ Something went wrong while updating the product!");
    }
  };

  const getStockColor = (stock) => {
    switch (stock) {
      case "Full":
        return "text-green-500";
      case "Average":
        return "text-yellow-500";
      case "Limited":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    if (!categoryId) return "No Category";
    const category = categories.find(c => c._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  // Get subcategory name by ID
  const getSubcategoryName = (subcategoryId) => {
    if (!subcategoryId) return "No Subcategory";
    const subcategory = subcategories.find(s => s._id === subcategoryId);
    return subcategory ? subcategory.name : "Unknown Subcategory";
  };

  // Filter subcategories based on selected category
  const getFilteredSubcategories = () => {
    if (!editForm.categoryId) return [];
    
    return subcategories.filter(sub => {
      // Handle different possible structures of the category reference
      if (typeof sub.category === 'string') {
        return sub.category === editForm.categoryId;
      } else if (sub.category && sub.category._id) {
        return sub.category._id === editForm.categoryId;
      }
      return false;
    });
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6 flex justify-center items-center">
        <div className="text-white">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6 flex justify-center items-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Product Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Name</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Items</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Category</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Subcategory</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Stock</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Images</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-800 hover:bg-gray-800">
                {/* Name */}
                <td className="py-3 px-4 text-white">
                  {editingId === product._id ? (
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-40 focus:outline-none focus:border-yellow-500"
                    />
                  ) : (
                    product.name
                  )}
                </td>

                {/* Items */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === product._id ? (
                    <input
                      type="number"
                      value={editForm.items}
                      onChange={(e) => setEditForm({ ...editForm, items: e.target.value })}
                      className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-24 focus:outline-none focus:border-yellow-500"
                    />
                  ) : (
                    product.items
                  )}
                </td>

                {/* Category */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === product._id ? (
                    <select
                      value={editForm.categoryId}
                      onChange={(e) => {
                        setEditForm({ 
                          ...editForm, 
                          categoryId: e.target.value,
                          subcategoryId: "" // Reset subcategory when category changes
                        });
                      }}
                      className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    getCategoryName(product.categoryId?._id || product.categoryId)
                  )}
                </td>

                {/* Subcategory */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === product._id ? (
                    <select
                      value={editForm.subcategoryId}
                      onChange={(e) => setEditForm({ ...editForm, subcategoryId: e.target.value })}
                      className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                      disabled={!editForm.categoryId}
                    >
                      <option value="">Select subcategory</option>
                      {getFilteredSubcategories().map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    getSubcategoryName(product.subcategoryId?._id || product.subcategoryId)
                  )}
                </td>

                {/* Stock */}
                <td className="py-3 px-4">
                  {editingId === product._id ? (
                    <select
                      value={editForm.stock}
                      onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                      className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded focus:outline-none focus:border-yellow-500"
                    >
                      <option value="Full">Full</option>
                      <option value="Average">Average</option>
                      <option value="Limited">Limited</option>
                    </select>
                  ) : (
                    <span className={`font-medium ${getStockColor(product.stock)}`}>
                      {product.stock}
                    </span>
                  )}
                </td>

                {/* Images */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === product._id ? (
                    <div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {/* Existing images */}
                        {editForm.images.map((img, i) => (
                          <img
                            key={i}
                            src={img.startsWith('http') ? img : `${API_BASE_URL}/${img}`}
                            alt="product"
                            className="w-8 h-8 rounded object-cover border border-gray-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/32x32?text=No+Image";
                            }}
                          />
                        ))}
                        {/* New image previews */}
                        {imagePreviews.map((preview, i) => (
                          <div key={i} className="relative">
                            <img
                              src={preview}
                              alt="new product"
                              className="w-8 h-8 rounded object-cover border border-gray-700"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewImage(i)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs"
                            >
                              <FiX size={8} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <label className="text-yellow-500 cursor-pointer text-xs">
                        Add Images
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    product.images && product.images.length > 0 ? (
                      <div className="flex gap-1">
                        {product.images.slice(0, 2).map((img, i) => (
                          <img
                            key={i}
                            src={img.startsWith('http') ? img : `${API_BASE_URL}/${img}`}
                            alt="product"
                            className="w-8 h-8 rounded object-cover border border-gray-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/32x32?text=No+Image";
                            }}
                          />
                        ))}
                        {product.images.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{product.images.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <FiImage className="text-gray-600" />
                    )
                  )}
                </td>

                {/* Actions */}
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {editingId === product._id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(product._id)}
                          className="p-1 text-green-500 hover:text-green-400"
                        >
                          <FiCheck />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <FiX />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1 text-gray-400 hover:text-yellow-500"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}