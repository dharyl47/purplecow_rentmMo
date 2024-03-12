// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import connectMongoDB from "@/lib/mongodb";

// Model
import ListingModel from "@/lib/models/listing.model";
import UserSchema from "@/lib/models/user.model";

export async function GET() {
  await connectMongoDB();

  const hostingRequests = await ListingModel.find({}).populate("ownerId");

  const filteredRequests = hostingRequests.filter(
    listing => listing.ownerId.role === "customer"
  );

  return NextResponse.json(
    { hostingRequest: filteredRequests },
    { status: 200 }
  );
}
