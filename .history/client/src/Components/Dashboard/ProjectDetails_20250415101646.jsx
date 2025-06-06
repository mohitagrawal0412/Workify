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
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {project.projectName}
                </h1>
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
            <div className="w-2/3 p-6 bg-gray-100">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Timeline</h2>
                <div className="relative">
                    {project.entries.map((entry, index) => (
                        <div
                            key={entry._id}
                            className={`p-6 mb-6 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition-all ${index % 2 === 0 ? "ml-12" : "mr-12"
                                }`}
                            onClick={handleEntryClick}
                        >
                            <div
                                className={`absolute top-0 left-[-30px] w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white`}
                            >
                                <span className="font-semibold text-lg">{index + 1}</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xl font-bold">{entry.title}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(entry.date).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="text-gray-600 mt-2">{entry.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
