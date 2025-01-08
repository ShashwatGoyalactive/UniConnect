import { mongoose, Schema } from "mongoose";

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["online", "offline"],
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        venue: {
            type: String,
            reqired: true,
        },
        duration: [
            {
                type: Date,
                required: true,
            },
        ],
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        teams: [
            {
                type: Schema.Types.ObjectId,
                ref: "Team",
            },
        ],
    },
    { timestamps: true },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
