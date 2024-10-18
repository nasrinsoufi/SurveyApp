import React, { useEffect } from 'react';
import './ThankYou.css';


const ThankYou = ({ userData }) => {
  useEffect(() => {
    console.log('User Responses:', userData);
  }, [userData]);

  return (
    <div className="thank-you">
      <h3>Thank you for taking the survey!</h3>
    </div>
  );
};

export default ThankYou;

