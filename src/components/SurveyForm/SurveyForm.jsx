import React, { useState, useEffect } from 'react';
import Question from '../Question/Question';
import Timer from '../Timer/Timer';
import ThankYou from '../ThankYou/ThankYou';
import './SurveyForm.css';
import Button from '../Button/Button';


const SurveyForm = () => {
  const [userData, setUserData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [answers, setAnswers] = useState({});
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  const questions = [
    {
      type: 'text',
      prompt: 'What is your name?',
      key: 'name',
    },
    {
      type: 'textarea',
      prompt: 'Please describe your overall experience with our product/service in a few sentences.',
      key: 'description1',
    },
    {
      type: 'radio',
      prompt: 'What is your preferred method of communication?',
      options: ['Email', 'Phone', 'Text message','Social media'],
      key: 'choice1',
    },
    {
      type: 'textarea',
      prompt: 'Share any specific features or improvements you would like to see in the app.',
      key: 'description2',
    },
    {
      type: 'radio',
      prompt: 'How often do you use our app?',
      options: ['Daily', 'Weekly', 'Monthly','Rarely'],
      key: 'choice2',
    },
    {
      type: 'textarea',
      prompt: 'How would you describe the user interface of our app? Please provide any suggestions for improvement.',
      key: 'description3',
    },
    {
      type: 'radio',
      prompt: 'Which platform do you primarily use our app on?',
      options: ['iOS', 'Android', 'Web'],
      key: 'choice3',
    },
    {
      type: 'textarea',
      prompt: 'Share any challenges or issues you have encountered while using our app and how we can assist in resolving them.',
      key: 'description4',
    },
    {
      type: 'checkbox',
      prompt: 'Select all the features that you find most valuable in our app:',
      options: ['User Interface Design', 'Performance Speed', 'Customer Support', 'Feature Variety','Pricing','Ease of Use','Regular Updates'],
      key: 'checkbox',
    },
  ];

  const handleAnswer = (key, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: answer,
    }));
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    // Reset timer and set surveyCompleted to false when moving to the next question
    setTimeLeft(120);
    setSurveyCompleted(false);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
    // Reset timer and set surveyCompleted to false when moving to the previous question
    setTimeLeft(120);
    setSurveyCompleted(false);
  };

  const handleTimeout = () => {
    setSurveyCompleted(true);
    localStorage.setItem('surveyCompleted', 'true');
  };

  const handleCompleteSurvey = () => {
    setUserData(answers);
    setSurveyCompleted(true);
    localStorage.setItem('surveyCompleted', 'true');
    setCurrentPage(-1);
  };

  useEffect(() => {
    const surveyCompletedFlag = localStorage.getItem('surveyCompleted');
    if (surveyCompletedFlag === 'true') {
      setCurrentPage(-1);
    }
  }, []); 

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !surveyCompleted) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, surveyCompleted]);

  return (
    <div className="survey-form">
      {currentPage === -1 ? (
        <ThankYou userData={userData} />
      ) : (
        <>
          <Timer timeLeft={timeLeft} onTimeout={handleTimeout} />
          {surveyCompleted ? (
            <div className="time-up-message">
              <h3>Thank you! Time is up.</h3>
            </div>
          ) : (
            <>
              <Question 
                key={currentPage}
                question={questions[currentPage]}
                onAnswer={handleAnswer}
                answer={answers[questions[currentPage].key]}
              />
              <div className="nav-buttons">
                {currentPage > 0 && (
                  <Button handleClick={handlePrev}>Back</Button>
                )}
                {currentPage < questions.length - 1 ? (
                  <Button handleClick={handleNext}>Next</Button>
                ) : (
                  <Button handleClick={handleCompleteSurvey}>Complete Survey</Button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SurveyForm;