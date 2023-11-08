import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongodb";
import UserSchema from "../../models/userProfile";

export async function POST(request) {
    const {firstName, lastName, email, password, authProvider} = await request.json();
    await connectMongoDB();
    await UserSchema.create({firstName, lastName, email, password, authProvider});
    return NextResponse.json({message: "User Created"}, {status: 201})
}

export async function GET(request, { query }) {
    await connectMongoDB();
     const queryParams = new URL(request.url).searchParams;
     const email = queryParams.get('email'); // Extract the email from the query parameters
     const user = await UserSchema.findOne({ email });
     if (user) {
     return NextResponse.json({ user });
     } else {
     return NextResponse.json({ error: "User not found" }, { status: 404 });
     }
}