import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Optional for icons

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
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-200 p-6">
            {/* Left: Project Info */}
            <div className="md:w-1/3 bg-white rounded-xl shadow-lg p-6 mb-6 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{project.projectName}</h1>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <ul className="space-y-2 text-sm text-gray-500">
                    <li><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</li>
                    <li><strong>Learning:</strong> {project.learning}</li>
                    <li><strong>Status:</strong>
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 rounded-full capitalize text-xs">
                            {project.status}
                        </span>
                    </li>
                </ul>
            </div>

            {/* Right: Timeline */}
            <div className="md:w-2/3 relative px-4 md:px-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Project Timeline</h2>

                <div className="relative border-l-4 border-blue-400 pl-6 space-y-10">
                    {project.entries.map((entry, index) => (
                        <div
                            key={`${entry._id}-${index}`} // in case IDs repeat
                            className="group relative cursor-pointer"
                            onClick={handleEntryClick}
                        >
                            <div className="absolute -left-[15px] top-2 w-6 h-6 bg-white border-4 border-blue-400 rounded-full shadow-md flex items-center justify-center">
                                <FaCheckCircle className="text-blue-500 text-lg" />
                            </div>
                            <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-indigo-600">{entry.title}</h3>
                                    <span className="text-sm text-gray-400">
                                        {new Date(entry.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="mt-2 text-gray-600">{entry.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
