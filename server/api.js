import { Router } from "express";

import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
logger.debug("Welcoming everyone...");
res.json({ message: "Hello, world!" });
});

router.post("/", (req, res) => {
const input = req.body.input;

// convert the input value to uppercase
const output = input.toUpperCase();

res.json( output );
});
export default router;
