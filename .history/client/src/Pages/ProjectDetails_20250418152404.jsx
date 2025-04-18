import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import AddEntryModal from "../modals/AddEntryModal.jsx";
import { useProjectContext } from "../Pages/ProjectContext";

const ProjectDetails = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { projects, loading, error } = useProjectContext();

    const [showAddEntryModal, setShowAddEntryModal] = useState(false);
    const [newEntry, setNewEntry] = useState({
        title: "",
        description: "",
        date: "",
    });

    const [project, setProject] = useState(null);
    const [entries, setEntries] = useState([]);
    const [entryDetails, setEntryDetails] = useState(null);

    // Fetch project details and entries from API
    useEffect(() => {
        const fetchProjectAndEntries = async () => {
            try {
                const selectedProject = projects.find((p) => p._id === projectId);
                if (selectedProject) {
                    setProject(selectedProject);
                }

                const response = await axios.get(`/api/entries/${projectId}`);
                setEntries(response.data);
            } catch (error) {
                console.error("Error fetching project entries:", error);
            }
        };

        fetchProjectAndEntries();
    }, [projectId, projects]);

    const sortedEntries = entries.sort((a, b) => {
        return a.date && b.date ? new Date(a.date) - new Date(b.date) : 0;
    });


    const handleEntryClick = (entry) => {

        const entryId = entry;
        navigate(`/entryDetails/${projectId}/${entryId}`, { state: { entry } });
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
        const deleteEntry = async () => {
            try {
                await axios.delete(`/api/entries/${entry._id}`);
                setEntries((prev) => prev.filter((e) => e._id !== entry._id));
            } catch (err) {
                console.error("Error deleting entry:", err);
            }
        };
        deleteEntry();
    };

    const handleAddEntrySubmit = async (newEntryData) => {
        try {
            // Ensure the date is formatted as expected by the backend
            const formattedDate = new Date(newEntryData.date).toISOString();

            // Update newEntryData with formatted date if needed
            const updatedEntryData = { ...newEntryData, date: formattedDate };

            console.log("Submitting updated entry:", updatedEntryData);

            const projectId = project._id;

            const response = await axios.post(`/api/entries/${projectId}`, updatedEntryData);

            console.log("New Entry Created:", response.data);

            setShowAddEntryModal(false);
            setEntries((prevEntries) => [...prevEntries, response.data]);
        } catch (error) {
            console.error("Error adding new entry:", error.response?.data || error.message);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden">
            {/* Left Side - Project Info */}
            <div className="w-full lg:w-1/3 p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-none lg:rounded-2xl lg:sticky top-0 lg:h-screen overflow-y-auto">
                <div className="p-6 bg-white/90 rounded-2xl shadow-lg space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <FaCheckCircle className="text-indigo-600 text-3xl" />
                        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
                            {project.projectName}
                        </h1>
                    </div>

                    <p className="text-gray-700 text-base leading-relaxed">{project.description}</p>

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

            {/* Right Side - Timeline */}
            <div className="w-full lg:w-2/3 p-6 overflow-y-auto lg:h-screen">
                <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">Project Timeline</h2>

                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-blue-400"></div>

                    <div className="space-y-16">
                        {sortedEntries.length > 0 ? (
                            sortedEntries.map((entry, index) => {
                                const isLeft = index % 2 === 0;
                                return (
                                    <div
                                        key={`${entry._id}-${index}`}
                                        className={`relative flex ${isLeft ? "justify-start" : "justify-end"} w-full`}
                                    >
                                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-10">
                                            <div className="w-6 h-6 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center shadow">
                                                <FaCheckCircle className="text-blue-500 text-sm" />
                                            </div>
                                        </div>

                                        <div
                                            onClick={() => handleEntryClick(entry._id)}
                                            className={`w-5/12 p-5 bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${isLeft ? "mr-auto" : "ml-auto"}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-lg font-semibold text-indigo-600">{entry.entryTitle}</h3>
                                                <span className="text-sm text-gray-400">
                                                    {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : "No date"}
                                                </span>


                                            </div>
                                            <p className="mt-2 text-gray-600">{entry.description}</p>
                                            <div className="mt-2 flex justify-end gap-4">
                                                <button
                                                    onClick={() => handleEditEntry(entry)}
                                                    className="text-indigo-600 hover:text-indigo-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteEntry(entry)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>No entries found.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Entry Modal */}
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
