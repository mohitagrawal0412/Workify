import React, { useState } from "react";

const AddProjectModal = ({ showModal, handleClose, handleAddProject }) => {
    const [newProject, setNewProject] = useState({
        projectName: "",
        description: "",
        dateStarted: "",
        deadline: "",
        totalSpentTime: 0,
        status: "running",
        learning: "",
        personalFeedback: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddProject(newProject); // Pass the new project data to the parent component
        handleClose(); // Close the modal
    };

    return (
        <>
            {showModal && (
                <div>
                <div className="fixed inset-0 bg-gray-800  opacity-10 backdrop-blur-sm flex justify-center items-center">


                    {/* <div className="fixed inset-0 bg-transparent flex justify-center items-center"> */}


                    <div className="bg-white rounded-lg shadow-lg w-96 p-6 overflow-y-auto max-h-[80vh]">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Project</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-700">Project Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    name="projectName"
                                    value={newProject.projectName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-gray-700">Description</label>
                                <textarea
                                    rows="3"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    name="description"
                                    value={newProject.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-gray-700">Date Started</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    name="dateStarted"
                                    value={newProject.dateStarted}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-gray-700">Deadline</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    name="deadline"
                                    value={newProject.deadline}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-gray-700">Status</label>
                                <select
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    name="status"
                                    value={newProject.status}
                                    onChange={handleChange}
                                >
                                    <option value="running">Running</option>
                                    <option value="completed">Completed</option>
                                    <option value="under seen of manager">Under Seen of Manager</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-gray-700">Learning</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    name="learning"
                                    value={newProject.learning}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm text-gray-700">Personal Feedback</label>
                                <textarea
                                    rows="3"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    name="personalFeedback"
                                    value={newProject.personalFeedback}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="text-gray-600 hover:text-gray-800 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-sm"
                                >
                                    Add Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            </div>
        </>
    );
};

export default AddProjectModal;
