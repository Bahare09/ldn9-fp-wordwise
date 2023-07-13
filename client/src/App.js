import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";

const domain = "dev-c6xp2cx8gxm380qh.us.auth0.com";
const clientId = "Tjt2FK6XW8Q89r7Fk3asagQz2hTj5Zxl";

const App = () => {
	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			redirectUri={window.location.origin}
			audience="http://wordwise-api.com"
			scope="openid profile email"
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
