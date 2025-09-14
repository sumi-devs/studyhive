import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthChoice from './components/auth/AuthChoice';
import Login from './components/auth/Login';
import Landing from './components/dashboard/Landing.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthChoice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;