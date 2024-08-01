import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear any previous error
    
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            console.log(response.data); // Log the entire response data
            const { userId } = response.data; // Correctly extract userId
            console.log(userId);
    
            if (userId) {
                localStorage.setItem('userId', userId);
                console.log('Login Successful!');
                navigate('/main');
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (error) {
            setError('Invalid email or password. Please try again.');
            console.error('Login error:', error);
        }
    };
    

    return (
        <div className="login-container">
            <header className='LoginHeader'>
                <h1>SereneSpace: Your Wellness App</h1>
            </header>
            {error && <p className="error-message">{error}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </form>
            <footer>
                <p>&copy; 2024 SereneSpace. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Login;
