// import { NextResponse } from "next/server";
// import connectMongoDB from "../../lib/mongodb";
// import ListingModel from "../../models/listingSchema";

// export async function POST(request) {
//     try {
//         const {
//           brand,
//           carAvailability,
//           carRegistrationNumber,
//           city,
//           country,
//           email,
//           licensePlateNumber,
//           mobileNumber,
//           model,
//           price,
//           state,
//           street,
//           vehiclePhotos,
//           zipCode,
//           lat,
//           lon,
//         } = await request.json();
    
//         await connectMongoDB();
    
//         const startDate = new Date(carAvailability.startDate);
//         const endDate = new Date(carAvailability.endDate);
    
//         await ListingModel.create({
//           brand,
//           carAvailability: {
//             startDate: startDate.toISOString(),
//             endDate: endDate.toISOString(),
//           },
//           carRegistrationNumber,
//           city,
//           country,
//           email,
//           licensePlateNumber,
//           mobileNumber,
//           model,
//           price,
//           state,
//           street,
//           vehiclePhotos,
//           zipCode,
//           lat,
//           lon,
//         });
    
//         return NextResponse.json({ message: "Listing Created" }, { status: 201 });
//       } catch (error) {
//         console.error("Error creating listing:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//       }
// }

// export async function PUT(request) {
//   try {
//     const {
//       _id, // Assuming _id is used as the unique identifier for the listing
//       brand,
//       carAvailability,
//       carRegistrationNumber,
//       city,
//       country,
//       email,
//       licensePlateNumber,
//       mobileNumber,
//       model,
//       price,
//       state,
//       street,
//       vehiclePhotos,
//       zipCode,
//       lat,
//       lon,
//     } = await request.json();

//     await connectMongoDB();

//     const startDate = new Date(carAvailability.startDate);
//     const endDate = new Date(carAvailability.endDate);

//     // Find the listing by _id and update its details
//     await ListingModel.findByIdAndUpdate(_id, {
//       brand,
//       carAvailability: {
//         startDate: startDate.toISOString(),
//         endDate: endDate.toISOString(),
//       },
//       carRegistrationNumber,
//       city,
//       country,
//       email,
//       licensePlateNumber,
//       mobileNumber,
//       model,
//       price,
//       state,
//       street,
//       vehiclePhotos,
//       zipCode,
//       lat,
//       lon,
//     });

//     return NextResponse.json({ message: "Listing Updated" }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating listing:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function GET() {
//     try {
//       await connectMongoDB();
  
//       // Fetch all listings
//       const listings = await ListingModel.find({});
  
//       return NextResponse.json({ listings }, { status: 200 });
//     } catch (error) {
//       console.error("Error fetching listings:", error);
//       return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
//   }

// import { NextResponse } from "next/server";
// import connectMongoDB from "../../lib/mongodb";
// import ListingModel from "../../models/listingSchema";

// export async function PUT(request) {
//   try {
//     // Attempt to parse JSON data
//     const requestData = await request.json();

//     // Check if the request body is empty or does not contain valid JSON
//     if (!requestData) {
//       return NextResponse.json({ error: "Empty request body. JSON data is required." }, { status: 400 });
//     }

//     const {
//       _id, // Assuming _id is used as the unique identifier for the listing
//       brand,
//       carAvailability,
//       carRegistrationNumber,
//       city,
//       country,
//       email,
//       licensePlateNumber,
//       mobileNumber,
//       model,
//       price,
//       state,
//       street,
//       vehiclePhotos,
//       zipCode,
//       lat,
//       lon,
//     } = requestData;

//     // Check if _id is present in the request
//     if (!_id) {
//       return NextResponse.json({ error: "Invalid request. _id is required for updating." }, { status: 400 });
//     }

//     // Connect to MongoDB
//     await connectMongoDB();

//     const startDate = new Date(carAvailability.startDate);
//     const endDate = new Date(carAvailability.endDate);

//     // Update the listing in MongoDB
//     const updatedListing = await ListingModel.findByIdAndUpdate(_id, {
//       brand,
//       carAvailability: {
//         startDate: startDate.toISOString(),
//         endDate: endDate.toISOString(),
//       },
//       carRegistrationNumber,
//       city,
//       country,
//       email,
//       licensePlateNumber,
//       mobileNumber,
//       model,
//       price,
//       state,
//       street,
//       vehiclePhotos,
//       zipCode,
//       lat,
//       lon,
//     }, { new: true });

//     // Check if the listing was found and updated
//     if (updatedListing) {
//       return NextResponse.json({ message: "Listing Updated", listing: updatedListing }, { status: 200 });
//     } else {
//       return NextResponse.json({ error: "Listing not found" }, { status: 404 });
//     }
//   } catch (error) {
//     console.error("Error updating listing:", error);

//     // Check if the error is related to JSON parsing
//     if (error instanceof SyntaxError) {
//       return NextResponse.json({ error: "Invalid JSON in the request body" }, { status: 400 });
//     }

//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongodb";
import ListingModel from "../../models/listingSchema";

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