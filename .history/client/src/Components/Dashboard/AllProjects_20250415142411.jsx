import React, { useState } from "react";
import {
    FaClock,
    FaTasks,
    FaCalendarAlt,
    FaHourglassEnd,
    FaPlus,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const statusColors = {
    running: "bg-green-100 text-green-600",
    completed: "bg-purple-100 text-purple-600",
    "under seen of manager": "bg-yellow-100 text-yellow-600",
};

const AllProjects = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([
        {
            _id: "1",
            projectName: "Task Tracker App",
            description: "Track daily tasks and progress.",
            totalSpentTime: 12,
            status: "running",
            entries: [1, 2],
            createdAt: "2024-03-01T10:00:00Z",
            deadline: "2024-04-15T23:59:59Z",
        },
        {
            _id: "2",
            projectName: "Portfolio Website",
            description:
                "Personal portfolio for showcasing work hello hejb wiueghf uwgeuf jwbeiuf iwjeeg fiugw jwegiu .",
            totalSpentTime: 20,
            status: "completed",
            entries: [1, 2, 3],
            createdAt: "2024-02-15T08:30:00Z",
            deadline: "2024-03-10T23:59:59Z",
        },
        {
            _id: "3",
            projectName: "Expense Manager",
            description: "Manage personal finances with ease.",
            totalSpentTime: 8,
            status: "under seen of manager",
            entries: [],
            createdAt: "2024-04-01T14:45:00Z",
            deadline: "2024-05-01T23:59:59Z",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        projectName: "",
        description: "",
        dateStarted: "",
        deadline: "",
        totalSpentTime: 0,
        status: "running",
    });

    const handleViewDetails = (projectId) => {
        navigate(`/project/${projectId}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddProject = () => {
        const newProject = {
            ...formData,
            _id: crypto.randomUUID(),
            entries: [],
            createdAt: new Date().toISOString(),
        };
        setProjects((prev) => [...prev, newProject]);
        setIsModalOpen(false);
        setFormData({
            projectName: "",
            description: "",
            dateStarted: "",
            deadline: "",
            totalSpentTime: 0,
            status: "running",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-6 relative">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">🚀 All Projects</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700"
                >
                    <FaPlus /> Add Project
                </button>
            </div>

            {/* Apply blur to the background content when modal is open */}
            <div className={`${isModalOpen ? "blur-sm" : ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}>
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-2xl px-5 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">{project.projectName}</h2>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}
                            >
                                {project.status}
                            </span>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 space-y-3">
                            <p className="text-gray-600 text-2xl">
                                {project.description.split(" ").slice(0, 4).join(" ")}
                                {project.description.split(" ").length > 4 ? "..." : ""}
                            </p>

                            <div className="text-sm text-gray-700 space-y-1">
                                <div className="flex items-center gap-2">
                                    <FaTasks className="text-blue-500" />
                                    <span>
                                        <span className="font-medium">Entries:</span>{" "}
                                        {project.entries.length}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaClock className="text-amber-500" />
                                    <span>
                                        <span className="font-medium">Time Spent:</span>{" "}
                                        {project.totalSpentTime} hrs
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-green-600" />
                                    <span>
                                        <span className="font-medium">Started:</span>{" "}
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaHourglassEnd className="text-red-500" />
                                    <span>
                                        <span className="font-medium">Deadline:</span>{" "}
                                        {new Date(project.deadline).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-5 py-3 rounded-b-2xl text-right">
                            <button className="text-sm text-indigo-600 hover:underline font-medium">
                                <Link to="/projectDetails" className="hover:text-purple-600">
                                    View Details
                                </Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Project Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div> {/* Background Blur */}
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative z-10">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Project</h2>

                        <input
                            type="text"
                            name="projectName"
                            placeholder="Project Name"
                            value={formData.projectName}
                            onChange={handleChange}
                            className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="date"
                            name="dateStarted"
                            value={formData.dateStarted}
                            onChange={handleChange}
                            className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="number"
                            name="totalSpentTime"
                            value={formData.totalSpentTime}
                            onChange={handleChange}
                            className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Total Time Spent (hrs)"
                        />
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="running">Running</option>
                            <option value="completed">Completed</option>
                            <option value="under seen of manager">Under Manager Review</option>
                        </select>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddProject}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Add Project
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProjects;
