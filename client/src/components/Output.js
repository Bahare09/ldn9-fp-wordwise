import React from "react";
import "./InputOutput.css";
import CopyButton from "./CopyButton.js";

const Output = ({ outputValue, onReset }) => {
	return (
		<div>
			<textarea className="output-field" value={outputValue} readOnly />
			<CopyButton text={outputValue} />
			<button onClick={onReset} className="back-button">
				&#10149;
			</button>
		</div>
	);
};

export default Output;
