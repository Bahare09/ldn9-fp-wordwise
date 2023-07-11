import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import "./Header.css";
const Header = ({ currentPage }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { isAuthenticated, user } = useAuth0();
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	let navLinks =
		currentPage === "home"
			? [
					<Link key="1" className="header-nav-link" to="/about">
						About
					</Link>,
			  ]
			: [
					<Link key="1" className="header-nav-link" to="/">
						Home
					</Link>,
			  ];
	if (isAuthenticated) {
		navLinks.push(
			<div key="2" className="header-auth">
				<Link key="3" className="header-nav-link" to="/history">
					History
				</Link>
				<span className="header-welcome"> {user.given_name}</span>
				<LogoutButton />
			</div>
		);
	} else {
		navLinks.push(<LoginButton key="2" />);
	}
	return (
		<header className="header">
			<Link to="/">
				<div className="logo-header">
					<h1 className="header-title">
						Word<span>Wise</span>
					</h1>
				</div>
			</Link>
			<button
				className={`hamburger-menu ${isOpen ? "open" : ""}`}
				onClick={toggleMenu}
				aria-label="Toggle Menu"
			>
				<div></div>
				<div></div>
				<div></div>
			</button>
			<nav className={`header-nav ${isOpen ? "open" : ""}`}>
				<div className={`header-nav-container ${isOpen ? "open" : ""}`}>
					{navLinks}
				</div>
			</nav>
		</header>
	);
};
export default Header;
