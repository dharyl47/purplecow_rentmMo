// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import { connectMongoDB, UsersModel } from "@/lib/mongodb";

export async function GET() {
  await connectMongoDB();

  const user = await UsersModel.find();

  return NextResponse.json({ user });
}
