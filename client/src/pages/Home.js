/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Input from "../components/Input";
import Output from "../components/Output";
import "./Home.css";
import "../components/InputOutput.css";
import Header from "../components/Header";
import AlternativeButton from "../components/AlternativeButton";
import Footer from "../components/Footer";
import AlternativeBox from "../components/AlternativeBox";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [showOutput, setShowOutput] = useState(false);
	const [outputValue, setOutputValue] = useState("");
	const [isMobile, setIsMobile] = useState(false);
	const [alternativeValues, setAlternativeValues] = useState([]);
	const [showAlternatives, setShowAlternatives] = useState(false);

	const { user, isAuthenticated, loginWithRedirect } = useAuth0();

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
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			// Retrieve the saved user data from localStorage
			const savedUserData = localStorage.getItem("userData");
			if (savedUserData) {
				const { input, output, alternative } = JSON.parse(savedUserData);
				setInputValue(input);
				setOutputValue(output);
				setAlternativeValues(alternative);
				setShowOutput(true);
			}
		}
	}, [isAuthenticated]);

	const onOutputValueChange = (event) => {
		setOutputValue(event.target.value);
	};

	const onAlternativeValueChange = (event, key) => {
		console.log({ event, key });
		setAlternativeValues((prev) => {
			const newAlternativeValues = [...prev];
			newAlternativeValues[key] = event.target.innerText;
			return newAlternativeValues;
		});
	};

	const getCorrection = (data) => {
		setOutputValue(data);
		setShowOutput(true);
	};

	const handleReset = () => {
		setShowOutput(false);
		setOutputValue("");
		setAlternativeValues([]);
		setInputValue("");
		setShowAlternatives(false);
	};

	const handleSave = () => {
		if (!isAuthenticated) {
			// Save the user data locally
			const userData = {
				input: inputValue,
				output: outputValue,
				alternative: alternativeValues,
			};
			localStorage.setItem("userData", JSON.stringify(userData));

			// Redirect to the login page
			loginWithRedirect();
			return;
		}

		// Proceed with saving the user data to the backend
		const userData = {
			name: user.name,
			email: user.email,
			sub: user.sub,
			input: inputValue,
			output: outputValue,
			alternative: alternativeValues.join(" "),
		};

		saveUserData(userData);
	};

	const renderAlternatives = () => {
		if (outputValue) {
			return (
				<div className="alternative-container">
					<div className="alternative-output">
						<div className="alternative-buttons-container">
							<AlternativeButton
								outputValue={outputValue}
								setAlternativeValues={setAlternativeValues}
								setShowAlternatives={setShowAlternatives}
							/>
							<button onClick={handleReset} className="reset-button">
								Reset
							</button>
							<button onClick={handleSave} className="reset-button">
								Save
							</button>
						</div>
					</div>
					{showAlternatives && (
						<div className="lexi-alternatives-container">
							{alternativeValues.map((alternative, index) => {
								console.log("key", index);
								return (
									<AlternativeBox
										key={index}
										index={index}
										alternativeText={alternative}
										onAlternativeValueChange={onAlternativeValueChange}
									/>
								);
							})}
						</div>
					)}
				</div>
			);
		}
		return null;
	};

	return (
		<main className="main" role="main">
			<div>
				<Header currentPage="home" />
			</div>
			<div className={isMobile ? "app" : "input-output-container"}>
				{!isMobile && (
					<div className="input-output-alternatives-content">
						<div className="input-output-wrapper">
							<div className="input-container">
								<Input
									inputValue={inputValue}
									setInputValue={setInputValue}
									onSubmit={getCorrection}
								/>
							</div>
							<div className="output-container">
								<Output
									outputValue={outputValue}
									onReset={handleReset}
									onOutputValueChange={onOutputValueChange}
								/>
							</div>
						</div>
						{renderAlternatives()}
					</div>
				)}
				{isMobile && !showOutput && (
					<div className="input-container">
						<Input
							inputValue={inputValue}
							setInputValue={setInputValue}
							onSubmit={getCorrection}
						/>
					</div>
				)}
				{isMobile && showOutput && (
					<div className="mobile-output-alternatives-wrapper">
						<div className="mobile-output-container">
							<Output outputValue={outputValue} onReset={handleReset} />
						</div>
						{renderAlternatives()}
					</div>
				)}
			</div>
			<div>
				<Footer />
			</div>
		</main>
	);
};

export default Home;
