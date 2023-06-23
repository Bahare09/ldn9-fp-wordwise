import React, { useState } from "react";
import "./InputOutput.css";

const Input = ({ onSubmit }) => {
const [inputValue, setInputValue] = useState("");

const handleInputChange = (e) => {
setInputValue(e.target.value);
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
const response = await fetch("http://localhost:3000/api", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ input: inputValue }),
});

if (response.ok) {
const data = await response.json();
onSubmit(data);
} else {
console.log("Error: " + response.status);
}
} catch (error) {
console.log(error);
}

setInputValue("");
};

return (
<div className="input-container">
<textarea
value={inputValue}
onChange={handleInputChange}
placeholder="Enter something..."
className="input-field"
/>
<button type="submit" className="submit-button" onClick={handleSubmit}>
&#10148;
</button>
</div>
);
};

export default Input;