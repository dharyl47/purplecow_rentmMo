// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import { connectMongoDB, UsersModel } from "@/lib/mongodb";

export async function POST(request) {
  await connectMongoDB();

  const { requestId } = await request.json();

  await UsersModel.findByIdAndUpdate(requestId, { role: "host" });

  return NextResponse.json(
    { message: "User Role Updated", data: { requestId } },
    { status: 200 }
  );
}
