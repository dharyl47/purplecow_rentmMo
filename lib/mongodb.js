import mongoose from "mongoose";
import UsersModel from "./models/user.model";
import ListingsModel from "./models/listing.model";
import BookingsModel from "./models/booking.model";
import ChatModel from "./models/chat.model";
import MessageModel from "./models/message.model";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export {
  connectMongoDB,
  UsersModel,
  ListingsModel,
  BookingsModel,
  ChatModel,
  MessageModel
};
