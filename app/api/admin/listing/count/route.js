// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import connectMongoDB from "@/lib/mongodb";

// Model
import ListingModel from "@/lib/models/listing.model";

export async function GET() {
  await connectMongoDB();

  const count = await ListingModel.countDocuments();

  return NextResponse.json({ count });
}
