import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Team from "../models/team.js";

export const createTeam = asyncHandler(async (req, res) => {
    const { name, members } = req.body;
    const team = await Team.create({
        name,
        members,
    });
    if (!team) {
        throw new ApiError(500, "Something went wrong while creating team");
    }
    return res.status(200).json(new ApiResponse(200, team, "Team created"));
});
