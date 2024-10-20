import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "user id not provided"],
    },
    stats: {
      type: [
        {
          imgUrl: { type: String },
          date: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const StatusModel = mongoose.model("status", statusSchema);
