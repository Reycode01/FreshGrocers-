import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // State for success notification
  const [showForm, setShowForm] = useState(true); // State to control form visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setSuccess(true); // Show success message
        setError('');
        setEmail('');
        setPassword('');

        // Auto close the form and success notification after 3 seconds
        setTimeout(() => {
          closeForm(); // Call the close function
          navigate('/'); // Redirect to home page
        }, 3000);
      }
    } catch (err) {
      console.error(err.response?.data); // Log error
      setError(err.response?.data?.error || 'Login failed, please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Close form and success notification manually
  const closeForm = () => {
    setSuccess(false); // Hide the success notification
    setShowForm(false); // Hide the form
    setError(''); // Clear any error messages
  };

  // If showForm is false, hide the entire form and notification
  if (!showForm) return <></>; // Return an empty fragment instead of null

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error">{error}</p>}

        {/* Success notification */}
        {success && (
          <div className="success-notification">
            <p>Login successful!</p>
            <button className="close-btn" onClick={closeForm}>X</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;

