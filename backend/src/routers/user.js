import { Router } from "express";
import upload from "../middlewares/multer.js";

export const router = Router();

import { test, registerUser } from "../controllers/user.js";

router.get("/", test);
router.post("/register", upload.none(), registerUser);
