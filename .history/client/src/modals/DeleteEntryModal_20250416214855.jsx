import React from "react";

const DeleteEntryModal = ({ entryTitle, onDelete, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/30">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-xl font-bold text-red-600 mb-3">Delete Entry</h2>
                <p className="text-gray-700 mb-6">
                    Are you sure you want to delete <strong>{entryTitle}</strong>? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                    <button onClick={onCancel} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                        Cancel
                    </button>
                    <button onClick={onDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteEntryModal;
