import { NextResponse } from "next/server";

import { connectMongoDB, BookingsModel, ListingsModel } from "@/lib/mongodb";

export async function GET(request, res) {
  const queryParams = new URL(request.url).searchParams;

  // Params
  const searchCityParam = queryParams.get("city");
  const searchStartDateParam = queryParams.get("startDate");
  const searchEndDateParam = queryParams.get("endDate");
  const userId = queryParams.get("userId");

  // Date Converted
  const utcStartDate = new Date(searchStartDateParam);
  const utcEndDate = new Date(searchEndDateParam);

  try {
    await connectMongoDB();

    const bookingsByUser = await BookingsModel.find({
      user: userId
    }).distinct("car");

    console.log(bookingsByUser);

    const carFilter = {
      $and: [
        {
          $or: [
            { city: { $regex: searchCityParam, $options: "i" } },
            { street: { $regex: searchCityParam, $options: "i" } },
            { province: { $regex: searchCityParam, $options: "i" } },
            { country: { $regex: searchCityParam, $options: "i" } },
            { state: { $regex: searchCityParam, $options: "i" } },
            { zipcode: { $regex: searchCityParam, $options: "i" } }
          ]
        },
        {
          $or: [
            {
              $and: [
                {
                  "carAvailability.startDate": {
                    $lte: utcStartDate
                  }
                },
                {
                  "carAvailability.endDate": {
                    $gte: utcEndDate
                  }
                }
              ]
            },
            { "carAvailability.checked": true }
          ]
        },
        {
          _id: { $nin: bookingsByUser }
        }
      ]
    };

    const listings = await ListingsModel.find(carFilter).populate({
      path: "ownerId",
      match: { role: "host" }
    });

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
