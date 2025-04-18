import React from "react";

const EditEntryModal = ({ editedEntry, setEditedEntry, onSave, onClose }) => {
    return (
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
                        <button onClick={onClose} type="button" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                        <button onClick={onSave} type="button" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
