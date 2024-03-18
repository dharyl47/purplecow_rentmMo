import bcrypt from "bcryptjs";

// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import { connectMongoDB, UsersModel } from "@/lib/mongodb";

export async function POST(request) {
  try {
    let requestData = await request.json();
    const email = requestData.email;
    const password = requestData.password;

    // Connect to MongoDB
    await connectMongoDB();

    // Check if the email already exists
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    requestData.password = hashedPassword;

    // Create new user if email doesn't exist
    await UsersModel.create(requestData);

    return NextResponse.json({ message: "User Created" }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
