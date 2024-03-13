// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import connectMongoDB from "@/lib/mongodb";

// Model
import ListingModel from "@/lib/models/listing.model";
import UserSchema from "@/lib/models/user.model";
import BookingSchema from "@/lib/models/booking.model";

export async function GET() {
  await connectMongoDB();

  const listingCount = await ListingModel.countDocuments();
  const userCount = await UserSchema.countDocuments();
  const bookingCount = await BookingSchema.countDocuments();

  return NextResponse.json({ listingCount, userCount, bookingCount });
}
