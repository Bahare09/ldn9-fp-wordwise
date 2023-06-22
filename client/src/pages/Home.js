import "./Home.css";
import Header from "../components/Header.js";
import React, { useState } from "react";
import Input from "../components/Input.js";
import Output from "../components/Output.js";

export function Home() {

	const [inputValue, setInputValue] = useState("");
	const [showOutput, setShowOutput] = useState(false);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSubmit = () => {
    setShowOutput(true);
  };

  const handleReset = () => {
    setShowOutput(false);
    setInputValue("");
  };

	return (
		<main role="main">
			<div>
				<Header />
			</div>
			<div className="app">
				{!showOutput ? (
					<div className="input-container">
					<Input onInputChange={handleInputChange} onSubmit={handleSubmit} />
					</div>
				) : (
					<div className="input-container">
					<Output inputValue={inputValue} onReset={handleReset} />
					</div>
				)}
    </div>
		</main>
	);
}

export default Home;
