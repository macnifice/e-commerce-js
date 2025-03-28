import { createContext } from 'react';
import { Business } from '../../../models/business.interface';

// Definición del tipo de contexto
export interface BusinessContextType {
  businesses: Business[];
  addBusiness: (business: Business) => Promise<void>;
  removeBusiness: (id: number) => Promise<void>;
  updateBusiness: (id: number) => Promise<void>;
}

// Crear el contexto
export const BusinessContext = createContext<BusinessContextType | undefined>(undefined); 