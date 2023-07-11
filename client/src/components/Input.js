import React, { useState } from "react";
import "./InputOutput.css";
import Loading from "../components/Loading";
import SubmitButton from "./SubmitButton";

const Input = ({ inputValue, setInputValue, onSubmit }) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = () => {
		if (inputValue.trim() !== "") {
			setIsLoading(true);
			fetchData();
		}
	};

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

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
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
					<SubmitButton onClick={handleSubmit} isLoading={isLoading} />
				)}
			</div>
		</div>
	);
};

export default Input;
