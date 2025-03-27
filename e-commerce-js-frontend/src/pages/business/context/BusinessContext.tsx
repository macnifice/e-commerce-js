import React, { useState, useEffect, ReactNode } from 'react';
import { Business, BusinessResponse } from '../../../models/business.interface';
import { getBusinesses } from '../services/businessService';
import { BusinessContext, BusinessContextType } from './businessContextTypes';

interface BusinessProviderProps {
  children: ReactNode;
}

export const BusinessProvider: React.FC<BusinessProviderProps> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const response: BusinessResponse = await getBusinesses();
      if (Array.isArray(response.data)) {
        setBusinesses(response.data);
      } else {
        setBusinesses([]);
      }
      setError(null);
    } catch (err) {
      setError('Error al cargar los negocios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const refreshBusinesses = async () => {
    await fetchBusinesses();
  };

  const value: BusinessContextType = {
    businesses,
    loading,
    error,
    refreshBusinesses
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}; 