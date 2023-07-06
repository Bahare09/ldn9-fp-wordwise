import React from "react";
import "./InputOutput.css";
import CopyButton from "./CopyButton.js";
import TextToSpeech from "./TextToSpeech";

const Output = ({ outputValue, onReset }) => {
	return (
		<div className="output-wrapper">
			<textarea className="output-field" value={outputValue} readOnly />
			<button onClick={onReset} className="back-button">
				&#10149;
			</button>
			<div className="output-mini-buttons-container">
				<CopyButton text={outputValue} />
				<TextToSpeech outputValue={outputValue} />
			</div>
		</div>
	);
};

export default Output;
