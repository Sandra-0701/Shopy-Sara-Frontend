import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  FiHome, 
  FiPackage, 
  FiGrid, 
  FiLayers, 
  FiTruck, 
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiUser,
  FiTrendingUp,
  FiUsers,
  FiRadio,
  FiDatabase,
  FiFileText
} from "react-icons/fi";
import { FaStore,FaSearchLocation } from "react-icons/fa";
import { MdPrivacyTip } from "react-icons/md";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { RiRefund2Line } from "react-icons/ri";

export default function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState(["main"]);

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
    );
  };

  const linkBase =
    "flex items-center gap-3 p-3 rounded transition-colors hover:bg-gray-900";
  const activeLink = "bg-gray-900 text-yellow-500";

  return (
    <div className="w-64 h-screen bg-black text-white flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold">Sara Shopy</h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-4">
          {/* Main Menu */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-900 rounded transition-colors"
              onClick={() => toggleMenu("main")}
            >
              <p className="font-semibold text-gray-400">Sara Shopy</p>
              {expandedMenus.includes("main") ? (
                <FiChevronDown className="text-gray-400" />
              ) : (
                <FiChevronRight className="text-gray-400" />
              )}
            </div>

            {expandedMenus.includes("main") && (
              <nav className="mt-2 flex flex-col gap-1 ml-2">
                <NavLink to="/admin" end className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiHome />
                  <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin/product" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiPackage />
                  <span>Product</span>
                </NavLink>

                <NavLink to="/admin/category" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiGrid />
                  <span>Category</span>
                </NavLink>

                <NavLink to="/admin/subcategory" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiLayers />
                  <span>Subcategory</span>
                </NavLink>

                <NavLink to="/admin/vendor" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiTruck />
                  <span>Vendor</span>
                </NavLink>

                {/* Master Menu */}
                <div>
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-900 rounded transition-colors"
                    onClick={() => toggleMenu("master")}
                  >
                    <div className="flex items-center gap-3">
                      <FiDatabase />
                      <span>Master</span>
                    </div>
                    {expandedMenus.includes("master") ? (
                      <FiChevronDown className="text-gray-400" />
                    ) : (
                      <FiChevronRight className="text-gray-400" />
                    )}
                  </div>
                  {expandedMenus.includes("master") && (
                    <nav className="mt-2 flex flex-col gap-1 ml-6">
                      <NavLink to="/admin/master/roles" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                        <FiUser />
                        <span>Roles</span>
                      </NavLink>
                      <NavLink to="/admin/master/permissions" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                        <FaSearchLocation />
                        <span>Location</span>
                      </NavLink>
                      <NavLink to="/admin/master/settings" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                        <FaStore />
                        <span>Store</span>
                      </NavLink>
                      <NavLink to="/admin/master/settings" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                        <MdPrivacyTip />
                        <span>Privacy Policy</span>
                      </NavLink>
                      <NavLink to="/admin/master/settings" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                        <HiOutlineReceiptRefund />
                        <span>Return Policy</span>
                      </NavLink>
                                            <NavLink to="/admin/master/settings" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                        <RiRefund2Line />
                        <span>Refund Policy</span>
                      </NavLink>
                    </nav>
                  )}
                </div>
              </nav>
            )}
          </div>

          {/* Rider Menu */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-900 rounded transition-colors"
              onClick={() => toggleMenu("rider")}
            >
              <p className="font-semibold text-gray-400">Rider</p>
              {expandedMenus.includes("rider") ? (
                <FiChevronDown className="text-gray-400" />
              ) : (
                <FiChevronRight className="text-gray-400" />
              )}
            </div>

            {expandedMenus.includes("rider") && (
              <nav className="mt-2 flex flex-col gap-1 ml-2">
                <NavLink to="/admin/rider-list" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiUsers />
                  <span>Rider List</span>
                </NavLink>

                <NavLink to="/admin/total-rides" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiTrendingUp />
                  <span>Total Rides</span>
                </NavLink>

                <NavLink to="/admin/users" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiUser />
                  <span>Users</span>
                </NavLink>

                <NavLink to="/admin/ads" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiRadio />
                  <span>Ads</span>
                </NavLink>
              </nav>
            )}
          </div>
        </div>
      </div>

      {/* Settings (bottom) */}
      <div className="p-4 border-t border-gray-800 flex-shrink-0">
        <NavLink to="/admin/settings" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
          <FiSettings />
          <span>Settings</span>
        </NavLink>
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
