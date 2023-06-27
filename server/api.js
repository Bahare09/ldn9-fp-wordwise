import { Router } from "express";
import logger from "./utils/logger";
import { Configuration, OpenAIApi } from "openai";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

//post corrections route
router.post("/", async (req, res) => {
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

	res.json(completion.data.choices[0].message.content);
});

export default router;
