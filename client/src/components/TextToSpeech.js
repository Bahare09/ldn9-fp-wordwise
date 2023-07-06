import React, { useState } from "react";
import "./TextToSpeech.css";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const TextToSpeech = ({ outputValue }) => {
	const text = outputValue;
	const [volume, setVolume] = useState(0.5); // Initial volume set to 0.5 (50% volume)

	const handleVolumeChange = (event) => {
		const newVolume = parseFloat(event.target.value);
		setVolume(newVolume);
	};

	const handleSpeech = () => {
		const speech = new SpeechSynthesisUtterance(text);
		speech.volume = volume; // Set the volume
		window.speechSynthesis.speak(speech);
	};

	return (
		<div className="speech-container">
			{/* <input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={volume}
				onChange={handleVolumeChange}
			/> */}
			<button className="text-to-speech-button" onClick={handleSpeech}>
				<VolumeUpIcon />{" "}
			</button>
		</div>
	);
};

export default TextToSpeech;
