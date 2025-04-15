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
        ],
    };

    return (
        <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden">
            {/* Left Side: Fixed Project Info */}
            <div className="w-full lg:w-1/3 p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-2xl sticky top-0 h-screen overflow-y-auto">
                <div className="p-6 bg-white/90 rounded-2xl shadow-lg space-y-6">
                    {/* Title with Icon */}
                    <div className="flex items-center gap-3 mb-6">
                        <FaCheckCircle className="text-indigo-600 text-3xl" />
                        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
                            {project.projectName}
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-base leading-relaxed">
                        {project.description}
                    </p>

                    {/* Project Meta */}
                    <div className="space-y-4">
                        {/* Deadline */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="font-semibold text-indigo-500">📅 Deadline:</span>
                            <span className="font-medium">{new Date(project.deadline).toLocaleDateString()}</span>
                        </div>

                        {/* Learning */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="font-semibold text-indigo-500">📚 Learning:</span>
                            <span className="font-medium">{project.learning}</span>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="font-semibold text-indigo-500">🟢 Status:</span>
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                                {project.status}
                            </span>
                        </div>
                    </div>

                    {/* Project Image / Illustration */}
                    <div className="w-full mt-6 rounded-lg shadow-md overflow-hidden">
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt="Project Illustration"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
                        <ul className="space-y-3 mt-4">
                            <li className="text-indigo-600 cursor-pointer hover:underline">
                                View Full Project
                            </li>
                            <li className="text-indigo-600 cursor-pointer hover:underline">
                                Add New Task
                            </li>
                            <li className="text-indigo-600 cursor-pointer hover:underline">
                                View Team Members
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Side: Scrollable Timeline */}
            <div className="w-full lg:w-2/3 p-6 overflow-y-auto h-screen">
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
                                        className={`w-5/12 p-5 bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${isLeft ? "mr-auto" : "ml-auto"}`}
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
