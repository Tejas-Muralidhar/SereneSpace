import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Journal.css';

const Journal = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEntries = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User not logged in.');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/api/journals/entries/${userId}`);
                setEntries(response.data);
                setError('');
            } catch (error) {
                setError('Error fetching journal entries. Please try again later.');
                console.error('Error fetching journal entries:', error);
            }
        };

        fetchEntries();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User not logged in.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/journals/entries', { userId, title, content });
            setEntries([...entries, response.data]);
            setTitle('');
            setContent('');
            setError('');
        } catch (error) {
            setError('Error creating journal entry. Please try again later.');
            console.error('Error creating journal entry:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            try {
                await axios.delete(`http://localhost:5000/api/journals/entries/${id}`);
                setEntries(entries.filter(entry => entry._id !== id));
                setError('');
            } catch (error) {
                setError('Error deleting journal entry. Please try again later.');
                console.error('Error deleting journal entry:', error);
            }
        }
    };

    const truncateText = (text, length) => {
        if (text.length <= length) return text;
        return text.slice(0, length) + '...';
    };

    const [expandedEntry, setExpandedEntry] = useState(null);

    const handleExpand = (id) => {
        setExpandedEntry(expandedEntry === id ? null : id);
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <div className="journal-container">
            <div className="Header">
                <p className="back-button" onClick={() => navigate('/main')}> Back to Main </p>
                <h1>Healing and Revealing: Journaling</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
            <div className="Content">
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        className='textinput'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Write your journal entry here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button type="submit">Save Entry</button>
                </form>
                <div className="AllEntries">
                    <h2>Your Entries</h2>
                    {entries.length === 0 ? (
                        <p>No entries found.</p>
                    ) : (
                        entries.map((entry) => (
                            <div key={entry._id} className="entry">
                                <h3>{entry.title}</h3>
                                <p>
                                    {expandedEntry === entry._id ? entry.content : truncateText(entry.content, 100)}
                                    {entry.content.length > 100 && (
                                        <span className="more-link" onClick={() => handleExpand(entry._id)}>
                                            {expandedEntry === entry._id ? ' Show less' : ' ...more'}
                                        </span>
                                    )}
                                </p>
                                <small>{new Date(entry.createdAt).toLocaleDateString()}</small>
                                <button className="delete-button" onClick={() => handleDelete(entry._id)}>Delete Entry</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Journal;
