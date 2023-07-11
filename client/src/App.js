import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";

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
					<Route path="/history" element={<History />} />
				</Routes>
			</Router>
		</Auth0Provider>
	);
};

export default App;
