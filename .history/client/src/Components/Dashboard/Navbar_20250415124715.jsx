import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to track dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to the body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-purple-600 dark:text-purple-400 text-2xl font-bold">
          📘 WorkLogger
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-700 dark:text-gray-300 text-sm font-medium justify-center sm:justify-start">
        <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400">
          Dashboard
        </Link>
        <Link to="/projects" className="hover:text-purple-600 dark:hover:text-purple-400">
          Projects
        </Link>
        <Link to="/calendar" className="hover:text-purple-600 dark:hover:text-purple-400">
          Calendar
        </Link>
        <Link to="/insights" className="hover:text-purple-600 dark:hover:text-purple-400">
          Insights
        </Link>
        <Link to="/settings" className="hover:text-purple-600 dark:hover:text-purple-400">
          Settings
        </Link>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex justify-center sm:justify-end">
        <button
          onClick={toggleDarkMode}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
