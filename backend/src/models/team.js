import { mongoose, Schema } from "mongoose";

const teamSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
