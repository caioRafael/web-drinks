import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "../services/api";

import '../styles/components/modal.scss';

interface ModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  idDrink: string;
}

interface DetailsDrink {
  drinks: [
    drink: {
      idDrink: string;
      strDrink: string;
      strTags: string;
      strCategory: string;
      strIBA: string;
      strAlcoholic: string;
      strGlass: string;
      strInstructions: string;
      strDrinkThumb: string;
    }
  ]
}

export default function Modal({ setOpenModal, idDrink }: ModalProps) {

  const [drink, setDrink] = useState<DetailsDrink>();

  async function getDrink() {
    const response: AxiosResponse<DetailsDrink> = await api.get(`lookup.php?i=${idDrink}`);

    console.log(response.data);
    setDrink(response.data);
  }

  useEffect(() => {
    getDrink();
  }, [])

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="body">
          <img src={drink?.drinks[0].strDrinkThumb} alt="img-drink" />

          <h3>{drink?.drinks[0].strDrink}</h3>
          <p>Category: {drink?.drinks[0].strCategory}</p>
          <p>Alcoholic: {drink?.drinks[0].strAlcoholic}</p>
          {/* <p>IBA: {drink?.drinks[0].strIBA}</p> */}
          <p>Glass: {drink?.drinks[0].strGlass}</p>
          <p>{drink?.drinks[0].strInstructions}</p>
        </div>
      </div>
    </div>
  )
}