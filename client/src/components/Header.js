import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ currentPage }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const navLinks =
		currentPage === "home"
			? [
					<Link key="1" className="header-nav-link" to="/about">
						About Us
					</Link>,
					<Link key="2" className="header-nav-link" to="/login">
						Login
					</Link>,
			]
			: [
					<Link key="1" className="header-nav-link" to="/">
						Home
					</Link>,
					<Link key="2" className="header-nav-link" to="/login">
						Login
					</Link>,
			];

	return (
		<header className="header">
			<Link to="/">
				<div className="logo-header">
					<h1 className="header-title">
						Word<span>Wise</span>
					</h1>
					{/* <hr /> */}
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
			<nav className={`header-nav ${isOpen ? "open" : " "}`}>{navLinks}</nav>
		</header>
	);
};

export default Header;
