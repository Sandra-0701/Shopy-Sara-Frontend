// src/pages/ProductPage.jsx
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AddProductModal from "./AddProductModal";
import ProductTable from "./ProductTable";

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-2 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Products</h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
        >
          <FiPlus size={18} />
          Add Product
        </button>
      </div>

      {/* Product Table */}
      <ProductTable />

      <button
        onClick={openModal}
        className="fixed bottom-8 right-8 w-14 h-14 bg-yellow-500 text-black rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-400 transition-all duration-200 transform hover:scale-110 hover:shadow-yellow-500/25 z-40 md:hidden"
        aria-label="Add Product"
      >
        <FiPlus size={24} />
      </button>

      {isModalOpen && <AddProductModal closeModal={closeModal} />}
    </div>
  );
}