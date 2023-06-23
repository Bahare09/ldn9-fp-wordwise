import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};


	return (
		<header className="header">
			<h1 className="header-title">WordWise</h1>
			<button
				className={`hamburger-menu ${isOpen ? "open" : ""}`}
				onClick={toggleMenu}
				aria-label="Toggle Menu"
			>
				<div></div>
				<div></div>
				<div></div>
			</button>
			<nav className={`header-nav ${isOpen ? "open" : " "}`}>
				<Link className="header-nav-link" to="/about">
					About
				</Link>
				<Link className="header-nav-link" to="/login">
					Login
				</Link>
				<Link className="header-nav-link" to="/register">
					Register
				</Link>
			</nav>
		</header>
	);
};

export default Header;
