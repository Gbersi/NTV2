export interface Cocktail {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strAlcoholic: string;
    [key: string]: string | null | undefined;
  }
  
  export interface Ingredient {
    name: string;
    image: string;
  }
  