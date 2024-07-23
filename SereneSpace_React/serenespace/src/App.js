import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Journal from './pages/Journal';
import MoodTracker from './pages/MoodTracker';
import Trivia from './pages/Trivia';
import MoodPlot from './components/MoodPlot';
import JournalSummary from './components/JournalSummary';
import './App.css';

const App = () => {

  // const userId = localStorage.getItem(userId); // Replace with actual user ID
  const startDate = '2023-01-01'; // Replace with actual start date
  const endDate = '2023-12-31'; // Replace with actual end date

  return (
    <div className="app-container">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/journaling" element={<Journal />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/trivia-game" element={<Trivia />} />
        <Route path="/mood-plot" element={<MoodPlot />} />
        <Route path="/summarize" element={<JournalSummary />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
