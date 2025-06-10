// src/types.ts
export interface Dish {
  id: string;
  name: string;
  category: string;
  imageSource: string;
  price: number;
  calories?: number;
}

export interface Drink {
  description: string;
  id: string;
  name: string;
  imageSource: string;
  price: number;
  qty: number;
  category: string;
  brewer: string;
}

export interface Order {
  id?: string;
  email: string;
  date: string;
  time: string;
  people: number;
  dish: Dish;
  drinks: Drink[];
}
