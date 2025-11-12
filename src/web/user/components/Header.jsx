import React from "react";
import logo from "../../../assets/img/logo/sara-new-logo.png";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="container mx-auto flex justify-between items-center py-2 px-4 lg:px-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Sara Shopy Logo" className="h-20" />
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-purple-600">Groceries</a>
          <a href="#" className="hover:text-purple-600">Offers</a>
          <a href="#" className="hover:text-purple-600">Offers</a>
          <a href="#" className="hover:text-purple-600">Rewards</a>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-6 py-2.5 rounded-full font-bold transition">
            Sign in
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;