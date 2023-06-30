import React from "react";
import "./InputOutput.css";
import CopyButton from "./CopyButton.js";
import TextToSpeechButton from "./TextToSpeechButton";

const Output = ({ outputValue, onReset }) => {
	return (
		
		<div>
			<textarea className="output-field" value={outputValue} readOnly />
			<CopyButton text={outputValue} />
			<button onClick={onReset} className="back-button">
				&#10149;
			</button>
			<div className="text-to-speech-output">

				<TextToSpeechButton />
			</div>
		</div>
	);
};

export default Output;
