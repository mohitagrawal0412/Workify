import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import AddEntryModal from "../modals/AddEntryModal.jsx";
import { useProjectContext } from "../Pages/ProjectContext"; // Import custom hook

const ProjectDetails = () => {
    const navigate = useNavigate();
    const { projectId } = useParams(); // ✅ Get projectId from the URL
    const { projects, loading, error, addProject, deleteProject, updateProject } = useProjectContext(); // Use context

    const [showAddEntryModal, setShowAddEntryModal] = useState(false);
    const [newEntry, setNewEntry] = useState({
        title: "",
        description: "",
        date: "",
    });

    const [project, setProject] = useState(null); // Local state for the selected project
    const [entries, setEntries] = useState([]); // Local state for project entries
    const [entryDetails, setEntryDetails] = useState(null); // Local state for the clicked entry's details
    // const [selectedProjectEntry, setSelectedProjectEntry] = useState([]);

    // Fetch the selected project and entries when the component loads
    useEffect(() => {
        const selectedProject = projects.find((p) => p._id === projectId);
        if (selectedProject) {

            setProject(selectedProject);
            console.log("Project = " + project);
            setEntries(selectedProject.entries || []);
        }
    }, [projects, projectId]);

    // Debugging the entries to check if the data is available
    useEffect(() => {
        console.log("Entries:", entries); // Log the entries to check if they're being populated correctly
    }, [entries]);

    // Sort entries by date if entries exist and date is present
    const sortedEntries = entries.sort((a, b) => {
        return a.date && b.date ? new Date(a.date) - new Date(b.date) : 0;
    });

    // Fetch the details of a clicked entry
    const handleEntryClick = async (entryId) => {
        try {
            const response = await axios.get(`/entries/${entryId}`);
            console.log(" Entry Response")
            setEntryDetails(response.data); // Store the details of the entry in state
            console.log(response.data); // Log to verify
        } catch (error) {
            console.error("Error fetching entry details:", error);
        }
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
                setEntries(entries.filter((e) => e._id !== entry._id));
            } catch (err) {
                console.error("Error deleting entry:", err);
            }
        };
        deleteEntry();
    };

    const handleAddEntrySubmit = (e) => {
        e.preventDefault();
        const newEntryObj = { ...newEntry, projectId }; // Attach current projectId
        const addEntry = async () => {
            try {
                const res = await axios.post(`/api/entries`, newEntryObj);
                setEntries([...entries, res.data]);
                setShowAddEntryModal(false);
                setNewEntry({ title: "", description: "", date: "" });
            } catch (err) {
                console.error("Error adding entry:", err);
            }
        };
        addEntry();
    };

    // If loading or error exists, return loading or error message
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // If the project is not found in the context (possibly deleted), return a message
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
                                            onClick={() => handleEntryClick(entry._id)} // Pass entry ID to fetch details
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
