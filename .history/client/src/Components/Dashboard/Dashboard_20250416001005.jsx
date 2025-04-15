import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../in"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [calendarDate, setCalendarDate] = useState(new Date());

    const keyInsights = [
        { label: "Total Projects", value: 120 },
        { label: "Active Projects", value: 85 },
        { label: "Completed Projects", value: 30 },
        { label: "Overdue Tasks", value: 5 },
    ];

    const projectStatusData = [
        { name: "Total Projects", value: 120 },
        { name: "Running", value: 85 },
        { name: "Completed", value: 30 },
        { name: "Under Review", value: 5 },
    ];

    const weeklyEntriesData = [
        { week: "Week 1", entries: 25 },
        { week: "Week 2", entries: 30 },
        { week: "Week 3", entries: 45 },
        { week: "Week 4", entries: 20 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm, searchDate);
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col">
            <main className="flex-grow p-4 sm:p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">MyWorkLogger</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {keyInsights.map((insight, index) => (
                        <div key={index} className="bg-white shadow rounded-lg p-4">
                            <p className="text-sm text-gray-500">{insight.label}</p>
                            <p className="text-2xl font-bold text-blue-600">{insight.value}</p>
                        </div>
                    ))}
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

                {/* Charts + Calendar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* Pie Chart for Project Status */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Project Status Overview</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={projectStatusData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {projectStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar Chart for Weekly Entries */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Weekly Entries</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={weeklyEntriesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="entries" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Calendar */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">📅 Calendar</h3>
                        <Calendar
                            onChange={setCalendarDate}
                            value={calendarDate}
                        />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
