import React from "react";
import "./InputOutput.css";

const Output = ({ outputValue, onReset }) => {
	return (
		<div>
			<textarea className="output-field" value={outputValue} readOnly />
			<button onClick={onReset} className="back-button">
				&#10149;
			</button>
		</div>
	);
};

export default Output;
