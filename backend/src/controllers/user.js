import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.js";

export const test = asyncHandler(async (req, res) => {
    console.log(req.body);
    res.status(200).json({
        success: true,
        message: "Async handler working file",
    });
});

//validation haved to added
export const registerUser = asyncHandler(async (req, res) => {
    const user = req.body;
    for (const field in user) {
        if (user[field] === "") {
            throw new ApiError(400, `${field} is required`);
        }
    }
    user.username = user.username.toLowerCase();
    user.email = user.email.toLowerCase();
    console.log(user);
    const newUser = await User.create(user);
    if (!newUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }
    delete newUser.password;
    res.status(201).json(new ApiResponse(201, newUser, "User created"));
});
