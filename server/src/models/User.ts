import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: "free" | "pro";
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["free", "pro"], default: "free" },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
