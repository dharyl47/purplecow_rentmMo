import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongodb";
import UserSchema from "../../models/userProfile";

export async function GET(request, { query }) {
  await connectMongoDB();
  const queryParams = new URL(request.url).searchParams;
  const email = queryParams.get('email'); // Extract the email from the query parameters
  const password = queryParams.get('password'); // Extract the password from the query parameters

  // Check if the email and password match an existing user
  const user = await UserSchema.findOne({ email, password });

  if (user) {
      return NextResponse.json({ message: "Login successful", user });
  } else {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
}
