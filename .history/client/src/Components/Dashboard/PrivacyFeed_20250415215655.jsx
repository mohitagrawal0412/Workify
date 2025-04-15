// PrivacyFeed.jsx
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const mockPrivacyFeeds = [
    {
        id: 1,
        date: "2025-04-14",
        title: "Reflection on Burnout",
        text: "I felt really tired today. Might need to adjust my work-life balance and add more breaks.",
    },
    {
        id: 2,
        date: "2025-04-13",
        title: "Dealing with Imposter Syndrome",
        text: "Still doubt my skills sometimes, but progress is visible. Need to trust the process.",
    },
    {
        id: 3,
        date: "2025-04-12",
        title: "Inner Thoughts on Growth",
        text: "Growth feels uncomfortable but necessary. Trying to journal more often to capture insights.",
    },
];

const PrivacyFeed = () => {
    const [activeId, setActiveId] = useState(null);

    const toggleAccordion = (id) => {
        setActiveId((prevId) => (prevId === id ? null : id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-8">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
                <h1 className="text-3xl font-bold text-red-600 mb-8">🔒 Privacy Feed</h1>

                <div className="space-y-4">
                    {mockPrivacyFeeds.map((feed) => (
                        <div key={feed.id} className="border border-gray-300 rounded-lg shadow-sm">
                            <button
                                onClick={() => toggleAccordion(feed.id)}
                                className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-all duration-300 rounded-t-lg"
                            >
                                <div className="text-left">
                                    <h2 className="text-lg font-semibold text-red-600">{feed.title}</h2>
                                    <p className="text-sm text-gray-600">{new Date(feed.date).toDateString()}</p>
                                </div>
                                {activeId === feed.id ? (
                                    <FaChevronUp className="text-gray-600" />
                                ) : (
                                    <FaChevronDown className="text-gray-600" />
                                )}
                            </button>

                            {activeId === feed.id && (
                                <div className="px-6 py-4 text-gray-700 bg-white rounded-b-lg">
                                    <p>{feed.text}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrivacyFeed;
