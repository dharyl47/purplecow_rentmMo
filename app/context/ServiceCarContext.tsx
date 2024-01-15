'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ICar } from '../types/types';

export const ServiceCarContext = createContext<any>(null);

export const useServiceCarContext = () => {
  return useContext(ServiceCarContext);
};

export const ServiceCarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ICar[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/listing");
      setData(response.data.listings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateListing = async (id: number, updatedData: Partial<ICar>) => {
    try {
      await axios.put(`/api/updatelisting/${id}`, updatedData);
      fetchData(); // Refresh the data after the update
    } catch (error) {
      console.error("Error updating listing:", error);
      // Handle specific error types here if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //hydration error fix
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
