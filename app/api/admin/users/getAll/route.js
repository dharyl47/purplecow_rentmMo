// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import connectMongoDB from "@/lib/mongodb";

// Model
import UserSchema from "@/lib/models/user.model";


export async function GET() {
    await connectMongoDB();
    
     const user = await UserSchema.find();

     if (user) {
     return NextResponse.json({ user });
     } else {
     return NextResponse.json({ error: "User not found" }, { status: 404 });
     }
}
