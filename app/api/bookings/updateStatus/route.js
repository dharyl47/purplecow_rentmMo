// Next
import { NextResponse } from "next/server";

// Mongo Connect
import { connectMongoDB, BookingsModel } from "@/lib/mongodb";

export async function PUT(request) {
  try {
    await connectMongoDB();

    const requestData = await request.json();

    if (!requestData._id || !requestData.status) {
      return NextResponse.json(
        { error: "Missing fields (_id or status)" },
        { status: 400 } // Bad Request
      );
    }

    const { _id, status } = requestData;

    const booking = await BookingsModel.findById(_id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    await BookingsModel.findByIdAndUpdate(_id, { status });

    return NextResponse.json(
      { message: "Booking updated successfully", updatedBookings: booking },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating a booked car:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
