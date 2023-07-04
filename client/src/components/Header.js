import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton.js";
import "./Header.css";
const Header = ({ currentPage }) => {
	const { isAuthenticated, user } = useAuth0();
	const navLinks =
		currentPage === "home"
			? [
					<Link key="1" className="header-nav-link" to="/about">
						About Us
					</Link>,
			  ]
			: [
					<Link key="1" className="header-nav-link" to="/">
						Home
					</Link>,
			  ];
	return (
		<header className="header">
			<Link to="/">
				<div className="logo-header">
					<h1 className="header-title">
						Word<span>Wise</span>
					</h1>
				</div>
			</Link>
			<nav className="header-nav">
				{navLinks}
				{isAuthenticated ? (
					<div className="header-auth">
						<span className="header-welcome"> {user.name}</span>
						<LogoutButton />
					</div>
				) : (
					<LoginButton />
				)}
			</nav>
		</header>
	);
};
export default Header;
