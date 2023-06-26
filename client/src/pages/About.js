import React from "react";
import Header from "../components/Header";
import Footer from "./Footer";

const About = () => {
	const elements = [
		"Element1",
		"Element2",
		"Element3",
		"Element4",
		"Element5",
		"Element6",
	];

	return (
		<main role="main" className="about-page">
			<div>
				<Header currentPage="about" />
			</div>
			<div className="about-page">
				<h2>About Us</h2>
				<p>
					WordWise is an innovative platform aimed at enhancing and enriching
					your English skills. Our interactive tools and engaging content
					provide an effective and fun way to learn new words and improve your
					overall communication.
				</p>
				<div className="elements-container">
					{elements.map((element, index) => (
						<div key={index} className="element-box">
							<div className="picture-container">
								<p>{element}</p> pictures
							</div>
							<div className="social-media-links">
								<a href="#linkedin" target="_blank" rel="">
									LinkedIn
								</a>
								<a href="#github" target="_blank" rel="">
									Github
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</main>
	);
};

export default About;
