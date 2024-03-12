import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import BookingModel from "@/lib/models/booking.model.js";

export async function POST(request) {
  try {
    await connectMongoDB();

    // Extract necessary data from the request body
    const { userId, carId, pickupDate, returnDate, totalPrice } =
      await request.json();

    // Create a new booking document
    await BookingModel.create({
      user: userId,
      car: carId,
      startDate: new Date(pickupDate),
      endDate: new Date(returnDate),
      totalPrice
    });

    // Respond with success message
    return NextResponse.json(
      { message: "Booking successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error booking a car:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
