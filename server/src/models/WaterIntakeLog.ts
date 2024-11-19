import mongoose, { Document, Schema } from "mongoose";

export interface IWaterIntakeLog extends Document {
  date: Date;
  amount: number;
  userId: mongoose.Types.ObjectId;
}

const WaterIntakeLogSchema: Schema = new Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IWaterIntakeLog>(
  "WaterIntakeLog",
  WaterIntakeLogSchema
);
