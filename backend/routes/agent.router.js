import express from "express";
import { addAgent } from "../controllers/agent.controller.js";

const router = express.Router();
router.post("/add", addAgent);

export default router;
