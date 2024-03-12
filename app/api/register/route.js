// // Third Party Components
// import bcrypt from "bcryptjs";
// import prisma from "@/prisma";
// import { NextResponse } from "next/server";

// // Database Connect
// import { connectToDatabase } from "@/helpers/ServerHelpers";

// export async function POST(request) {
//   try {
//     let requestData = await request.json();
//     const email = requestData.email;
//     const password = requestData.password;

//     await connectToDatabase();

//     // Check if the email already exists
//     const existingUser = await prisma.users.findFirst({
//       where: {
//         email: email
//       }
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         { message: "Email already exists" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     requestData.password = hashedPassword;

//     // Create new user if email doesn't exist
//     const newUser = await prisma.users.create({
//       data: requestData
//     });

//     return NextResponse.json({ message: "User Created" }, { status: 200 });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return NextResponse.json(
//       { message: "Something went wrong. Please try again." },
//       { status: 500 }
//     );
//   }
// }
