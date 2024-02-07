'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ICar } from '../types/types';

interface ServiceCarContextType {
  data: ICar[];
  fetchData: () => Promise<void>;
  updateListing: (id: number, updatedData: Partial<ICar>) => Promise<void>;
}

export const ServiceCarContext = createContext<ServiceCarContextType | null>(null);

export const useServiceCarContext = (): ServiceCarContextType => {
  const context = useContext(ServiceCarContext);
  if (!context) {
    throw new Error('useServiceCarContext must be used within a ServiceCarProvider');
  }
  return context;
};

export const ServiceCarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ICar[]>([]);

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

  useEffect(() => {
    fetchData();
  }, []);

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
    <ServiceCarContext.Provider value={{ data, fetchData, updateListing }}>
      {children}
    </ServiceCarContext.Provider>
  );
};