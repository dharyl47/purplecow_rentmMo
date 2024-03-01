// Third Party Components
import prisma from "@/prisma"
import { NextResponse } from "next/server";

// Database Connect
import { connectToDatabase } from "@/helpers/ServerHelpers"

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


    await connectToDatabase();

    const startDate = new Date(carAvailability.startDate);
    const endDate = new Date(carAvailability.endDate);


    await prisma.listings.create({
      data: {
        brand,
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
        carAvailability: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            checked: carAvailability.checked
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
            usbCharger: features.usbCharger
        }
      }
    });

    return NextResponse.json({ message: "Listing Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    let requestData = await request.json();
    
    delete requestData.owner;

    const { id, ...updateData } = requestData;

    await connectToDatabase();

    if (updateData.carAvailability) {
      const { startDate, endDate } = updateData.carAvailability;
      updateData.carAvailability.startDate = new Date(startDate).toISOString();
      updateData.carAvailability.endDate = new Date(endDate).toISOString();
    }

    await prisma.listings.update({
      where: {
        id: id
      },
      data: updateData,
    });

    return NextResponse.json({ message: "Listing Updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all listings
    const listings = await prisma.listings.findMany({
      include: {
        owner: true
      }
    });

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await connectToDatabase();

    const deletedListing = await prisma.listings.delete({
      where: {
        id: id
      }
    });

    if (!deletedListing) {
      return NextResponse.json({ message: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Listing deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
