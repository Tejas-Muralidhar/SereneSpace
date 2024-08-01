import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './MoodPlot.css'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

// Register the components needed for the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MoodPlot = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [moodData, setMoodData] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Get userId from localStorage
    let userId = localStorage.getItem('userId');

    useEffect(() => {
        if (startDate && endDate && userId) {
            const fetchMoodData = async () => {
                try {
                    console.log("Fetching mood data");
                    const response = await axios.get(`http://localhost:5000/api/moods/${userId}`, {
                        params: { startDate, endDate }
                    });
                    const filteredMoodData = response.data.filter(entry => {
                        const entryDate = new Date(entry.date);
                        return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
                    }).sort((a, b) => new Date(a.date) - new Date(b.date));
                    setMoodData(filteredMoodData);
                    console.log("Mood data fetched successfully");
                    setError('');
                } catch (error) {
                    setError('Error fetching mood data.');
                    console.error('Error fetching mood data:', error);
                }
            };

            fetchMoodData();
        }
    }, [startDate, endDate, userId]);

    const getMoodScore = (mood) => {
        const moodScores = {
            Happy: 5,
            Excited: 4,
            Content: 3,
            Relaxed: 2,
            Bored: 1,
            Tired: -1,
            Stressed: -2,
            Anxious: -3,
            Angry: -4,
            Sad: -5
        };
        return moodScores[mood] || 0;
    };

    const data = {
        labels: moodData.map(entry => format(new Date(entry.date), 'dd-MM-yyyy')),
        datasets: [
            {
                label: 'Mood Score',
                data: moodData.map(entry => entry.moods.reduce((acc, mood) => acc + getMoodScore(mood), 0) / entry.moods.length),
                backgroundColor: moodData.map(entry => {
                    const averageScore = entry.moods.reduce((acc, mood) => acc + getMoodScore(mood), 0) / entry.moods.length;
                    return averageScore >= 0 ? 'rgba(0,200,100,0.7)' : 'rgba(200,0,50,0.7)';
                }),
                borderColor: moodData.map(entry => {
                    const averageScore = entry.moods.reduce((acc, mood) => acc + getMoodScore(mood), 0) / entry.moods.length;
                    return averageScore >= 0 ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)';
                }),
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Mood Score: ${tooltipItem.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Mood Score'
                },
                ticks: {
                    callback: function (value) {
                        return value >= 0 ? `+${value}` : value;
                    }
                }
            }
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
        <div className="mood-plot-container">
            <h2>Mood Plot</h2>
            <div className="date-picker">
                <label>
                    Start Date:
                    <input
                        type="date"
                        className='moodplotdate'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        className='moodplotdate'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </label>
            </div>
            {error && <p className="error">{error}</p>}
            {moodData.length > 0 ? <Bar data={data} options={options} /> : <p>Select dates to view mood plot.</p>}
        </div>
        </>
    );
};

export default MoodPlot;
