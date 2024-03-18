// Mongo Connect
import {
  connectMongoDB,
  UsersModel,
  ChatModel,
  MessageModel
} from "@/lib/mongodb";

export const GET = async (req, { params }) => {
  try {
    await connectMongoDB();

    const { userId } = params;

    const allChats = await ChatModel.find({ members: userId })
      .sort({ lastMessageAt: -1 })
      .populate({
        path: "members",
        model: UsersModel
      })
      .populate({
        path: "messages",
        model: MessageModel,
        populate: {
          path: "sender seenBy",
          model: UsersModel
        }
      })
      .exec();

    return new Response(JSON.stringify(allChats), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get all chats of current user", {
      status: 500
    });
  }
};
