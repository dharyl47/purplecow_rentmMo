// route.js

import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongodb";
import ListingModel from "../../models/listingSchema";

export async function POST(request) {
  try {
    const {
      brand,
      carAvailability,
      features,
      carRegistrationNumber,
      description,
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
        checked: false,
      },
      features: {
        automaticTransmission: false,
        allWheelDrive: false,
        androidAuto: false,
        appleCarPlay: false,
        auxInput: false,
        backUpCamera: false,
        bikeRack: false,
        converTible: false,
        gps: false,
        petFriendly: false,
        tollPass: false,
        usbCharger: false,
      },
      carRegistrationNumber,
      description,
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
export async function GET() {
  try {
    await connectMongoDB();

    // Fetch all listings
    const listings = await ListingModel.find({});

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}