// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import { connectMongoDB, ListingsModel } from "@/lib/mongodb";

export async function GET() {
  await connectMongoDB();

  const hostingRequests = await ListingsModel.find({}).populate("ownerId");

  const filteredRequests = hostingRequests.filter(
    listing => listing.ownerId.role === "customer"
  );

  return NextResponse.json(
    { hostingRequest: filteredRequests },
    { status: 200 }
  );
}
