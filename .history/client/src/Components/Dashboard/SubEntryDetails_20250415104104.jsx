import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaPaperclip, FaTags, FaBookOpen, FaArrowLeft } from "react-icons/fa";

const SubEntryDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const sub = state?.subentry;

    if (!sub) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                <p>No subentry data found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
                >
                    <FaArrowLeft />
                    Back
                </button>

                <h1 className="text-3xl font-bold text-indigo-700 mb-4">{sub.workTitle}</h1>

                <div className="space-y-4 text-gray-700">
                    <div>
                        <p className="text-lg font-medium text-gray-800">Description</p>
                        <p>{sub.description}</p>
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-800 flex items-center">
                            <FaBookOpen className="mr-2 text-indigo-500" />
                            What was learned
                        </p>
                        <p>{sub.whatLearned}</p>
                    </div>

                    {sub.tags?.length > 0 && (
                        <div>
                            <p className="text-lg font-medium text-gray-800 flex items-center">
                                <FaTags className="mr-2 text-indigo-500" />
                                Tags
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {sub.tags.map((tag, idx) => (
                                    <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {sub.notes && (
                        <div>
                            <p className="text-lg font-medium text-gray-800">Notes</p>
                            <p>{sub.notes}</p>
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaClock className="text-indigo-500" />
                        <strong>Time Spent:</strong> {sub.spentTime} hours
                    </div>

                    {sub.attachments?.length > 0 && (
                        <div>
                            <p className="text-lg font-medium text-gray-800 flex items-center">
                                <FaPaperclip className="mr-2 text-indigo-500" />
                                Attachments
                            </p>
                            <ul className="ml-4 list-disc text-blue-600 underline">
                                {sub.attachments.map((att, i) => (
                                    <li key={i}>
                                        {att.startsWith("http") ? (
                                            <a href={att} target="_blank" rel="noopener noreferrer">
                                                {att}
                                            </a>
                                        ) : (
                                            <span>{att}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubentryDetails;
