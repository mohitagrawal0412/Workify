import React from "react";

const dummyProjects = [
    {
        _id: "1",
        projectName: "Task Tracker App",
        description: "Track daily tasks and progress.",
        totalSpentTime: 12,
        status: "running",
        entries: [1, 2],
        createdAt: "2024-03-01T10:00:00Z",
    },
    {
        _id: "2",
        projectName: "Portfolio Website",
        description: "Personal portfolio for showcasing work.",
        totalSpentTime: 20,
        status: "completed",
        entries: [1, 2, 3],
        createdAt: "2024-02-15T08:30:00Z",
    },
    {
        _id: "3",
        projectName: "Expense Manager",
        description: "Manage personal finances with ease.",
        totalSpentTime: 8,
        status: "under seen of manager",
        entries: [],
        createdAt: "2024-04-01T14:45:00Z",
    },
];

const AllProjects = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">All Projects</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyProjects.map((project) => (
                    <div
                        key={project._id}
                        className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">
                            {project.projectName}
                        </h2>
                        <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                        <div className="text-sm text-gray-500 space-y-1">
                            <p>
                                <span className="font-medium">Status:</span>{" "}
                                <span
                                    className={`capitalize font-semibold ${project.status === "running"
                                            ? "text-green-600"
                                            : project.status === "completed"
                                                ? "text-purple-600"
                                                : "text-yellow-600"
                                        }`}
                                >
                                    {project.status}
                                </span>
                            </p>
                            <p>
                                <span className="font-medium">Total Entries:</span>{" "}
                                {project.entries.length}
                            </p>
                            <p>
                                <span className="font-medium">Time Spent:</span>{" "}
                                {project.totalSpentTime} hrs
                            </p>
                            <p>
                                <span className="font-medium">Started:</span>{" "}
                                {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProjects;
