import React from "react";

const AddSubentryModal = ({ newSubentry, setNewSubentry, onSave, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/30">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold text-indigo-700 mb-4">Add Subentry</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Work Title</label>
                        <input
                            type="text"
                            value={newSubentry.workTitle}
                            onChange={(e) => setNewSubentry({ ...newSubentry, workTitle: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={newSubentry.description}
                            onChange={(e) => setNewSubentry({ ...newSubentry, description: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tags</label>
                        <input
                            type="text"
                            value={newSubentry.tags.join(", ")}
                            onChange={(e) => setNewSubentry({ ...newSubentry, tags: e.target.value.split(", ") })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Add tags separated by commas"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Time Spent (hours)</label>
                        <input
                            type="number"
                            value={newSubentry.spentTime}
                            onChange={(e) => setNewSubentry({ ...newSubentry, spentTime: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
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

export default AddSubentryModal;
