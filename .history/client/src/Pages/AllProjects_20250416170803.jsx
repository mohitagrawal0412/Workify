import React, { useState, useEffect } from "react";
import axios from "axios";
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

// Modals
import AddProjectModal from "./;
import EditProjectModal from "./modals/EditProjectModal";
import DeleteProjectModal from "./modals/DeleteProjectModal";

// Status color mapping
const statusColors = {
    running: "bg-green-100 text-green-600",
    completed: "bg-purple-100 text-purple-600",
    "under seen of manager": "bg-yellow-100 text-yellow-600",
};

const AllProjects = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const [newProject, setNewProject] = useState({
        projectName: "",
        description: "",
        dateStarted: "",
        deadline: "",
        learning: "",
        status: "running",
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("/api/getAllProjects");
                console.log("Fetched projects:", response.data);
                setProjects(response.data);
            } catch (err) {
                setError("Failed to fetch projects");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleViewDetails = (projectId) => {
        navigate(`/project/${projectId}`);
    };

    const handleAddProject = (e) => {
        e.preventDefault();
        console.log("New Project:", newProject);
        setShowAddModal(false);
    };

    const handleEditProject = (e) => {
        e.preventDefault();
        console.log("Edited Project:", selectedProject);
        setShowEditModal(false);
    };

    const handleDeleteProject = () => {
        console.log("Deleted Project:", selectedProject);
        setShowDeleteModal(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-6">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-bold text-gray-800">🚀 All Projects</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
                >
                    <FaPlus /> Add Project
                </button>
            </div>

            {loading ? (
                <p>Loading projects...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.isArray(projects) &&
                        projects.map((project) => (
                            <div
                                key={project._id}
                                className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-2xl px-5 py-4 flex items-center justify-between">
                                    <h2 className="text-xl font-bold">{project.projectName}</h2>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status] || "bg-gray-200 text-gray-700"}`}
                                    >
                                        {project.status}
                                    </span>
                                </div>

                                <div className="p-5 space-y-3">
                                    <p className="text-gray-600 text-2xl">
                                        {project.description?.split(" ").slice(0, 4).join(" ")}
                                        {project.description?.split(" ").length > 4 ? "..." : ""}
                                    </p>

                                    <div className="text-sm text-gray-700 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <FaTasks className="text-blue-500" />
                                            <span>
                                                <span className="font-medium">Entries:</span>{" "}
                                                {project.entries?.length || 0}
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

                                    <button
                                        onClick={() => handleViewDetails(project._id)}
                                        className="text-indigo-600 hover:underline text-sm font-medium"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            )}

            {/* Modals */}
            {showAddModal && (
                <AddProjectModal
                    newProject={newProject}
                    setNewProject={setNewProject}
                    onCancel={() => setShowAddModal(false)}
                    onSubmit={handleAddProject}
                />
            )}

            {showEditModal && selectedProject && (
                <EditProjectModal
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                    onCancel={() => setShowEditModal(false)}
                    onSubmit={handleEditProject}
                />
            )}

            {showDeleteModal && (
                <DeleteProjectModal
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteProject}
                />
            )}
        </div>
    );
};

export default AllProjects;
