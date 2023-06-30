import React from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./TextToSpeechButton.css";

function TextToSpeechButton() {
  return (
		<div className="text-to-speech-container">
			<button className="text-to-speech-button">
				<VolumeUpIcon />
			</button>
		</div>
	);
}

export default TextToSpeechButton;