// components/modals/AddProjectModal.jsx
import React from "react";

const AddProjectModal = ({ newProject, setNewProject, onCancel, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Project Name</label>
                        <input
                            type="text"
                            value={newProject.projectName}
                            onChange={(e) =>
                                setNewProject({ ...newProject, projectName: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <textarea
                            value={newProject.description}
                            onChange={(e) =>
                                setNewProject({ ...newProject, description: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Date Started</label>
                        <input
                            type="date"
                            value={newProject.dateStarted}
                            onChange={(e) =>
                                setNewProject({ ...newProject, dateStarted: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Deadline</label>
                        <input
                            type="date"
                            value={newProject.deadline}
                            onChange={(e) =>
                                setNewProject({ ...newProject, deadline: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Learning</label>
                        <input
                            type="text"
                            value={newProject.learning}
                            onChange={(e) =>
                                setNewProject({ ...newProject, learning: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Status</label>
                        <select
                            value={newProject.status}
                            onChange={(e) =>
                                setNewProject({ ...newProject, status: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="running">Running</option>
                            <option value="completed">Completed</option>
                            <option value="under seen of manager">Under Seen of Manager</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onCancel}
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
    );
};

export default AddProjectModal;
