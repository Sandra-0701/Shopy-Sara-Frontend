import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

export default function CategoryTable() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", imageUrl: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      }
    };
    
    fetchCategories();
  }, [API_BASE_URL]);

// DELETE category
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this category?")) return;
  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/categories/delete/${id}`, {
      method: "DELETE",
    });

    // ✅ ALWAYS parse the JSON response to get the server's message
    const data = await res.json();

    if (res.ok) {
      // If successful, update the UI and show the success message
      setCategories(categories.filter((c) => c._id !== id));
      alert("✅ " + (data.message || "Category deleted successfully!"));
    } else {
      // ✅ If not successful, show the SPECIFIC error from the server
      alert("❌ " + (data.message || data.error || "Failed to delete category"));
    }
  } catch (err) {
    // This catches network errors (like CORS issues or the server being down)
    console.error("Network or fetch error:", err);
    alert("⚠️ A network error occurred. Could not delete the category.");
  }
};

  // Enable edit mode
  const handleEdit = (category) => {
    setEditingId(category._id);
    setEditForm({ name: category.name, imageUrl: null });
    setImagePreview(null);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", imageUrl: null });
    setImagePreview(null);
  };

  // Handle image change for preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm({ ...editForm, imageUrl: file });
      
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle submit (PUT API)
  const handleUpdate = async (id) => {
    if (!editForm.name.trim()) {
      alert("Category name is required");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("name", editForm.name);
    if (editForm.imageUrl) formData.append("image", editForm.imageUrl);
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/categories/update/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === id
              ? { ...cat, name: editForm.name, imageUrl: data.imageUrl || cat.imageUrl }
              : cat
          )
        );
        alert("✅ Category updated successfully!");
        setEditingId(null);
        setImagePreview(null);
      } else {
        setError(data.message || "Failed to update category");
        alert("❌ " + (data.message || "Failed to update category"));
      }
    } catch (err) {
      console.error("Error updating category:", err);
      setError("Network error while updating category");
      alert("⚠️ Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Category Table</h2>
      
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Image</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Name</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-b border-gray-800 hover:bg-gray-800">
                {/* Image column */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === cat._id ? (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-gray-300 text-sm"
                      />
                      {imagePreview && (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-12 h-12 object-cover rounded-md border border-gray-700 mt-2"
                        />
                      )}
                    </div>
                  ) : (
                    <img
                      src={`${API_BASE_URL}${cat.imageUrl}`}
                      alt={cat.name}
                      className="w-12 h-12 object-cover rounded-md border border-gray-700"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/48?text=No+Image";
                      }}
                    />
                  )}
                </td>
                
                {/* Name column */}
                <td className="py-3 px-4 text-white">
                  {editingId === cat._id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-48 focus:outline-none focus:border-yellow-500"
                    />
                  ) : (
                    cat.name
                  )}
                </td>
                
                {/* Actions column */}
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {editingId === cat._id ? (
                      <>
                        {/* Save */}
                        <button
                          onClick={() => handleUpdate(cat._id)}
                          disabled={isLoading}
                          className="p-1 text-green-500 hover:text-green-400 transition-colors disabled:opacity-50"
                          title="Save"
                        >
                          {isLoading ? "..." : <FiCheck />}
                        </button>
                        {/* Cancel */}
                        <button
                          onClick={handleCancelEdit}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Cancel"
                        >
                          <FiX />
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Edit */}
                        <button
                          onClick={() => handleEdit(cat)}
                          className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(cat._id)}
                          disabled={isLoading}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {isLoading ? "..." : <FiTrash2 />}
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            
            {/* Empty state */}
            {categories.length === 0 && !error && (
              <tr>
                <td colSpan="3" className="py-8 text-center text-gray-500">
                  No categories found. Add your first category to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}