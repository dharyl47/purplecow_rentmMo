import { pusherServer } from "../../../lib/pusher";

// Mongo Connect
import { connectMongoDB, ChatModel, UsersModel } from "@/lib/mongodb";

export const POST = async req => {
  try {
    await connectMongoDB();

    const body = await req.json();

    const { currentUserId, members, isGroup, name, groupPhoto } = body;

    // Define "query" to find the chat
    const query = isGroup
      ? { isGroup, name, groupPhoto, members: [currentUserId, ...members] }
      : { members: { $all: [currentUserId, ...members], $size: 2 } };

    let chat = await ChatModel.findOne(query);

    if (!chat) {
      chat = await new Chat(
        isGroup ? query : { members: [currentUserId, ...members] }
      );

      await chat.save();

      const updateAllMembers = chat.members.map(async memberId => {
        await UsersModel.findByIdAndUpdate(
          memberId,
          {
            $addToSet: { chats: chat._id }
          },
          { new: true }
        );
      });
      Promise.all(updateAllMembers);

      /* Trigger a Pusher event for each member to notify a new chat */
      chat.members.map(async member => {
        await pusherServer.trigger(member._id.toString(), "new-chat", chat);
      });
    }

    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new chat", { status: 500 });
  }
};
