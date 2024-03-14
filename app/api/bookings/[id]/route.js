import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import BookingModel from "@/lib/models/booking.model";

export async function GET(req) {
  const { params } = req;
  const { id } = params;
  try {
    await connectMongoDB();

    // Fetch bookings by owner ID
    const myBookings = await BookingModel.find({ user: id })
      .populate("user")
      .populate("car");

    return NextResponse.json({ myBookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings by ownerId:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
