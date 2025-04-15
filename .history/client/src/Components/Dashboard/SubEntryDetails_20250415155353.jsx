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
                        {sub.workTitle}
                    </h1>

                    {/* Main Content Section */}
                    <div className={`grid ${sub.attachments?.length ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8`}>
                        {/* Left Section - Details */}
                        <div>
                            <div className="space-y-6 text-gray-800 text-base">
                                {/* Description */}
                                <div className="flex gap-2 items-start">
                                    <FaInfoCircle className="text-indigo-500 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1">Description</p>
                                        <p>{sub.description}</p>
                                    </div>
                                </div>

                                {/* What Was Learned */}
                                {sub.whatLearned && (
                                    <div className="flex gap-2 items-start">
                                        <FaBookOpen className="text-indigo-500 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900 mb-1">What was Learned</p>
                                            <p>{sub.whatLearned}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                {sub.tags?.length > 0 && (
                                    <div className="flex gap-2 items-start">
                                        <FaTags className="text-indigo-500 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900 mb-1">Tags</p>
                                            <div className="flex flex-wrap gap-2">
                                                {sub.tags.map((tag, idx) => (
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
                                {sub.notes && (
                                    <div className="flex gap-2 items-start">
                                        <FaStickyNote className="text-indigo-500 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900 mb-1">Notes</p>
                                            <p>{sub.notes}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Time Spent */}
                                <div className="flex gap-2 items-center text-sm text-gray-700">
                                    <FaClock className="text-indigo-500" />
                                    <strong className="mr-1">Time Spent:</strong>
                                    <span>{sub.spentTime} hours</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Attachments */}
                        {sub.attachments?.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-indigo-700 mb-4">Attachments</h2>
                                <div className="space-y-4">
                                    {sub.attachments.map((att, index) => (
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

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg">
                        <h2 className="text-xl font-semibold text-indigo-700 mb-4">Edit Subentry</h2>
                        <form>
                            {/* Edit Form (for simplicity, it's just a textarea) */}
                            <textarea
                                defaultValue={sub.description}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                rows="4"
                            />
                            <div className="mt-4 flex justify-between">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-blue-600 hover:text-blue-800"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg">
                        <h2 className="text-xl font-semibold text-red-600 mb-4">Delete Subentry</h2>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete this subentry? This action cannot be undone.
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={closeDeleteModal}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => { /* Add delete functionality here */ }}
                                className="text-red-600 hover:text-red-800"
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
