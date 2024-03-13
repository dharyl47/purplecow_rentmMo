import Chat from "../../../../../../lib/models/Chat";
import Message from "../../../../../../lib/models/Message";
import UserSchema from "../../../../../../lib/models/user.model";
import connectMongoDB from "../../../../../../lib/mongodb";

export const GET = async (req, { params }) => {
  try {
    await connectMongoDB();

    // const currentUserId = params.userId
    // const query = params.query

    const { userId, query } = params;

    const searchedChat = await Chat.find({
      members: userId,
      name: { $regex: query, $options: "i" },
    })
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

    return new Response(JSON.stringify(searchedChat), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to search chat", { status: 500 });
  }
};
