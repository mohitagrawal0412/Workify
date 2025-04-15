import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const projectData = [
        { name: "Design", value: 40, totalSpentTime: 120 },
        { name: "Development", value: 30, totalSpentTime: 150 },
        { name: "Testing", value: 20, totalSpentTime: 100 },
        { name: "Deployment", value: 10, totalSpentTime: 50 },
    ];

    const taskCompletionData = [
        { name: "Completed", value: 75 },
        { name: "In Progress", value: 15 },
        { name: "Pending", value: 10 },
    ];

    const projectCompletionData = [
        { name: "Project A", completion: 80 },
        { name: "Project B", completion: 60 },
        { name: "Project C", completion: 90 },
    ];

    const keyInsights = [
        { label: "Total Projects", value: 120 },
        { label: "Active Projects", value: 85 },
        { label: "Completed Projects", value: 30 },
        { label: "Overdue Tasks", value: 5 },
        { label: "Total Time Spent", value: projectData.reduce((acc, project) => acc + project.totalSpentTime, 0) },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm, searchDate);
    };

    return (
        <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col">
            <main className="flex-grow p-4 sm:p-6">
                <h1 className="text-3xl font-semibold text-indigo-500 mb-6">MyWorkLogger</h1>

                {/* Main Layout with two sections: Insights on the left, Visualizations on the right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* Left Section: Insights and Search */}
                    <div className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        {/* Search Section */}
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-indigo-300 mb-4">🔍 Search Projects</h2>
                            <form onSubmit={handleSearch} className="grid grid-cols-1 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Project Name</label>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="e.g. Dashboard Revamp"
                                        className="w-full px-3 py-2 bg-gray-700 text-white border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={searchDate}
                                        onChange={(e) => setSearchDate(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-700 text-white border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="flex items-end justify-end">
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow-lg transition-transform transform hover:scale-105"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Key Insights Grid */}
                        <h3 className="text-lg font-semibold text-indigo-300 mb-4">Key Insights</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {keyInsights
                                .filter(insight => insight.label !== "Total Time Spent")  // Filter out Total Time Spent
                                .map((insight, index) => (
                                    <div key={index} className="bg-gray-700 p-3 rounded-lg hover:bg-indigo-600 transition-colors duration-300">
                                        <p className="text-sm text-gray-400">{insight.label}</p>
                                        <p className="text-xl font-bold text-indigo-200">{insight.value}</p>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Right Section: Visualizations */}
                    <div className="flex flex-col gap-4">
                        {/* Pie Chart for Project Distribution */}
                        <div className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-indigo-300 mb-4">Project Distribution</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={projectData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label>
                                        {projectData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Pie Chart for Task Completion (Donut Chart) */}
                        <div className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-indigo-300 mb-4">Task Completion</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={taskCompletionData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        fill="#8884d8"
                                        label
                                    >
                                        {taskCompletionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Bar Chart for Project Completion */}
                        <div className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-indigo-300 mb-4">Project Completion</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={projectCompletionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="completion" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
