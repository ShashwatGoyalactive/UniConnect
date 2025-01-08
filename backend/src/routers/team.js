import Router from "express";
import { createTeam } from "../controllers/team.js";
import auth from "../middlewares/auth.js";

export const router = Router();

router.route("/").post(auth, createTeam);
