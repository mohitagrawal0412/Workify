import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const mockFeeds = [
    {
        id: 1,
        date: "2025-04-14",
        title: "Timeline UI Improvements",
        text: "Today I worked on refining the timeline UI. Learned a lot about Tailwind layout tricks.",
    },
    {
        id: 2,
        date: "2025-04-13",
        title: "Understanding Mongoose",
        text: "Had a deep dive into mongoose models. Started building out the personal feed schema.",
    },
    {
        id: 3,
        date: "2025-04-12",
        title: "Edit Modal Fix",
        text: "Explored how to improve the edit modal and make it scrollable. UI improvements matter!",
    },
];

const PersonalFeed = () => {
    const [activeId, setActiveId] = useState(null);

    const toggleAccordion = (id) => {
        setActiveId((prevId) => (prevId === id ? null : id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
                <h1 className="text-3xl font-bold text-indigo-700 mb-8">📝 Personal Feed</h1>

                <div className="space-y-4">
                    {mockFeeds.map((feed) => (
                        <div key={feed.id} className="border border-gray-300 rounded-lg shadow-sm">
                            <button
                                onClick={() => toggleAccordion(feed.id)}
                                className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-all duration-300 rounded-t-lg"
                            >
                                <span className="font-medium text-lg text-gray-800 text-left">
                                    {new Date(feed.date).toDateString()}
                                </span>
                                {activeId === feed.id ? (
                                    <FaChevronUp className="text-gray-600" />
                                ) : (
                                    <FaChevronDown className="text-gray-600" />
                                )}
                            </button>

                            {activeId === feed.id && (
                                <div className="px-6 py-4 text-gray-700 bg-white rounded-b-lg">
                                    <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                                        {feed.title}
                                    </h2>
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

export default PersonalFeed;
