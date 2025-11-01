import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function ProductTable() {
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: "Premium Wireless Headphones", 
      category: "Electronics", 
      price: "₹129.99", 
      stock: 45,
      status: true, 
      image: "https://picsum.photos/seed/headphones/50/50.jpg"
    },
    { 
      id: 2, 
      name: "Organic Cotton T-Shirt", 
      category: "Clothing", 
      price: "₹24.99", 
      stock: 120,
      status: true,
      image: "https://picsum.photos/seed/tshirt/50/50.jpg"
    },
    { 
      id: 3, 
      name: "Stainless Steel Water Bottle", 
      category: "Sports", 
      price: "₹19.99", 
      stock: 0,
      status: false,
      image: "https://picsum.photos/seed/bottle/50/50.jpg"
    },
    { 
      id: 4, 
      name: "Leather Wallet", 
      category: "Accessories", 
      price: "₹39.99", 
      stock: 67,
      status: true,
      image: "https://picsum.photos/seed/wallet/50/50.jpg"
    },
    { 
      id: 5, 
      name: "Bluetooth Speaker", 
      category: "Electronics", 
      price: "₹59.99", 
      stock: 23,
      status: true,
      image: "https://picsum.photos/seed/speaker/50/50.jpg"
    },
    { 
      id: 6, 
      name: "Yoga Mat", 
      category: "Sports", 
      price: "₹29.99", 
      stock: 15,
      status: true,
      image: "https://picsum.photos/seed/yogamat/50/50.jpg"
    },
    { 
      id: 7, 
      name: "Coffee Maker", 
      category: "Home", 
      price: "₹89.99", 
      stock: 8,
      status: true,
      image: "https://picsum.photos/seed/coffee/50/50.jpg"
    },
    { 
      id: 8, 
      name: "Running Shoes", 
      category: "Sports", 
      price: "₹79.99", 
      stock: 34,
      status: false,
      image: "https://picsum.photos/seed/shoes/50/50.jpg"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleStatus = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, status: !product.status } : product
    ));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-white">Products</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:border-yellow-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button className="bg-gray-800 text-white p-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
            <FiFilter />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-3 px-4 text-left">
                <div className="flex items-center gap-1 text-gray-400 font-medium">
                  Product
                </div>
              </th>
              <th className="py-3 px-4 text-left">
                <button 
                  className="flex items-center gap-1 text-gray-400 font-medium hover:text-white transition-colors"
                  onClick={() => handleSort("category")}
                >
                  Category
                  {sortField === "category" && (
                    sortDirection === "asc" ? <FiChevronUp /> : <FiChevronDown />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button 
                  className="flex items-center gap-1 text-gray-400 font-medium hover:text-white transition-colors"
                  onClick={() => handleSort("price")}
                >
                  Price
                  {sortField === "price" && (
                    sortDirection === "asc" ? <FiChevronUp /> : <FiChevronDown />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button 
                  className="flex items-center gap-1 text-gray-400 font-medium hover:text-white transition-colors"
                  onClick={() => handleSort("stock")}
                >
                  Stock
                  {sortField === "stock" && (
                    sortDirection === "asc" ? <FiChevronUp /> : <FiChevronDown />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <div className="flex items-center gap-1 text-gray-400 font-medium">
                  Status
                </div>
              </th>
              <th className="py-3 px-4 text-left">
                <div className="flex items-center gap-1 text-gray-400 font-medium">
                  Actions
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span className="text-white">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-300">{product.category}</td>
                <td className="py-3 px-4 text-white font-medium">{product.price}</td>
                <td className="py-3 px-4 text-gray-300">{product.stock}</td>
                <td className="py-3 px-4">
                  {/* Toggle Button for Status */}
                  <button
                    onClick={() => toggleStatus(product.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      product.status ? "bg-green-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        product.status ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="p-1 text-gray-400 hover:text-yellow-500 transition-colors" title="Edit">
                      <FiEdit2 />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-gray-400 text-sm">
          Showing {paginatedProducts.length} of {sortedProducts.length} products
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${currentPage === 1 
              ? "bg-gray-800 text-gray-600 cursor-not-allowed" 
              : "bg-gray-800 text-white hover:bg-gray-700 transition-colors"}`}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${currentPage === i + 1 
                ? "bg-yellow-500 text-black" 
                : "bg-gray-800 text-white hover:bg-gray-700 transition-colors"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 rounded ${currentPage === totalPages 
              ? "bg-gray-800 text-gray-600 cursor-not-allowed" 
              : "bg-gray-800 text-white hover:bg-gray-700 transition-colors"}`}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}