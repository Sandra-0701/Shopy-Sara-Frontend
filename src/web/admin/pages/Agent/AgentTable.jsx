import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";
import AddAgentModal from "./AddAgentModal";

export default function AgentTable() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [agents, setAgents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    phone: "",
    pincode: "",
    panchayath: "",
    place: "",
    state: "",
    isVerified: false,
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

// Toggle verification status
const toggleVerification = async (id) => {
  try {
    const agent = agents.find(a => a._id === id);
    const updatedStatus = !agent.isVerified;
    
    // Make API call to update the verification status
    const res = await fetch(`${API_BASE_URL}/api/admin/agent/verify/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isVerified: updatedStatus }),
    });
    
    if (res.ok) {
      // Update the local state with the response from the server
      const data = await res.json();
      setAgents(agents.map(a => 
        a._id === id ? data.agent : a
      ));
      alert(`✅ Agent ${updatedStatus ? 'verified' : 'unverified'} successfully!`);
    } else {
      const errorData = await res.json();
      alert(`❌ Failed to update verification status: ${errorData.message}`);
    }
  } catch (err) {
    console.error("Error updating verification status:", err);
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
      name: agent.name || "",
      username: agent.username,
      phone: agent.phone || "",
      pincode: agent.pincode || "",
      panchayath: agent.panchayath || "",
      place: agent.place || "",
      state: agent.state || "",
      isVerified: agent.isVerified || false,
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      username: "",
      phone: "",
      pincode: "",
      panchayath: "",
      place: "",
      state: "",
      isVerified: false,
    });
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "checkbox" ? checked : value,
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
                          name="panchayath"
                          value={editForm.panchayath}
                          onChange={handleInputChange}
                          placeholder="Panchayath"
                          className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded w-32 focus:outline-none focus:border-yellow-500"
                          disabled
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