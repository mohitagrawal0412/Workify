import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios"; // Assuming you're fetching data from an API

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [projectInsights, setProjectInsights] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [taskCompletionData, setTaskCompletionData] = useState([]);
  const [projectCompletionData, setProjectCompletionData] = useState([]);

  useEffect(() => {
    // Fetch insights and project data (This is just a placeholder for your API)
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/projects'); // Replace with your API URL
        const projects = res.data;

        // Assuming project data has a field `totalSpentTime` for each project
        const totalSpentTime = projects.reduce((acc, project) => acc + project.totalSpentTime, 0);

        // Update project insights
        setProjectInsights([
          { label: "Total Projects", value: projects.length },
          { label: "Total Time Spent (hrs)", value: totalSpentTime },
          { label: "Active Projects", value: projects.filter(p => p.status === "running").length },
          { label: "Completed Projects", value: projects.filter(p => p.status === "completed").length },
        ]);

        // Example of how project data might look in a pie chart
        setProjectData([
          { name: "Design", value: 40 },
          { name: "Development", value: 30 },
          { name: "Testing", value: 20 },
          { name: "Deployment", value: 10 },
        ]);

        // Example for task completion
        setTaskCompletionData([
          { name: "Completed", value: 75 },
          { name: "In Progress", value: 15 },
          { name: "Pending", value: 10 },
        ]);

        // Example for project completion bar chart
        setProjectCompletionData([
          { name: "Project A", completion: 80 },
          { name: "Project B", completion: 60 },
          { name: "Project C", completion: 90 },
        ]);

      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm, searchDate);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <main className="flex-grow p-4 sm:p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">MyWorkLogger</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {projectInsights.map((insight, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4">
              <p className="text-sm text-gray-500">{insight.label}</p>
              <p className="text-2xl font-bold text-blue-600">{insight.value}</p>
            </div>
          ))}
        </div>

        {/* Search Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🔍 Search Projects</h2>
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Project Name</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g. Dashboard Revamp"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Visualizations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Pie Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Project Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={projectData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Task Completion</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={taskCompletionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" label>
                  {taskCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Project Completion</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={projectCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completion" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
