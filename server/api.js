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
				content: `correct any grammar or spelling mistakes in the sentence and offer three alternative choices : ${text}`,
			},
		],
	});

	res.json(completion.data.choices[0].message.content);
});

export default router;
