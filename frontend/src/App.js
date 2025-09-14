import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/LoginForm'; 
import Home from './pages/HomePage'; 
import ActivityDetail from './pages/ActivityDetail';
import EditActivity from './pages/EditActivity';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/actividad/:id" element={<ActivityDetail/>}/>
        <Route path="/actividad/:id/editar" element={<EditActivity />} />
        <Route path="/actividad/nueva" element={<EditActivity isNew={true} />} />
      </Routes>
    </Router>
  );
}

export default App;