import { connectMongoDB, UsersModel } from "@/lib/mongodb";

export const POST = async (req, { params }) => {
  try {
    await connectMongoDB();

    const { userId } = params;

    const body = await req.json();

    const { email, profileImage } = body;

    const updatedUser = await UsersModel.findByIdAndUpdate(
      userId,
      {
        email,
        profileImage
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to update user", { status: 500 });
  }
};
