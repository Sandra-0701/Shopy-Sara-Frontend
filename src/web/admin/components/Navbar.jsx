// src/components/Navbar.jsx
import React, { useState } from "react";
import { FiSearch, FiBell, FiSettings, FiLogOut, FiUser } from "react-icons/fi";

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  return (
    <div className="w-full bg-black shadow-lg p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-900 text-white border border-gray-800 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-yellow-500 transition-colors w-64"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        {/* Notification Icon */}
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <FiBell size={20} />
          <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </button>
        
        {/* Profile Section */}
        <div className="relative">
          <button 
            className="flex items-center gap-2"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center">
              <FiUser className="text-black" />
            </div>
          </button>
          
          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl z-10 border border-gray-800">
              <div className="p-3 border-b border-gray-800">
                <p className="text-white font-medium">Admin User</p>
                <p className="text-gray-400 text-sm">admin@sarashopy.com</p>
              </div>
              <div className="p-1">
                <a href="#" className="flex items-center gap-3 p-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors">
                  <FiSettings size={16} />
                  <span>Settings</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors">
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}