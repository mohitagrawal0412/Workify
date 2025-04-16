import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import AddEntryModal from "../components/AddEntryModal"; // Importing the new modal component

const ProjectDetails = () => {
    const navigate = useNavigate();
    const [showAddEntryModal, setShowAddEntryModal] = useState(false); // For showing/hiding the Add Entry modal
    const [newEntry, setNewEntry] = useState({
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
        navigate("/projects");
    };

    const handleAddNewEntry = () => {
        setShowAddEntryModal(true);
    };

    const handleEditEntry = (entry) => {
        navigate("/entryDetails", { state: { entry } });
    };

    const handleDeleteEntry = (entry) => {
        const updatedEntries = entries.filter((e) => e._id !== entry._id);
        setEntries(updatedEntries);
    };

    const handleAddEntrySubmit = (e) => {
        e.preventDefault();
        const newEntryObj = { ...newEntry, _id: Date.now().toString() };
        setEntries([...entries, newEntryObj]);
        setShowAddEntryModal(false);
        setNewEntry({ title: "", description: "", date: "" });
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
                                onClick={handleAddNewEntry}
                                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                            >
                                Add New Entry
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
                                                onClick={() => handleEditEntry(entry)} // Navigate to entryDetails page
                                                className="text-indigo-600 hover:text-indigo-800"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEntry(entry)} // Immediately delete the task
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

            {/* Add New Entry Modal */}
            {showAddEntryModal && (
                <AddEntryModal
                    newEntry={newEntry}
                    setNewEntry={setNewEntry}
                    onClose={() => setShowAddEntryModal(false)}
                    onSubmit={handleAddEntrySubmit}
                />
            )}
        </div>
    );
};

export default ProjectDetails;
