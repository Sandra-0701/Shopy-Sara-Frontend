import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";

export default function DistrictPanchayathTable() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [districts, setDistricts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ District: "", Panchayaths: [], PinCodes: [] });
  const [newPanchayath, setNewPanchayath] = useState("");
  const [newPinCode, setNewPinCode] = useState("");
  const [showAddPanchayath, setShowAddPanchayath] = useState(false);
  const [showAddPinCode, setShowAddPinCode] = useState(false);

  // Fetch districts from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/districts/list`)
      .then((res) => res.json())
      .then((data) => setDistricts(data || [])) // Ensure data is an array
      .catch((err) => console.error("Error fetching districts:", err));
  }, []);

  // DELETE district, panchayath, or pin code
  const handleDelete = async (districtId, itemType, itemName = null) => {
    let confirmMessage = "";
    let url = "";
    
    if (itemType === "district") {
      confirmMessage = "Are you sure you want to delete this district and all its data?";
      url = `${API_BASE_URL}/api/admin/districts/delete/${districtId}`;
    } else if (itemType === "panchayath") {
      confirmMessage = `Are you sure you want to delete "${itemName}" panchayath?`;
      url = `${API_BASE_URL}/api/admin/districts/delete/${districtId}/${itemName}`;
    } else if (itemType === "pincode") {
      confirmMessage = `Are you sure you want to delete "${itemName}" pin code?`;
      url = `${API_BASE_URL}/api/admin/districts/delete/${districtId}/pincode/${itemName}`;
    }
    
    if (!window.confirm(confirmMessage)) return;
    
    try {
      const res = await fetch(url, {
        method: "DELETE",
      });
      
      if (res.ok) {
        if (itemType === "district") {
          // Remove the entire district
          setDistricts(districts.filter((d) => d._id !== districtId));
          alert("✅ District deleted successfully!");
        } else if (itemType === "panchayath") {
          // Remove only the panchayath
          setDistricts(prev => 
            prev.map(district => 
              district._id === districtId 
                ? { ...district, Panchayaths: (district.Panchayaths || []).filter(p => p !== itemName) }
                : district
            )
          );
          alert("✅ Panchayath deleted successfully!");
        } else if (itemType === "pincode") {
          // Remove only the pin code
          setDistricts(prev => 
            prev.map(district => 
              district._id === districtId 
                ? { ...district, PinCodes: (district.PinCodes || []).filter(p => p !== itemName) }
                : district
            )
          );
          alert("✅ Pin code deleted successfully!");
        }
      } else {
        alert("❌ Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // Enable edit mode
  const handleEdit = (district) => {
    setEditingId(district._id);
    setEditForm({ 
      District: district.District, 
      Panchayaths: [...(district.Panchayaths || [])],
      PinCodes: [...(district.PinCodes || [])]
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ District: "", Panchayaths: [], PinCodes: [] });
    setNewPanchayath("");
    setNewPinCode("");
    setShowAddPanchayath(false);
    setShowAddPinCode(false);
  };

  // Add panchayath to edit form
  const handleAddPanchayath = () => {
    if (newPanchayath.trim() && !editForm.Panchayaths.includes(newPanchayath.trim())) {
      setEditForm({
        ...editForm,
        Panchayaths: [...editForm.Panchayaths, newPanchayath.trim()]
      });
      setNewPanchayath("");
    }
  };

  // Add pin code to edit form
  const handleAddPinCode = () => {
    if (newPinCode.trim() && !editForm.PinCodes.includes(newPinCode.trim())) {
      setEditForm({
        ...editForm,
        PinCodes: [...editForm.PinCodes, newPinCode.trim()]
      });
      setNewPinCode("");
    }
  };

  // Remove panchayath from edit form
  const handleRemovePanchayath = (panchayath) => {
    setEditForm({
      ...editForm,
      Panchayaths: editForm.Panchayaths.filter(p => p !== panchayath)
    });
  };

  // Remove pin code from edit form
  const handleRemovePinCode = (pinCode) => {
    setEditForm({
      ...editForm,
      PinCodes: editForm.PinCodes.filter(p => p !== pinCode)
    });
  };

  // Handle submit (PUT API)
  const handleUpdate = async (id) => {
    try {
      // Get the original district to compare
      const originalDistrict = districts.find(d => d._id === id);
      
      // Find panchayaths to add (in editForm but not in original)
      const panchayathsToAdd = editForm.Panchayaths.filter(
        p => !originalDistrict.Panchayaths.includes(p)
      );
      
      // Find panchayaths to remove (in original but not in editForm)
      const panchayathsToRemove = originalDistrict.Panchayaths.filter(
        p => !editForm.Panchayaths.includes(p)
      );
      
      // Find pin codes to add (in editForm but not in original)
      const pinCodesToAdd = editForm.PinCodes.filter(
        p => !originalDistrict.PinCodes.includes(p)
      );
      
      // Find pin codes to remove (in original but not in editForm)
      const pinCodesToRemove = originalDistrict.PinCodes.filter(
        p => !editForm.PinCodes.includes(p)
      );
      
      // Add new panchayaths
      for (const panchayath of panchayathsToAdd) {
        await fetch(`${API_BASE_URL}/api/admin/districts/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            District: editForm.District,
            Panchayath: panchayath,
          }),
        });
      }
      
      // Add new pin codes
      for (const pinCode of pinCodesToAdd) {
        await fetch(`${API_BASE_URL}/api/admin/districts/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            District: editForm.District,
            PinCode: pinCode,
          }),
        });
      }
      
      // Remove panchayaths
      for (const panchayath of panchayathsToRemove) {
        await fetch(`${API_BASE_URL}/api/admin/districts/delete/${id}/${panchayath}`, {
          method: "DELETE",
        });
      }
      
      // Remove pin codes
      for (const pinCode of pinCodesToRemove) {
        await fetch(`${API_BASE_URL}/api/admin/districts/delete/${id}/pincode/${pinCode}`, {
          method: "DELETE",
        });
      }
      
      // Update the district name if it changed
      if (originalDistrict.District !== editForm.District) {
        // This would require a new endpoint to update the district name
        // For now, we'll just update the local state
        setDistricts((prev) =>
          prev.map((district) =>
            district._id === id ? { ...district, District: editForm.District, Panchayaths: editForm.Panchayaths, PinCodes: editForm.PinCodes } : district
          )
        );
      } else {
        // Just update the panchayaths and pin codes in local state
        setDistricts((prev) =>
          prev.map((district) =>
            district._id === id ? { ...district, Panchayaths: editForm.Panchayaths, PinCodes: editForm.PinCodes } : district
          )
        );
      }
      
      alert("✅ District updated successfully!");
      setEditingId(null);
    } catch (err) {
      console.error("Error updating district:", err);
      alert("⚠️ Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
      <h2 className="text-xl font-semibold text-white mb-6">District, Panchayath & Pin Code Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-3 px-4 text-left text-gray-400 font-medium">District Name</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Panchayaths</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Pin Codes</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {districts.map((district) => (
              <tr key={district._id} className="border-b border-gray-800 hover:bg-gray-800">
                {/* District Name column */}
                <td className="py-3 px-4 text-white">
                  {editingId === district._id ? (
                    <input
                      type="text"
                      value={editForm.District}
                      onChange={(e) => setEditForm({ ...editForm, District: e.target.value })}
                      className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-48 focus:outline-none focus:border-yellow-500"
                    />
                  ) : (
                    district.District
                  )}
                </td>
                
                {/* Panchayaths column */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === district._id ? (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {editForm.Panchayaths.map((panchayath, index) => (
                          <div key={index} className="bg-gray-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                            {panchayath}
                            <button
                              type="button"
                              onClick={() => handleRemovePanchayath(panchayath)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <FiX size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      {showAddPanchayath ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newPanchayath}
                            onChange={(e) => setNewPanchayath(e.target.value)}
                            placeholder="Enter panchayath name"
                            className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded text-sm flex-1 focus:outline-none focus:border-yellow-500"
                          />
                          <button
                            type="button"
                            onClick={handleAddPanchayath}
                            className="text-green-500 hover:text-green-400"
                          >
                            <FiCheck />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddPanchayath(false);
                              setNewPanchayath("");
                            }}
                            className="text-red-500 hover:text-red-400"
                          >
                            <FiX />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowAddPanchayath(true)}
                          className="flex items-center gap-1 text-yellow-500 hover:text-yellow-400 text-sm"
                        >
                          <FiPlus size={14} /> Add Panchayath
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {(district.Panchayaths || []).map((panchayath, index) => (
                        <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm">
                          {panchayath}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                
                {/* Pin Codes column */}
                <td className="py-3 px-4 text-gray-300">
                  {editingId === district._id ? (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {editForm.PinCodes.map((pinCode, index) => (
                          <div key={index} className="bg-gray-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                            {pinCode}
                            <button
                              type="button"
                              onClick={() => handleRemovePinCode(pinCode)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <FiX size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      {showAddPinCode ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newPinCode}
                            onChange={(e) => setNewPinCode(e.target.value)}
                            placeholder="Enter pin code"
                            className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded text-sm flex-1 focus:outline-none focus:border-yellow-500"
                          />
                          <button
                            type="button"
                            onClick={handleAddPinCode}
                            className="text-green-500 hover:text-green-400"
                          >
                            <FiCheck />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddPinCode(false);
                              setNewPinCode("");
                            }}
                            className="text-red-500 hover:text-red-400"
                          >
                            <FiX />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowAddPinCode(true)}
                          className="flex items-center gap-1 text-yellow-500 hover:text-yellow-400 text-sm"
                        >
                          <FiPlus size={14} /> Add Pin Code
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {(district.PinCodes || []).map((pinCode, index) => (
                        <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm">
                          {pinCode}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                
                {/* Actions column */}
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {editingId === district._id ? (
                      <>
                        {/* Save */}
                        <button
                          onClick={() => handleUpdate(district._id)}
                          className="p-1 text-green-500 hover:text-green-400 transition-colors"
                          title="Save"
                        >
                          <FiCheck />
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
                          onClick={() => handleEdit(district)}
                          className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(district._id, "district")}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete District"
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