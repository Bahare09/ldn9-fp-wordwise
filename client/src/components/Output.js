import React from "react";
import "./InputOutput.css";

const Output = ({ inputValue, onReset }) => {
  return (
    <div>
      <textarea className="output-field">{ inputValue }</textarea>
      <button onClick={onReset} className="submit-button">
        &#10149;
      </button>
    </div>
  );
};

export default Output;
