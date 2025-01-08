import Router from "express";
import { createEvent, addTeamToEvent } from "../controllers/event.js";
import auth from "../middlewares/auth.js";

export const router = Router();

router.route("/create").post(auth, createEvent);
router.route("/addTeam").post(auth, addTeamToEvent);
