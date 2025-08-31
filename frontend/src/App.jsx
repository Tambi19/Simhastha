import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Scanlanding from "./pages/Scanlanding.jsx";
import PilgrimDashboard from "./pages/PilgrimDashboard.jsx";
import VolunteerDashboard from "./pages/VolunteerDashboard.jsx";
import CleanerDashboard from "./pages/CleanerDashboard.jsx";
import Login from "./pages/LoginDashboard.jsx";
import Register from "./pages/Register.jsx";
import NearbyToilet from './pages/NearbyToilet.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scanlanding />} />
        <Route path="/pilgrim" element={<PilgrimDashboard />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/cleaner" element={<CleanerDashboard />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/toilets" element={<NearbyToilet />} />



        
      </Routes>
    </Router>
  );
}

export default App