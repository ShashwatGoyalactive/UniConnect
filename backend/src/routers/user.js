import { Router } from "express";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";
export const router = Router();

import {
    test,
    registerUser,
    login,
    logout,
    get,
    edittext,
    editimage,
    editpassword,
} from "../controllers/user.js";

router.get("/", test);
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", upload.none(), login);
router.get("/logout", auth, logout);
router.get("/get", auth, get);
router.put("/edittext", auth, upload.none(), edittext);
router.put("/editimage", auth, upload.single("profileImage"), editimage);
router.put("/editpassword", auth, upload.none(), editpassword);
