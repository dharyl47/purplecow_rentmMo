// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import { connectMongoDB, ListingsModel } from "@/lib/mongodb";

export async function GET() {
  await connectMongoDB();

  const listing = await ListingsModel.find({});

  return NextResponse.json({ listing });
}
