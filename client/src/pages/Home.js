import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Input from "../components/Input";
import Output from "../components/Output";
import "./Home.css";
import "../components/InputOutput.css";
import Header from "../components/Header";
import AlternativeButton from "../components/AlternativeButton";
import CopyButton from "../components/CopyButton";
import Footer from "../components/Footer";
import TextToSpeech from "../components/TextToSpeech";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [showOutput, setShowOutput] = useState(false);
	const [outputValue, setOutputValue] = useState("");
	const [isMobile, setIsMobile] = useState(false);
	const [alternativeValue, setAlternativeValue] = useState("");
	const { user } = useAuth0();

	const saveUserData = (userData) => {
		// Send the user data to the backend
		fetch("/api/saveUserData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		})
			.then((response) => {
				if (response.ok) {
					return response.json(); // Parse the response data as JSON
				} else {
					throw new Error("Failed to save user data");
				}
			})
			.then((data) => {
				console.log(data.message); // Log the response message from the backend
			})
			.catch((error) => {
				console.error("Error saving user data:", error);
			});
	};

	useEffect(() => {
		// Check if the user is authenticated
		if (user) {
			// Extract the necessary user data
			const userData = {
				name: user.name,
				email: user.email,
				sub: user.sub,
			};
			console.log(userData);

			saveUserData(userData);
		}
	}, [user]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleSubmit = (data) => {
		setOutputValue(data);
		setShowOutput(true);
	};

	const handleReset = () => {
		setShowOutput(false);
		setOutputValue("");
		setAlternativeValue("");
		setInputValue("");
	};

	const handleSave = () => {
		const userData = {
			email: user.email,
			input: inputValue,
			output: outputValue,
			alternative: alternativeValue,
		};
		console.log(userData);

		saveUserData(userData);
	};

	const renderAlternatives = () => {
		if (outputValue) {
			return (
				<div className="alternative-container">
					<div className="alternative-output">
						<div>
							<AlternativeButton
								outputValue={outputValue}
								setAlternativeValue={setAlternativeValue}
							/>
							<button onClick={handleReset} className="reset-button">
								Reset
							</button>
							<button onClick={handleSave} className="save-button">
								Save
							</button>
						</div>
						<div className="alternative-wrap">
							<div className="alternative-div">
								<textarea
									className="alternative-box"
									value={alternativeValue}
									readOnly
								/>
							</div>
							<div className="CopyButton-div">
								<CopyButton text={alternativeValue} />
								<TextToSpeech outputValue={alternativeValue} />
							</div>
						</div>
					</div>
				</div>
			);
		}
		return null;
	};

	return (
		<main role="main">
			<div>
				<Header currentPage="home" />
			</div>
			<div className={isMobile ? "app" : "input-output-container"}>
				{!isMobile && (
					<div>
						<div>
							<div className="input-output-wrapper">
								<div className="input-container">
									<Input
										inputValue={inputValue}
										setInputValue={setInputValue}
										onSubmit={handleSubmit}
									/>
								</div>
								<div className="output-container">
									<Output outputValue={outputValue} onReset={handleReset} />
								</div>
							</div>
							<div>{renderAlternatives()}</div>
						</div>
						<div>
							<Footer />
						</div>
					</div>
				)}
				{isMobile && !showOutput && (
					<div className="input-container">
						<Input
							inputValue={inputValue}
							setInputValue={setInputValue}
							onSubmit={handleSubmit}
						/>
					</div>
				)}
				{isMobile && showOutput && (
					<div>
						<div>
							<Output outputValue={outputValue} onReset={handleReset} />
						</div>
						{renderAlternatives()}
					</div>
				)}
			</div>
		</main>
	);
};

export default Home;
