// src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-purple-600 text-2xl font-bold">
          📘 WorkLogger
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-700 text-sm font-medium justify-center sm:justify-start">
        <Link to="/" className="hover:text-purple-600">
          Dashboard
        </Link>
        <Link to="/projects" className="hover:text-purple-600">
          Projects
        </Link>
        <Link to="/calendar" className="hover:text-purple-600">
          Calendar
        </Link>
        <Link to="/insights" className="hover:text-purple-600">
          Insights
        </Link>
        <Link to="/settings" className="hover:text-purple-600">
          Settings
        </Link>
      </div>

      {/* New Entry Button */}
      <div className="flex justify-center sm:justify-end">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
          + New Entry
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
