"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { ICar } from "../types/types";

import { SearchFormData } from "@/types/searchCar";

interface ServiceSearchHeroProps {
  location: string;
  startDate: Date | null;
  endDate: Date | null;
  endTime: Date | null;
  startTime: Date | null;
}

interface ServiceCarContextType {
  data: ICar[];
  carDetailsData: ICar[];
  searchLoading: boolean;
  searchFormData: SearchFormData;
  fetchData: () => Promise<void>;
  updateListing: (id: number, updatedData: Partial<ICar>) => Promise<void>;
  searchListing: (formData: ServiceSearchHeroProps) => Promise<void>;
  setSearchFormData: React.Dispatch<React.SetStateAction<SearchFormData>>;
  setSearchLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCarDetailsData: React.Dispatch<React.SetStateAction<ICar[]>>;
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
  children
}) => {
  const [data, setData] = useState<ICar[]>([]);
  const [carDetailsData, setCarDetailsData] = useState<ICar[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchFormData, setSearchFormData] = useState<SearchFormData>({
    location: "Davao City",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "",
    endTime: ""
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/listing");
      setData(response.data.listings);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data. Please try again.");
    }
  };

  const updateListing = async (id: number, updatedData: Partial<ICar>) => {
    try {
      await axios.put(`/api/listing/${id}`, updatedData);
      await fetchData(); // Refresh the data after the update
    } catch (error) {
      console.error("Error updating listing:", error);
      throw new Error("Failed to update listing. Please try again.");
    }
  };

  const searchListing = async (formData: ServiceSearchHeroProps) => {
    try {
      const response = await axios.get("/api/listing/search", {
        params: {
          city: formData.location,
          startDate: formData.startDate,
          endDate: formData.endDate
        }
      });

      setData(response.data.listings);
      setSearchLoading(false);
    } catch (error) {
      setSearchLoading(false);
      console.error("Error fetching data:", error);
      throw new Error("Failed to search listings. Please try again.");
    }
  };

  // Hydration error fix
  useEffect(() => {
    // Set hydrated state to true after initial render
    setHydrated(true);
  }, []);

  // State to track hydration
  const [hydrated, setHydrated] = useState(false);

  // If not hydrated yet, return null to match client and server rendering
  if (!hydrated) {
    return null;
  }

  // Render the provider with context values
  return (
    <ServiceCarContext.Provider
      value={{
        data,
        searchFormData,
        searchLoading,
        carDetailsData,
        fetchData,
        updateListing,
        searchListing,
        setSearchFormData,
        setSearchLoading,
        setCarDetailsData
      }}
    >
      {children}
    </ServiceCarContext.Provider>
  );
};
