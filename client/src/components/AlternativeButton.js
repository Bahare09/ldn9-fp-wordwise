import React from "react";
import "./AlternativeButton.css";

const AlternativeButton = ({
	outputValue,
	setAlternativeValues,
	setShowAlternatives,
}) => {
	const getAlternatives = async () => {
		try {
			const response = await fetch("/api/alternatives", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ input: outputValue }),
			});
			if (response.ok) {
				const data = await response.json();
				const alternatives = data
					.split("\n")
					.map((string) => string.replace(/^\d+\.\s/, "").replace(/[",]/g, ""))
					.filter(Boolean);
				setAlternativeValues(alternatives);
				setShowAlternatives(true);
			} else {
				console.log("Error: " + response.status);
			}
		} catch (error) {
			console.error("Failed to fetch alternatives:", error);
		}
	};
	return (
		<button onClick={getAlternatives} className="alternative-button">
			Get Alternatives
		</button>
	);
};

export default AlternativeButton;
