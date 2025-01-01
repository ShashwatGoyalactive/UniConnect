const {asyncHandler} = require("../utils/asyncHandler");
const {User} = require("../models/user");

const test = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Async handler working file",
    });
});

const registerUser = asyncHandler(async (req, res) => {
    const user = req.body;
});

module.exports = {test, registerUser};
