import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ProjectDetails = () => {
    const navigate = useNavigate();

    const handleEntryClick = () => {
        navigate("/entryDetails");
    };

    const project = {
        projectName: "Awesome Project",
        description: "This is an awesome project with several tasks that need to be completed over the course of the next few weeks.",
        deadline: "2025-12-31",
        learning: "Learning about project management and task delegation.",
        status: "running",
        entries: [
            {
                _id: "entry1",
                title: "Initial Planning",
                description: "Planning the initial project tasks and setting goals.",
                date: "2025-04-01",
            },
            {
                _id: "entry2",
                title: "Research Phase",
                description: "Researching the tools and technologies for the project.",
                date: "2025-04-10",
            },
            {
                _id: "entry3",
                title: "Design Phase",
                description: "Designing the initial prototypes and user flow.",
                date: "2025-04-20",
            },
            {
                _id: "entry4",
                title: "Implementation Phase",
                description: "Starting the development of core features.",
                date: "2025-05-01",
            },
            // Add more entries to test scroll
        ],
    };

    return (
        <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden">
            {/* Left Side: Fixed Project Info */}
            <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg sticky top-0 h-screen overflow-y-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{project.projectName}</h1>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <ul className="space-y-2 text-sm text-gray-500">
                    <li><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</li>
                    <li><strong>Learning:</strong> {project.learning}</li>
                    <li>
                        <strong>Status:</strong>
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 rounded-full capitalize text-xs">
                            {project.status}
                        </span>
                    </li>
                </ul>
            </div>

            {/* Right Side: Scrollable Timeline */}
            <div className="w-2/3 p-6 overflow-y-auto h-screen">
                <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">Project Timeline</h2>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-blue-400"></div>

                    <div className="space-y-16">
                        {project.entries.map((entry, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div
                                    key={`${entry._id}-${index}`}
                                    className={`relative flex ${isLeft ? "justify-start" : "justify-end"} w-full`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="w-6 h-6 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center shadow">
                                            <FaCheckCircle className="text-blue-500 text-sm" />
                                        </div>
                                    </div>

                                    {/* Entry Card */}
                                    <div
                                        onClick={handleEntryClick}
                                        className={`w-5/12 p-5 bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${isLeft ? "mr-auto" : "ml-auto"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold text-indigo-600">{entry.title}</h3>
                                            <span className="text-sm text-gray-400">
                                                {new Date(entry.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-gray-600">{entry.description}</p>
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

export default ProjectDetails;
