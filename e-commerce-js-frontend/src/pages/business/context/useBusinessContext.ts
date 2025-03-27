import { useContext } from 'react';
import { BusinessContext, BusinessContextType } from './businessContextTypes';

export const useBusinessContext = (): BusinessContextType => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusinessContext debe usarse dentro de un BusinessProvider');
  }
  return context;
}; 