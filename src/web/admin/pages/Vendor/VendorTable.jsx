import { useState, useEffect } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiImage,
} from "react-icons/fi";

export default function VendorTable() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [showAadharModal, setShowAadharModal] = useState(null);

  // Fetch vendors from API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/vendors/vendors-list`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Toggle verification status
  const toggleVerification = async (id) => {
    try {
      const vendor = vendors.find(v => v._id === id);
      const updatedStatus = !vendor.isVerified;
      
      // Update local state immediately for better UX
      setVendors(vendors.map(v => 
        v._id === id ? { ...v, isVerified: updatedStatus } : v
      ));
      
      // Make API call to update verification status
      const response = await fetch(`${API_BASE_URL}/api/admin/vendors/verify-vendor/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isVerified: updatedStatus }),
      });
      
      if (!response.ok) {
        // Revert the change if API call fails
        setVendors(vendors.map(v => 
          v._id === id ? { ...v, isVerified: !updatedStatus } : v
        ));
        throw new Error("Failed to update verification status");
      }
      
      alert("✅ Verification status updated successfully!");
    } catch (err) {
      console.error("Error updating verification status:", err);
      alert("⚠️ Something went wrong!");
    }
  };

  // Toggle ready status
  const toggleReady = async (id) => {
    try {
      const vendor = vendors.find(v => v._id === id);
      const updatedStatus = !vendor.isReady;
      
      // Update local state immediately for better UX
      setVendors(vendors.map(v => 
        v._id === id ? { ...v, isReady: updatedStatus } : v
      ));
      
      // In a real implementation, you would make an API call here
      alert("✅ Ready status updated successfully!");
    } catch (err) {
      console.error("Error updating ready status:", err);
      alert("⚠️ Something went wrong!");
    }
  };

  // Toggle ride status
  const toggleRide = async (id) => {
    try {
      const vendor = vendors.find(v => v._id === id);
      const updatedStatus = !vendor.is_ride;
      
      // Update local state immediately for better UX
      setVendors(vendors.map(v => 
        v._id === id ? { ...v, is_ride: updatedStatus } : v
      ));
      
      // In a real implementation, you would make an API call here
      alert("✅ Ride status updated successfully!");
    } catch (err) {
      console.error("Error updating ride status:", err);
      alert("⚠️ Something went wrong!");
    }
  };

  // Delete vendor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;
    try {
      // In a real implementation, you would make an API call here
      // const res = await fetch(`${API_BASE_URL}/api/admin/vendors/${id}`, {
      //   method: "DELETE",
      // });
      
      // For now, just update local state
      setVendors(vendors.filter(v => v._id !== id));
      alert("✅ Vendor deleted successfully!");
    } catch (err) {
      console.error("Error deleting vendor:", err);
      alert("⚠️ Something went wrong!");
    }
  };

  // View Aadhar image
  const viewAadharImage = (vendor) => {
    setShowAadharModal(vendor);
  };

  // Filter vendors based on search term
  const filtered = vendors.filter(
    (v) =>
      v.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.place?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.shopName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.upi_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered vendors
  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Handle sort field change
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-white">Loading vendors...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-white">Vendor Table</h2>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:border-yellow-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 text-gray-400 font-medium hover:text-white"
                  onClick={() => handleSort("username")}
                >
                  Username
                  {sortField === "username" &&
                    (sortDirection === "asc" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    ))}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 text-gray-400 font-medium hover:text-white"
                  onClick={() => handleSort("category")}
                >
                  Category
                  {sortField === "category" &&
                    (sortDirection === "asc" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    ))}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 text-gray-400 font-medium hover:text-white"
                  onClick={() => handleSort("phone")}
                >
                  Phone
                  {sortField === "phone" &&
                    (sortDirection === "asc" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    ))}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 text-gray-400 font-medium hover:text-white"
                  onClick={() => handleSort("place")}
                >
                  Location
                  {sortField === "place" &&
                    (sortDirection === "asc" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    ))}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">
                Status
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 text-gray-400 font-medium hover:text-white"
                  onClick={() => handleSort("shopName")}
                >
                  Shop
                  {sortField === "shopName" &&
                    (sortDirection === "asc" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    ))}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">
                Aadhar
              </th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {sorted.length > 0 ? (
              sorted.map((vendor) => (
                <tr
                  key={vendor._id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                >
                  <td className="py-3 px-4 text-white">{vendor.username}</td>
                  <td className="py-3 px-4 text-gray-300">{vendor.category}</td>
                  <td className="py-3 px-4 text-gray-300">{vendor.phone}</td>
                  <td className="py-3 px-4 text-gray-300">
                    <div>{vendor.place}</div>
                    <div className="text-xs text-gray-500">{vendor.pincode}</div>
                    <div className="text-xs text-gray-500">{vendor.state}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Verified:</span>
                        <button
                          onClick={() => toggleVerification(vendor._id)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            vendor.isVerified ? "bg-green-600" : "bg-gray-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              vendor.isVerified
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Ready:</span>
                        <button
                          onClick={() => toggleReady(vendor._id)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            vendor.isReady ? "bg-blue-600" : "bg-gray-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              vendor.isReady
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Ride:</span>
                        <button
                          onClick={() => toggleRide(vendor._id)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            vendor.is_ride ? "bg-purple-600" : "bg-gray-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              vendor.is_ride
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <div>{vendor.shopName}</div>
                    <div className="text-xs text-gray-500">{vendor.shopAddress}</div>
                    <div className="text-xs text-gray-500">{vendor.shopPincode}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <div className="text-xs">{vendor.aadhar_number}</div>
                    {vendor.aadhar_image && (
                      <button
                        onClick={() => viewAadharImage(vendor)}
                        className="mt-1 text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        <FiImage size={12} />
                        <span className="text-xs">View</span>
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(vendor._id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="py-6 text-center text-gray-500"
                >
                  No vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Aadhar Image Modal */}
      {showAadharModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Aadhar Card</h3>
              <button
                onClick={() => setShowAadharModal(null)}
                className="text-gray-400 hover:text-white"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
            <div className="text-gray-300 mb-2">
              <p><strong>Vendor:</strong> {showAadharModal.username}</p>
              <p><strong>Aadhar Number:</strong> {showAadharModal.aadhar_number}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-2 flex justify-center">
              <img
                src={`${API_BASE_URL}/${showAadharModal.aadhar_image}`}
                alt="Aadhar Card"
                className="max-w-full max-h-96 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Available";
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}