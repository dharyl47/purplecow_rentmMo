import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import BookingModel from "@/lib/models/booking.model.js";

export async function POST(request) {
  try {
    await connectMongoDB();

    const {
      userId,
      carId,
      pickupDate,
      returnDate,
      totalPrice,
      pickUpLocation
    } = await request.json();

    await BookingModel.create({
      user: userId,
      car: carId,
      startDate: new Date(pickupDate),
      endDate: new Date(returnDate),
      totalPrice,
      pickUpLocation
    });

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

export async function GET() {
  try {
    await connectMongoDB();

    const bookings = await BookingModel.find({})
      .populate({
        path: "car",
        populate: { path: "ownerId" }
      })
      .populate("user");

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
