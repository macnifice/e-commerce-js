import React, { useState, useEffect, ReactNode } from "react";
import { Business, BusinessResponse } from "../../../models/business.interface";
import { getBusinesses } from "../services/businessService";
import { BusinessContext, BusinessContextType } from "./businessContextTypes";

interface BusinessProviderProps {
  children: ReactNode;
}

export const BusinessProvider: React.FC<BusinessProviderProps> = ({
  children,
}) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  const fetchBusinesses = async () => {
    const response: BusinessResponse = await getBusinesses();
    if (Array.isArray(response.data)) {
      setBusinesses(response.data);
    } else {
      setBusinesses([]);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const addBusiness = async (business: Business) => {
    setBusinesses((prev) => [...prev, business]);
  };
  const removeBusiness = async () => {};
  const updateBusiness = async () => {};

  const value: BusinessContextType = {
    businesses,
    addBusiness,
    removeBusiness,
    updateBusiness,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};
