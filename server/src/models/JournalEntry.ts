import mongoose, { Document, Schema } from "mongoose";

export interface IJournalEntry extends Document {
  content: string;
  mood: string;
  tags: string[];
  userId: mongoose.Types.ObjectId;
}

const JournalEntrySchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    mood: { type: String },
    tags: [{ type: String }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IJournalEntry>(
  "JournalEntry",
  JournalEntrySchema
);
