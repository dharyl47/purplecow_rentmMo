import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongodb";
import ListingModel from "../../../models/listingSchema";

export async function GET(request, { query }) {
    try {
        await connectMongoDB();
        const queryParams = new URL(request.url).searchParams;
        const city = queryParams.get('city');
        const startDate = queryParams.get('startDate');
        const endDate = queryParams.get('endDate');

        // Convert query parameters to Date objects and then to UTC format
        const utcStartDate = new Date(startDate);
        const utcEndDate = new Date(endDate);


        const queryObj = {};
        if (city) queryObj.city = { $regex: new RegExp(city, 'i') }; 

        // Construct the $or condition
        queryObj.$or = [
            {
                $and: [
                    { 'carAvailability.startDate': { $lte: utcEndDate } },
                    { 'carAvailability.endDate': { $gte: utcStartDate } }
                ]
            },
            { 'carAvailability.checked': true }
        ];

        // Fetch listings by city, startDate, endDate
        const listings = await ListingModel.find(queryObj).populate('ownerId');
  
        return NextResponse.json({ listings }, { status: 200 });
    } catch (error) {
        console.error("Error fetching listings:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
