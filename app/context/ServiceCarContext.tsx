"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { ICar } from "../types/types";

interface ServiceSearchHeroProps {
  location: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface SearchFormData {
  location: string;
  startDate: Date | null;
  startTime: string;
  endDate: Date | null;
  endTime: string;
}

interface ServiceCarContextType {
  data: ICar[];
  fetchData: () => Promise<void>;
  updateListing: (id: number, updatedData: Partial<ICar>) => Promise<void>;
  searchListing: (formData: ServiceSearchHeroProps) => Promise<void>; // Define the type signature here
}

export const ServiceCarContext = createContext<ServiceCarContextType | null>(
  null
);

export const useServiceCarContext = (): ServiceCarContextType => {
  const context = useContext(ServiceCarContext);
  if (!context) {
    throw new Error(
      "useServiceCarContext must be used within a ServiceCarProvider"
    );
  }
  return context;
};

export const ServiceCarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ICar[]>([]);
  const [formData, setFormData] = useState<SearchFormData>({
    location: "",
    startDate: null,
    startTime: "",
    endDate: null,
    endTime: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/listing");
      setData(response.data.listings);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle specific error types here if needed
    }
  };

  // added by John Rey Update Car Details
  const updateListing = async (id: number, updatedData: Partial<ICar>) => {
    try {
      // await axios.put("/api/updatelisting", updatedData);
      await axios.put("/api/listing", updatedData);
      await fetchData(); // Refresh the data after the update
    } catch (error) {
      console.error("Error updating listing:", error);
      // Handle specific error types here if needed
    }
  };

  const searchListing = async (formData: ServiceSearchHeroProps) => {
    try {
      const response = await axios.get(`/api/listing/searchListing`, {
        params: {
          city: formData.location,
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
      });

      setData(response.data.listings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Hydration error fix
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <ServiceCarContext.Provider
      value={{ data, fetchData, updateListing, searchListing }}
    >
      {children}
    </ServiceCarContext.Provider>
  );
};
