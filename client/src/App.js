import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
const domain = "dev-qbv6qxok2fldwc4q.us.auth0.com";
const clientId = "oZ7i1CumzlfPYpJoYgiQfNufoBdQ7cmV";
const App = () => {
	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			redirectUri={window.location.origin}
		>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
				</Routes>
				<Footer />
			</Router>
		</Auth0Provider>
	);
};
export default App;
