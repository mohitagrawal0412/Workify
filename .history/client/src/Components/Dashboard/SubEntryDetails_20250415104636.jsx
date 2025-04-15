import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    FaClock,
    FaPaperclip,
    FaTags,
    FaBookOpen,
    FaArrowLeft,
    FaStickyNote,
    FaInfoCircle
} from "react-icons/fa";

const SubEntryDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const sub = state?.subentry;

    if (!sub) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-gray-200 text-gray-600">
                <p>No subentry data found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
            <div className="max-w-3xl mx-auto relative">
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

                    <div className="space-y-6 text-gray-800 text-base">
                        {/* Description */}
                        <div className="flex gap-2 items-start">
                            <FaInfoCircle className="text-indigo-500 mt-1" />
                            <div>
                                <p className="font-semibold text-gray-900 mb-1">Description</p>
                                <p>{sub.description}</p>
                            </div>
                        </div>

                        {/* Learned */}
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
                                            <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-0.5 text-xs rounded-full shadow-sm">
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

                        {/* Attachments */}
                        {sub.attachments?.length > 0 && (
                            <div className="flex gap-2 items-start">
                                <FaPaperclip className="text-indigo-500 mt-1" />
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Attachments</p>
                                    <ul className="list-disc ml-4 text-blue-600 text-sm">
                                        {sub.attachments.map((att, i) => (
                                            <li key={i}>
                                                {att.startsWith("http") ? (
                                                    <a
                                                        href={att}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:underline"
                                                    >
                                                        {att}
                                                    </a>
                                                ) : (
                                                    <span>{att}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubEntryDetails;
