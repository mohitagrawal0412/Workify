import React from "react";
import { useNavigate } from "react-router-dom";
import {
    FaDotCircle,
    FaClock,
    FaTags,
    FaPlus,
    FaArrowLeft,
} from "react-icons/fa";

const EntryDetails = () => {
    const navigate = useNavigate();

    const handleEntryClick = (subentry) => {
        navigate("/subEntryDetails", { state: { subentry } });
    };

    const handleAddSubentry = () => {
        navigate("/addSubentry");
    };

    const handleGoToAllProjects = () => {
        navigate("/projects");
    };

    const entry = {
        title: "Initial Planning",
        description: "Planning the initial project tasks and setting goals.",
        date: "2025-04-01",
        subentries: [
            {
                workTitle: "UI Design",
                description: "Designed the homepage UI using Figma.",
                whatLearned: "Learned Figma and design principles for web.",
                tags: ["UI", "Design", "Figma"],
                notes: "Worked with the design team to finalize UI components.",
                attachments: ["https://figma.com/design-url", "homepage_mockup.png"],
                spentTime: 5,
            },
            {
                workTitle: "HTML & CSS",
                description: "Implemented the HTML structure and styled it using CSS.",
                whatLearned: "Improved HTML and CSS skills, including responsive design.",
                tags: ["HTML", "CSS", "Responsive"],
                notes: "Ensured compatibility across different browsers.",
                attachments: ["html_code_snippet.txt", "css_code_snippet.css"],
                spentTime: 8,
            },
        ],
    };

    return (
        <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-200">
            {/* Left Panel */}
            <div className="w-full lg:w-1/3 h-screen overflow-y-auto p-6 bg-white/60 backdrop-blur-md border-r border-gray-300 shadow-xl rounded-r-3xl">
                <div className="p-6 bg-white border border-gray-300 rounded-2xl shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                        <FaDotCircle className="text-indigo-500 text-xl" />
                        <h1 className="text-3xl font-bold text-indigo-700">{entry.title}</h1>
                    </div>

                    <p className="text-gray-700 text-sm mb-4">{entry.description}</p>

                    <div className="text-sm text-gray-600 space-y-1 mt-4">
                        <div>
                            <span className="font-semibold">Author:</span> John Doe
                        </div>
                        <div>
                            <span className="font-semibold">Project:</span> Web Design
                        </div>
                        <div>
                            <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full shadow-sm">
                                📅 {new Date(entry.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <button
                            onClick={handleAddSubentry}
                            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 shadow transition"
                        >
                            <FaPlus /> Add Subentry
                        </button>
                        <button
                            onClick={handleGoToAllProjects}
                            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-4 py-2 shadow transition"
                        >
                            <FaArrowLeft /> All Projects
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="hidden lg:block w-2/3 p-8 overflow-y-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">
                    Subentries Timeline
                </h2>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-indigo-400"></div>

                    <div className="space-y-16">
                        {entry.subentries.map((sub, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleEntryClick(sub)}
                                    className={`relative flex ${isLeft ? "justify-start" : "justify-end"} w-full`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="w-6 h-6 bg-white border-4 border-indigo-500 rounded-full flex items-center justify-center shadow">
                                            <FaDotCircle className="text-indigo-500 text-sm" />
                                        </div>
                                    </div>

                                    {/* Card */}
                                    <div
                                        className={`w-5/12 p-5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 ${isLeft ? "mr-auto" : "ml-auto"}`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-lg font-semibold text-indigo-600">
                                                {sub.workTitle}
                                            </h3>
                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                                <FaClock /> {sub.spentTime}h
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">{sub.description}</p>

                                        {sub.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                                                <FaTags className="text-indigo-500 mt-0.5 mr-1" />
                                                {sub.tags.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntryDetails;
