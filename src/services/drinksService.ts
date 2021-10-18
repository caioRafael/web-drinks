import { AxiosResponse } from "axios";
import { CategoryList, Categorys, Drinks, ListDrinks } from "../models/drinks";
import api from "./api";

export async function getCategorys(): Promise<CategoryList[]> {
  const response: AxiosResponse<Categorys> = await api.get('list.php?c=list');

  let categoryList: CategoryList[] = [];

  for (let newCategory of response.data.drinks) {
    let value;

    if (newCategory.strCategory.indexOf(' ')) {
      value = newCategory.strCategory.split(' ').join('_');
    } else {
      value = newCategory.strCategory;
    }

    categoryList.push({
      value: value,
      strCategory: newCategory.strCategory
    });
  }

  return categoryList;
}

export async function getDrinks(categorys: CategoryList[]): Promise<ListDrinks[]> {
  let listDrinks: ListDrinks[] = [];
  for (let newCategory of categorys) {

    const drinks: AxiosResponse<Drinks> = await api.get(`filter.php?c=${newCategory.value}`);
    for (let newDrinks of drinks.data.drinks) {
      let drink = {
        idDrink: newDrinks.idDrink,
        strDrink: newDrinks.strDrink,
        strDrinkThumb: newDrinks.strDrinkThumb,
        category: newCategory.value
      }

      listDrinks.push(drink);
    }
  }

  // console.log(listDrinks);
  // setAllDrinks(listDrinks);
  return listDrinks;
}