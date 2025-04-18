import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to access route parameters
import axios from "axios"; // Importing Axios for making API calls
import {
    FaDotCircle,
    FaClock,
    FaTags,
    FaPlus,
    FaArrowLeft,
    FaEdit,
    FaTrashAlt,
} from "react-icons/fa";

// Importing modal components
import EditModal from "../modals/EditEntryModal.jsx";
import DeleteModal from "../modals/DeleteEntryModal.jsx";
import AddSubentryModal from "../modals/AddSubEntryModal.jsx";

const EntryDetails = () => {
    const navigate = useNavigate();
    const { projectId, entryId } = useParams(); // Using useParams to access dynamic route parameters
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    // States to hold entry and its edited version
    const [entry, setEntry] = useState(null);  // Initially null, waiting for data from API
    const [editedEntry, setEditedEntry] = useState(null); // To handle editing
    const [newSubentry, setNewSubentry] = useState({
        workTitle: "",
        description: "",
        tags: [],
        spentTime: 0,
    });

    // Fetch entry data from API when component mounts
    useEffect(() => {
        const fetchEntryDetails = async () => {
            try {
                const response = await axios.get(`/entries/${projectId}/${entryId}`);
                if (response.data) {
                    setEntry(response.data);
                    setEditedEntry(response.data);
                } else {
                    console.warn("No entry data returned from API");
                }
            } catch (error) {
                console.error("Error fetching entry data:", error);
            }
        };

        fetchEntryDetails();
    }, [projectId, entryId]);

    const handleEntryClick = (subentry) => {
        navigate("/subEntryDetails", { state: { subentry } });
    };

    const handleGoToAllEntries = () => {
        navigate("/projectDetails");
    };

    const handleEditEntry = () => {
        setEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        // Call API to save the edited entry
        axios.put(`entries/${entry.id}`, editedEntry)
            .then(response => {
                setEntry(response.data);
                setEditModalOpen(false);
            })
            .catch(error => {
                console.error("Error saving edited entry:", error);
            });
    };

    const handleDeleteEntry = () => {
        // Call API to delete the entry
        axios.delete(`entries/${entry.id}`)
            .then(() => {
                navigate("/projects");  // Redirect after deletion
            })
            .catch(error => {
                console.error("Error deleting entry:", error);
            });
    };

    const handleAddSubentry = () => {
        const updatedEntry = { ...entry };
        updatedEntry.subentries.push(newSubentry);

        // Call API to add the subentry
        axios.post(`https://your-backend-api.com/entry/${entry.id}/subentry`, newSubentry)
            .then(response => {
                setEntry(response.data);  // Update entry state with the new subentry
                setAddModalOpen(false);
                setNewSubentry({
                    workTitle: "",
                    description: "",
                    tags: [],
                    spentTime: 0,
                });
            })
            .catch(error => {
                console.error("Error adding subentry:", error);
            });
    };

    // Ensure entry is loaded before rendering the subentries
    if (!entry) {
        return <div>Loading...</div>; // Show loading state until the data is fetched
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200">
            {/* Left Panel */}
            <div className="w-full lg:w-1/3 lg:sticky top-0 max-h-screen overflow-y-auto p-6 bg-white/50 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-gray-200 shadow-xl lg:rounded-r-3xl transition-all duration-500 ease-in-out">
                <div className="p-6 bg-white/80 border border-gray-300 rounded-2xl shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                        <FaDotCircle className="text-indigo-500 text-xl" />
                        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
                            {entry.entryTitle} {/* Adjusted to show entryTitle */}
                        </h1>
                    </div>

                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                        {entry.description} {/* Adjusted to show entry description */}
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
                            📅 {new Date(entry.createdAt).toLocaleDateString()}
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
                        {/* Check if entry.subentries exists */}
                        {(entry.subentries || []).map((sub, index) => {
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
                                        className={`w-5/6 md:w-5/12 p-5 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${isLeft ? "mr-auto" : "ml-auto"}`}
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

            {/* Modals */}
            {isEditModalOpen && (
                <EditModal
                    editedEntry={editedEntry}
                    setEditedEntry={setEditedEntry}
                    onSave={handleSaveEdit}
                    onClose={() => setEditModalOpen(false)}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteModal
                    entryTitle={entry.entryTitle}
                    onDelete={handleDeleteEntry}
                    onCancel={() => setDeleteModalOpen(false)}
                />
            )}

            {isAddModalOpen && (
                <AddSubentryModal
                    newSubentry={newSubentry}
                    setNewSubentry={setNewSubentry}
                    onSave={handleAddSubentry}
                    onClose={() => setAddModalOpen(false)}
                />
            )}
        </div>
    );
};

export default EntryDetails;
