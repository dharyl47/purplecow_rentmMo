'use client';
import React, { useState } from "react";
import axios from "axios";
import {
  ButtonLinkFill,
  ButtonFill,
  GoogleButton,
} from "../../components/Buttons";
import { TextField, Button } from "@mui/material";

interface UserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  authProvider: string;
}
const initialUserState: UserSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  authProvider: "form",
};

const GButton = () => {
  const [user, setUser] = useState(initialUserState);

 const handleSubmit = async (e: any) => {
   e.preventDefault();
   try {
     // Check if the email exists before proceeding with registration
     const emailCheckResponse = await axios.get(
       `/api/users?email=${user.email}`
     );
     alert("Email already exists");
   } catch (error) {
     console.error("Catch error: "+error);
     try {
     const registrationResponse = await axios.post("/api/users", user);
      console.log(registrationResponse.data);
       } catch (error) {}
   }
 };

 const handleChange = (e: any) => {
   setUser({ ...user, [e.target.name]: e.target.value });
 };

  return (
    <div className="flex flex-col items-center -mt-14 justify-center w-full min-h-screen px-0 font-Messina-Sans overflow-x-hidden">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10"
      >
        <p
          tabIndex={0}
          role="heading"
          aria-label="Login to your account"
          className="text-2xl font-extrabold leading-6 text-gray-800"
        >
          Start your journey here
        </p>
        <GoogleButton />
        <div className="w-full flex items-center justify-between py-5">
          <hr className="w-full bg-slate-950" />
          <p className="text-base font-medium leading-4 px-2.5 text-slate-950">
            OR
          </p>
          <hr className="w-full bg-slate-950" />
        </div>
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex flex-col w-full">
            <TextField
              size="small"
              variant="outlined"
              label="First Name"
              sx={{ width: "100%", mt: 1 }}
              onChange={handleChange}
              value={user.firstName}
              defaultValue={""}
              id="firstName"
              name="firstName"
              type="text"
              placeholder="e.g: Juan"
            />
          </div>
          <div className="flex flex-col w-full">
            <TextField
              size="small"
              variant="outlined"
              label="Last Name"
              sx={{ width: "100%", mt: 1 }}
              onChange={handleChange}
              value={user.lastName}
              defaultValue={" "}
              id="lastName"
              name="lastName"
              type="text"
              placeholder="e.g: Cruz"
            />
          </div>
        </div>
        <div className="mt-6  w-full">
          <TextField
            size="small"
            variant="outlined"
            label="Email"
            sx={{ width: "100%", mt: 1 }}
            onChange={handleChange}
            value={user.email}
            defaultValue={" "}
            id="email"
            name="email"
            type="email"
            placeholder="e.g: john@gmail.com"
          />
        </div>
        <div className="mt-6  w-full">
          <TextField
            size="small"
            variant="outlined"
            label="Password"
            sx={{ width: "100%", mt: 1 }}
            onChange={handleChange}
            value={user.password}
            defaultValue={""}
            id="password"
            name="password"
            type="password"
            placeholder=""
          />
        </div>

        <div className="mt-8 flex xl:flex-row flex-col gap-5">
          <Button
            className="focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 text-sm font-semibold leading-none text-black focus:outline-none bg-yellow-300 rounded hover:opacity-70 py-4 w-full transition"
            variant="contained"
            color="primary"
            onClick={handleSubmit} // Automatically check email and proceed with registration
          >
            Create my account
          </Button>
          <a
            className="text-center focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 text-sm font-semibold leading-none text-white focus:outline-none bg-gray-700 rounded hover:opacity-70 py-4 w-full transition"
            href="/"
          >
            Return
          </a>{" "}
          {/* Use an anchor tag for navigation */}
        </div>
      </form>
    </div>
  );
};

export default GButton;
