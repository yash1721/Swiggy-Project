import express from "express";
import { startGame } from "../controllers/gameController.js";

const router = express.Router();

// Route to handle starting a game
router.post("/play-round", startGame);

export default router;
