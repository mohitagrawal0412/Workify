import React from "react";
import { Link } from "react-router-dom";

const dummyProjects = [
    {
        _id: "1",
        projectName: "Task Tracker App",
        description: "An app to track daily tasks and progress.",
        totalSpentTime: 12,
        status: "running",
        entries: [1, 2],
        createdAt: "2024-03-01T10:00:00Z",
    },
    {
        _id: "2",
        projectName: "Portfolio Website",
        description: "A personal portfolio showcasing projects and blogs.",
        totalSpentTime: 20,
        status: "completed",
        entries: [1, 2, 3],
        createdAt: "2024-02-15T08:30:00Z",
    },
    {
        _id: "3",
        projectName: "Expense Manager",
        description: "Tool to manage personal finances and budgeting.",
        totalSpentTime: 8,
        status: "under seen of manager",
        entries: [],
        createdAt: "2024-04-01T14:45:00Z",
    },
];

const Dashboard = () => {
    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col">
            {/* Top Navbar */}
            <nav className="bg-white shadow px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-2">
                    <span className="text-purple-600 text-2xl font-bold">📘 WorkLogger</span>
                </div>

                <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-700 text-sm font-medium justify-center sm:justify-start">
                    <Link to="/" className="hover:text-purple-600">Dashboard</Link>
                    <Link to="/projects" className="hover:text-purple-600">Projects</Link>
                    <Link to="/calendar" className="hover:text-purple-600">Calendar</Link>
                    <Link to="/insights" className="hover:text-purple-600">Insights</Link>
                    <Link to="/settings" className="hover:text-purple-600">Settings</Link>
                </div>

                <div className="flex justify-center sm:justify-end">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                        + New Entry
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow p-4 sm:p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Projects</h1>

                {/* Project Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyProjects.map(project => (
                        <div key={project._id} className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-1">{project.projectName}</h2>
                            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                            <div className="text-sm text-gray-500 space-y-1">
                                <p><span className="font-medium">Status:</span> <span className={`capitalize font-semibold ${project.status === 'running' ? 'text-green-600' : project.status === 'completed' ? 'text-purple-600' : 'text-yellow-600'}`}>{project.status}</span></p>
                                <p><span className="font-medium">Total Entries:</span> {project.entries.length}</p>
                                <p><span className="font-medium">Time Spent:</span> {project.totalSpentTime} hrs</p>
                                <p><span className="font-medium">Started:</span> {new Date(project.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
