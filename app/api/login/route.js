import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongodb";
import UserSchema from "../../models/userProfile";
import bcrypt from 'bcryptjs'; 

export async function GET(request, { query }) {
  await connectMongoDB();
  const queryParams = new URL(request.url).searchParams;
  const email = queryParams.get('email'); // Extract the email from the query parameters
  const password = queryParams.get('password'); // Extract the password from the query parameters

  // Find the user by email
  const user = await UserSchema.findOne({ email });

  // If user doesn't exist, return error
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  // Compare the provided password with the hashed password stored in the database
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (isPasswordMatch) {
    // Passwords match, login successful
    return NextResponse.json({ message: "Login successful", user });
  } else {
    // Passwords don't match, return error
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
}
