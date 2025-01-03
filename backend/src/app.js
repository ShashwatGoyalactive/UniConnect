import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Cors middelware
app.use((req, res, next) => {
    console.log(`${req.method} : ${req.url}`);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// middelware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Module router map
import { router as userRouter } from "./routers/user.js";

app.use("/api/user", userRouter);

export default app;
