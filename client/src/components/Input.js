import React from "react";
import "./InputOutput.css";

const Input = ({ inputValue, setInputValue, onSubmit }) => {
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputValue || inputValue.trim() === "") {
			// Show a warning message
			alert("Input cannot be empty");
			return;
		}
		try {
			const response = await fetch("/api/correction", {
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
	};

	return (
		<div className="input-wrapper">
			<textarea
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Write your text here for corrected and alternative suggestions..."
				className="input-field"
			/>
			<div className="submit-btn-container">
				<button type="submit" className="submit-button" onClick={handleSubmit}>
					&#10148;
				</button>
			</div>
		</div>
	);
};

export default Input;
