"use client";

import React, { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { TextField, Button, CircularProgress } from "@mui/material";

import { useAuth } from "@/contexts/AuthProvider";
import { GoogleButton } from "../common/Buttons";

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
  authProvider: "form"
};

const LoginForm = () => {
  const { login } = useAuth();

  const [user, setUser] = useState(initialUserState);
  const [isFailure, setIsFailure] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const store = useUser();
  const navigate = useRouter();

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await axios.get(`/api/login`, {
        params: {
          email: user.email,
          password: user.password
        }
      });

      if (response.data.user.role === "admin") {
        await login(response.data.user, response.data.token);
        setIsLoading(false);
        navigate.push("/admin");
      } else {
        await login(response.data.user, response.data.token);
        setIsLoading(false);
        navigate.push("/");
      }
    } catch (error) {
      setIsFailure(true);
      setIsLoading(false);
      return;
    }
  };

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-0 font-Messina-Sans overflow-x-hidden">
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
            {isLoading ? (
              <CircularProgress style={{ color: "#fff" }} size={24} />
            ) : (
              "Login"
            )}
          </Button>
          <a
            className="text-center focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 text-sm font-semibold leading-none text-white focus:outline-none bg-gray-700 rounded hover:opacity-70 py-4 w-full transition"
            href="/"
          >
            Return
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
