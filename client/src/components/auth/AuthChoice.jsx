import React from 'react';
import { Link } from 'react-router-dom';

function AuthChoice() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to StudyHive</h1>
      <p>Choose an option:</p>
      <div>
        <Link to="/login">
          <button style={{ margin: '10px', padding: '15px 30px', fontSize: '16px' }}>
            Login
          </button>
        </Link>
        <Link to="/signup">  
          <button style={{ margin: '10px', padding: '15px 30px', fontSize: '16px' }}>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AuthChoice;