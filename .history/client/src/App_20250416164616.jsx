import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Pages/Navbar.js'; // Import Navbar component
import Dashboard from './Components/Pages/Dashboard.jsx';
import AllProjects from './Components/Pages/AllProjects.jsx'; // Adjust path as needed
import ProjectDetails from './Components/Pages/ProjectDetails.jsx'; // Add this import for the project details page
import EntryDetails from './Components/Pages/EntryDetails.jsx'; // Add this import for the entry details page
import SubEntryDetails from './Components/Pages/SubEntryDetails.jsx';
import PersonalFeed from './Components/Pages/PersonalFeed.jsx';
import PrivacyFeed from './Components/Pages/PrivacyFeed.jsx';
import CalendarView from './Components/Pages/CalenderView.jsx';


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

        {/* Route for privcy feed */}
        <Route path="/privacy" element={<PrivacyFeed />} />

        {/* Route for calender */}
        <Route path="/calendar" element={<CalendarView />} />


      </Routes>
    </Router>
  );
}

export default App;
