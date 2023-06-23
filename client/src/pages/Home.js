import React, { useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Output from "../components/Output";
import "./Home.css";

const Home = () => {
	const [showOutput, setShowOutput] = useState(false);
	const [outputValue, setOutputValue] = useState("");

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
				<Header />
			</div>
			<div className="app">
				{!showOutput ? (
					<div className="input-container">
						<Input onSubmit={handleSubmit} />
					</div>
				) : (
					<div className="input-container">
						<Output outputValue={outputValue} onReset={handleReset} />
					</div>
				)}
			</div>
		</main>
	);
};

export default Home;

