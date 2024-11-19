import mongoose, { Document, Schema } from "mongoose";

export interface ISleepLog extends Document {
  date: Date;
  duration: number;
  quality: number;
  userId: mongoose.Types.ObjectId;
}

const SleepLogSchema: Schema = new Schema({
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  quality: { type: Number, min: 1, max: 5 },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<ISleepLog>("SleepLog", SleepLogSchema);
