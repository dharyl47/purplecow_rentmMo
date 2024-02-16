import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import ListingModel from "@/models/listing.model";

export async function PUT(request) {
  try {
    // Log the content of the request body for debugging
    console.log("Request Body:", request.body);

    // Attempt to parse JSON data
    const requestData = await request.json();

    // Check if the request body is empty or does not contain valid JSON
    if (!requestData) {
      return NextResponse.json({ error: "Empty request body. JSON data is required." }, { status: 400 });
    }

    const {
      _id, // Assuming _id is used as the unique identifier for the listing
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
    } = requestData;

    // Check if _id is present in the request
    if (!_id) {
      return NextResponse.json({ error: "Invalid request. _id is required for updating." }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongoDB();

    const startDate = new Date(carAvailability.startDate);
    const endDate = new Date(carAvailability.endDate);

    // Update the listing in MongoDB
    const updatedListing = await ListingModel.findByIdAndUpdate(_id, {
      brand,
      carAvailability: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        // checked: false,
        checked: requestData.event.target.checked || false, // Use the checkbox value if available, default to false
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
    }, { new: true });

    // Check if the listing was found and updated
    if (updatedListing) {
      return NextResponse.json({ message: "Listing Updated", listing: updatedListing }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating listing:", error);
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