import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
		<footer>
			<h3>Contact us:</h3>
			<div className="links-container">
				<Link className="footer-link" to="https://codeyourfuture.io/">
					About
				</Link>
				<Link
					className="footer-link"
					to="https://github.com/Bahare09/ldn9-fp-wordwise"
				>
					GitHub
				</Link>
				<Link
					className="footer-link"
					to="https://www.instagram.com/codeyourfuture_/"
				>
					Instagram
				</Link>
			</div>
			<div className="text-container">
				<p>
					This website was created in association with CodeYourFuture
					<span>
						<img
							src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
							alt="cyf logo"
						></img>
					</span>
					.
				</p>
				<p className="copyright">
					© All rights reserved | Registered UK and Scottish charity
				</p>
			</div>
		</footer>
	);
}

export default Footer;