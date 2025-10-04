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

export interface User extends Document {
  username: String;
  email: String;
  password: String;
  verifyCode: String;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: [true, "Username is required!"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    trim: true,
    unique: true,
    match: [
      /^(?=.{1,254}$)(?=.{1,64}@)(?!.*\.\.)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+)(?:[A-Za-z]{2,63}|xn--[A-Za-z0-9-]{2,59})$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: 6,
    maxLength: 30,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}<>,.~+=_\-|:;"'`/\\])[A-Za-z\d@$!%*?&^#()[\]{}<>,.~+=_\-|:;"'`/\\]{8,64}$/,
      "Password must be 8–64 characters long, include uppercase, lowercase, number, and special character",
    ],
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required!"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
