import React from "react";

const EntryDetails = () => {
    // Static data for the entry
    const entry = {
        title: "Initial Planning",
        description: "Planning the initial project tasks and setting goals.",
        date: "2025-04-01",
        subentries: [
            {
                _id: "subentry1",
                title: "Define Scope",
                description: "Defining the scope of the project and outlining the goals.",
                date: "2025-04-02",
            },
            {
                _id: "subentry2",
                title: "Allocate Resources",
                description: "Allocating resources for the project including team members.",
                date: "2025-04-03",
            },
            {
                _id: "subentry3",
                title: "Set Deadlines",
                description: "Setting deadlines for each task within the initial phase.",
                date: "2025-04-04",
            },
        ],
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side: Entry Details */}
            <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{entry.title}</h1>
                <p className="text-lg text-gray-600">{entry.description}</p>
                <p className="text-gray-500 mt-4">
                    <strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}
                </p>
            </div>

            {/* Right Side: Timeline of Subentries */}
            <div className="w-2/3 p-6 bg-gray-100">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Subentries Timeline</h2>
                <div className="space-y-4">
                    {entry.subentries.map((subentry) => (
                        <div
                            key={subentry._id}
                            className="p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                            <div className="flex justify-between">
                                <p className="text-xl font-bold">{subentry.title}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(subentry.date).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="text-gray-600">{subentry.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EntryDetails;
