// Third Party Components
import bcrypt from 'bcryptjs';
import prisma from "@/prisma"
import { NextResponse } from "next/server";

// Database Connect
import { connectToDatabase } from "@/helpers/ServerHelpers"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const password = searchParams.get('password')

  await connectToDatabase();

  try {
    // Find the user by email
    const user = await prisma.users.findFirst({ where: { email } });

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
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
