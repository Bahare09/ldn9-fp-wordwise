import React, { useState, useEffect } from "react";
import "./InputOutput.css";
import Loading from "../components/Loading";

const Input = ({ inputValue, setInputValue, onSubmit }) => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
			fetchData();
		}
	}, [isLoading, inputValue]); // Include inputValue as a dependency

	const fetchData = async () => {
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
		} finally {
			setIsLoading(false);
			setInputValue("");
		}
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!inputValue || inputValue.trim() === "") {
			// Show a warning message
			alert("Input cannot be empty");
			return;
		}
		setIsLoading(true);
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
				{isLoading ? (
					<Loading />
				) : (
					<button
						type="submit"
						className="submit-button"
						onClick={handleSubmit}
						disabled={isLoading}
					>
						&#10148;
					</button>
				)}
			</div>
		</div>
	);
};

export default Input;
