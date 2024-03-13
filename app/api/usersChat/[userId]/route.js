import Chat from "../../../../lib/models/Chat";
import Message from "../../../../lib/models/Message";
import UserSchema from "../../../../lib/models/user.model";
import connectMongoDB from "../../../../lib/mongodb";

export const GET = async (req, { params }) => {
  try {
    await connectMongoDB();

    const { userId } = params;

    const allChats = await Chat.find({ members: userId })
      .sort({ lastMessageAt: -1 })
      .populate({
        path: "members",
        model: UserSchema,
      })
      .populate({
        path: "messages",
        model: Message,
        populate: {
          path: "sender seenBy",
          model: UserSchema,
        },
      })
      .exec();

    return new Response(JSON.stringify(allChats), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get all chats of current user", {
      status: 500,
    });
  }
};
