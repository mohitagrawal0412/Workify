import React from "react";
import { useNavigate } from "react-router-dom";
import {
    FaDotCircle,
    FaClock,
    FaPaperclip,
    FaTags,
    FaBookOpen
} from "react-icons/fa";

const EntryDetails = () => {
    const navigate = useNavigate();

    const handleEntryClick = (subentry) => {
        navigate("/subEntryDetails", { state: { subentry } });
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
                whatLearned:
                    "Improved HTML and CSS skills, including responsive design.",
                tags: ["HTML", "CSS", "Responsive"],
                notes: "Ensured compatibility across different browsers.",
                attachments: ["html_code_snippet.txt", "css_code_snippet.css"],
                spentTime: 8,
            },
        ],
    };

    return (
        <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200">
            {/* Left Panel */}
            <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg sticky top-0 h-screen overflow-y-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{entry.title}</h1>
                <p className="text-gray-600 mb-4">{entry.description}</p>
                <p className="text-gray-500">
                    <strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}
                </p>
            </div>

            {/* Right Panel */}
            <div className="w-2/3 p-6 overflow-y-auto h-screen">
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
                                    className={`relative flex ${isLeft ? "justify-start" : "justify-end"} w-full`}
                                    onClick={() => handleEntryClick(sub)}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="w-6 h-6 bg-white border-4 border-indigo-500 rounded-full flex items-center justify-center shadow">
                                            <FaDotCircle className="text-indigo-500 text-sm" />
                                        </div>
                                    </div>

                                    {/* Card */}
                                    <div
                                        className={`w-5/12 p-5 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${isLeft ? "mr-auto" : "ml-auto"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-lg font-semibold text-indigo-600">
                                                {sub.workTitle}
                                            </h3>
                                            <span className="text-sm text-gray-400">
                                                <FaClock className="inline mr-1" />
                                                {sub.spentTime}h
                                            </span>
                                        </div>

                                        <p className="text-gray-600 mb-2">{sub.description}</p>

                                        {sub.whatLearned && (
                                            <div className="text-sm text-gray-700 mb-2">
                                                <FaBookOpen className="inline mr-2 text-indigo-500" />
                                                <span className="font-medium">Learned:</span>{" "}
                                                {sub.whatLearned}
                                            </div>
                                        )}

                                        {sub.tags?.length > 0 && (
                                            <div className="text-sm text-gray-700 mb-2 flex flex-wrap gap-2">
                                                <FaTags className="text-indigo-500 mt-1 mr-1" />
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

                                        {sub.notes && (
                                            <div className="text-sm text-gray-700 mb-2">
                                                <strong>Notes:</strong> {sub.notes}
                                            </div>
                                        )}

                                        {sub.attachments?.length > 0 && (
                                            <div className="text-sm text-gray-700">
                                                <FaPaperclip className="inline mr-2 text-indigo-500" />
                                                <strong>Attachments:</strong>
                                                <ul className="ml-6 list-disc">
                                                    {sub.attachments.map((att, i) => (
                                                        <li key={i}>
                                                            {att.startsWith("http") ? (
                                                                <a
                                                                    href={att}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 underline"
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
