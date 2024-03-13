import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import BookingModel from "@/lib/models/booking.model.js";

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

    const booking = await BookingModel.findById(_id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    await BookingModel.findByIdAndUpdate(_id, { status });

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
