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
            const response = await axios.post("/api/projects", formData); // Update API route as needed
            alert("Project added successfully!");
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
        } catch (err) {
            console.error("Error adding project:", err);
            alert("Failed to add project");
        }
    };

    return (
        <div className="w-full min-h">


            <div className="max-w-xl mx-auto p-4 bg-white bg-opacity-20 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <input
                        type="text"
                        name="projectName"
                        placeholder="Project Name"
                        required
                        value={formData.projectName}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="date"
                        name="dateStarted"
                        value={formData.dateStarted}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="number"
                        name="totalSpentTime"
                        placeholder="Total Spent Time (hrs)"
                        value={formData.totalSpentTime}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="learning"
                        placeholder="What did you learn?"
                        value={formData.learning}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >
                        <option value="running">Running</option>
                        <option value="completed">Completed</option>
                        <option value="under seen of manager">Under Seen of Manager</option>
                    </select>

                    <textarea
                        name="personalFeedback"
                        placeholder="Personal Feedback"
                        value={formData.personalFeedback}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
