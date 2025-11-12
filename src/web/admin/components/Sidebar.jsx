import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  FiFileText,
  FiLogOut
} from "react-icons/fi";
import { FaStore, FaSearchLocation } from "react-icons/fa";
import { MdPrivacyTip } from "react-icons/md";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { RiRefund2Line } from "react-icons/ri";

export default function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState(["main"]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Auto-expand menu items based on current path
  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes("/admin/master")) {
      setExpandedMenus(prev => [...prev.filter(m => m !== "rider"), "main", "master"]);
    } else if (path.includes("/admin/rider")) {
      setExpandedMenus(prev => [...prev.filter(m => m !== "master"), "main", "rider"]);
    } else if (path.includes("/admin")) {
      setExpandedMenus(prev => [...prev.filter(m => m !== "master" && m !== "rider"), "main"]);
    }
  }, [location.pathname]);

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
    );
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const linkBase = "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-900 group";
  const activeLink = "bg-gray-900 text-yellow-500 border-l-4 border-yellow-500";
  const submenuLinkBase = "flex items-center gap-3 p-2 pl-6 rounded-lg transition-all duration-200 hover:bg-gray-800 group";

  return (
    <div className={`h-screen bg-black text-white flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-black font-bold text-xl">S</span>
            </div>
            {!isCollapsed && <h1 className="text-2xl font-bold">Sara Shopy</h1>}
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <FiChevronRight className={`transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-4">
          {/* Main Menu */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-900 rounded-lg transition-colors"
              onClick={() => toggleMenu("main")}
            >
              <p className={`font-semibold text-gray-400 ${isCollapsed ? "hidden" : ""}`}>Sara Shopy</p>
              {expandedMenus.includes("main") ? (
                <FiChevronDown className="text-gray-400" />
              ) : (
                <FiChevronRight className="text-gray-400" />
              )}
            </div>

            {expandedMenus.includes("main") && (
              <nav className="mt-2 flex flex-col gap-1">
                <NavLink to="/admin" end className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiHome className="text-xl" />
                  {!isCollapsed && <span>Dashboard</span>}
                </NavLink>

                <NavLink to="/admin/product" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiPackage className="text-xl" />
                  {!isCollapsed && <span>Product</span>}
                </NavLink>

                <NavLink to="/admin/category" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiGrid className="text-xl" />
                  {!isCollapsed && <span>Category</span>}
                </NavLink>

                <NavLink to="/admin/subcategory" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiLayers className="text-xl" />
                  {!isCollapsed && <span>Subcategory</span>}
                </NavLink>

                <NavLink to="/admin/agent" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiTruck className="text-xl" />
                  {!isCollapsed && <span>Agent</span>}
                </NavLink>

                <NavLink to="/admin/vendor" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiTruck className="text-xl" />
                  {!isCollapsed && <span>Vendor</span>}
                </NavLink>

                {/* Master Menu */}
                <div>
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-900 rounded-lg transition-colors"
                    onClick={() => toggleMenu("master")}
                  >
                    <div className="flex items-center gap-3">
                      <FiDatabase className="text-xl" />
                      {!isCollapsed && <span>Master</span>}
                    </div>
                    {!isCollapsed && (
                      expandedMenus.includes("master") ? (
                        <FiChevronDown className="text-gray-400" />
                      ) : (
                        <FiChevronRight className="text-gray-400" />
                      )
                    )}
                  </div>
                  {expandedMenus.includes("master") && !isCollapsed && (
                    <nav className="mt-2 flex flex-col gap-1">
                      <NavLink to="/admin/master/roles" className={({ isActive }) => `${submenuLinkBase} ${isActive ? activeLink : ""}`}>
                        <FiUser className="text-lg" />
                        <span>Roles</span>
                      </NavLink>
                      <NavLink to="/admin/master/location" className={({ isActive }) => `${submenuLinkBase} ${isActive ? activeLink : ""}`}>
                        <FaSearchLocation className="text-lg" />
                        <span>Location</span>
                      </NavLink>
                      <NavLink to="/admin/master/district-panjayath" className={({ isActive }) => `${submenuLinkBase} ${isActive ? activeLink : ""}`}>
                        <FiFileText className="text-lg" />
                        <span>District Panchayath</span>
                      </NavLink>
                      <NavLink to="/admin/master/store" className={({ isActive }) => `${submenuLinkBase} ${isActive ? activeLink : ""}`}>
                        <FaStore className="text-lg" />
                        <span>Store</span>
                      </NavLink>
                      <NavLink to="/admin/master/privacy" className={({ isActive }) => `${submenuLinkBase} ${isActive ? activeLink : ""}`}>
                        <MdPrivacyTip className="text-lg" />
                        <span>Privacy Policy</span>
                      </NavLink>
                      <NavLink to="/admin/master/return" className={({ isActive }) => `${submenuLinkBase} ${isActive ? activeLink : ""}`}>
                        <HiOutlineReceiptRefund className="text-lg" />
                        <span>Return Policy</span>
                      </NavLink>
                      <NavLink to="/admin/master/refund" className={({ isActive }) => `${submenuLinkBase} ${isActive ? activeLink : ""}`}>
                        <RiRefund2Line className="text-lg" />
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
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-900 rounded-lg transition-colors"
              onClick={() => toggleMenu("rider")}
            >
              <p className={`font-semibold text-gray-400 ${isCollapsed ? "hidden" : ""}`}>Rider</p>
              {expandedMenus.includes("rider") ? (
                <FiChevronDown className="text-gray-400" />
              ) : (
                <FiChevronRight className="text-gray-400" />
              )}
            </div>

            {expandedMenus.includes("rider") && (
              <nav className="mt-2 flex flex-col gap-1">
                <NavLink to="/admin/rider-list" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiUsers className="text-xl" />
                  {!isCollapsed && <span>Rider List</span>}
                </NavLink>

                <NavLink to="/admin/total-rides" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiTrendingUp className="text-xl" />
                  {!isCollapsed && <span>Total Rides</span>}
                </NavLink>

                <NavLink to="/admin/users" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiUser className="text-xl" />
                  {!isCollapsed && <span>Users</span>}
                </NavLink>

                <NavLink to="/admin/ads" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
                  <FiRadio className="text-xl" />
                  {!isCollapsed && <span>Ads</span>}
                </NavLink>
              </nav>
            )}
          </div>
        </div>
      </div>

      {/* Settings and Logout (bottom) */}
      <div className="p-4 border-t border-gray-800 flex-shrink-0">
        <NavLink to="/admin/settings" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}>
          <FiSettings className="text-xl" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
        
        <button className={`${linkBase} w-full mt-2 text-red-400 hover:text-red-300 hover:bg-red-900/20`}>
          <FiLogOut className="text-xl" />
          {!isCollapsed && <span>Logout</span>}
        </button>
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