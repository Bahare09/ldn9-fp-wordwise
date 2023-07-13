import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "./LogoutButton.css";

const LogoutButton = () => {
	const { logout } = useAuth0();

	const handleLogout = () => {
		logout({ returnTo: window.location.origin + process.env.PUBLIC_URL });
	};

	return (
		<Link className="logout-btn" to="#" onClick={handleLogout}>
			Log out
		</Link>
	);
};

export default LogoutButton;
