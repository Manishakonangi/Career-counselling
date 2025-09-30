import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import AbroadStudies from './pages/AbroadStudies';
import Colleges from './pages/Colleges';
import Placements from './pages/Placements';
import Advice from './pages/Advice';
import CollegeResult from "./pages/CollegeResult";
import ResultPage from "./pages/ResultPage";
import About from "./pages/About";
import Bookings from"./pages/Bookings";
import Confirmation from "./pages/Confirmation"; 



function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/abroad-studies" element={<AbroadStudies />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/placements" element={<Placements />} />
         <Route path="/advice" element={<Advice />} />
         <Route path="/results" element={<CollegeResult />} />
         <Route path="/result" element={<ResultPage />} />
         <Route path="/about" element={<About />} />
         <Route path="/bookings" element={<Bookings />} />
        <Route path="/confirmation" element={<Confirmation />} />


      </Routes>
    </Router>
  );
}

export default App;
