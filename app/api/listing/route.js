// route.js

import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import ListingModel from "@/models/listing.model";

export async function POST(request) {
  try {
    const {
      brand,
      carAvailability,
      features,
      carRegistrationNumber,
      description,
      cardNumber,
      cardExpiration,
      securityCode,
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
      ownerId,
    } = await request.json();


    await connectMongoDB();

    const startDate = new Date(carAvailability.startDate);
    const endDate = new Date(carAvailability.endDate);

    await ListingModel.create({
      brand,
      carAvailability: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        checked: carAvailability.checked,
      },
      features: {
        automaticTransmission: features.automaticTransmission,
        allWheelDrive: features.allWheelDrive,
        androidAuto: features.androidAuto,
        appleCarPlay: features.appleCarPlay,
        auxInput: features.auxInput,
        backUpCamera: features.backUpCamera,
        bikeRack: features.bikeRack,
        converTible: features.converTible,
        gps: features.gps,
        petFriendly: features.petFriendly,
        tollPass: features.tollPass,
        usbCharger: features.usbCharger,
      },
      carRegistrationNumber,
      description,
      cardNumber,
      cardExpiration,
      securityCode,
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
      ownerId
    });

    return NextResponse.json({ message: "Listing Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const requestData = await request.json();

    const { _id, ...updateData } = requestData;

    await connectMongoDB();

    if (updateData.carAvailability) {
      const { startDate, endDate } = updateData.carAvailability;
      updateData.carAvailability.startDate = new Date(startDate).toISOString();
      updateData.carAvailability.endDate = new Date(endDate).toISOString();
    }

    await ListingModel.findByIdAndUpdate(_id, updateData);

    return NextResponse.json({ message: "Listing Updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectMongoDB();

    // Fetch all listings
    const listings = await ListingModel.find({}).populate('ownerId');

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    const { _id } = await request.json();

    await connectMongoDB();

    const deletedListing = await ListingModel.findByIdAndDelete(_id);

    if (!deletedListing) {
      return NextResponse.json({ message: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Listing deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
