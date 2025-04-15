import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col">
            {/* Top Navbar */}
            <nav className="bg-white shadow px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <span className="text-purple-600 text-2xl font-bold">📘 WorkLogger</span>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-700 text-sm font-medium justify-center sm:justify-start">
                    <Link to="/" className="hover:text-purple-600">Dashboard</Link>
                    <Link to="/projects" className="hover:text-purple-600">Projects</Link>
                    <Link to="/calendar" className="hover:text-purple-600">Calendar</Link>
                    <Link to="/insights" className="hover:text-purple-600">Insights</Link>
                    <Link to="/settings" className="hover:text-purple-600">Settings</Link>
                </div>

                {/* New Entry Button */}
                <div className="flex justify-center sm:justify-end">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                        + New Entry
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow p-4 sm:p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">MyWorkLogger</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white shadow rounded-lg p-4">
                        <p className="text-sm text-gray-500">Total Projects</p>
                        <p className="text-2xl font-bold text-blue-600">0</p>
                        <p className="text-sm text-gray-400">This week</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <p className="text-sm text-gray-500">Running Project</p>
                        <p className="text-2xl font-bold text-green-600">0.0</p>
                        <p className="text-sm text-gray-400">This week</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <p className="text-sm text-gray-500">Completed Projects</p>
                        <p className="text-2xl font-bold text-purple-600">0</p>
                        <p className="text-sm text-gray-400">Currently tracking</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <p className="text-sm text-gray-500">Streak</p>
                        <p className="text-2xl font-bold text-yellow-500">7</p>
                        <p className="text-sm text-gray-400">Days</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Recent Activity</h2>
                    <p className="text-gray-400">No entries yet. Start logging your work!</p>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
