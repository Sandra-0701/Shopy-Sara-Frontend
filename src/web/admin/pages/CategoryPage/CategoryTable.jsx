import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
export default function CategoryTable() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", imageUrl: null });
  // Fetch categories from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);
  // DELETE category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/categories/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories(categories.filter((c) => c._id !== id));
        alert("✅ Category deleted successfully!");
      } else {
        alert("❌ Failed to delete category");
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };
  // ✅ Enable edit mode
  const handleEdit = (category) => {
    setEditingId(category._id);
    setEditForm({ name: category.name, imageUrl: null });
  };
  // ❌ Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", imageUrl: null });
  };
  // ✅ Handle submit (PUT API)
  const handleUpdate = async (id) => {
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
              ? { ...cat, name: editForm.name, imageUrl: editForm.imageUrl ? URL.createObjectURL(editForm.imageUrl) : cat.imageUrl }
              : cat
          )
        );
        alert("✅ Category updated successfully!");
        setEditingId(null);
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Error updating category:", err);
      alert("⚠️ Something went wrong!");
    }
  };
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Category Table</h2>
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
                {/* 🖼 Image column */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === cat._id ? (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.files[0] })}
                      className="text-gray-300 text-sm"
                    />
                  ) : (
                    <img
                      src={`${API_BASE_URL}${cat.imageUrl}`}
                      alt={cat.name}
                      className="w-12 h-12 object-cover rounded-md border border-gray-700"
                    />
                  )}
                </td>
                {/* ✏️ Name column */}
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
                {/* ⚙️ Actions column */}
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {editingId === cat._id ? (
                      <>
                        {/* ✅ Save */}
                        <button
                          onClick={() => handleUpdate(cat._id)}
                          className="p-1 text-green-500 hover:text-green-400 transition-colors"
                          title="Save"
                        >
                          <FiCheck />
                        </button>
                        {/* ❌ Cancel */}
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
                        {/* 🖋 Edit */}
                        <button
                          onClick={() => handleEdit(cat)}
                          className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        {/* 🗑 Delete */}
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
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