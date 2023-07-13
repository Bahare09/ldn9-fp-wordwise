/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import CopyButton from "./CopyButton";
import TextToSpeech from "./TextToSpeech";

const AlternativeBox = ({
	alternativeText,
	index,
	onAlternativeValueChange,
}) => {
	console.log("AlternativeBox", { index, alternativeText });
	return (
		<div className="lexi-alternative-container">
			<div
				className="lexi-alternative-text"
				onBlur={(e) => {
					onAlternativeValueChange(e, index);
				}}
				contentEditable={true}
			>
				{alternativeText}
			</div>
			<div className="lexi-alternative-container-buttons">
				<CopyButton text={alternativeText} />
				<TextToSpeech outputValue={alternativeText} />
			</div>
		</div>
	);
};

export default AlternativeBox;
