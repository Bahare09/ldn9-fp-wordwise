import React, { useState } from "react";
import "./InputOutput.css";
import TextToSpeechButton from "./TextToSpeechButton";

const Input = ({ onSubmit }) => {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/api", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ input: inputValue }),
			});

			if (response.ok) {
				const data = await response.json();
				const correctedSentence = data;
				onSubmit(correctedSentence);
			} else {
				console.log("Error: " + response.status);
			}
		} catch (error) {
			console.log(error);
		}

		setInputValue("");
	};

	return (
		<div className="input-container">
			<textarea
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Enter something..."
				className="input-field"
			/>
			<button type="submit" className="submit-button" onClick={handleSubmit}>
				&#10148;
			</button>
			<TextToSpeechButton />
		</div>
	);
};

export default Input;
