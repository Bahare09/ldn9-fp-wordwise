import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import cyf_brand from "../images/cyf_brand.png";

function Footer() {
	return (
		<footer>
			<div className="links-container">
				<Link
					className="footer-link"
					to="https://github.com/Bahare09/ldn9-fp-wordwise"
				>
					<GitHubIcon />
				</Link>
				<Link
					className="footer-link"
					to="https://www.instagram.com/codeyourfuture_/"
				>
					<InstagramIcon />
				</Link>
			</div>
			<div className="text-container">
				<p>
					This website was created in association with
					<Link className="footer-cyf-link" to="https://codeyourfuture.io/">
						CodeYourFuture
						<span>
							<img src={cyf_brand} alt="cyf logo" />
						</span>
					</Link>
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
