const Router = require("express");
const router = Router();

const {test, registerUser} = require("../controllers/user");

router.get("/", test);
router.post("/register", registerUser);

module.exports = {router};
