export interface Categorys {
  drinks: { strCategory: string }[];
}
export interface CategoryList {
  value: string;
  strCategory: string;
}

export interface ListDrinks {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  category: string;
}
export interface Drinks {
  drinks: {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  }[]
}