// components/modals/EditProjectModal.jsx
import React from "react";

const EditProjectModal = ({ selectedProject, setSelectedProject, onCancel, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                <h2 className="text-2xl font-semibold mb-4">Edit Project</h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Project Name</label>
                        <input
                            type="text"
                            value={selectedProject.projectName}
                            onChange={(e) =>
                                setSelectedProject({ ...selectedProject, projectName: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <textarea
                            value={selectedProject.description}
                            onChange={(e) =>
                                setSelectedProject({ ...selectedProject, description: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Deadline</label>
                        <input
                            type="date"
                            value={selectedProject.deadline?.slice(0, 10)}
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
                            onClick={onCancel}
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
    );
};

export default EditProjectModal;
