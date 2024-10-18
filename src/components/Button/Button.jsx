import React from "react";
import  "./Button.css";


const Button = ({children, handleClick = () => {}} ) => {
return (
   <button className="button-form" onClick={handleClick}>{children} </button>
   );
};
 
export default Button;