import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';

import './App.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css';
import Contest from './pages/Contest/Contest';

import "@fontsource/plus-jakarta-sans"; // Defaults to weight 400
import "@fontsource/plus-jakarta-sans/400.css"; // Specify weight
import "@fontsource/plus-jakarta-sans/400-italic.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/contest" element={<Contest />} />
      </Routes>
    </Router>
  );
}

export default App;
