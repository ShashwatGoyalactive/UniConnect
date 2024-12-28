const express = require("express");
const cookieParser = require("cookie-parser");

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
const { router: userRouter } = require("./routers/user");

app.use("/api/user", userRouter);

module.exports = { app };
