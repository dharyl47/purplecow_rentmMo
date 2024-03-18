// Next
import { NextResponse } from "next/server";

// Mongo Connect
import { connectMongoDB, BookingsModel } from "@/lib/mongodb";

export async function GET(req, res) {
  const { params } = res;
  const { id } = params;
  try {
    await connectMongoDB();

    // Fetch bookings by owner ID
    const myBookings = await BookingsModel.find({ user: id })
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
