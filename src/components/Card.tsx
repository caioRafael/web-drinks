import '../styles/components/card.scss'

type Drink = {
  idDrink: string;
  strDrinkThumb: string;
  strDrink: string;
}

export default function Card({ idDrink, strDrinkThumb, strDrink }: Drink) {
  return (
    <button className="card" key={idDrink}>
      <img src={strDrinkThumb} alt="thumb drink" />
      <b>{strDrink}</b>
    </button>
  )
}