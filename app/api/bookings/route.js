// Next
import { NextResponse } from "next/server";

// Mongo Connect
import { connectMongoDB, BookingsModel } from "@/lib/mongodb";

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

    await BookingsModel.create({
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

    const bookings = await BookingsModel.find({})
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
