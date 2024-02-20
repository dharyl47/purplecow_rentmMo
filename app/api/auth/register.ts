import { NextApiRequest, NextApiResponse } from "next";
// import connectMongoDB from "@/lib/mongodb";
// import UserSchema from "@/models/user.model";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      // await connectMongoDB();
      // const existingUser = await UserSchema.findOne({ email });
      // return res.json({ exists: !!existingUser }); // Return true if email exists
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).end(); // Method Not Allowed for other HTTP methods
  }
};