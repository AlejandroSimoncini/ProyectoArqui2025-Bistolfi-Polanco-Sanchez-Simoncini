import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/LoginForm'; // Ajustá esto si tu Login está en otra carpeta
import Home from './pages/HomePage'; // Ajustá esto si tu Home está en otra carpeta
import ActivityDetail from './pages/ActivityDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/actividad/:id" element={<ActivityDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
