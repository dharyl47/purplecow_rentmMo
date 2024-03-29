import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    aboutMe: String,
    language: String,
    profession: String,
    profilePicture: String,
    authProvider: String,
    role: {
      type: String,
      enum: ["customer", "admin", "host"],
      default: "customer"
    },
    chats: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const UserSchema = mongoose.models.User || mongoose.model("User", userSchema);

export default UserSchema;
