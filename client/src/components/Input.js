import React, { useState } from "react";
import "./InputOutput.css";

const Input = ({ onInputChange, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onInputChange(inputValue);
    setInputValue("");
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter something..."
        className="input-field"
      />
      <button type="submit" className="submit-button">
        Submit &#10148;
      </button>
    </form>
  );
};

export default Input;
