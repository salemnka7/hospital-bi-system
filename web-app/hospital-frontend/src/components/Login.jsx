import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importing the CSS file for styling

// --- Mock API for Login (for demonstration purposes) ---
// In a real application, you would replace this with your actual API calls.
const mockAPI = {
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate network delay
        if (data.username === 'patient' && data.password === 'password') {
          resolve({
            data: {
              token: 'mock-jwt-token-12345',
              message: 'Login successful',
              patientName: 'Jane Doe' // Example patient name
            }
          });
        } else {
          reject({
            response: {
              data: { message: 'Invalid username or password' }
            }
          });
        }
      }, 1500); // 1.5 second delay
    });
  }
};

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors
    setLoading(true); // Show loading indicator

    try {
      const response = await mockAPI.post('/api/login', {
        username,
        password,
      });

      console.log('Login successful:', response.data);

      // Store token and patient name in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('patientName', response.data.patientName);

      onLoginSuccess(response.data.patientName); // Notify parent component of successful login
      navigate('/dashboard'); // Navigate to dashboard
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="https://placehold.co/120x120/4A90E2/FFFFFF?text=Hospital+Logo" alt="Hospital Logo" className="login-logo" />
        <h2 className="login-title">Welcome to Patient Portal</h2>
        <p className="login-subtitle">Please sign in to access your dashboard.</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username (e.g., patient)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password (e.g., password)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <p className="forgot-password">Forgot your password?</p>
      </div>
    </div>
  );
}

export default Login;
