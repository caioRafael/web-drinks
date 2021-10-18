import { AxiosResponse } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Categorys } from '../models/drinks';
import api from '../services/api';

interface DrinksContextsData {

}

interface DrinksProviderProps {
  children: ReactNode;
}

export const DrinksContexts = createContext({} as DrinksContextsData);

export function DrinksProvider({ children }: DrinksProviderProps) {
  // const [categorys, setCategorys] = useState<Categorys>();

  // const [drinks, setDrinks] = useState<Drinks>();


  async function getGategorys() {
    const response: AxiosResponse<Categorys> = await api.get('list.php?c=list');
    console.log(response.data);
    // setCategorys(response.data);
  }

  useEffect(() => {
    getGategorys();
  }, [])

  return (
    <DrinksContexts.Provider value={{}}>
      {children}
    </DrinksContexts.Provider>
  )
}