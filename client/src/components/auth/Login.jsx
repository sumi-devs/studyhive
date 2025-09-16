import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Login success:', data);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    backdropFilter: 'blur(10px)'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: '8px'
  };

  const subtitleStyle = {
    color: '#666',
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '16px'
  };

  const inputGroupStyle = {
    marginBottom: '25px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#333',
    fontWeight: '500',
    fontSize: '14px'
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    border: '2px solid #e1e8ed',
    borderRadius: '12px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const inputFocusStyle = {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px'
  };

  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
  };

  const linkContainerStyle = {
    textAlign: 'center',
    marginTop: '25px'
  };

  const linkStyle = {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease'
  };

  const dividerStyle = {
    margin: '15px 0',
    color: '#999',
    fontSize: '14px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Welcome Back</h1>
        <p style={subtitleStyle}>Sign in to your StudyHive account</p>

        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="Enter your email"
              required
              onFocus={(e) => {
                Object.assign(e.target.style, inputFocusStyle);
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e8ed';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Enter your password"
              required
              onFocus={(e) => {
                Object.assign(e.target.style, inputFocusStyle);
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e8ed';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, buttonHoverStyle);
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Sign In
          </button>
        </form>

        <div style={linkContainerStyle}>
          <p style={{ color: '#666', marginBottom: '10px' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={linkStyle}>
              Sign up here
            </Link>
          </p>
          <div style={dividerStyle}>
            <Link to="/" style={linkStyle}>
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;