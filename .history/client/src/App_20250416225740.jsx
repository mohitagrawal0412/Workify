import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import AllProjects from './Pages/AllProjects.jsx';
import ProjectDetails from './Pages/ProjectDetails.jsx';
import EntryDetails from './Pages/EntryDetails.jsx';
import SubEntryDetails from './Pages/SubEntryDetails.jsx';
import PersonalFeed from './Pages/PersonalFeed.jsx';
import PrivacyFeed from './Pages/PrivacyFeed.jsx';
import CalendarView from './Pages/CalenderView.jsx';

function App() {
  return (
    <>
      <Navbar /> {/* Persistent across all pages */}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projectDetails/:projectId" element={<ProjectDetails />} />
        <Route path="/entryDetails/projectId/:entryId" element={<EntryDetails />} />
        <Route path="/subEntryDetails/:entryId" element={<SubEntryDetails />} />
        <Route path="/personal" element={<PersonalFeed />} />
        <Route path="/privacy" element={<PrivacyFeed />} />
        <Route path="/calendar" element={<CalendarView />} />
      </Routes>
    </>
  );
}

export default App;
