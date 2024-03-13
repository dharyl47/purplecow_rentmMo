// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import connectMongoDB from "@/lib/mongodb";

// Model
import UserSchema from "@/lib/models/user.model";

export async function POST(request) {
  await connectMongoDB();

  const { requestId } = await request.json();

  await UserSchema.findByIdAndUpdate(requestId, { role: "host" });

  return NextResponse.json(
    { message: "User Role Updated", data: { requestId } },
    { status: 200 }
  );
}
