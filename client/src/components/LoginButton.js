import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./LoginButton.css";

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();
	return (
		!isAuthenticated && (
			<div className="login-container">
				<button className="login-btn" onClick={() => loginWithRedirect()}>Sign in</button>
			</div>
		)
	);
};
export default LoginButton;
