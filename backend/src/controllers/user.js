import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.js";
import { OPTIONS } from "../constants.js";

export const test = asyncHandler(async (req, res) => {
    console.log(req.body);
    res.status(200).json({
        success: true,
        message: "Async handler working file",
    });
});

const genrateToken = async(_id) => {
	try {
		const user = await User.findById(_id);
		const accessToken = user.genrateAccessToken();
		const refreshToken = user.genrateRefreshToken();
		user.refreshToken = refreshToken;
		await user.save();
		return { accessToken, refreshToken };
	} catch (error) {
		console.log(`Error while genrating token id : ${_id} \n Error : ${error}`);
	}
}

export const registerUser = asyncHandler(async (req, res) => {
	const emptyAllow = new Set(["lastName", "phone", "profileImage"]);
    const user = req.body;
    for (const field in user) {
        if (user[field] === "" && !(emptyAllow.has(field))) {
            throw new ApiError(400, `${field} is required`);
        }
    }
    user.username = user.username.toLowerCase();
    user.email = user.email.toLowerCase();
    const newUser = await User.create(user);
    if (!newUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }
    const echoUser = await User.findById(newUser._id).select("_id firstName lastName email username");
    res.status(201).json(new ApiResponse(201, echoUser, `User created having username ${echoUser.username}`));
});

export const login = asyncHandler( async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw new ApiError(404, "User not found");
	}
	const isPasswordCorrect = await user.isPasswordCorrect(password);
	if (!isPasswordCorrect) {
		throw new ApiError(401, "Incorrect password");
	}
	const { accessToken, refreshToken } = await genrateToken(user._id);
	return res.status(200)
	.cookie("accessToken", accessToken, OPTIONS)
	.cookie("refreshToken", refreshToken, OPTIONS)
	.json(new ApiResponse(200, {user : user._id, accessToken, refreshToken}, "Login successful"));
});

export const logout = asyncHandler( async(req, res) => {
	await User.findOneAndUpdate(
		req.user._id,
		{
			$unset: {
				refreshToken: 1,
			},
		},
		{
			new: true,
		}
	);
	return res.status(200)
	.clearCookie("accessToken", OPTIONS)
	.clearCookie("refreshToken", OPTIONS)
	.json(new ApiResponse(200, {}, `Logout user ${req.user.username}`));
});

export const get = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select("-password -refreshToken");
	if (!user) {
		throw new ApiError(404, "User not found");
	}
	return res.status(200).json(new ApiResponse(200, user, "User found"));
});

export const edittext = asyncHandler( async (req, res) => {
	const {firstName, lastName, phone} = req.body;
	const user = await User.findById(req.user._id).select("-password -refreshToken");
	if (!user) {
		throw new ApiError(404, "User not found");
	}
	user.firstName = firstName;
	user.lastName = lastName;
	user.phone = phone;
	await user.save();
	return res.status(200).json(new ApiResponse(200, user, "User updated"));
});

export const editimage = asyncHandler( async(req, res) =>{
	const {profileImage} = req.body.file.path;
	if (!profileImage) {
		throw new ApiError(409, "Error while updating image");
	}
	const user = await User.findById(req.user._id).select("profileImage");
	if (!user) {
		throw new ApiError(404, "User not found");
	}
	user.profileImage = profileImage;
	await user.save();
	return res.status(200).json(new ApiResponse(200, user, "Image update"));
});

export const editpassword = asyncHandler( async (req, res) => {
	const {password} = req.body;
	const user = await User.findById(req.user._id);
	if (!user) {
		throw new ApiError(404, "User not found");
	}
	user.password = password;
	await user.save();
	const echoUser = await User.findById(user._id).select("firstName lastName email username profileImage");
	return res.status(200).json(new ApiResponse(200, echoUser, "Password updated"));
})
