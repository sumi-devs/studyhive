import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    
    // For now, just redirect to dashboard (we'll add real login later)
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <h2>Login to StudyHive</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', fontSize: '16px' }}>
          Login
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
      <p style={{ textAlign: 'center' }}>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  );
}

export default Login;