import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Dashboard/Navbar.jsx'; // Import Navbar component
import Dashboard from './Components/Dashboard/Dashboard';
import AllProjects from './Components/Dashboard/AllProjects'; // Adjust path as needed
import ProjectDetails from './Components/Dashboard/ProjectDetails'; // Add this import for the project details page
import EntryDetails from './Components/Dashboard/EntryDetails'; // Add this import for the entry details page
import SubEntryDetails from './Components/Dashboard/SubEntryDetails';
import personalFeed from '../../server/Models/PersonalFeed.model.js';


function App() {
  return (
    <Router>
      {/* Navbar will be displayed across all pages */}
      <Navbar />

      <Routes>
        {/* Route for Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Route for All Projects */}
        <Route path="/projects" element={<AllProjects />} />

        {/* Route for Project Details, assuming we are passing projectId */}
        <Route path="/projectDetails" element={<ProjectDetails />} />

        {/* Route for Entry Details, assuming we are passing entryId */}
        <Route path="/entryDetails" element={<EntryDetails />} />

        {/* Route for SubEntryDetails */}
        <Route path="/SubEntryDetails" element={<SubEntryDetails />} />

        {/* Route for perosnla feed */}
        <Route path="/personal" element={<PersonalFeed />} />



      </Routes>
    </Router>
  );
}

export default App;
