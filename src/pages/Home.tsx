import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import api from '../services/api';
import Card from '../components/Card';

import '../styles/pages/home.scss'
import { Categorys, Drinks } from '../models/drinks';

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
        <section className="menu">
          {/* <label htmlFor="Search">Search</label>
          <input type="text" className="search" /> */}
          <div className="searchInput">
            <label htmlFor="Search">Search</label>
            <input type="text" className="search" />
          </div>

          <div className="selectCategory">
            <label htmlFor="categorys">Categorys</label>
            <select className="categorys" id="categorys">
              {categorys?.drinks.map((cat, i) => {
                return (
                  <option key={i} value={cat.strCategory}>{cat.strCategory}</option>
                )
              })}
            </select>
          </div>

          {/* <strong>Categorias:</strong>

          <div className="categorysContent">
            {categorys?.drinks.map((cat, i) => {
              return (
                <button className="buttonCategory" key={i}>{cat.strCategory}</button>
              )
            })}
          </div> */}
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