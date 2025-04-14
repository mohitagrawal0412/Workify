import React from "react";

const Dashboard = () => {
    return (
        <div className="min-h-screen w-full bg-gray-100">
            {/* Top Navbar */}
            <nav className="bg-white shadow px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <span className="text-purple-600 text-2xl font-bold">📘 WorkLogger</span>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap gap-6 text-gray-700 text-sm font-medium">
                    <a href="#" className="hover:text-purple-600">Dashboard</a>
                    <a href="#" className="hover:text-purple-600">Projects</a>
                    <a href="#" className="hover:text-purple-600">Calendar</a>
                    <a href="#" className="hover:text-purple-600">Insights</a>
                    <a href="#" className="hover:text-purple-600">Settings</a>
                </div>

                {/* New Entry Button */}
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                    + New Entry
                </button>
            </nav>

            {/* Main Content */}
            <main className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">MyWorkLogger</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white shadow rounded-lg p-4">
                        <p className="text-sm text-gray-500">Tasks Completed</p>
                        <p className="text-2xl font-bold text-blue-600">0</p>
                        <p className="text-sm text-gray-400">This week</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <p className="text-sm text-gray-500">Hours Logged</p>
                        <p className="text-2xl font-bold text-green-600">0.0</p>
                        <p className="text-sm text-gray-400">This week</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <p className="text-sm text-gray-500">Active Projects</p>
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
