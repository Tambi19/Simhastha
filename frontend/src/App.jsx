import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Scanlanding from "./pages/Scanlanding.jsx";
import PilgrimDashboard from "./pages/PilgrimDashboard.jsx";
import VolunteerDashboard from "./pages/VolunteerDashboard.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scanlanding />} />
        <Route path="/pilgrim" element={<PilgrimDashboard />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />

        
      </Routes>
    </Router>
  );
}

export default App