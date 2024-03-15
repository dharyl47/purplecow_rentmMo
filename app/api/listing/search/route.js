import { NextResponse } from "next/server";

import { connectMongoDB, ListingsModel } from "@/lib/mongodb";

export async function GET(request, { query }) {
  await connectMongoDB();

  try {
    const queryParams = new URL(request.url).searchParams;
    const city = queryParams.get("city");
    const startDate = queryParams.get("startDate");
    const endDate = queryParams.get("endDate");

    const utcStartDate = new Date(startDate);
    const utcEndDate = new Date(endDate);

    const queryObj = {
      $and: [
        {
          $or: [
            { city: { $regex: city, $options: "i" } },
            { street: { $regex: city, $options: "i" } },
            { province: { $regex: city, $options: "i" } },
            { country: { $regex: city, $options: "i" } },
            { state: { $regex: city, $options: "i" } },
            { zipcode: { $regex: city, $options: "i" } }
          ]
        },
        {
          $or: [
            {
              $and: [
                { "carAvailability.startDate": { $lte: utcEndDate } },
                { "carAvailability.endDate": { $gte: utcStartDate } }
              ]
            },
            { "carAvailability.checked": true }
          ]
        }
      ]
    };

    // Fetch listings by city, startDate, endDate
    const listings = await ListingsModel.find(queryObj).populate("ownerId");

    const filteredListings = listings.filter(
      listing => listing.ownerId.role === "host"
    );

    return NextResponse.json({ listings: filteredListings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
