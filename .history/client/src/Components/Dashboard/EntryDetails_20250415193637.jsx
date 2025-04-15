import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaDotCircle,
    FaClock,
    FaTags,
    FaPlus,
    FaArrowLeft,
    FaEdit,
    FaTrashAlt,
} from "react-icons/fa";

const EntryDetails = () => {
    const navigate = useNavigate();

    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const [entry, setEntry] = useState({
        title: "Initial Planning",
        description: "Planning the initial project tasks and setting goals.",
        date: "2025-04-01",
        subentries: [
            {
                workTitle: "UI Design",
                description: "Designed the homepage UI using Figma.",
                whatLearned: "Learned Figma and design principles for web.",
                tags: ["UI", "Design", "Figma"],
                notes: "Worked with the design team to finalize UI components.",
                attachments: ["https://figma.com/design-url", "homepage_mockup.png"],
                spentTime: 5,
            },
            {
                workTitle: "HTML & CSS",
                description: "Implemented the HTML structure and styled it using CSS.",
                whatLearned: "Improved HTML and CSS skills, including responsive design.",
                tags: ["HTML", "CSS", "Responsive"],
                notes: "Ensured compatibility across different browsers.",
                attachments: ["html_code_snippet.txt", "css_code_snippet.css"],
                spentTime: 8,
            },
        ],
    });

    const [editedEntry, setEditedEntry] = useState({ ...entry });

    const handleEntryClick = (subentry) => {
        navigate("/subEntryDetails", { state: { subentry } });
    };

    const handleGoToAllEntries = () => {
        navigate("/projectDetails");
    };

    const handleEditEntry = () => {
        setEditedEntry({ ...entry });
        setEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        setEntry(editedEntry);
        setEditModalOpen(false);
    };

    const handleDeleteEntry = () => {
        console.log("Entry deleted:", entry.title);
        navigate("/projects"); // Or wherever you want to redirect
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200">
            {/* Left Panel */}
            <div className="w-full lg:w-1/3 lg:sticky top-0 max-h-screen overflow-y-auto p-6 bg-white/50 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-gray-200 shadow-xl lg:rounded-r-3xl transition-all duration-500 ease-in-out">
                <div className="p-6 bg-white/80 border border-gray-300 rounded-2xl shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                        <FaDotCircle className="text-indigo-500 text-xl" />
                        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
                            {entry.title}
                        </h1>
                    </div>

                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                        {entry.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-4 flex-wrap">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Author:</span> John Doe
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Project:</span> Web Design
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full shadow-sm">
                            📅 {new Date(entry.date).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        <button
                            onClick={() => setAddModalOpen(true)}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-lg p-2 shadow-lg hover:bg-indigo-700 transition duration-300"
                        >
                            <FaPlus />
                            Add Subentry
                        </button>

                        <button
                            onClick={handleEditEntry}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg p-2 shadow-lg hover:bg-blue-700"
                        >
                            <FaEdit />
                            Edit Entry
                        </button>

                        <button
                            onClick={() => setDeleteModalOpen(true)}
                            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white rounded-lg p-2 shadow-lg hover:bg-red-700"
                        >
                            <FaTrashAlt />
                            Delete Entry
                        </button>

                        <button
                            onClick={handleGoToAllEntries}
                            className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white rounded-lg p-2 shadow-lg hover:bg-gray-700 transition duration-300"
                        >
                            <FaArrowLeft />
                            All Entries
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-2/3 p-6 overflow-y-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">
                    Subentries Timeline
                </h2>

                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-indigo-400"></div>

                    <div className="space-y-16">
                        {entry.subentries.map((sub, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div
                                    key={index}
                                    className={`relative flex ${isLeft ? "justify-start" : "justify-end"} w-full`}
                                >
                                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="w-6 h-6 bg-white border-4 border-indigo-500 rounded-full flex items-center justify-center shadow">
                                            <FaDotCircle className="text-indigo-500 text-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className={`w-5/6 md:w-5/12 p-5 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${isLeft ? "mr-auto" : "ml-auto"
                                            }`}
                                        onClick={() => handleEntryClick(sub)}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-lg font-semibold text-indigo-600">
                                                {sub.workTitle}
                                            </h3>
                                            <span className="text-sm text-gray-400">
                                                <FaClock className="inline mr-1" />
                                                {sub.spentTime}h
                                            </span>
                                        </div>

                                        <p className="text-gray-600 mb-2">{sub.description}</p>

                                        {sub.tags?.length > 0 && (
                                            <div className="text-sm text-gray-700 flex flex-wrap gap-2">
                                                <FaTags className="text-indigo-500 mt-1 mr-1" />
                                                {sub.tags.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Edit Entry Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/30">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold text-indigo-700 mb-4">Edit Entry</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={editedEntry.title}
                                    onChange={(e) => setEditedEntry({ ...editedEntry, title: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={editedEntry.description}
                                    onChange={(e) => setEditedEntry({ ...editedEntry, description: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveEdit}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Entry Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/30">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                        <h2 className="text-xl font-bold text-red-600 mb-3">Delete Entry</h2>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to delete <strong>{entry.title}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setDeleteModalOpen(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteEntry}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Add Subentry Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/30">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold text-indigo-700 mb-4">Add Subentry</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Work Title</label>
                                <input
                                    type="text"
                                    value={newSubentry.workTitle}
                                    onChange={(e) => setNewSubentry({ ...newSubentry, workTitle: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={newSubentry.description}
                                    onChange={(e) => setNewSubentry({ ...newSubentry, description: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tags</label>
                                <input
                                    type="text"
                                    value={newSubentry.tags.join(", ")}
                                    onChange={(e) => setNewSubentry({ ...newSubentry, tags: e.target.value.split(", ") })}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    placeholder="Add tags separated by commas"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Time Spent (hours)</label>
                                <input
                                    type="number"
                                    value={newSubentry.spentTime}
                                    onChange={(e) => setNewSubentry({ ...newSubentry, spentTime: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setAddModalOpen(false)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddSubentry}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>
    );
};

export default EntryDetails;
