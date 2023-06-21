import React from "react";
import "./style.css";

const Output = ({ inputValue, onReset }) => {
  return (
    <div>
      <input type="text" value={inputValue} readOnly className="output-field" />
      <button onClick={onReset} className="submit-button">
        &#10149; back to Input
      </button>
    </div>
  );
};

export default Output;
