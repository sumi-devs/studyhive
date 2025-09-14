import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Welcome to StudyHive Dashboard</h1>
      <p>You are successfully logged in!</p>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <Link to="/groups">
          <button style={{ padding: '15px 25px', fontSize: '16px' }}>
            Find Study Groups
          </button>
        </Link>
        <Link to="/buddies">
          <button style={{ padding: '15px 25px', fontSize: '16px' }}>
            Find Study Buddies
          </button>
        </Link>
        <Link to="/tasks">
          <button style={{ padding: '15px 25px', fontSize: '16px' }}>
            Manage Tasks
          </button>
        </Link>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white' }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Landing;