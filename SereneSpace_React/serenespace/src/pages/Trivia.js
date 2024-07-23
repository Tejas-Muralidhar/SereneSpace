import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trivia.css';
import { useNavigate } from 'react-router-dom';

const TriviaGame = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/questions/trivia');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, []);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
            setFeedback('Correct!');
        } else {
            setFeedback('Incorrect!');
        }

        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
            setSelectedOption('');
        } else {
            setFeedback(`Game Over! Your score is ${score}/${questions.length}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    if (questions.length === 0) return <p>Loading...</p>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className='trivia-container'>
            <div className="Header">
                <p className="back-button" onClick={() => navigate('/main')}> Back to Main </p>
                <h1>Learn through fun: CBT Trivia</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
            <div className="trivia-game">
                <h1>Trivia Game</h1>
                <p><strong>Question {currentQuestionIndex + 1}:</strong> {currentQuestion.question}</p>
                <div className="options">
                    {currentQuestion.options.map(option => (
                        <div key={option}>
                            <input
                                type="radio"
                                id={option}
                                name="option"
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => handleOptionChange(option)}
                            />
                            <label htmlFor={option}>{option}</label>
                        </div>
                    ))}
                </div>
                <button onClick={handleSubmit}>Submit</button>
                {feedback && <p className="feedback">{feedback}</p>}
            </div>
        </div>
    );
};

export default TriviaGame;
