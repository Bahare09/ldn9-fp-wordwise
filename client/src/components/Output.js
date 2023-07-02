import React from "react";
import "./InputOutput.css";
import CopyButton from "./CopyButton.js";
import TextToSpeech from "./TextToSpeech";

const Output = ({ outputValue, onReset }) => {
	return (
		<div>
			<textarea className="output-field" value={outputValue} readOnly />
			<CopyButton text={outputValue} />
			<button onClick={onReset} className="back-button">
				&#10149;
			</button>

			<TextToSpeech outputValue={outputValue} />
		</div>
	);
};

export default Output;
