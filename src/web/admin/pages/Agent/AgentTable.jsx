import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiPlus, FiUser, FiPhone, FiMapPin, FiTruck, FiShoppingBag } from "react-icons/fi";

// AddAgentModal Component
function AddAgentModal({ closeModal, onAgentAdded }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    pincode: "",
    place: "",
    panchayath: "",
    vehicle: "",
    vehicle_name: "",
    vehicle_Number: "",
    license_Number: "",
    Aadhar_number: "",
    shopName: "",
    shopAddress: "",
    shopPincode: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Simple validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.place.trim()) newErrors.place = "District is required";
    if (!formData.panchayath.trim()) newErrors.panchayath = "Panchayath is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/agent/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Agent added successfully!");
        onAgentAdded(); // Refresh the agent list
        closeModal();
      } else {
        alert("❌ Error: " + (data.message || "Failed to add agent"));
      }
    } catch (error) {
      console.error("Error adding agent:", error);
      alert("⚠️ Something went wrong while adding the agent!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-md rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">Add New Agent</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Account Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Account Information</h4>
            
            {/* Username */}
            <div>
              <label className="block text-gray-400 mb-2">Username</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 ${
                    errors.username ? "border-red-500" : "border-gray-700"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full bg-gray-800/50 text-white border rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 ${
                  errors.password ? "border-red-500" : "border-gray-700"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-400 mb-2">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Location Information</h4>
            
            {/* District */}
            <div>
              <label className="block text-gray-400 mb-2">District</label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="place"
                  placeholder="Enter district"
                  value={formData.place}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 text-white border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 ${
                    errors.place ? "border-red-500" : "border-gray-700"
                  }`}
                />
              </div>
              {errors.place && (
                <p className="text-red-500 text-sm mt-1">{errors.place}</p>
              )}
            </div>

            {/* Panchayath */}
            <div>
              <label className="block text-gray-400 mb-2">Panchayath</label>
              <input
                type="text"
                name="panchayath"
                placeholder="Enter panchayath"
                value={formData.panchayath}
                onChange={handleInputChange}
                className={`w-full bg-gray-800/50 text-white border rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 ${
                  errors.panchayath ? "border-red-500" : "border-gray-700"
                }`}
              />
              {errors.panchayath && (
                <p className="text-red-500 text-sm mt-1">{errors.panchayath}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-gray-400 mb-2">Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Vehicle Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Vehicle Type */}
              <div>
                <label className="block text-gray-400 mb-2">Vehicle Type</label>
                <div className="relative">
                  <FiTruck className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="text"
                    name="vehicle"
                    placeholder="Vehicle type"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              {/* Vehicle Name */}
              <div>
                <label className="block text-gray-400 mb-2">Vehicle Name</label>
                <input
                  type="text"
                  name="vehicle_name"
                  placeholder="Vehicle name"
                  value={formData.vehicle_name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
                />
              </div>

              {/* Vehicle Number */}
              <div>
                <label className="block text-gray-400 mb-2">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicle_Number"
                  placeholder="Vehicle number"
                  value={formData.vehicle_Number}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            {/* License Number */}
            <div>
              <label className="block text-gray-400 mb-2">License Number</label>
              <input
                type="text"
                name="license_Number"
                placeholder="Enter license number"
                value={formData.license_Number}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Aadhar Number */}
            <div>
              <label className="block text-gray-400 mb-2">Aadhar Number</label>
              <input
                type="text"
                name="Aadhar_number"
                placeholder="Enter Aadhar number"
                value={formData.Aadhar_number}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          {/* Shop Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Shop Information</h4>
            
            {/* Shop Name */}
            <div>
              <label className="block text-gray-400 mb-2">Shop Name</label>
              <div className="relative">
                <FiShoppingBag className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="shopName"
                  placeholder="Enter shop name"
                  value={formData.shopName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Shop Address */}
            <div>
              <label className="block text-gray-400 mb-2">Shop Address</label>
              <input
                type="text"
                name="shopAddress"
                placeholder="Enter shop address"
                value={formData.shopAddress}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Shop Pincode */}
            <div>
              <label className="block text-gray-400 mb-2">Shop Pincode</label>
              <input
                type="text"
                name="shopPincode"
                placeholder="Enter shop pincode"
                value={formData.shopPincode}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-yellow-500 text-black font-medium hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Agent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main AgentTable Component
export default function AgentTable() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [agents, setAgents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    phone: "",
    pincode: "",
    place: "",
    panchayath: "",
    vehicle: "",
    vehicle_name: "",
    vehicle_Number: "",
    license_Number: "",
    Aadhar_number: "",
    shopName: "",
    shopAddress: "",
    shopPincode: "",
  });

  // Fetch agents from backend
  const fetchAgents = () => {
    fetch(`${API_BASE_URL}/api/admin/agent`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Agents data:', data);
        setAgents(data);
      })
      .catch((err) => {
        console.error("Error fetching agents:", err);
        // Set agents to empty array if there's an error
        setAgents([]);
      });
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Toggle verification status (simulated since not in backend)
  const toggleVerification = async (id) => {
    try {
      const agent = agents.find(a => a._id === id);
      const updatedStatus = !agent.isVerified;
      
      // Since there's no API endpoint for this, we'll just update the local state
      setAgents(agents.map(a => 
        a._id === id ? { ...a, isVerified: updatedStatus } : a
      ));
      
      // In a real implementation, you would make an API call here
    } catch (err) {
      console.error("Error updating verification status:", err);
      alert("⚠️ Something went wrong!");
    }
  };

  // Toggle ready status (simulated since not in backend)
  const toggleReady = async (id) => {
    try {
      const agent = agents.find(a => a._id === id);
      const updatedStatus = !agent.isReady;
      
      // Since there's no API endpoint for this, we'll just update the local state
      setAgents(agents.map(a => 
        a._id === id ? { ...a, isReady: updatedStatus } : a
      ));
      
      // In a real implementation, you would make an API call here
    } catch (err) {
      console.error("Error updating ready status:", err);
      alert("⚠️ Something went wrong!");
    }
  };

  // DELETE agent
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/agent-delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAgents(agents.filter((a) => a._id !== id));
        alert("✅ Agent deleted successfully!");
      } else {
        alert("❌ Failed to delete agent");
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // Enable edit mode
  const handleEdit = (agent) => {
    setEditingId(agent._id);
    setEditForm({
      username: agent.username,
      phone: agent.phone || "",
      pincode: agent.pincode || "",
      place: agent.place || "",
      panchayath: agent.panchayath || "",
      vehicle: agent.vehicle || "",
      vehicle_name: agent.vehicle_name || "",
      vehicle_Number: agent.vehicle_Number || "",
      license_Number: agent.license_Number || "",
      Aadhar_number: agent.Aadhar_number || "",
      shopName: agent.shopName || "",
      shopAddress: agent.shopAddress || "",
      shopPincode: agent.shopPincode || "",
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      username: "",
      phone: "",
      pincode: "",
      place: "",
      panchayath: "",
      vehicle: "",
      vehicle_name: "",
      vehicle_Number: "",
      license_Number: "",
      Aadhar_number: "",
      shopName: "",
      shopAddress: "",
      shopPincode: "",
    });
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // Handle submit (PUT API)
  const handleUpdate = async (id) => {
    try {
      // Note: The backend only supports updating the place field
      // For other fields, you would need to add more API endpoints
      const res = await fetch(`${API_BASE_URL}/api/admin/agent-district/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place: editForm.place }),
      });
      
      if (res.ok) {
        // Update the agents state with the updated data from the server
        setAgents((prev) =>
          prev.map((agent) =>
            agent._id === id ? { ...agent, place: editForm.place } : agent
          )
        );
        alert("✅ Agent district updated successfully!");
        setEditingId(null);
      } else {
        alert("❌ Failed to update agent");
      }
    } catch (err) {
      console.error("Error updating agent:", err);
      alert("⚠️ Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Agent Table</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            Total Agents: {agents.length}
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
          >
            <FiPlus />
            Add Agent
          </button>
        </div>
      </div>
      
      {agents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No agents found. Please add an agent to get started.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Username</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Phone</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Location</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Verified</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Ready</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Vehicle</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Shop</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent._id} className="border-b border-gray-800 hover:bg-gray-800">
                  {/* Username column */}
                  <td className="py-3 px-4 text-white">
                    {editingId === agent._id ? (
                      <input
                        type="text"
                        name="username"
                        value={editForm.username}
                        onChange={handleInputChange}
                        className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                        disabled
                      />
                    ) : (
                      agent.username
                    )}
                  </td>
                  
                  {/* Phone column */}
                  <td className="py-3 px-4 text-gray-300">
                    {editingId === agent._id ? (
                      <input
                        type="text"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                        disabled
                      />
                    ) : (
                      agent.phone || 'N/A'
                    )}
                  </td>
                  
                  {/* Location column */}
                  <td className="py-3 px-4 text-gray-300">
                    {editingId === agent._id ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          name="place"
                          value={editForm.place}
                          onChange={handleInputChange}
                          placeholder="District"
                          className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                        />
                        <input
                          type="text"
                          name="pincode"
                          value={editForm.pincode}
                          onChange={handleInputChange}
                          placeholder="Pincode"
                          className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                          disabled
                        />
                        <input
                          type="text"
                          name="panchayath"
                          value={editForm.panchayath}
                          onChange={handleInputChange}
                          placeholder="Panchayath"
                          className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                          disabled
                        />
                      </div>
                    ) : (
                      <div>
                        <div>{agent.place || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{agent.panchayath || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{agent.pincode || 'N/A'}</div>
                      </div>
                    )}
                  </td>
                  
                  {/* Verification Status column */}
                  <td className="py-3 px-4">
                    {editingId === agent._id ? (
                      <button
                        onClick={() => setEditForm({...editForm, isVerified: !editForm.isVerified})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          editForm.isVerified ? "bg-green-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            editForm.isVerified
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleVerification(agent._id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          agent.isVerified ? "bg-green-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            agent.isVerified
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    )}
                  </td>
                  
                  {/* Ready Status column */}
                  <td className="py-3 px-4">
                    {editingId === agent._id ? (
                      <button
                        onClick={() => setEditForm({...editForm, isReady: !editForm.isReady})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          editForm.isReady ? "bg-blue-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            editForm.isReady
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleReady(agent._id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          agent.isReady ? "bg-blue-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            agent.isReady
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    )}
                  </td>
                  
                  {/* Vehicle column */}
                  <td className="py-3 px-4 text-gray-300">
                    {editingId === agent._id ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          name="vehicle"
                          value={editForm.vehicle}
                          onChange={handleInputChange}
                          placeholder="Vehicle Type"
                          className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                          disabled
                        />
                        <input
                          type="text"
                          name="vehicle_name"
                          value={editForm.vehicle_name}
                          onChange={handleInputChange}
                          placeholder="Vehicle Name"
                          className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                          disabled
                        />
                        <input
                          type="text"
                          name="vehicle_Number"
                          value={editForm.vehicle_Number}
                          onChange={handleInputChange}
                          placeholder="Vehicle Number"
                          className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                          disabled
                        />
                      </div>
                    ) : (
                      <div>
                        <div>{agent.vehicle || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{agent.vehicle_name || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{agent.vehicle_Number || 'N/A'}</div>
                      </div>
                    )}
                  </td>
                  
                  {/* Shop column */}
                  <td className="py-3 px-4 text-gray-300">
                    {editingId === agent._id ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          name="shopName"
                          value={editForm.shopName}
                          onChange={handleInputChange}
                          placeholder="Shop Name"
                          className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                          disabled
                        />
                        <input
                          type="text"
                          name="shopAddress"
                          value={editForm.shopAddress}
                          onChange={handleInputChange}
                          placeholder="Shop Address"
                          className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                          disabled
                        />
                        <input
                          type="text"
                          name="shopPincode"
                          value={editForm.shopPincode}
                          onChange={handleInputChange}
                          placeholder="Shop Pincode"
                          className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                          disabled
                        />
                      </div>
                    ) : (
                      <div>
                        <div>{agent.shopName || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{agent.shopAddress || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{agent.shopPincode || 'N/A'}</div>
                      </div>
                    )}
                  </td>
                  
                  {/* Actions column */}
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {editingId === agent._id ? (
                        <>
                          {/* Save */}
                          <button
                            onClick={() => handleUpdate(agent._id)}
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
                            onClick={() => handleEdit(agent)}
                            className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(agent._id)}
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
      )}
      
      {/* Add Agent Modal */}
      {showAddModal && (
        <AddAgentModal
          closeModal={() => setShowAddModal(false)}
          onAgentAdded={fetchAgents}
        />
      )}
    </div>
  );
}