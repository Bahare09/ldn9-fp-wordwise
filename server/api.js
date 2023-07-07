import { Router } from "express";
import logger from "./utils/logger";
import { Configuration, OpenAIApi } from "openai";
import db from "./db"; // Import the db module

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

			// Store the output in the database
			//await db.query("INSERT INTO history (output) VALUES ($1)", [output]);
			// Store the output in the database
			// Store the output in the database
			try {
				await db.query("INSERT INTO history (output) VALUES ($1)", [output]);
			} catch (error) {
				// Handle database query error
				logger.error("Error inserting into the database:", error);
				// You can choose to send an error response to the client here
				// res.status(500).json({ error: "Failed to insert into the database" });
			}
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
// router.get("/test-db", async (req, res) => {
// try {
// // Hardcoded query to test the database connection
// const query = "SELECT NOW() AS current_time";
// const result = await db.query(query);

// // Extract the current time from the result
// const currentTime = result.rows[0].current_time;

// res.json({ currentTime });
// } catch (error) {
// console.error("Error connecting to the database:", error);
// res.status(500).json({ error: "Failed to connect to the database" });
// }
//});

router.post("/saveUserData", async (req, res) => {
	try {
		const { name, email, sub } = req.body;

		// Store the user data in the database
		await db.query(
			"INSERT INTO users (name, email, google_id) VALUES ($1, $2, $3)",
			[name, email, sub]
		);

		res.status(200).json({ message: "User data saved successfully" });
	} catch (error) {
		logger.error("Error saving user data:", error);
		res.status(500).json({ error: "Failed to save user data" });
	}
});

export default router;
