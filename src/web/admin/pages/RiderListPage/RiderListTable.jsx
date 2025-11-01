import { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export default function RiderTable() {
  const [riders, setRiders] = useState([
    {
      id: 1,
      userName: "John Doe",
      location: "682001 (Cochin)",
      destination: "Trivandrum",
      vehicle: "Bike",
      fare: 450,
      status: true,
    },
    {
      id: 2,
      userName: "Priya Kumar",
      location: "695001 (Kollam)",
      destination: "Kottayam",
      vehicle: "Car",
      fare: 1200,
      status: false,
    },
    {
      id: 3,
      userName: "Arun Raj",
      location: "673001 (Calicut)",
      destination: "Thrissur",
      vehicle: "Auto",
      fare: 300,
      status: true,
    },
    {
      id: 4,
      userName: "Meera Babu",
      location: "686001 (Alappuzha)",
      destination: "Kochi",
      vehicle: "Car",
      fare: 800,
      status: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // ✅ Toggle Active Status
  const toggleStatus = (id) => {
    setRiders(
      riders.map((rider) =>
        rider.id === id ? { ...rider, status: !rider.status } : rider
      )
    );
  };

  // ✅ Filter by Search
  const filtered = riders.filter(
    (r) =>
      r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Sorting Logic
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
        <h2 className="text-xl font-semibold text-white">Rider Table</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search riders..."
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
                <button
                  className="flex items-center gap-1 text-gray-400 font-medium hover:text-white"
                  onClick={() => handleSort("userName")}
                >
                  User Name
                  {sortField === "userName" &&
                    (sortDirection === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </button>
              </th>

              <th className="py-3 px-4 text-left text-gray-400 font-medium">
                Location
              </th>

              <th className="py-3 px-4 text-left text-gray-400 font-medium">
                Destination
              </th>

              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 text-gray-400 font-medium hover:text-white"
                  onClick={() => handleSort("vehicle")}
                >
                  Vehicle
                  {sortField === "vehicle" &&
                    (sortDirection === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </button>
              </th>

              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center gap-1 text-gray-400 font-medium hover:text-white"
                  onClick={() => handleSort("fare")}
                >
                  Fare
                  {sortField === "fare" &&
                    (sortDirection === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </button>
              </th>

              <th className="py-3 px-4 text-left text-gray-400 font-medium">
                Status
              </th>

              <th className="py-3 px-4 text-left text-gray-400 font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((rider) => (
              <tr
                key={rider.id}
                className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
              >
                <td className="py-3 px-4 text-white">{rider.userName}</td>
                <td className="py-3 px-4 text-gray-300">{rider.location}</td>
                <td className="py-3 px-4 text-gray-300">{rider.destination}</td>
                <td className="py-3 px-4 text-gray-300">{rider.vehicle}</td>
                <td className="py-3 px-4 text-gray-300">₹{rider.fare}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggleStatus(rider.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      rider.status ? "bg-green-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        rider.status ? "translate-x-6" : "translate-x-1"
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
