import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PrivacyFeed = () => {
    const [feeds, setFeeds] = useState([
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
    ]);
    const [activeId, setActiveId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newFeed, setNewFeed] = useState({ title: "", date: "", text: "" });
    const [editFeedData, setEditFeedData] = useState(null);

    const toggleAccordion = (id) => {
        setActiveId((prevId) => (prevId === id ? null : id));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFeed({ ...newFeed, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFeedData({ ...editFeedData, [name]: value });
    };

    const addFeed = () => {
        const newId = feeds.length ? feeds[0].id + 1 : 1;
        setFeeds([{ id: newId, ...newFeed }, ...feeds]);
        setNewFeed({ title: "", date: "", text: "" });
        setIsModalOpen(false);
    };

    const deleteFeed = (id) => {
        setFeeds(feeds.filter(feed => feed.id !== id));
    };

    const openEditModal = (feed) => {
        setEditFeedData(feed);
        setIsEditModalOpen(true);
    };

    const updateFeed = () => {
        setFeeds(feeds.map(feed => (feed.id === editFeedData.id ? editFeedData : feed)));
        setIsEditModalOpen(false);
        setEditFeedData(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-8 relative">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-red-600">🔒 Privacy Feed</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                    >
                        + New Feed
                    </button>
                </div>

                <div className="space-y-4">
                    {feeds.map((feed) => (
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
                                    <p className="mb-4">{feed.text}</p>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => openEditModal(feed)}
                                            className="text-sm text-red-600 hover:text-red-800"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => deleteFeed(feed.id)}
                                            className="text-sm text-red-500 hover:text-red-700"
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-red-600">Add New Private Note</h2>

                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={newFeed.title}
                            onChange={handleInputChange}
                            className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <input
                            type="date"
                            name="date"
                            value={newFeed.date}
                            onChange={handleInputChange}
                            className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <textarea
                            name="text"
                            placeholder="What's on your mind?"
                            value={newFeed.text}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
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
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Add Feed
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && editFeedData && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-red-600">Edit Private Note</h2>

                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={editFeedData.title}
                            onChange={handleEditInputChange}
                            className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <input
                            type="date"
                            name="date"
                            value={editFeedData.date}
                            onChange={handleEditInputChange}
                            className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <textarea
                            name="text"
                            placeholder="What's on your mind?"
                            value={editFeedData.text}
                            onChange={handleEditInputChange}
                            rows={4}
                            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateFeed}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Update Feed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrivacyFeed;
