import { useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

export default function VendorTable() {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      username: "vendor_one",
      userType: "Retailer",
      aadharNumber: "1234-5678-9012",
      verification: true,
    },
    {
      id: 2,
      username: "vendor_two",
      userType: "Wholesaler",
      aadharNumber: "2345-6789-0123",
      verification: false,
    },
    {
      id: 3,
      username: "vendor_three",
      userType: "Retailer",
      aadharNumber: "3456-7890-1234",
      verification: true,
    },
    {
      id: 4,
      username: "vendor_four",
      userType: "Wholesaler",
      aadharNumber: "4567-8901-2345",
      verification: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const toggleVerification = (id) => {
    setVendors((prev) =>
      prev.map((vendor) =>
        vendor.id === id
          ? { ...vendor, verification: !vendor.verification }
          : vendor
      )
    );
  };

  const filtered = vendors.filter(
    (v) =>
      v.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.userType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.aadharNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  onClick={() => handleSort("userType")}
                >
                  User Type
                  {sortField === "userType" &&
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
                  onClick={() => handleSort("aadharNumber")}
                >
                  Aadhar Number
                  {sortField === "aadharNumber" &&
                    (sortDirection === "asc" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    ))}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">
                Verification
              </th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {sorted.length > 0 ? (
              sorted.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                >
                  <td className="py-3 px-4 text-white">{vendor.username}</td>
                  <td className="py-3 px-4 text-gray-300">{vendor.userType}</td>
                  <td className="py-3 px-4 text-gray-400">
                    {vendor.aadharNumber}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleVerification(vendor.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        vendor.verification ? "bg-green-600" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          vendor.verification
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
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
                  colSpan="5"
                  className="py-6 text-center text-gray-500"
                >
                  No vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
