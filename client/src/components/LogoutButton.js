import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./LogoutButton.css";

const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0();
	return (
		isAuthenticated && (
			<div className="logout-container">
				<button className="logout-btn" onClick={() => logout()}>Sign out</button>
			</div>
		)
	);
};
export default LogoutButton;
