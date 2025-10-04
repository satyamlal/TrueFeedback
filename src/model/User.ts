import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: String;
  createAt: Date;
}
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});
