import { createContext, ReactNode, useEffect, useState } from 'react';
import { CategoryList, ListDrinks } from '../models/drinks';
import { getCategorys, getDrinks } from '../services/drinksService';

interface DrinksContextsData {
  categorys: CategoryList[];
  allDrinks: ListDrinks[];
  filterList: (c: string) => ListDrinks[];
}

interface DrinksProviderProps {
  children: ReactNode;
}

export const DrinksContexts = createContext({} as DrinksContextsData);

export function DrinksProvider({ children }: DrinksProviderProps) {
  const [categorys, setCategorys] = useState<CategoryList[]>([]);
  const [allDrinks, setAllDrinks] = useState<ListDrinks[]>([])


  function filterList(category: string) {
    let filteredList: ListDrinks[] = [];

    if (category === 'all') {
      filteredList = allDrinks;

      console.log(filteredList);

      return filteredList;
    } else {
      filteredList = allDrinks.filter(drink => drink.category === category);

      console.log(filteredList);

      return filteredList;
    }
  }

  async function getDatas() {
    const listCategorys = await getCategorys();
    // console.log(listCategorys);
    setCategorys(listCategorys);
    const listDrinks = await getDrinks(listCategorys);
    // console.log(listDrinks);
    setAllDrinks(listDrinks);
  }

  useEffect(() => {
    getDatas();
  }, [])

  return (
    <DrinksContexts.Provider value={{
      categorys: categorys,
      allDrinks: allDrinks,
      filterList: filterList,
    }}>
      {children}
    </DrinksContexts.Provider>
  )
}