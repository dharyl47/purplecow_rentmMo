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

    // const currentUserId = params.userId
    // const query = params.query

    const { userId, query } = params;

    const searchedChat = await ChatModel.find({
      members: userId,
      name: { $regex: query, $options: "i" }
    })
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

    return new Response(JSON.stringify(searchedChat), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to search chat", { status: 500 });
  }
};
