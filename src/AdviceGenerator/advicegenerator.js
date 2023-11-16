// Import  modules and styles
import React, { useState, useEffect } from 'react';
import './style.css';

// Define the AdviceGenerator component
const AdviceGenerator = () => {
  // State variables for advice and button activity
  const [advice, setAdvice] = useState('');
  const [isActive, setIsActive] = useState(false);

  // Fetch advice from the API when the component mounts
  useEffect(() => {
    fetchAdvice();
  }, []);

  // Function to fetch advice from the API
  const fetchAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setAdvice(data.slip.advice);
      setIsActive(false);
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
  };

  // Function to handle the click event and fetch new advice
  const handleNewAdvice = () => {
    fetchAdvice();
  };

  // Render the component with advice, play/pause button, and dice icon
  return (
    <div className="advice-container">
      <div className={`advice-box ${isActive ? 'clicked' : ''}`}>
        {/* Display advice header */}
        <div className="advice-header">ADVICE #{Math.floor(Math.random() * 1000)}</div>
        
        {/* Display advice description with quotes and styling */}
        <p className="advice-description">“{advice}”</p>

        {/* Play/pause button and divider lines */}
        <div className="play-pause-container">
          <div className="line-divider"></div>
          <div className="play-pause-button" onClick={() => setIsActive(!isActive)}></div>
          <div className="line-divider"></div>
        </div>

        {/* Dice icon for fetching new advice */}
        <button
          className={`dice-icon ${isActive ? 'clicked' : ''}`}
          onClick={handleNewAdvice}
        >
          🎲
        </button>

        {/* Display playing icon when advice is active */}
        {isActive && <div className="playing-icon"></div>}
      </div>
    </div>
  );
};

// Export the AdviceGenerator component
export default AdviceGenerator;
