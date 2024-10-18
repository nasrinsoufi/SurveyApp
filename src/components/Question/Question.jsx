import './Question.css';

import React, { useState, useEffect,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Question = ({ question, onAnswer, questionKey, answer }) => {
  const [localAnswer, setLocalAnswer] = useState(answer || '');
  const questionContainerRef = useRef(null);

  useEffect(() => {
    // Trigger the fade-in animation when the component mounts
    if (questionContainerRef.current) {
      questionContainerRef.current.classList.add('fade-in');
    }

    // Clean up the 'fade-in' class on component unmount
    return () => {
      if (questionContainerRef.current) {
        questionContainerRef.current.classList.remove('fade-in');
      }
    };
  }, []); // Empty dependency array to run the effect only once


  useEffect(() => {
    // Reset the local answer when the question key changes
    setLocalAnswer(answer || '');
  }, [questionKey, answer]);

  const handleChange = (e) => {
    setLocalAnswer(e.target.value);
    onAnswer(question.key, e.target.value);
  };

  const handleCheckboxChange = (option) => {
    const currentSelections = answer || [];
    const updatedSelections = currentSelections.includes(option)
      ? currentSelections.filter((selectedOption) => selectedOption !== option)
      : [...currentSelections, option];

    onAnswer(question.key, updatedSelections);
  };

  return (
    <div className='question' ref={questionContainerRef}>
      <div className='question-text'><h4>{question.prompt}</h4></div>
      {question.type === 'text' && (
        <input type="text" className='form-control' value={localAnswer} onChange={handleChange} />
      )}
      {question.type === 'textarea' && (
        <textarea className='form-control ' value={localAnswer} onChange={handleChange} />
      )}
      {question.type === 'radio' && (
        <div className='radio-area'>
          {question.options.map((option, index) => (
            <label key={index} className='label-area'>
              <input
                type="radio"
                value={option}
                className='form-check-label'
                checked={localAnswer === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
      )}
      {question.type === 'checkbox' && (
        <div>
          {question.options.map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                className='form-check-label '
                id={`option_${index}`}
                value={option}
                checked={answer && answer.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <label htmlFor={`option_${index}`} className='label-area '>{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;
