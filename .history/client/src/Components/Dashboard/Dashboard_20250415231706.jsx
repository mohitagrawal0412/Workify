import React, { useState } from "react";

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: Hook into your project search/filter logic
        console.log("Searching for:", searchTerm, searchDate);
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col">
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

                {/* Search Section */}
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">🔍 Search Projects</h2>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Project Name</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="e.g. Dashboard Revamp"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                            <input
                                type="date"
                                value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
