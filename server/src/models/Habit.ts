import mongoose, { Document, Schema } from "mongoose";

export interface IHabit extends Document {
  name: string;
  frequency: string;
  progress: number;
  userId: mongoose.Types.ObjectId;
}

const HabitSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    frequency: { type: String, required: true },
    progress: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IHabit>("Habit", HabitSchema);
