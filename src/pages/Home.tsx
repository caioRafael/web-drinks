import { useEffect, useState } from 'react';
import Card from '../components/Card';

import '../styles/pages/home.scss'
import { ListDrinks } from '../models/drinks';
import { useDrinks } from '../hooks/useDrinks';

export default function Home() {
  const { categorys, filterList } = useDrinks();

  const [drinks, setDrinks] = useState<ListDrinks[]>([]);

  const [selectCategory, setSelectCategory] = useState('none');

  useEffect(() => {
    const list = filterList(selectCategory)

    setDrinks(list);
  }, [selectCategory, filterList])

  return (
    <div className="container">
      <header>
        <h1>Web Drinks</h1>
      </header>
      <main>
        <section className="menu">
          {/* <div className="searchInput">
            <label htmlFor="Search">Search</label>
            <input type="text" className="search" />
          </div> */}
          <div className="selectCategory">
            <label htmlFor="categorys">Categorys:</label>
            <select className="categorys" id="categorys" onChange={(e) => {
              setSelectCategory(e.target.value);
            }}>
              <option value="none" disabled>Select a category</option>
              <option value="all">All Categorys</option>
              {categorys.map((cat) => {
                return (
                  <option key={cat.value} value={cat.value}>{cat.strCategory}</option>
                )
              })}
            </select>
          </div>
        </section>
        {drinks.length === 0 ? (
          <h1 className="warning">Select a category</h1>
        ) : (
          <div className="content">
            {drinks.map((d) => {
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
        )}
      </main>
    </div>
  );
}