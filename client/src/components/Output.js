import React from "react";
import "./InputOutput.css";
import TextToSpeechButton from "./TextToSpeechButton";

const Output = ({ outputValue, onReset }) => {
	return (
		<div>
			<textarea className="output-field" value={outputValue} readOnly />
			<button onClick={onReset} className="back-button">
				&#10149;
			</button>
			<TextToSpeechButton />
		</div>
	);
};

export default Output;
