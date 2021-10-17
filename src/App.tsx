import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import api from './services/api';
import './styles/global.scss'
import './styles/home.scss'

// type ListCategory = {
//   drinks: Category[];
// }
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

function App() {

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
    console.log(drinksData.data);
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
        <input type="text" placeholder="Pesquisa" />

        <h3>Categorias:</h3>

        {categorys?.drinks.map((cat, i) => {
          return (
            <button key={i}>{cat.strCategory}</button>
          )
        })}

        {/* <select name="categorys" id="categorys">
          {categorys?.drinks.map((cat, i) => {
            return (
              <option key={i} value={cat.strCategory}>{cat.strCategory}</option>
            )
          })}
        </select> */}

        <div className="content">
          {drinks?.drinks.map((d) => {
            return (
              <div className="card" key={d.idDrink}>
                <img src={d.strDrinkThumb} alt="thumb drink" />
                <b>{d.strDrink}</b>
              </div>
            )
          })}
        </div>

      </main>
    </div>
  );
}

export default App;
