import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            branch: '',
            year: '',
            interests: []
        };
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleInterestChange = (e) => {
        const { interests } = this.state;
        const interest = e.target.value;

        if (e.target.checked) {
            this.setState({
                interests: [...interests, interest]
            });
        } else {
            this.setState({
                interests: interests.filter(item => item !== interest)
            });
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state),
            });
            const data = await res.json();
            if (res.ok) {
                console.log('Signup success:', data);
                window.location.href = '/dashboard';
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error connecting to server');
        }
    };


    render() {
        const { username, email, password, branch, year, interests } = this.state;

        const containerStyle = {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: '20px'
        };

        const cardStyle = {
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            padding: '40px',
            width: '100%',
            maxWidth: '500px',
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

        const selectStyle = {
            ...inputStyle,
            cursor: 'pointer'
        };

        const radioGroupStyle = {
            display: 'flex',
            gap: '15px',
            marginTop: '8px',
            flexWrap: 'wrap'
        };

        const radioItemStyle = {
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        };

        const radioStyle = {
            accentColor: '#667eea'
        };

        const checkboxGroupStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
            marginTop: '8px'
        };

        const checkboxItemStyle = {
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        };

        const checkboxStyle = {
            accentColor: '#667eea'
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
            marginTop: '20px'
        };

        const linkContainerStyle = {
            textAlign: 'center',
            marginTop: '25px'
        };

        const linkStyle = {
            color: '#667eea',
            textDecoration: 'none',
            fontWeight: '500'
        };

        const branches = [
            'Computer Science',
            'Information Technology',
            'Electronics & Communication',
            'Mechanical Engineering',
            'Civil Engineering',
            'Electrical Engineering',
            'Chemical Engineering',
            'Aerospace Engineering',
            'Biotechnology',
            'Mathematics',
            'Physics',
            'Chemistry',
            'Business Administration',
            'Economics',
            'Psychology'
        ];

        const interestOptions = [
            'Programming',
            'Web Development',
            'Data Science',
            'Machine Learning',
            'Mobile Development',
            'Game Development',
            'Cybersecurity',
            'Database Management',
            'UI/UX Design',
            'Mathematics',
            'Physics',
            'Chemistry',
            'Biology',
            'Literature',
            'History',
            'Philosophy',
            'Economics',
            'Business',
            'Marketing',
            'Finance'
        ];

        return (
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <h1 style={titleStyle}>Join StudyHive</h1>
                    <p style={subtitleStyle}>Create your account and start studying together</p>

                    <form onSubmit={this.handleSubmit}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={this.handleInputChange}
                                style={inputStyle}
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.handleInputChange}
                                style={inputStyle}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleInputChange}
                                style={inputStyle}
                                placeholder="Create a strong password"
                                required
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Branch of Study</label>
                            <select
                                name="branch"
                                value={branch}
                                onChange={this.handleInputChange}
                                style={selectStyle}
                                required
                            >
                                <option value="">Select your branch</option>
                                {branches.map((branchOption) => (
                                    <option key={branchOption} value={branchOption}>
                                        {branchOption}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Year of Study</label>
                            <div style={radioGroupStyle}>
                                {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'].map((yearOption) => (
                                    <div key={yearOption} style={radioItemStyle}>
                                        <input
                                            type="radio"
                                            id={yearOption}
                                            name="year"
                                            value={yearOption}
                                            checked={year === yearOption}
                                            onChange={this.handleInputChange}
                                            style={radioStyle}
                                            required
                                        />
                                        <label htmlFor={yearOption} style={{ fontSize: '14px', cursor: 'pointer' }}>
                                            {yearOption}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Interests (Select multiple)</label>
                            <div style={checkboxGroupStyle}>
                                {interestOptions.map((interest) => (
                                    <div key={interest} style={checkboxItemStyle}>
                                        <input
                                            type="checkbox"
                                            id={interest}
                                            value={interest}
                                            checked={interests.includes(interest)}
                                            onChange={this.handleInterestChange}
                                            style={checkboxStyle}
                                        />
                                        <label htmlFor={interest} style={{ fontSize: '13px', cursor: 'pointer' }}>
                                            {interest}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" style={buttonStyle}>
                            Create Account
                        </button>
                    </form>

                    <div style={linkContainerStyle}>
                        <p style={{ color: '#666', marginBottom: '10px' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={linkStyle}>
                                Sign in here
                            </Link>
                        </p>
                        <div style={{ margin: '15px 0', color: '#999', fontSize: '14px' }}>
                            <Link to="/" style={linkStyle}>
                                ← Back to home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;