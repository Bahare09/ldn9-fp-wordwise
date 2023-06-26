import React from "react";
import Header from "../components/Header";
import Footer from "./Footer";

const About = () => {
	return (
		<main role="main">
			<div>
				<Header currentPage="about" />
			</div>
			<div className="about-page">
				<h2>About Us</h2>
				<p>
					WordWise is an innovative platform aimed at enhancing and enriching
					your English skills. Our interactive tools and engaging content provide an
					effective and fun way to learn new words and improve your overall communication.
				</p>
			</div>
			<div>
				<Footer />
			</div>
		</main>
	);
};

export default About;
