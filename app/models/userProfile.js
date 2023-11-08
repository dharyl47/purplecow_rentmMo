import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    authProvider: String,
  },
  {
    timestamps: true,
  }
);

const UserSchema = mongoose.models.User || mongoose.model("User", userSchema);

export default UserSchema;