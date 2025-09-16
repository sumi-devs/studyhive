import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthChoice from './components/auth/AuthChoice.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import Landing from './components/dashboard/Landing.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthChoice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;