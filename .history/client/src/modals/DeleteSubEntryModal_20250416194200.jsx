// components/DeleteSubEntryModal.jsx
import React from "react";

const DeleteSubEntryModal = ({ subEntryDetails, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/30">
            <div className="bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold text-red-600 mb-6">Delete Subentry</h2>
                <p className="text-gray-700 mb-6">
                    Are you sure you want to delete <strong>{subEntryDetails.workTitle}</strong>? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-6">
                    <button onClick={onCancel} className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteSubEntryModal;
