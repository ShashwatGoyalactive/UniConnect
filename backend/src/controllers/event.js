import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Team from "../models/team.js";
import Event from "../models/event.js";

export const createEvent = asyncHandler(async (req, res) => {
    const eventForm = req.body;
    const event = await Event.create(eventForm);
    if (!event) {
        throw new ApiError(500, "Something went wrong while creating event");
    }
    return res.status(200).json(new ApiResponse(200, event, "Event created"));
});

export const addTeamToEvent = asyncHandler(async (req, res) => {
    const { eventId, teamId } = req.body;
    const event_ = await Event.findById(eventId);
    const team = await Team.findById(teamId);
    if (!event_ || !team) {
        throw new ApiError(404, "Event or team not found");
    }
    event_.teams.push(team);
    await event_.save();
    return res
        .status(200)
        .json(new ApiResponse(200, event_, "Team added to event"));
});
