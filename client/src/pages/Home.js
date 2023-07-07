import React, { useState, useEffect } from "react";
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
	const [showAlternatives, setShowAlternatives] = useState(false);

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

	const handleChange = (setter) => (event) => {
		setter(event.target.value);
	};
	const onOutputValueChange = handleChange(setOutputValue);
	const onAlternativeValueChange = handleChange(setAlternativeValue);

	const handleSubmit = (data) => {
		setOutputValue(data);
		setShowOutput(true);
	};
	const handleReset = () => {
		setShowOutput(false);
		setOutputValue("");
		setAlternativeValue("");
		setInputValue("");
		setShowAlternatives(false);
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
								setShowAlternatives={setShowAlternatives}
							/>
							<button onClick={handleReset} className="reset-button">
								Reset
							</button>
						</div>
						{showAlternatives && (
							<div className="alternative-wrap">
								<div className="alternative-div">
									<textarea
										className="alternative-box"
										value={alternativeValue}
										onChange={onAlternativeValueChange}
									/>
								</div>
								<div className="CopyButton-div">
									<CopyButton text={alternativeValue} />
									<TextToSpeech outputValue={alternativeValue} />
								</div>
							</div>
						)}
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
									<Output
										outputValue={outputValue}
										onReset={handleReset}
										onOutputValueChange={onOutputValueChange}
									/>
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
