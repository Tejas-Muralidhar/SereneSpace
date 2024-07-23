import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/signup', { email, password });
      alert('User created successfully!');
    } catch (error) {
      console.error('There was an error creating the user!', error);
      alert('Error creating user!');
    }
  };

  return (
    <div className="signup-container">
        <header>
            <h1>SereneSpace</h1>
        </header>
        <form className="signup-form" onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign Up</button>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </form>
        <footer>
            <p>&copy; 2024 SereneSpace. All rights reserved.</p>
        </footer>
    </div>
);
};

export default Signup;
