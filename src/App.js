
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import LoginFirst from './pages/LoginFirst';

function App() {
  return (
    <>
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/loginFirst" element={<LoginFirst />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
