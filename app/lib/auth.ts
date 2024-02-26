import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import GoogleProvider from "next-auth/providers/google";
// import connectMongoDB from "@/lib/mongodb";
// import UserSchema from "@/models/user.model";
import { useEffect } from 'react';

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

callbacks: {
  async signIn(params) {
    const { user, account, profile } = params;
    // await connectMongoDB();
    // const existingUser = await UserSchema.findOne({ email: user.email });

    // if (!existingUser) {
    //   // Check if 'profile' is defined before accessing its properties
    //   const nameParts = profile?.name ? profile.name.split(" ") : [];
    //   let firstName = "";
    //   let lastName = "";

    //   if (nameParts.length >= 1) {
    //     firstName = nameParts[0];
    //   }
    //   if (nameParts.length >= 2) {
    //     lastName = nameParts.slice(1).join(" ");
    //   }

    //   // Create the user in the database if it doesn't exist
    //   await UserSchema.create({
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: user.email,
    //     password: "",
    //     authProvider: "google", // You may want to specify the authentication provider
    //   });
    // }
    return true; // Continue the sign-in process
  },
},
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}

export function LoginIsRequiredClient() {
  const session = useSession();
  const router = useRouter();
    if (typeof window !== "undefined" && !session) {
      router.push("/");
    }
}
