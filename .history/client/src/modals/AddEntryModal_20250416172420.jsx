import React from "react";

const AddEntryModal = ({ newEntry, setNewEntry, onClose, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                <h2 className="text-2xl font-semibold mb-4">Add New Entry</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Entry Title</label>
                        <input
                            type="text"
                            value={newEntry.title}
                            onChange={(e) =>
                                setNewEntry({ ...newEntry, title: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <textarea
                            value={newEntry.description}
                            onChange={(e) =>
                                setNewEntry({ ...newEntry, description: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Date</label>
                        <input
                            type="date"
                            value={newEntry.date}
                            onChange={(e) =>
                                setNewEntry({ ...newEntry, date: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Add Entry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEntryModal;
