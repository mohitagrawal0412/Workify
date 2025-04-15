import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ProjectDetails = () => {
    const navigate = useNavigate();
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        date: "",
    });
    const [entries, setEntries] = useState([
        {
            _id: "entry1",
            title: "Initial Planning",
            description: "Planning the initial project tasks and setting goals.",
            date: "2025-04-01",
        },
        {
            _id: "entry2",
            title: "Research Phase",
            description: "Researching the tools and technologies for the project.",
            date: "2025-04-10",
        },
        {
            _id: "entry3",
            title: "Design Phase",
            description: "Designing the initial prototypes and user flow.",
            date: "2025-04-20",
        },
        {
            _id: "entry4",
            title: "Implementation Phase",
            description: "Starting the development of core features.",
            date: "2025-05-01",
        },
    ]);

    const project = {
        projectName: "Awesome Project",
        description: "This is an awesome project with several tasks that need to be completed over the course of the next few weeks.",
        deadline: "2025-12-31",
        learning: "Learning about project management and task delegation.",
        status: "running",
    };

    const handleEntryClick = (entry) => {
        navigate("/entryDetails", { state: { entry } }); // Navigate to Entry Details page
    };

    const handleViewFullProject = () => {
        navigate("/projectOverview");
    };

    const handleAddNewTask = () => {
        setShowAddTaskModal(true);
    };

    const handleViewTeamMembers = () => {
        navigate("/teamMembers");
    };

    // Remove modal logic for Edit and Delete, and directly navigate to entryDetails page
    const handleEditTask = (task) => {
        navigate("/entryDetails", { state: { entry: task } });
    };

    const handleDeleteTask = (task) => {
        setTaskToDelete(task);
        const updatedEntries = entries.filter((entry) => entry._id !== task._id);
        setEntries(updatedEntries); // Remove task from entries array immediately
    };

    const handleAddTaskSubmit = (e) => {
        e.preventDefault();
        const newTaskEntry = { ...newTask, _id: Date.now().toString() };
        setEntries([...entries, newTaskEntry]); // Add new task to the entries array
        setShowAddTaskModal(false);
        setNewTask({ title: "", description: "", date: "" }); // Reset the form
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden">
            {/* Left Side: Fixed Project Info */}
            <div className="w-full lg:w-1/3 p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-none lg:rounded-2xl lg:sticky top-0 lg:h-screen overflow-y-auto">
                <div className="p-6 bg-white/90 rounded-2xl shadow-lg space-y-6">
                    {/* Title with Icon */}
                    <div className="flex items-center gap-3 mb-6">
                        <FaCheckCircle className="text-indigo-600 text-3xl" />
                        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
                            {project.projectName}
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-base leading-relaxed">
                        {project.description}
                    </p>

                    {/* Project Meta */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="font-semibold text-indigo-500">📅 Deadline:</span>
                            <span className="font-medium">{new Date(project.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="font-semibold text-indigo-500">📚 Learning:</span>
                            <span className="font-medium">{project.learning}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="font-semibold text-indigo-500">🟢 Status:</span>
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                                {project.status}
                            </span>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
                        <div className="space-y-3 mt-4">
                            <button
                                onClick={handleViewFullProject}
                                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                            >
                                View Full Project
                            </button>
                            <button
                                onClick={handleAddNewTask}
                                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                            >
                                Add New Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Timeline */}
            <div className="w-full lg:w-2/3 p-6 overflow-y-auto lg:h-screen">
                <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">Project Timeline</h2>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-blue-400"></div>

                    <div className="space-y-16">
                        {entries.map((entry, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div
                                    key={`${entry._id}-${index}`}
                                    className={`relative flex ${isLeft ? "justify-start" : "justify-end"} w-full`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="w-6 h-6 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center shadow">
                                            <FaCheckCircle className="text-blue-500 text-sm" />
                                        </div>
                                    </div>

                                    {/* Entry Card */}
                                    <div
                                        onClick={() => handleEntryClick(entry)}
                                        className={`w-5/12 p-5 bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${isLeft ? "mr-auto" : "ml-auto"}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold text-indigo-600">{entry.title}</h3>
                                            <span className="text-sm text-gray-400">
                                                {new Date(entry.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-gray-600">{entry.description}</p>
                                        <div className="mt-2 flex justify-end gap-4">
                                            <button
                                                onClick={() => handleEditTask(entry)} // Navigate to entryDetails page
                                                className="text-indigo-600 hover:text-indigo-800"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(entry)} // Immediately delete the task
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Add New Task Modal */}
            {showAddTaskModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                        <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
                        <form onSubmit={handleAddTaskSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium mb-1">Task Title</label>
                                <input
                                    type="text"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Description</label>
                                <textarea
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    value={newTask.date}
                                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddTaskModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
