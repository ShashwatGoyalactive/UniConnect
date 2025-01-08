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

router.route("/").get(test);
router.route("/register").post(upload.single("profileImage"), registerUser);
router.route("/login").post(upload.none(), login);
router.route("/logout").post(auth, logout);
router.route("/get").get(auth, get);
router.route("/edittext").put(auth, upload.none(), edittext);
router.route("/editimage").put(auth, upload.single("profileImage"), editimage);
router.route("editpassword").put(auth, upload.none(), editpassword);
