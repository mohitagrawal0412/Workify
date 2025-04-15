import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PersonalFeed = () => {
    const [feeds, setFeeds] = useState([
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
    ]);
    const [activeId, setActiveId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFeed, setNewFeed] = useState({ title: "", date: "", text: "" });

    const toggleAccordion = (id) => {
        setActiveId((prevId) => (prevId === id ? null : id));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFeed({ ...newFeed, [name]: value });
    };

    const addFeed = () => {
        const newId = feeds.length ? feeds[0].id + 1 : 1;
        setFeeds([{ id: newId, ...newFeed }, ...feeds]);
        setNewFeed({ title: "", date: "", text: "" });
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8 relative">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-700">📝 Personal Feed</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        + New Feed
                    </button>
                </div>

                <div className="space-y-4">
                    {feeds.map((feed) => (
                        <div key={feed.id} className="border border-gray-300 rounded-lg shadow-sm">
                            {/* Accordion Header */}
                            <button
                                onClick={() => toggleAccordion(feed.id)}
                                className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-all duration-300 rounded-t-lg"
                            >
                                <div className="text-left">
                                    <h2 className="text-lg font-semibold text-indigo-700">{feed.title}</h2>
                                    <p className="text-sm text-gray-600">{new Date(feed.date).toDateString()}</p>
                                </div>
                                {activeId === feed.id ? (
                                    <FaChevronUp className="text-gray-600" />
                                ) : (
                                    <FaChevronDown className="text-gray-600" />
                                )}
                            </button>

                            {/* Accordion Content */}
                            {activeId === feed.id && (
                                <div className="px-6 py-4 text-gray-700 bg-white rounded-b-lg">
                                    <p>{feed.text}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-indigo-700">Add New Feed</h2>

                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={newFeed.title}
                            onChange={handleInputChange}
                            className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                            type="date"
                            name="date"
                            value={newFeed.date}
                            onChange={handleInputChange}
                            className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <textarea
                            name="text"
                            placeholder="What's on your mind?"
                            value={newFeed.text}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addFeed}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                            >
                                Add Feed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalFeed;
