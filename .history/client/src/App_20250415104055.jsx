import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import AllProjects from './Components/Dashboard/AllProjects'; // adjust path as needed
import ProjectDetails from './Components/Dashboard/ProjectDetails'; // Add this import for the project details page
import EntryDetails from './Components/Dashboard/EntryDetails'; // Add this import for the entry details page
import SubentryDetails from './Components/Dashboard/SubEntryDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Route for All Projects */}
        <Route path="/projects" element={<AllProjects />} />

        {/* Route for Project Details, assuming we are passing projectId */}
        <Route path="/projectDetails" element={<ProjectDetails />} />

        {/* Route for Entry Details, assuming we are passing entryId */}
        <Route path="/entryDetails" element={<EntryDetails />} />

        {/* Route for Entry Details, assuming we are passing entryId */}
        <Route path="/SubEntryDetails" element={<SubEntryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
