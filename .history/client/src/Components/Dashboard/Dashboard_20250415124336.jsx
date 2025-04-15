// src/pages/Dashboard.js

import React from "react";


const Dashboard = () => {
    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col">
            {/* Top Navbar */}
            <Navbar />  {/* Use the Navbar component */}

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
