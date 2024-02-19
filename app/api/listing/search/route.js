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

        const newStartDate = new Date(startDate).toISOString();
        const newEndDate = new Date(endDate).toISOString();

        const listings = await prisma.listings.findMany({
          where: {
              AND: [
                  {
                      OR: [
                          { city: { contains: city, mode: 'insensitive' } },
                          { street: { contains: city, mode: 'insensitive' } },
                          { country: { contains: city, mode: 'insensitive' } },
                          { state: { contains: city, mode: 'insensitive' } },
                          { zipCode: { contains: city, mode: 'insensitive' } }
                      ]
                  },
                  {
                    OR: [
                        { "carAvailability.checked": true }, // Filter where checked is true
                        { "carAvailability.checked": false }, // Filter where checked is false
                      ],
                  }
              ]
          },
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
