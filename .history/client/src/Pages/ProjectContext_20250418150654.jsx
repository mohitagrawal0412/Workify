import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const ProjectContext = createContext();

// Create a provider
export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Centralized function to fetch projects
    const refreshProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/projects/getAllProjects");
            setProjects(response.data);
        } catch (err) {
            setError("Failed to fetch projects");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch once on mount
    useEffect(() => {
        refreshProjects();
    }, []);

    // Helper functions
    const addProject = (project) => {
        setProjects((prev) => [...prev, project]);
    };

    const deleteProject = (projectId) => {
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
    };

    const updateProject = (updatedProject) => {
        setProjects((prev) =>
            prev.map((p) => (p._id === updatedProject._id ? updatedProject : p))
        );
    };

    return (
        <ProjectContext.Provider
            value={{
                projects,
                loading,
                error,
                addProject,
                deleteProject,
                updateProject,
                refreshProjects, // ✅ Make sure this is exposed!
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

// Custom hook
export const useProjectContext = () => useContext(ProjectContext);
