import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
	return (
		<header className="header">
			<h1 className="header__title">WordWise</h1>
			<nav className="header__nav">
				<Link className="header__nav-link" to="/about">
					About
				</Link>
				<Link className="header__nav-link" to="/login">
					Login
				</Link>
				<Link className="header__nav-link" to="/login">
					i love bitcoin!!
				</Link>
				<Link className="header__nav-link" to="/register">
					Register
				</Link>
			</nav>
		</header>
	);
};

export default Header;
