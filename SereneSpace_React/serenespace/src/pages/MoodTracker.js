import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MoodTracker.css';
import { useNavigate } from 'react-router-dom';

const MoodTracker = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedMoods, setSelectedMoods] = useState([]);
    const [reason, setReason] = useState('');
    const [moods, setMoods] = useState([]);
    const [error, setError] = useState('');
    const [expandedEntry, setExpandedEntry] = useState(null);
    const navigate = useNavigate();

    const moodOptions = ['Happy', 'Sad', 'Angry', 'Anxious', 'Excited', 'Content', 'Stressed', 'Relaxed', 'Bored', 'Tired'];

    useEffect(() => {
        const fetchMoods = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User not logged in.');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/api/moods/${userId}`);
                setMoods(response.data);
                setError('');
            } catch (error) {
                setError('Error fetching moods. Please try again later.');
                console.error('Error fetching moods:', error);
            }
        };

        fetchMoods();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User not logged in.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/moods', { userId, date, time, moods: selectedMoods, reason });
            setMoods([...moods, response.data]);
            setDate('');
            setTime('');
            setSelectedMoods([]);
            setReason('');
            setError('');
        } catch (error) {
            setError('Error creating mood entry. Please try again later.');
            console.error('Error creating mood entry:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleMoodChange = (mood) => {
        setSelectedMoods(prevMoods => 
            prevMoods.includes(mood) ? prevMoods.filter(m => m !== mood) : [...prevMoods, mood]
        );
    };

    // Helper function to truncate text
    const truncateText = (text, length) => {
        if (text.length <= length) return text;
        return text.slice(0, length) + '...';
    };

    // Toggle for more content
    const handleExpand = (id) => {
        setExpandedEntry(expandedEntry === id ? null : id);
    };


    return (
        <div className="mood-tracker-container">
            <div className="Header">
                <p className="back-button" onClick={() => navigate('/main')}> Back to Main </p>
                <h1>Recognizing Patterns: Mood Tracker</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
            <div className="content">
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="date"
                        placeholder="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <input
                        type="time"
                        placeholder="Time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                    <div className="mood-checkboxes">
                        {moodOptions.map((moodOption) => (
                            <label key={moodOption}>
                                <input
                                    type="checkbox"
                                    value={moodOption}
                                    checked={selectedMoods.includes(moodOption)}
                                    onChange={() => handleMoodChange(moodOption)}
                                />
                                {moodOption}
                            </label>
                        ))}
                    </div>
                    <textarea
                        placeholder="Reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                    <button type="submit">Save Mood</button>
                </form>
                <div>
                    <h2>Your Mood Entries</h2>
                    {moods.length === 0 ? (
                        <p>No moods tracked yet.</p>
                    ) : (
                        moods.map((moodEntry) => (
                            <div key={moodEntry._id} className="mood-entry">
                                <h3>{moodEntry.date} {moodEntry.time}</h3>
                                <p><b>Moods:</b> {moodEntry.moods.join(', ')}</p>
                                <p>
                                    <b>Reason:</b> {expandedEntry === moodEntry._id ? moodEntry.reason : truncateText(moodEntry.reason, 50)}
                                    {moodEntry.reason.length > 100 && (
                                        <span className="more-link" onClick={() => handleExpand(moodEntry._id)}>
                                            {expandedEntry === moodEntry._id ? ' Show less' : ' ...more'}
                                        </span>
                                    )}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MoodTracker;
