import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "./ThemeContext.jsx"; // Import the custom hook

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();  // Use theme context for dark mode
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogoClick = () => {
    setClickCount((prev) => {
      if (prev === 2) {
        navigate("/privacy");
        return 0;
      }
      setTimeout(() => setClickCount(0), 400);
      return prev + 1;
    });
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 rounded-b-xl">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="text-purple-600 dark:text-purple-400 text-2xl font-extrabold tracking-wide transform hover:scale-105 transition-transform focus:outline-none"
        >
          📘 WorkLogger
        </button>

        {/* Hamburger Button */}
        <button
          className="sm:hidden text-gray-700 dark:text-gray-300 text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400">Dashboard</Link>
          <Link to="/projects" className="hover:text-purple-600 dark:hover:text-purple-400">Projects</Link>
          <Link to="/calendar" className="hover:text-purple-600 dark:hover:text-purple-400">Calendar</Link>
       
          <Link to="/personal" className="hover:text-purple-600 dark:hover:text-purple-400">Personal Feed</Link>
          <Link to="/settings" className="hover:text-purple-600 dark:hover:text-purple-400">Settings</Link>

          <button
            onClick={toggleDarkMode}
            className="ml-4 text-white bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4 space-y-3 text-center text-gray-700 dark:text-gray-300 text-sm font-medium">
          <Link to="/" onClick={toggleMenu} className="block hover:text-purple-600 dark:hover:text-purple-400">Dashboard</Link>
          <Link to="/projects" onClick={toggleMenu} className="block hover:text-purple-600 dark:hover:text-purple-400">Projects</Link>
          <Link to="/calendar" onClick={toggleMenu} className="block hover:text-purple-600 dark:hover:text-purple-400">Calendar</Link>
          <Link to="/insights" onClick={toggleMenu} className="block hover:text-purple-600 dark:hover:text-purple-400">Insights</Link>
          <Link to="/personal" onClick={toggleMenu} className="block hover:text-purple-600 dark:hover:text-purple-400">Personal Feed</Link>
          <Link to="/settings" onClick={toggleMenu} className="block hover:text-purple-600 dark:hover:text-purple-400">Settings</Link>

          <button
            onClick={() => {
              toggleDarkMode();
              toggleMenu();
            }}
            className="mt-2 text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
