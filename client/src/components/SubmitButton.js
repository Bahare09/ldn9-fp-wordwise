import React from "react";
import "./InputOutput.css";

const SubmitButton = ({ onClick }) => {
	return (
		<div className="submit-btn-container">
			<button type="submit" className="submit-button" onClick={onClick}>
				Enter
			</button>
		</div>
	);
};

export default SubmitButton;
