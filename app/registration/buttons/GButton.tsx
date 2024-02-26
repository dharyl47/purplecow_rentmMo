"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";

import { GoogleButton } from "../../components/Buttons";
import { TextField, Button, CircularProgress } from "@mui/material";

interface UserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: String;
  aboutMe: String;
  language: String;
  profession: String;
  profilePicture: String;
  authProvider: string;
}
const initialUserState: UserSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  aboutMe: "",
  language: "",
  profession: "",
  profilePicture: "",
  authProvider: "form",
};

const GButton = () => {
  const [user, setUser] = useState(initialUserState);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    const { confirmPassword, ...userData } = user;

    if (user.password !== user.confirmPassword) {
      alert("Password must be match.");

      return;
    }

    try {
      await axios.post("/api/register", userData);

      setIsLoading(false);
      window.location.href = "/login";
    } catch (error) {
      if (error instanceof AxiosError) { // Check if the error is an instance of AxiosError
        const errorMessage =
          error.response?.data?.message || // Access response property safely
          "Something went wrong. Please try again.";
        alert(errorMessage);
      } else {
        // Handle other types of errors
        console.error("Unexpected error:", error);
        alert("Unexpected error occurred. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-0 font-Messina-Sans overflow-x-hidden">
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
              required
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
              required
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
            required
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
            label="Phone Number"
            sx={{ width: "100%", mt: 1 }}
            onChange={handleChange}
            value={user.phoneNumber}
            defaultValue={" "}
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="e.g: +63 02 XXXX XXXX"
          />
        </div>

        <div className="mt-6  w-full">
          <TextField
            size="small"
            variant="outlined"
            label="Profession"
            sx={{ width: "100%", mt: 1 }}
            onChange={handleChange}
            value={user.profession}
            defaultValue={" "}
            id="profession"
            name="profession"
            type="text"
            placeholder="e.g: Web Developer, Designer"
          />
        </div>

        <div className="mt-6  w-full">
          <TextField
            size="small"
            variant="outlined"
            label="Language"
            sx={{ width: "100%", mt: 1 }}
            onChange={handleChange}
            value={user.language}
            defaultValue={" "}
            id="language"
            name="language"
            type="text"
            placeholder="e.g: English, Filipino"
          />
        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="mt-6  w-full">
            <TextField
              required
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

          <div className="mt-6  w-full">
            <TextField
              required
              size="small"
              variant="outlined"
              label="Confirm Password"
              sx={{ width: "100%", mt: 1 }}
              onChange={handleChange}
              value={user.confirmPassword}
              defaultValue={""}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder=""
            />
          </div>
        </div>

        <div className="flex flex-row text-sm mt-4 font-medium leading-none text-gray-500">
          <p className="mr-1">Already have an account? </p>
          <a
            tabIndex={0}
            role="link"
            href="/login"
            aria-label="Sign up here"
            className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
          >
            login in here
          </a>
        </div>

        <div className="mt-8 flex xl:flex-row flex-col gap-5">
          <Button
            className="focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 text-sm font-semibold leading-none text-black focus:outline-none bg-yellow-300 rounded hover:opacity-70 py-4 w-full transition"
            variant="contained"
            color="primary"
            type="submit"
            // onClick={handleSubmit} // Automatically check email and proceed with registration
          >
            {isLoading ? (
              <CircularProgress style={{ color: "#fff" }} size={24} />
            ) : (
              "Create my account"
            )}
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
