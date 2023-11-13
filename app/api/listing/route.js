// route.js

import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongodb";
import ListingModel from "../../models/listingSchema";

export async function POST(request) {
  try {
    const {
      brand,
      carAvailability,
      carRegistrationNumber,
      city,
      country,
      email,
      licensePlateNumber,
      mobileNumber,
      model,
      price,
      state,
      street,
      vehiclePhotos,
      zipCode,
      lat,
      lon,
    } = await request.json();

    await connectMongoDB();

    const startDate = new Date(carAvailability.startDate);
    const endDate = new Date(carAvailability.endDate);

    await ListingModel.create({
      brand,
      carAvailability: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
      carRegistrationNumber,
      city,
      country,
      email,
      licensePlateNumber,
      mobileNumber,
      model,
      price,
      state,
      street,
      vehiclePhotos,
      zipCode,
      lat,
      lon,
    });

    return NextResponse.json({ message: "Listing Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
