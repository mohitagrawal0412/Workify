import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    FaClock,
    FaPaperclip,
    FaTags,
    FaBookOpen,
    FaArrowLeft,
    FaStickyNote,
    FaInfoCircle,
    FaEdit,
    FaTrashAlt,
} from "react-icons/fa";

const SubEntryDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const sub = state?.subentry;

    const [modalImage, setModalImage] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [subEntryDetails, setSubEntryDetails] = useState(sub);

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    const openEditModal = () => setShowEditModal(true);
    const closeEditModal = () => setShowEditModal(false);

    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);

    const openAddModal = () => setShowAddModal(true);
    const closeAddModal = () => setShowAddModal(false);

    const handleDeleteAttachment = (attachmentIndex) => {
        // Logic to delete the attachment
        const updatedAttachments = subEntryDetails.attachments.filter(
            (_, index) => index !== attachmentIndex
        );
        setSubEntryDetails({
            ...subEntryDetails,
            attachments: updatedAttachments,
        });
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        // Logic to save the updated subentry (e.g., API request)
        console.log("Saving edited details...", subEntryDetails);
        closeEditModal();
    };

    if (!sub) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-gray-200 text-gray-600">
                <p>No subentry data found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
            <div className="max-w-4xl mx-auto relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 text-sm"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Timeline
                </button>

                {/* Glass Panel */}
                <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200">
                    <h1 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-2">
                        {subEntryDetails.workTitle}
                    </h1>

                    {/* Main Content Section */}
                    <div className={`grid ${subEntryDetails.attachments?.length ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8`}>
                        {/* Left Section - Details */}
                        <div>
                            <div className="space-y-6 text-gray-800 text-base">
                                {/* Description */}
                                <div className="flex gap-2 items-start">
                                    <FaInfoCircle className="text-indigo-500 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1">Description</p>
                                        <p>{subEntryDetails.description}</p>
                                    </div>
                                </div>

                                {/* What Was Learned */}
                                {subEntryDetails.whatLearned && (
                                    <div className="flex gap-2 items-start">
                                        <FaBookOpen className="text-indigo-500 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900 mb-1">What was Learned</p>
                                            <p>{subEntryDetails.whatLearned}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                {subEntryDetails.tags?.length > 0 && (
                                    <div className="flex gap-2 items-start">
                                        <FaTags className="text-indigo-500 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900 mb-1">Tags</p>
                                            <div className="flex flex-wrap gap-2">
                                                {subEntryDetails.tags.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-indigo-100 text-indigo-700 px-2 py-0.5 text-xs rounded-full shadow-sm"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Notes */}
                                {subEntryDetails.notes && (
                                    <div className="flex gap-2 items-start">
                                        <FaStickyNote className="text-indigo-500 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900 mb-1">Notes</p>
                                            <p>{subEntryDetails.notes}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Time Spent */}
                                <div className="flex gap-2 items-center text-sm text-gray-700">
                                    <FaClock className="text-indigo-500" />
                                    <strong className="mr-1">Time Spent:</strong>
                                    <span>{subEntryDetails.spentTime} hours</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Attachments */}
                        {subEntryDetails.attachments?.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-indigo-700 mb-4">Attachments</h2>
                                <div className="space-y-4">
                                    {subEntryDetails.attachments.map((att, index) => (
                                        <div key={index} className="bg-white rounded-xl p-4 shadow-md cursor-pointer">
                                            {att.startsWith("http") && (att.endsWith(".jpg") || att.endsWith(".jpeg") || att.endsWith(".png")) ? (
                                                <img
                                                    src={att}
                                                    alt={`Attachment ${index}`}
                                                    className="w-full h-64 object-cover rounded-xl"
                                                    onClick={() => handleImageClick(att)}
                                                />
                                            ) : att.endsWith(".pdf") ? (
                                                <a
                                                    href={att}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {att}
                                                </a>
                                            ) : (
                                                <span className="text-gray-600">{att}</span>
                                            )}
                                            <button
                                                onClick={() => handleDeleteAttachment(index)}
                                                className="text-red-600 hover:text-red-800 mt-2"
                                            >
                                                <FaTrashAlt className="mr-2" />
                                                Delete Attachment
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={openEditModal}
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                            <FaEdit className="mr-2" />
                            Edit
                        </button>
                        <button
                            onClick={openDeleteModal}
                            className="text-red-600 hover:text-red-800 flex items-center"
                        >
                            <FaTrashAlt className="mr-2" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {modalImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative bg-white p-6 rounded-lg max-w-lg">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <img src={modalImage} alt="Attachment" className="max-w-full max-h-screen object-contain" />
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
                    <div className="bg-white/90 p-6 rounded-lg shadow-xl w-full max-w-xl">
                        <h2 className="text-xl font-semibold text-indigo-700 mb-4">Edit Subentry</h2>
                        <form onSubmit={handleSaveEdit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Work Title"
                                value={subEntryDetails.workTitle}
                                onChange={(e) => setSubEntryDetails({ ...subEntryDetails, workTitle: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />

                            <textarea
                                placeholder="Description"
                                value={subEntryDetails.description}
                                onChange={(e) => setSubEntryDetails({ ...subEntryDetails, description: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />

                            <textarea
                                placeholder="What was learned"
                                value={subEntryDetails.whatLearned}
                                onChange={(e) => setSubEntryDetails({ ...subEntryDetails, whatLearned: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="Tags (comma separated)"
                                value={subEntryDetails.tags?.join(', ') || ''}
                                onChange={(e) =>
                                    setSubEntryDetails({
                                        ...subEntryDetails,
                                        tags: e.target.value.split(',').map(tag => tag.trim()),
                                    })
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />

                            <textarea
                                placeholder="Notes"
                                value={subEntryDetails.notes}
                                onChange={(e) => setSubEntryDetails({ ...subEntryDetails, notes: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />

                            <input
                                type="number"
                                placeholder="Time Spent (in hours)"
                                value={subEntryDetails.spentTime}
                                onChange={(e) => setSubEntryDetails({ ...subEntryDetails, spentTime: parseInt(e.target.value) || 0 })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />

                            <div className="flex justify-between pt-2">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="bg-gray-600 text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/30">
                    <div className="bg-white/90 p-6 rounded-xl shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold text-red-600 mb-3">Delete Subentry</h2>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to delete <strong>{subEntryDetails.workTitle}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={closeDeleteModal}
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SubEntryDetails;
