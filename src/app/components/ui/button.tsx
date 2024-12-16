// ui/button.tsx (or wherever your Button component is defined)
import React from 'react';

interface ButtonProps {
  text: string;
  onclick: () => void;
  className?: string; // Add className here to make it optional
}

const Button = ({ text, onclick, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onclick}
      className={`${className} py-2 px-4 rounded-md text-black`} // Use className dynamically
    >
      {text}
    </button>
  );
};

export default Button;
