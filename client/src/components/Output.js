import React from "react";
import "./InputOutput.css";
import CopyButton from "./CopyButton.js";
import TextToSpeechButton from "./TextToSpeechButton";

const Output = ({ outputValue, onReset }) => {
	return (
		<div className="all-output-container">
			<div>
				<textarea className="output-field" value={outputValue} readOnly />
				<button onClick={onReset} className="back-button">
					&#10149;
				</button>
			</div>
			<div className="volume-copy-container">
				<CopyButton text={outputValue} />
				<TextToSpeechButton />
			</div>
		</div>
	);
};

export default Output;
