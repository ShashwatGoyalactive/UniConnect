const Router = require("express");
const router = Router();

const { test } = require("../controllers/user");

router.get("/", test);

module.exports = { router };
