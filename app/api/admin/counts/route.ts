// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import { connectMongoDB, UsersModel, ListingsModel, BookingsModel } from "@/lib/mongodb";



export async function GET() {
  await connectMongoDB();

  const listingCount = await ListingsModel.countDocuments();
  const userCount = await UsersModel.countDocuments();
  const bookingCount = await BookingsModel.countDocuments();

  return NextResponse.json({ listingCount, userCount, bookingCount });
}
