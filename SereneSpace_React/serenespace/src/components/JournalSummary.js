import React, { useState } from 'react';
import axios from 'axios';
import './JournalSummary.css'; // Add styling as needed
import { useNavigate } from 'react-router-dom';

const JournalSummary = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [summary, setSummary] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFetchSummary = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User not logged in.');
            }
            const response = await axios.post('http://localhost:5000/api/journals/summarize', {
                userId,
                startDate,
                endDate
            });
            setSummary(response.data.summary);
            setError('');
        } catch (err) {
            setError('Error fetching summary. Please try again later.');
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <>
        <div className="Header">
        <p className="back-button" onClick={() => navigate('/main')}> Back to Main </p>
        <h1>Healing and Revealing: Journaling</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
        <div className="journal-summary-container">
            <h1>Journal Summary</h1>
            <div className="date-picker">
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </label>
                <button onClick={handleFetchSummary}>Get Summary</button>
            </div>
            {error && <p className="error">{error}</p>}
            {summary && <div className="summary">
                <h2>Summary:</h2>
                <p>{summary}</p>
            </div>}
        </div>
        </>
    );
};

export default JournalSummary;
