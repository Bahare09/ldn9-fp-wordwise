import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import "./Home.css";
import "../components/InputOutput.css";
import Header from "../components/Header";

const Home = () => {
	const [showOutput, setShowOutput] = useState(false);
	const [outputValue, setOutputValue] = useState("");
	const [isMobile, setIsMobile] = useState(false);
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
	};
	return (
		<main role="main">
			<div>
				<Header currentPage="home" />
			</div>
			<div className={isMobile ? "app" : "input-output-container"}>
				{!isMobile && (
					<div className="input-output-wrapper">
						<div className="input-container">
							<Input onSubmit={handleSubmit} />
						</div>
						<div className="output-container">
							<Output outputValue={outputValue} onReset={handleReset} />
						</div>
					</div>
				)}
				{isMobile && !showOutput && (
					<div className="input-container">
						<Input onSubmit={handleSubmit} />
					</div>
				)}
				{isMobile && showOutput && (
					<div>
						<Output outputValue={outputValue} onReset={handleReset} />
					</div>
				)}
			</div>
		</main>
	);
};
export default Home;
