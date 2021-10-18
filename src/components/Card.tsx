import { useState } from 'react'
import Modal from './Modal'
import '../styles/components/card.scss'

type Drink = {
  idDrink: string;
  strDrinkThumb: string;
  strDrink: string;
}

export default function Card({ idDrink, strDrinkThumb, strDrink }: Drink) {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <button className="card" key={idDrink} onClick={() => setOpenModal(true)}>
        <img src={strDrinkThumb} alt="thumb drink" />
        <b>{strDrink}</b>
      </button>
      {openModal && (<Modal setOpenModal={setOpenModal} idDrink={idDrink} />)}
    </>
  )
}