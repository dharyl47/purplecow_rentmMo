// Third Party Components
import prisma from "@/prisma"
import { NextResponse } from "next/server";

// Database Connect
import { connectToDatabase } from "@/helpers/ServerHelpers"


export async function GET(request) {
    await connectToDatabase();

     const queryParams = new URL(request.url).searchParams;
     const email = queryParams.get('email'); // Extract the email from the query parameters
     const user = await UserSchema.findOne({ email });

     if (user) {
     return NextResponse.json({ user });
     } else {
     return NextResponse.json({ error: "User not found" }, { status: 404 });
     }
}

export async function PUT(request) {
    try {
      const requestData = await request.json();
  
      const { id, ...updateData } = requestData;
  
      await connectToDatabase();
  
      await prisma.users.update({
          where: {
              id: id
          },
          data: updateData
      });
  
      return NextResponse.json({ message: "User Updated", data: requestData }, { status: 200 });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }