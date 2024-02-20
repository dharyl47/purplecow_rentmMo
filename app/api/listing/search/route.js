// Third Party Components
import prisma from "@/prisma"
import { NextResponse } from "next/server";

// Database Connect
import { connectToDatabase } from "@/helpers/ServerHelpers"

export async function GET(request) {
    try {
        await connectToDatabase();
        const queryParams = new URL(request.url).searchParams;
        const city = queryParams.get('city');
        const startDate = queryParams.get('startDate');
        const endDate = queryParams.get('endDate');

        const listings = await prisma.listings.findMany({
          where: {
            OR: [
              { city: { contains: city, mode: 'insensitive' } },
              { country: { contains: city, mode: 'insensitive' } },
            ],
          },
          include: {  
              owner: true 
          }
        });

        // const listings = await prisma.listings.findMany({
        //   where: {
        //     OR: [
        //       { city: { contains: city, mode: 'insensitive' } },
        //       { street: { contains: city, mode: 'insensitive' } },
        //       { country: { contains: city, mode: 'insensitive' } },
        //       { state: { contains: city, mode: 'insensitive' } },
        //       { zipCode: { contains: city, mode: 'insensitive' } }
        //     ],
        //     carAvailability: {
        //       some: {
        //         AND: [
        //           { startDate: { lte: new Date(endDate).toISOString() } },
        //           { endDate: { gte: new Date(startDate).toISOString() } },
        //           { checked: true }
        //         ]
        //       }
        //     }
        //   }
        // });
        
          
        return NextResponse.json({ listings }, { status: 200 });
    } catch (error) {
        console.error("Error fetching listings:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
