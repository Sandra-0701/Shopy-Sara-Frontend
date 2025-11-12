import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

export default function SubCategoryTable() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", category: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch subcategories and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch subcategories
        const subRes = await fetch(`${API_BASE_URL}/api/admin/subcategories`);
        const subData = await subRes.json();
        setSubcategories(subData);

        // Fetch categories for the dropdown
        const catRes = await fetch(`${API_BASE_URL}/api/admin/categories`);
        const catData = await catRes.json();
        setCategories(catData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // DELETE subcategory
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/subcategories/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSubcategories(subcategories.filter((s) => s._id !== id));
        alert("✅ Subcategory deleted successfully!");
      } else {
        alert("❌ Failed to delete subcategory");
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // Enable edit mode
  const handleEdit = (subcategory) => {
    setEditingId(subcategory._id);
    setEditForm({ 
      name: subcategory.name, 
      category: subcategory.category?._id || subcategory.category, // Safely get ID
      image: null 
    });
    setImagePreview(subcategory.imageUrl ? `${API_BASE_URL}${subcategory.imageUrl}` : null);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", category: "", image: null });
    setImagePreview(null);
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm({ ...editForm, image: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle submit (PUT API)
  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("category", editForm.category);
    if (editForm.image) formData.append("image", editForm.image);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/subcategories/update/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok) {
        setSubcategories((prev) =>
          prev.map((sub) =>
            sub._id === id
              ? { 
                  ...sub, 
                  name: editForm.name, 
                  category: editForm.category,
                  imageUrl: data.imageUrl || sub.imageUrl 
                }
              : sub
          )
        );
        alert("✅ Subcategory updated successfully!");
        setEditingId(null);
        setImagePreview(null);
      } else {
        alert("❌ " + (data.message || "Failed to update subcategory"));
      }
    } catch (err) {
      console.error("Error updating subcategory:", err);
      alert("⚠️ Something went wrong!");
    }
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    if (!categoryId) return "No Category"; // Handle null/undefined ID
    const category = categories.find(c => c._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  if (isLoading) {
    return <div className="text-white p-6">Loading subcategories...</div>;
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Subcategory Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Image</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Name</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Category</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.length > 0 ? (
              subcategories.map((sub) => (
                <tr key={sub._id} className="border-b border-gray-800 hover:bg-gray-800">
                  {/* Image column */}
                  <td className="py-3 px-4 text-gray-300">
                    {editingId === sub._id ? (
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-gray-800 rounded-md overflow-hidden border border-gray-700 flex items-center justify-center">
                          {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-gray-500 text-xs">No image</span>
                          )}
                        </div>
                        <label className="text-yellow-500 cursor-pointer text-sm">
                          Change
                          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                      </div>
                    ) : (
                      <img
                        src={`${API_BASE_URL}${sub.imageUrl}`}
                        alt={sub.name}
                        className="w-12 h-12 object-cover rounded-md border border-gray-700"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/48x48?text=No+Image";
                        }}
                      />
                    )}
                  </td>
                  {/* Name column */}
                  <td className="py-3 px-4 text-white">
                    {editingId === sub._id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-48 focus:outline-none focus:border-yellow-500"
                      />
                    ) : (
                      sub.name
                    )}
                  </td>
                  {/* Category column */}
                  <td className="py-3 px-4 text-white">
                    {editingId === sub._id ? (
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-48 focus:outline-none focus:border-yellow-500"
                      >
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      // ✅ FIXED: Check if sub.category is a truthy object before accessing .name
                      sub.category && typeof sub.category === 'object' && sub.category.name
                        ? sub.category.name
                        : getCategoryName(sub.category)
                    )}
                  </td>
                  {/* Actions column */}
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {editingId === sub._id ? (
                        <>
                          <button onClick={() => handleUpdate(sub._id)} className="p-1 text-green-500 hover:text-green-400" title="Save"><FiCheck /></button>
                          <button onClick={handleCancelEdit} className="p-1 text-gray-400 hover:text-red-500" title="Cancel"><FiX /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(sub)} className="p-1 text-gray-400 hover:text-yellow-500" title="Edit"><FiEdit2 /></button>
                          <button onClick={() => handleDelete(sub._id)} className="p-1 text-gray-400 hover:text-red-500" title="Delete"><FiTrash2 /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">
                  No subcategories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}