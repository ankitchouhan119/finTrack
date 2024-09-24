
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import LoginFirst from './pages/LoginFirst';
import Profile from './components/Profile/profile';

function App() {
  return (
    <>
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/loginFirst" element={<LoginFirst />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
