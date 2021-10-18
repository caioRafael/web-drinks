import { useContext } from 'react';
import { DrinksContexts } from '../contexts/DrinksContexts'

export function useDrinks() {
  const context = useContext(DrinksContexts);

  return context;
}