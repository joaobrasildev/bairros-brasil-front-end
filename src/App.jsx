import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import CitySelection from './pages/CitySelection';
import NeighborhoodList from './pages/NeighborhoodList';
import NeighborhoodDetails from './pages/NeighborhoodDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cities" element={<CitySelection />} />
          <Route path="/neighborhoods/:cityId" element={<NeighborhoodList />} />
          <Route path="/neighborhood/:neighborhoodId" element={<NeighborhoodDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;