import React, { useEffect, useState } from "react";
import axios from "axios";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects"); // replace with your actual API route
        // Sort by newest first
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProjects(sorted);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-purple-600 mb-2">{project.projectName}</h2>
            <p className="text-gray-600 text-sm mb-3">
              {project.description?.slice(0, 100) || "No description provided."}
            </p>

            <div className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Status:</span>{" "}
              <span className={`capitalize font-semibold ${project.status === "completed"
                ? "text-green-600"
                : project.status === "under seen of manager"
                ? "text-yellow-500"
                : "text-blue-500"
              }`}>
                {project.status}
              </span>
            </div>

            <div className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Started:</span>{" "}
              {project.dateStarted ? new Date(project.dateStarted).toLocaleDateString() : "N/A"}
            </div>

            <div className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Deadline:</span>{" "}
              {project.deadline ? new Date(project.deadline).toLocaleDateString() : "N/A"}
            </div>

            <div className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Entries:</span> {project.entries?.length || 0}
            </div>

            <div className="text-sm text-gray-500">
              <span className="font-medium">Total Time Spent:</span> {project.totalSpentTime || 0} hrs
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
