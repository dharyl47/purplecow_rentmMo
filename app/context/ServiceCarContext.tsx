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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ServiceCarContext.Provider value={{ data, fetchData }}>
      {children}
    </ServiceCarContext.Provider>
  );
};
