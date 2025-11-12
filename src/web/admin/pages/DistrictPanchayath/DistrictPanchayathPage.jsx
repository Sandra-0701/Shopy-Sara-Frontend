import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AddDistrictPanchayathModal from "./AddDistrictPanchayathModal";
import DistrictPanchayathTable from "./DistrictPanchayathTable";

export default function DistrictPanchayathPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-2 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Districts & Panchayaths</h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
        >
          <FiPlus size={18} />
          Add District
        </button>
      </div>

      {/* District Panchayath Table */}
      <DistrictPanchayathTable />

      {/* Floating Action Button (for mobile) */}
      <button
        onClick={openModal}
        className="fixed bottom-8 right-8 w-14 h-14 bg-yellow-500 text-black rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-400 transition-all duration-200 transform hover:scale-110 hover:shadow-yellow-500/25 z-40 md:hidden"
        aria-label="Add District"
      >
        <FiPlus size={24} />
      </button>

      {/* Add District Panchayath Modal */}
      {isModalOpen && <AddDistrictPanchayathModal closeModal={closeModal} />}
    </div>
  );
}