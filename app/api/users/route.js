import bcrypt from 'bcryptjs'; 

// Next Connect
import { NextResponse } from "next/server";

// Mongo Connect
import connectMongoDB from "@/lib/mongodb";

// Model
import UserSchema from "@/models/user.model";


// export async function POST(request) {
//     const {firstName, lastName, email, password, authProvider} = await request.json();
//     await connectMongoDB();
//     await UserSchema.create({firstName, lastName, email, password, authProvider});
//     return NextResponse.json({message: "User Created"}, {status: 201})
// }

export async function POST(request) {
  try {
      let requestData = await request.json();
      const email = requestData.email;
      const password = requestData.password; 

      // Connect to MongoDB 
      await connectMongoDB();

      // Check if the email already exists
      const existingUser = await UserSchema.findOne({ email });
      if (existingUser) {
          return NextResponse.json({ message: "Email already exists" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      requestData.password = hashedPassword

      // Create new user if email doesn't exist
      await UserSchema.create(requestData);

      return NextResponse.json({ message: "User Created" }, { status: 200 });
  } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
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

// export async function GETlogin(request, { query }) {
//   await connectMongoDB();
//   const queryParams = new URL(request.url).searchParams;
//   const email = queryParams.get('email'); // Extract the email from the query parameters
//   const password = queryParams.get('password'); // Extract the password from the query parameters

//   // Check if the email and password match an existing user
//   const user = await UserSchema.findOne({ email, password });

//   if (user) {
//       return NextResponse.json({ message: "Login successful", user });
//   } else {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
//   }
// }

export async function PUT(request) {
    try {
      const requestData = await request.json();
  
      const { _id, ...updateData } = requestData;
  
      await connectMongoDB();
  
      await UserSchema.findByIdAndUpdate(_id, updateData);
  
      return NextResponse.json({ message: "User Updated", data: requestData }, { status: 200 });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }