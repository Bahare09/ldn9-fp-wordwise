import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import "./CopyButton.css";

const CopyButton = ({ text, alternativeValue }) => {
	const [copied, setCopied] = useState(false);

	const handleCopyToClipboard = async () => {
		try {
			const content = alternativeValue ? alternativeValue : text;
			await navigator.clipboard.writeText(content);
			setCopied(true);

			setTimeout(() => {
				setCopied(false);
			}, 1200);
		} catch (error) {
			console.error("Failed to copy to clipboard:", error);
		}
	};

	return (
		<button
			className={`copy-button ${copied ? "copied" : ""}`}
			onClick={handleCopyToClipboard}
		>
			{copied ? (
				<>
					<FiCheck size={18} />
				</>
			) : (
				<>
					<FiCopy size={18} />
				</>
			)}
		</button>
	);
};

export default CopyButton;
