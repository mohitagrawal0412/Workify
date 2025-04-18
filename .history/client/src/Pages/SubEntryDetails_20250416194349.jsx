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

import EditSubEntryModal from "../modals/EditSubEntryModal.jsx";
import DeleteSubEntryModal from "./DeleteSubEntryModal";

const SubEntryDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const sub = state?.subentry;

    const [modalImage, setModalImage] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [subEntryDetails, setSubEntryDetails] = useState(sub);

    const handleImageClick = (imageUrl) => setModalImage(imageUrl);
    const closeModal = () => setModalImage(null);

    const openEditModal = () => setShowEditModal(true);
    const closeEditModal = () => setShowEditModal(false);

    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);

    const handleDelete = () => {
        console.log("Subentry deleted:", subEntryDetails.workTitle);
        navigate("/entryDetails");
        closeDeleteModal();
    };

    const handleDeleteAttachment = (attachmentIndex) => {
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
        console.log("Saving edited details...", subEntryDetails);
        closeEditModal();
    };

    if (!sub) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 text-gray-700">
                <p>No subentry data found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
            <div className="max-w-5xl mx-auto relative bg-white shadow-xl rounded-lg p-8 bg-opacity-80 backdrop-blur-xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800 text-lg font-medium transition-all duration-300"
                >
                    <FaArrowLeft className="mr-3" />
                    Back to Timeline
                </button>

                {/* Content Section */}
                <div className="space-y-8">
                    <h1 className="text-4xl font-bold text-indigo-700 mb-6">
                        {subEntryDetails.workTitle}
                    </h1>

                    <div className={`grid ${subEntryDetails.attachments?.length ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8`}>

                        {/* Left - Details */}
                        <div className="space-y-6 text-lg text-gray-800">
                            <div className="flex gap-3 items-start">
                                <FaInfoCircle className="text-indigo-500 mt-1 text-2xl" />
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">Description</p>
                                    <p>{subEntryDetails.description}</p>
                                </div>
                            </div>

                            {subEntryDetails.whatLearned && (
                                <div className="flex gap-3 items-start">
                                    <FaBookOpen className="text-indigo-500 mt-1 text-2xl" />
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-2">What Was Learned</p>
                                        <p>{subEntryDetails.whatLearned}</p>
                                    </div>
                                </div>
                            )}

                            {subEntryDetails.tags?.length > 0 && (
                                <div className="flex gap-3 items-start">
                                    <FaTags className="text-indigo-500 mt-1 text-2xl" />
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-2">Tags</p>
                                        <div className="flex flex-wrap gap-3">
                                            {subEntryDetails.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-full shadow-sm hover:bg-indigo-200 transition-all duration-300"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {subEntryDetails.notes && (
                                <div className="flex gap-3 items-start">
                                    <FaStickyNote className="text-indigo-500 mt-1 text-2xl" />
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-2">Notes</p>
                                        <p>{subEntryDetails.notes}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 items-center text-sm text-gray-700">
                                <FaClock className="text-indigo-500" />
                                <strong className="mr-2">Time Spent:</strong>
                                <span>{subEntryDetails.spentTime} hours</span>
                            </div>
                        </div>

                        {/* Right - Attachments */}
                        {subEntryDetails.attachments?.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Attachments</h2>
                                <div className="space-y-6">
                                    {subEntryDetails.attachments.map((att, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300"
                                        >
                                            {att.startsWith("http") && (att.endsWith(".jpg") || att.endsWith(".jpeg") || att.endsWith(".png")) ? (
                                                <img
                                                    src={att}
                                                    alt={`Attachment ${index}`}
                                                    className="w-full h-72 object-cover rounded-xl hover:opacity-90 transition-all duration-300 cursor-pointer"
                                                    onClick={() => handleImageClick(att)}
                                                />
                                            ) : att.endsWith(".pdf") ? (
                                                <a
                                                    href={att}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline text-lg"
                                                >
                                                    {att}
                                                </a>
                                            ) : (
                                                <span className="text-gray-600 text-lg">{att}</span>
                                            )}

                                            <button
                                                onClick={() => handleDeleteAttachment(index)}
                                                className="text-red-600 hover:text-red-800 mt-4 flex items-center"
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

                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-between">
                        <button
                            onClick={openEditModal}
                            className="text-blue-600 hover:text-blue-800 flex items-center text-lg font-medium transition-all duration-300"
                        >
                            <FaEdit className="mr-2" />
                            Edit
                        </button>
                        <button
                            onClick={openDeleteModal}
                            className="text-red-600 hover:text-red-800 flex items-center text-lg font-medium transition-all duration-300"
                        >
                            <FaTrashAlt className="mr-2" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            {modalImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative bg-white p-8 rounded-lg max-w-3xl">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <img
                            src={modalImage}
                            alt="Attachment"
                            className="max-w-full max-h-screen object-contain rounded-xl"
                        />
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <EditSubEntryModal
                    subEntryDetails={subEntryDetails}
                    setSubEntryDetails={setSubEntryDetails}
                    onClose={closeEditModal}
                    onSave={handleSaveEdit}
                />
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <DeleteSubEntryModal
                    subEntryDetails={subEntryDetails}
                    onConfirm={handleDelete}
                    onCancel={closeDeleteModal}
                />
            )}
        </div>
    );
};

export default SubEntryDetails;
