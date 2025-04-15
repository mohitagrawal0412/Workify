import React, { useState } from "react";
import axios from "axios";

const AddProject = () => {
    const [formData, setFormData] = useState({
        projectName: "",
        description: "",
        dateStarted: "",
        deadline: "",
        totalSpentTime: 0,
        learning: "",
        status: "running",
        personalFeedback: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "totalSpentTime" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/projects", formData); // Make sure this route is correct on your server
            alert("✅ Project added successfully!");
        } catch (err) {
            console.error("❌ Error adding project:", err);
            alert("❌ Failed to add project");
        } finally {
            setFormData({
                projectName: "",
                description: "",
                dateStarted: "",
                deadline: "",
                totalSpentTime: 0,
                learning: "",
                status: "running",
                personalFeedback: "",
            });
        }
    };

    return (
        <div className="w-full min-h-screen bg-white bg-opacity-20 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">➕ Add New Project</h2>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <input
                        type="text"
                        name="projectName"
                        placeholder="Project Name"
                        required
                        value={formData.projectName}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <textarea
                        name="description"
                        placeholder="Project Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="date"
                        name="dateStarted"
                        value={formData.dateStarted}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        name="totalSpentTime"
                        placeholder="Total Spent Time (hrs)"
                        value={formData.totalSpentTime}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="learning"
                        placeholder="What did you learn?"
                        value={formData.learning}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="running">Running</option>
                        <option value="completed">Completed</option>
                        <option value="under seen of manager">Under Seen of Manager</option>
                    </select>

                    <textarea
                        name="personalFeedback"
                        placeholder="Your Feedback"
                        value={formData.personalFeedback}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-200"
                    >
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
