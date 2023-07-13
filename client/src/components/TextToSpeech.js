import React, { useState } from "react";
import "./TextToSpeech.css";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StopIcon from "@mui/icons-material/Stop";

const TextToSpeech = ({ outputValue }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const text = outputValue;

	const handleSpeech = () => {
		const speech = new SpeechSynthesisUtterance(text);
		window.speechSynthesis.speak(speech);
		setIsPlaying(true);
	};
	const handleStopPlaying = () => {
		window.speechSynthesis.cancel();
		setIsPlaying(false);
	};

	return (
		<div className="text-to-speech-container">
			{isPlaying ? (
				<button className="text-to-speech-button" onClick={handleStopPlaying}>
					<StopIcon />
				</button>
			) : (
				<button className="text-to-speech-button" onClick={handleSpeech}>
					<VolumeUpIcon />
				</button>
			)}
		</div>
	);
};

export default TextToSpeech;
