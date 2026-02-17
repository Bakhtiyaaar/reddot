import React from 'react';
import './button.css'; 

export const Button = ({ children, onClick, type = "button", variant = "primary", className = "" }) => {
  const buttonClass = `custom-btn btn-${variant} ${className}`;

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;