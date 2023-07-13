import express from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

import apiRouter from "./api";
import config from "./utils/config";
import {
	clientRouter,
	configuredHelmet,
	configuredMorgan,
	httpsOnly,
	logErrors,
} from "./utils/middleware";

const apiRoot = "/api";

const app = express();
const jwtCheck = auth({
	issuerBaseURL: "https://dev-c6xp2cx8gxm380qh.us.auth0.com/",
	jwksUri: "https://dev-c6xp2cx8gxm380qh.us.auth0.com/.well-known/jwks.json",
	audience: "http://wordwise-api.com",
	tokenSigningAlg: "RS256",
});

app.use("/history", jwtCheck); // Apply jwtCheck only to the "/history" route

app.use(cors());
app.use(express.json());
app.use(configuredHelmet());
app.use(configuredMorgan());

if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use(apiRoot, apiRouter);
app.use("/health", (_, res) => res.sendStatus(200));
app.use(clientRouter(apiRoot));

app.use(logErrors());

export default app;
