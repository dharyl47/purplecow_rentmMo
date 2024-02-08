"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { initialUserProfile } from "../types/initialInfo";

export const UserContext = createContext<any>(null);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState(initialUserProfile);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/user/my-info");
      // const response = await axios.get('/api/user');

      setData(response.data.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const getUser = async () => {
  //   try {
  //     const response = await axios.get('/api/v1/user/my-info');
  //     // const response = await axios.get('/api/user');

  //     console.log(response)

  //     setData(response.data.user);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const logoutUser = async () => {
    try {
      const response = await axios.get("/api/v1/user/my-info");
      // const response = await axios.get('/api/user');

      console.log(response);

      setData(response.data.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // console.log("fetching data for user........")
    // fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ data, fetchData }}>
      {children}
    </UserContext.Provider>
  );
};
