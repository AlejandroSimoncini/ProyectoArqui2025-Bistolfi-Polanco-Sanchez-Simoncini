import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ActivityDetail from './pages/ActivityDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actividad/:id" element={<ActivityDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
