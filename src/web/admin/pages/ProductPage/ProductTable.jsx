import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiImage } from "react-icons/fi";

export default function ProductTable() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    desc: "",
    unit: "",
    brand: "",
    barcode: "",
    stock: "Full",
    images: [],
  });

  // Fetch products
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/admin/products/delete/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        alert("✅ Product deleted successfully!");
      } else {
        alert("❌ Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // Edit mode
  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name || "",
      desc: product.desc || "",
      unit: product.unit || "",
      brand: product.brand || "",
      barcode: product.barcode || "",
      stock: product.stock || "Full",
      images: product.images || [],
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      desc: "",
      unit: "",
      brand: "",
      barcode: "",
      stock: "Full",
      images: [],
    });
  };

  // Update product
  const handleUpdate = async (id) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/admin/products/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, ...editForm } : p))
        );
        alert("✅ Product updated successfully!");
        setEditingId(null);
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Error updating:", err);
      alert("⚠️ Something went wrong!");
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

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Product Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Name</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Description</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Unit</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Brand</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Barcode</th>
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

                {/* Description */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === product._id ? (
                    <textarea
                      value={editForm.desc}
                      onChange={(e) =>
                        setEditForm({ ...editForm, desc: e.target.value })
                      }
                      className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-48 focus:outline-none focus:border-yellow-500"
                      rows="2"
                    />
                  ) : (
                    product.desc || "-"
                  )}
                </td>

                {/* Unit */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === product._id ? (
                    <input
                      value={editForm.unit}
                      onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                      className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-24 focus:outline-none focus:border-yellow-500"
                    />
                  ) : (
                    product.unit || "-"
                  )}
                </td>

                {/* Brand */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === product._id ? (
                    <input
                      value={editForm.brand}
                      onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                      className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                    />
                  ) : (
                    product.brand || "-"
                  )}
                </td>

                {/* Barcode */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === product._id ? (
                    <input
                      type="text"
                      value={editForm.barcode}
                      onChange={(e) => setEditForm({ ...editForm, barcode: e.target.value })}
                      className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-28 focus:outline-none focus:border-yellow-500"
                    />
                  ) : (
                    product.barcode
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
                  {product.images && product.images.length > 0 ? (
                    <div className="flex gap-1">
                      {product.images.slice(0, 2).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="product"
                          className="w-8 h-8 rounded object-cover border border-gray-700"
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
