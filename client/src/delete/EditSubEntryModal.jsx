// components/EditSubEntryModal.jsx
import React from "react";

const EditSubEntryModal = ({ subEntryDetails, setSubEntryDetails, onClose, onSave }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/30">
            <div className="bg-white/90 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Edit Subentry</h2>
                <form onSubmit={onSave} className="space-y-6">
                    {/* Work Title */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Work Title</label>
                        <input
                            type="text"
                            value={subEntryDetails.workTitle}
                            onChange={(e) => setSubEntryDetails({ ...subEntryDetails, workTitle: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={subEntryDetails.description}
                            onChange={(e) => setSubEntryDetails({ ...subEntryDetails, description: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-300"
                            rows={4}
                        />
                    </div>
                    {/* What Was Learned */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">What Was Learned</label>
                        <textarea
                            value={subEntryDetails.whatLearned}
                            onChange={(e) => setSubEntryDetails({ ...subEntryDetails, whatLearned: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-300"
                            rows={4}
                        />
                    </div>
                    {/* Tags */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Tags (comma separated)</label>
                        <input
                            type="text"
                            value={subEntryDetails.tags?.join(', ') || ''}
                            onChange={(e) =>
                                setSubEntryDetails({
                                    ...subEntryDetails,
                                    tags: e.target.value.split(',').map(tag => tag.trim()),
                                })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                    {/* Notes */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            value={subEntryDetails.notes}
                            onChange={(e) => setSubEntryDetails({ ...subEntryDetails, notes: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-300"
                            rows={4}
                        />
                    </div>
                    {/* Time Spent */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Time Spent (hours)</label>
                        <input
                            type="number"
                            value={subEntryDetails.spentTime}
                            onChange={(e) => setSubEntryDetails({ ...subEntryDetails, spentTime: parseInt(e.target.value) || 0 })}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                    {/* Footer Buttons */}
                    <div className="flex justify-between pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 text-white rounded-lg px-6 py-3 hover:bg-gray-700 transition-all">
                            Cancel
                        </button>
                        <button type="submit" className="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 transition-all">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSubEntryModal;
