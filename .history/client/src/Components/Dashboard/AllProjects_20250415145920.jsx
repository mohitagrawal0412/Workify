import React, { useState } from "react";
import AddProjectModal from "./AddProjectModal"; // Import the AddProjectModal component
import { FaClock, FaTasks, FaCalendarAlt, FaHourglassEnd } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const dummyProjects = [
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
        description: "Personal portfolio for showcasing work.",
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
];

const statusColors = {
    running: "bg-green-100 text-green-600",
    completed: "bg-purple-100 text-purple-600",
    "under seen of manager": "bg-yellow-100 text-yellow-600",
};

const AllProjects = () => {
    const [projects, setProjects] = useState(dummyProjects);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAddProject = (newProject) => {
        console.log("New Project Added:", newProject);
        setProjects((prevProjects) => [
            ...prevProjects,
            { ...newProject, _id: new Date().toISOString() },
        ]);
        handleCloseModal(); // Close the modal
    };

    return (
        <>        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">🚀 All Projects</h1>

            <div className="mb-5 text-center">
                <button
                    onClick={handleShowModal}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 transition duration-200"
                    aria-label="Add a new project"
                >
                    Add Project
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                        <span className="font-medium">Entries:</span> {project.entries.length}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-amber-500" />
                                    <span>
                                        <span className="font-medium">Time Spent:</span> {project.totalSpentTime} hrs
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
            <AddProjectModal
                showModal={showModal}
                handleClose={handleCloseModal}
                handleAddProject={handleAddProject}
            />
        </div>
    );
};

export default AllProjects;
