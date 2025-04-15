import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const handleEntryClick = () => {
        navigate("/entryDetails"); // Navigate to entry details page
    };

    // Static data
    const project = {
        projectName: "Awesome Project",
        description:
            "This is an awesome project with several tasks that need to be completed over the course of the next few weeks.",
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
        ],
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side: Project Details */}
            <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{project.projectName}</h1>
                <p className="text-lg text-gray-600">{project.description}</p>
                <p className="text-gray-500 mt-4">
                    <strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}
                </p>
                <p className="text-gray-500 mt-4">
                    <strong>Learning:</strong> {project.learning || "No learning material"}
                </p>
                <p className="text-gray-500 mt-4">
                    <strong>Status:</strong> {project.status}
                </p>
            </div>

            {/* Right Side: Timeline of Entries */}
            <div className="w-2/3 p-6 bg-gray-100 relative">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Timeline</h2>

                {/* Timeline Line */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-indigo-400 to-blue-500"></div>

                {/* Timeline Entries */}
                <div className="space-y-8">
                    {project.entries.map((entry, index) => (
                        <div
                            key={entry._id}
                            className={`flex ${index % 2 === 0 ? "flex-row-reverse" : ""} items-center transition-transform duration-300 ease-in-out`}
                            onClick={handleEntryClick}
                        >
                            {/* Entry Block */}
                            <div
                                className="p-6 bg-white shadow-xl rounded-lg cursor-pointer hover:scale-105 transform transition-all duration-300 ease-in-out w-80 relative"
                            >
                                <div className="flex justify-between items-center">
                                    <p className="text-xl font-bold text-indigo-600">{entry.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(entry.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <p className="text-gray-600 mt-2">{entry.description}</p>
                            </div>

                            {/* Timeline Marker */}
                            <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 shadow-xl border-4 border-white"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
