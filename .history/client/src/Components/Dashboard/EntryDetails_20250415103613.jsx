import React from "react";
import { FaDotCircle } from "react-icons/fa";

const EntryDetails = () => {
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
                attachments: ["figma_design_url", "homepage_mockup.png"],
                spentTime: 5, // In hours
              },
              {
                workTitle: "HTML & CSS",
                description: "Implemented the HTML structure and styled it using CSS.",
                whatLearned: "Improved HTML and CSS skills, including responsive design.",
                tags: ["HTML", "CSS", "Responsive"],
                notes: "Ensured compatibility across different browsers.",
                attachments: ["html_code_snippet", "css_code_snippet"],
                spentTime: 8, // In hours
              },
        ],
    };

    return (
        <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200">
            {/* Left Side: Fixed Entry Info */}
            <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg sticky top-0 h-screen overflow-y-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{entry.title}</h1>
                <p className="text-gray-600 mb-4">{entry.description}</p>
                <p className="text-gray-500">
                    <strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}
                </p>
            </div>

            {/* Right Side: Scrollable Timeline */}
            <div className="w-2/3 p-6 overflow-y-auto h-screen">
                <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">Subentries Timeline</h2>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-indigo-400"></div>

                    <div className="space-y-16">
                        {entry.subentries.map((sub, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div
                                    key={sub._id}
                                    className={`relative flex ${isLeft ? "justify-start" : "justify-end"} w-full`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="w-6 h-6 bg-white border-4 border-indigo-500 rounded-full flex items-center justify-center shadow">
                                            <FaDotCircle className="text-indigo-500 text-sm" />
                                        </div>
                                    </div>

                                    {/* Subentry Card */}
                                    <div
                                        className={`w-5/12 p-5 bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${isLeft ? "mr-auto" : "ml-auto"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold text-indigo-600">{sub.title}</h3>
                                            <span className="text-sm text-gray-400">
                                                {new Date(sub.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-gray-600">{sub.description}</p>
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
