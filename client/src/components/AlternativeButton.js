import React from "react";
import "./AlternativeButton.css";

const AlternativeButton = ({ outputValue, setAlternativeValue }) => {
	const getAlternatives = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/alternatives", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ input: outputValue }),
			});
			if (response.ok) {
				const alternative = await response.json();
				setAlternativeValue(alternative);
			} else {
				console.log("Error: " + response.status);
			}
		} catch (error) {
			console.error("Failed to fetch alternatives:", error);
		}
	};

	return (
		<button onClick={getAlternatives} className="alternative-button">
			Get Alternatives:
		</button>
	);
};

export default AlternativeButton;
