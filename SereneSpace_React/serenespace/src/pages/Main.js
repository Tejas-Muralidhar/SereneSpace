import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Main.css';

const Main = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [question, setQuestion] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleShowQuestion = () => {

    const questions = [
      'What is one thing you did today that you\'re proud of?',
      'How do you feel about the progress you\'ve made this week?',
      'What challenges have you faced recently, and how did you overcome them?',
      'What is something new you learned about yourself this month?',
      'How have you grown emotionally over the past year?',
      'What small step can you take tomorrow to improve your well-being?',
      'What is one positive change you can make in your daily routine?',
      'How do you handle stress, and what could you do to manage it better?',
      'What makes you feel most fulfilled, and how can you incorporate more of that into your life?',
      'What are you most grateful for right now?',
      'How do you celebrate your achievements, both big and small?',
      'What self-care practices help you feel your best?',
      'What is one thing you wish you had done differently in the past week?',
      'How do you balance your personal and professional life?',
      'What relationships in your life bring you the most joy?',
      'What is a recent experience that challenged your perspective?',
      'How do you show yourself kindness and compassion?',
      'What does a perfect day look like for you?',
      'What are your current goals, and what steps are you taking to achieve them?',
      'How do you stay motivated and focused on your long-term goals?'
    ];

    // Pick a random question from the array
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(randomQuestion);
    setShowQuestion(true);
  };


  const handleCloseQuestion = () => {
    setShowQuestion(false);
  };

  return (
    <div className="main-container">
      <header>
        <h1>SereneSpace: The Mental Health App</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <section className="hero">
        <h1>Welcome to Your Wellbeing Companion</h1>
        <p>Your journey to better mental health starts here.</p>
      </section>
      <section className="cards">
        <div className="card">
          <div className="card-content">
            <h2>Journaling</h2>
            <p>Reflect on your day and express your thoughts.</p>
            <Link to="/journaling" className="card-link">Start Journaling</Link>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h2>Trivia Game</h2>
            <p>Test your knowledge and earn points by answering CBT-related questions.</p>
            <Link to="/trivia-game" className="card-link">Play Now</Link>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h2>Mood Tracker</h2>
            <p>Track and understand your mood patterns.</p>
            <Link to="/mood-tracker" className="card-link">Track Your Mood</Link>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h2>Journal Summary</h2>
            <p>Get a generated summary of your journal entries.</p>
            <Link to="/summarize" className="card-link">View Summary</Link>
          </div>
        </div>
        <div className="card">
          <div className='card-content'>
            <h2>Mood Plot</h2>
            <p>Get an in depth analysis of your mood.</p>
            <Link to="/mood-plot" className="card-link">View Mood Plot</Link>
          </div>
        </div>
      </section>
      <button onClick={handleShowQuestion} className="reflective-button">Click me!</button>
      {showQuestion && (
        <div className="question-popup">
          <div className="question-content">
            <h2>Reflective Question</h2>
            <p>{question}</p>
            <button onClick={handleCloseQuestion} className="close-button">Close</button>
          </div>
        </div>
      )}
      <footer>
        <p>&copy; SereneSpace 2024. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Main;
