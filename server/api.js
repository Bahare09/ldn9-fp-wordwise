import { Router } from "express";
import logger from "./utils/logger";
import { Configuration, OpenAIApi } from "openai";
import db from "./db";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

// Post corrections route
router.post("/correction", async (req, res) => {
	try {
		const apiKey = process.env.OPEN_AI_SECRET_KEY;
		const text = req.body.input; //taking the text data from inputbox
		const configuration = new Configuration({
			apiKey: apiKey,
		});
		const openai = new OpenAIApi(configuration);

		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `
					You are a copywriter. Your job is to take some user text and make it better.
					- Improve the grammar
					- Make it more engaging 
					- Make it as concise as possible without sacrificing clarity
					
					The user typed the following:
					
					"${text}"
					
					Please re-write it, and make it better
					`,
				},
			],
		});

		if (completion.data.choices && completion.data.choices.length > 0) {
			const output = completion.data.choices[0].message.content;

			// Send the response
			res.json(output);
		} else {
			res.status(404).json({ error: "No completion response received." });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while processing the request." });
	}
});

// Post alternatives route
router.post("/alternatives", async (req, res) => {
	try {
		const apiKey = process.env.OPEN_AI_SECRET_KEY;
		const text = req.body.input; //taking the text data from inputbox
		const configuration = new Configuration({
			apiKey: apiKey,
		});
		const openai = new OpenAIApi(configuration);

		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `
					You are a copywriter. Your job is to take some user text and offer alternative ways of phrasing it.
					
					The user typed the following:
					
					"${text}"
					
					Please provide three alternative ways to re-write it, and make it better
					`,
				},
			],
		});

		if (completion.data.choices && completion.data.choices.length > 0) {
			res.json(completion.data.choices[0].message.content);
		} else {
			res.status(404).json({ error: "No alternative response received." });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while processing the request." });
	}
});

const addRecord = async (email, input, output, alternative) => {
	await db.query(
		"INSERT INTO history (email, input, output, alternative) VALUES ($1, $2, $3, $4)",
		[email, input, output, alternative]
	);
};
router.post("/saveUserData", async (req, res) => {
	try {
		const { name, email, sub, input, output, alternative } = req.body;

		// Check if the user already exists in the database
		const existingUser = await db.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);

		if (existingUser.rows.length > 0) {
			// User already exists in the database

			// Check if the input and output values exist in the history table
			const existingHistory = await db.query(
				"SELECT * FROM history WHERE input = $1 AND output = $2",
				[input, output]
			);

			if (existingHistory.rows.length > 0) {
				// Input and output values exist in the history table, perform an update
				await db.query(
					"UPDATE history SET alternative = $1 WHERE input = $2 AND output = $3",
					[alternative, input, output]
				);
			} else {
				// Input and output values don't exist in the history table, insert a new row
				await addRecord(email, input, output, alternative);
			}
		} else {
			// User not found, save the user data in the database
			await db.query(
				"INSERT INTO users (name, email, google_id) VALUES ($1, $2, $3)",
				[name, email, sub]
			);

			// Insert a new row in the history table
			await addRecord(email, input, output, alternative);
		}

		res.status(200).json({ message: "User data saved successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to save user data" });
	}
});

//Retrieve user's history data route

router.get("/history", async (req, res) => {
	try {
		const email = req.query.email; // Extract the email from the query parameter

		//const token = req.headers.authorization.split(" ")[1];
		// Verify and decode the access token
		//const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		// Extract the email from the decoded token
		//const email = decodedToken.email;

		// // Retrieve the user's history data from the database based on the email
		const userData = await db.query("SELECT * FROM history WHERE email = $1", [
			email,
		]);

		if (userData.rows.length === 0) {
			res.status(404).json({ error: "No history data found" });
		} else {
			res.json(userData.rows);
		}
	} catch (error) {
		console.error("Failed to retrieve user data:", error);
		res.status(500).json({ error: "Failed to retrieve user data" });
	}
});

export default router;
