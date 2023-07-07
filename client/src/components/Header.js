import React, { useState, useEffect } from "react";
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

	const saveUserData = () => {
		// Extract the necessary user data
		const userData = {
			name: user.name,
			email: user.email,
			sub: user.sub,
		};

		// Send the user data to the backend
		fetch("/api/saveUserData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		})
			.then((response) => {
				if (response.ok) {
					return response.json(); // Parse the response data as JSON
				} else {
					throw new Error("Failed to save user data");
				}
			})
			.then((data) => {
				console.log(data.message); // Log the response message from the backend
			})
			.catch((error) => {
				console.error("Error saving user data:", error);
			});
	};

	useEffect(() => {
		// Check if the user is authenticated
		if (isAuthenticated) {
			saveUserData();
		}
	}, [isAuthenticated]); // Run the effect when the isAuthenticated value changes

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
				<span className="header-welcome"> {user.name}</span>
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
