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

    const { chatId } = params;

    const chat = await ChatModel.findById(chatId)
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

    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get chat details", { status: 500 });
  }
};

export const POST = async (req, { params }) => {
  try {
    await connectMongoDB();

    const { chatId } = params;

    const body = await req.json();

    const { currentUserId } = body;

    await MessageModel.updateMany(
      { chat: chatId },
      { $addToSet: { seenBy: currentUserId } },
      { new: true }
    )
      .populate({
        path: "sender seenBy",
        model: UsersModel
      })
      .exec();

    return new Response("Seen all messages by current user", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to update seen messages", { status: 500 });
  }
};
