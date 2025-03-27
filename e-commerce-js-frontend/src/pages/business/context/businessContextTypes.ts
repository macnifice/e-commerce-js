import { createContext } from 'react';
import { Business } from '../../../models/business.interface';

// Definición del tipo de contexto
export interface BusinessContextType {
  businesses: Business[];
  loading: boolean;
  error: string | null;
  refreshBusinesses: () => Promise<void>;
}

// Crear el contexto
export const BusinessContext = createContext<BusinessContextType | undefined>(undefined); 