import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar.jsx'; // Import Navbar component
import Dashboard from './Pages/Dashboard.jsx';
import AllProjects from './Pages/AllProjects.jsx'; // Adjust path as needed
import ProjectDetails from './Pages/ProjectDetails.jsx'; // Add this import for the project details page
import EntryDetails from './Pages/EntryDetails.jsx'; // Add this import for the entry details page
import SubEntryDetails from './Pages/SubEntryDetails.jsx';
import PersonalFeed from './Pages/PersonalFeed.jsx';
import PrivacyFeed from './Pages/PrivacyFeed.jsx';
import CalendarView from './Pages/CalenderView.jsx';


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
        <Route path="/projectDetails/:projectId" element={<ProjectDetails />} />

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
