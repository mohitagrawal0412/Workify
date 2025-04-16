// components/modals/DeleteProjectModal.jsx
import React from "react";

const DeleteProjectModal = ({ onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                <h2 className="text-2xl font-semibold mb-4">Delete Project</h2>
                <p>Are you sure you want to delete the project?</p>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProjectModal;
