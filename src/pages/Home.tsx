import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import api from '../services/api';
import Card from '../components/Card';

import '../styles/pages/home.scss'

interface Categorys {
  drinks: { strCategory: string }[];
}

interface Drinks {
  drinks: {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  }[]
}

export default function Home() {
  const [categorys, setCategorys] = useState<Categorys>();

  const [drinks, setDrinks] = useState<Drinks>();

  async function getGategorys() {
    const response: AxiosResponse<Categorys> = await api.get('list.php?c=list');
    // console.log(response.data);
    setCategorys(response.data);
  }

  useEffect(() => {
    getGategorys();
  }, [])

  async function getDtinks() {
    const drinksData: AxiosResponse<Drinks> = await api.get('filter.php?c=Ordinary_Drink');
    // console.log(drinksData.data);
    setDrinks(drinksData.data);
  }

  useEffect(() => {
    getDtinks();
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Web Drinks</h1>
      </header>
      <main>
        <section>
          <input type="text" placeholder="Search" />

          <h3>Categorias:</h3>

          <div className="categorysContent">
            {categorys?.drinks.map((cat, i) => {
              return (
                <button className="buttonCategory" key={i}>{cat.strCategory}</button>
              )
            })}
          </div>
        </section>

        <div className="content">
          {drinks?.drinks.map((d) => {
            return (
              <Card
                key={d.idDrink}
                idDrink={d.idDrink}
                strDrink={d.strDrink}
                strDrinkThumb={d.strDrinkThumb}
              />
            )
          })}
        </div>

      </main>
    </div>
  );
}