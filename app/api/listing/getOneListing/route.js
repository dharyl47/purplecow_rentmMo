// Third Party Components
import prisma from "@/prisma"
import { NextResponse } from "next/server";

// Database Connect
import { connectToDatabase } from "@/helpers/ServerHelpers"

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        await connectToDatabase();

        // Fetch listings by owner ID
        const listings = await prisma.listings.findMany({
            where: {
                id: id
            },
            include: {
                owner: true 
            }
        });  


        return NextResponse.json({ listings }, { status: 200 });
    } catch (error) {
        console.error("Error fetching listings by ownerId:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  