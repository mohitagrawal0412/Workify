import React, { useState } from "react";
import {
    FaClock,
    FaTasks,
    FaCalendarAlt,
    FaHourglassEnd,
    FaPlus,
    FaEdit,
    FaTrash,
} from "react-icons/fa";
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
];

const statusColors = {
    running: "bg-green-100 text-green-600",
    completed: "bg-purple-100 text-purple-600",
    "under seen of manager": "bg-yellow-100 text-yellow-600",
};

const AllProjects = () => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false); // State for Add Modal
    const [selectedProject, setSelectedProject] = useState(null);
    const [newProject, setNewProject] = useState({
        projectName: "",
        description: "",
        deadline: "",
    });

    const handleViewDetails = (projectId) => {
        navigate(`/project/${projectId}`);
    };

    const handleAddProject = () => {
        setShowAddModal(true);
    };

    const handleAddProjectSubmit = (e) => {
        e.preventDefault();
        // Here you can add logic to submit the new project, like an API call
        console.log("New Project Added:", newProject);
        setShowAddModal(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-6">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-bold text-gray-800">🚀 All Projects</h1>
                <button
                    onClick={handleAddProject}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
                >
                    <FaPlus /> Add Project
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {dummyProjects.map((project) => (
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

                        {/* Card Footer */}
                        <div className="flex gap-3 px-5 py-3 rounded-b-2xl justify-end bg-gray-50">
                            <button
                                onClick={() => {
                                    setSelectedProject(project);
                                    setShowEditModal(true);
                                }}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <FaEdit />
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedProject(project);
                                    setShowDeleteModal(true);
                                }}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button>

                            <Link
                                to={`/entryDetails`}
                                className="text-indigo-600 hover:underline text-sm font-medium"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Project Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                        <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>

                        <form
                            onSubmit={handleAddProjectSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block font-medium mb-1">Project Name</label>
                                <input
                                    type="text"
                                    value={newProject.projectName}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            projectName: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Description</label>
                                <textarea
                                    value={newProject.description}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Deadline</label>
                                <input
                                    type="date"
                                    value={newProject.deadline.slice(0, 10)}
                                    onChange={(e) =>
                                        setNewProject({
                                            ...newProject,
                                            deadline: new Date(e.target.value).toISOString(),
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                    Add Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedProject && (
                <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-red-600">Delete Project</h2>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to delete{" "}
                            <strong>{selectedProject.projectName}</strong>?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    console.log("Deleted:", selectedProject._id);
                                    setShowDeleteModal(false);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedProject && (
                <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                        <h2 className="text-2xl font-semibold mb-4">Edit Project</h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("Updated:", selectedProject);
                                setShowEditModal(false);
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block font-medium mb-1">Project Name</label>
                                <input
                                    type="text"
                                    value={selectedProject.projectName}
                                    onChange={(e) =>
                                        setSelectedProject({
                                            ...selectedProject,
                                            projectName: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Description</label>
                                <textarea
                                    value={selectedProject.description}
                                    onChange={(e) =>
                                        setSelectedProject({
                                            ...selectedProject,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Deadline</label>
                                <input
                                    type="date"
                                    value={selectedProject.deadline.slice(0, 10)}
                                    onChange={(e) =>
                                        setSelectedProject({
                                            ...selectedProject,
                                            deadline: new Date(e.target.value).toISOString(),
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProjects;


{/* Edit Modal */}
{showEditModal && selectedProject && (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <h2 className="text-2xl font-semibold mb-4">Edit Project</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Updated:", selectedProject);
                    setShowEditModal(false);
                }}
                className="space-y-4"
            >
                <div>
                    <label className="block font-medium mb-1">Project Name</label>
                    <input
                        type="text"
                        value={selectedProject.projectName}
                        onChange={(e) =>
                            setSelectedProject({
                                ...selectedProject,
                                projectName: e.target.value,
                            })
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        value={selectedProject.description}
                        onChange={(e) =>
                            setSelectedProject({
                                ...selectedProject,
                                description: e.target.value,
                            })
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Deadline</label>
                    <input
                        type="date"
                        value={selectedProject.deadline.slice(0, 10)}
                        onChange={(e) =>
                            setSelectedProject({
                                ...selectedProject,
                                deadline: new Date(e.target.value).toISOString(),
                            })
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
)}
