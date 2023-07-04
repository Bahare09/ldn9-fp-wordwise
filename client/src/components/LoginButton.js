import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./loginButton.css";

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();
	return (
		!isAuthenticated && (
			<div className="Login-container">
				<button onClick={() => loginWithRedirect()}>Sign in</button>
			</div>
		)
	);
};
export default LoginButton;
