import { NextResponse } from "next/server";

import connectMongoDB from "@/lib/mongodb";

import BookingModel from "@/lib/models/booking.model";

export async function GET(res, req) {
  try {
    await connectMongoDB();

    const queryObj = {
      $and: [
        {
          $or: [
            { city: { $regex: "Davao City", $options: "i" } },
            { street: { $regex: "Davao City", $options: "i" } },
            { province: { $regex: "Davao City", $options: "i" } },
            { country: { $regex: "Davao City", $options: "i" } },
            { state: { $regex: "Davao City", $options: "i" } },
            { zipcode: { $regex: "Davao City", $options: "i" } }
          ]
        },
        // {
        //   $or: [
        // {
        //   $and: [
        //     { "carAvailability.startDate": { $lte: utcEndDate } },
        //     { "carAvailability.endDate": { $gte: utcStartDate } }
        //   ]
        // },
        { "carAvailability.checked": true }
        //   ]
        // }
      ]
    };

    // Fetch listings by city, startDate, endDate
    const listings = await BookingModel.find()
      .populate({
        path: "car",
        match: queryObj
      })
      .populate({
        path: "car",
        match: queryObj
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
