"use client";
import React, { useState } from "react";
import axios from "axios";
import { GoogleButton } from "../../components/Buttons";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUser } from "./../../hooks/useUser";

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
  const [isFailure, setIsFailure] = useState(false);
  const store = useUser();
  const navigate = useRouter();

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     // Check if the email exists before proceeding with registration
  //     const emailCheckResponse = await axios.get(
  //       `/api/users?email=${user.email}`
  //     );

  //     store.setUser(emailCheckResponse.data.user);
  //     navigate.push("/profile");
  //   } catch (error) {
  //     setIsFailure(true);
  //     return;
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/login`, {
        params: {
          email: user.email,
          password: user.password,
        },
      });

      store.setUser(response.data.user);
      navigate.push("/profile");
    } catch (error) {
      setIsFailure(true);
      return;
    }
  };

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center -mt-14 justify-center w-full min-h-screen px-0 font-Messina-Sans overflow-x-hidden">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-10"
      >
        <div
          tabIndex={0}
          role="heading"
          aria-label="Login to your account"
          className="text-2xl font-extrabold leading-6 text-gray-800"
        >
          <p>Login to your account</p>
        </div>

        <GoogleButton />
        <div className="w-full flex items-center justify-between py-5">
          <hr className="w-full bg-slate-950" />
          <p className="text-base font-medium leading-4 px-2.5 text-slate-950">
            OR
          </p>
          <hr className="w-full bg-slate-950" />
        </div>
        <div>
          <TextField
            size="small"
            variant="outlined"
            label="Email"
            sx={{ width: "100%", mt: 1 }}
            onChange={handleChange}
            value={user.email}
            defaultValue={""}
            id="email"
            name="email"
            type="email"
            placeholder="e.g: john@gmail.com"
          />
        </div>
        <div className="mt-6  w-full">
          <div className="relative flex items-center justify-center">
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
          <small className={`text-red-500 ${isFailure ? "visible" : "hidden"}`}>
            Invalid email or password
          </small>
        </div>

        <div className="flex flex-row text-sm mt-4 font-medium leading-none text-gray-500">
          <p className="mr-1">Dont have account? </p>
          <a
            tabIndex={0}
            role="link"
            href="/registration"
            aria-label="Sign up here"
            className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
          >
            Sign up here
          </a>
        </div>

        <div className="mt-8 flex xl:flex-row flex-col gap-5">
          <Button
            className="focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 text-sm font-semibold leading-none text-black focus:outline-none bg-yellow-300 rounded hover:opacity-70 py-4 w-full transition"
            variant="contained"
            color="primary"
            onClick={handleSubmit} // Automatically check email and proceed with registration
          >
            Login
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
