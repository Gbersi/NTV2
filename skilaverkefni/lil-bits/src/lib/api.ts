// src/lib/api.ts

import { Order, Dish, Drink } from '../types';

export type ApiResponse<T> = {
  success: boolean;
  order?: T;
};

const API_BASE = ''; // same‐origin, so just hits /api/...

async function callApi<T>(path: string, opts?: RequestInit): Promise<T> {
  const url = `${API_BASE}/api/${path}`;
  console.log(`[API] ${opts?.method ?? 'GET'} ${url}`);
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${path} failed ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export function createOrder(order: Order): Promise<ApiResponse<Order>> {
  return callApi<ApiResponse<Order>>('create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
}

export function updateOrder(order: Order): Promise<ApiResponse<Order>> {
  return callApi<ApiResponse<Order>>('update-order', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
}

export async function fetchOrderByEmail(
  email: string
): Promise<ApiResponse<Order>> {
  const url = `${API_BASE}/api/order/${encodeURIComponent(email)}`;
  console.log(`[API] GET ${url}`);
  const res = await fetch(url);
  if (res.status === 404) {
    return { success: false };
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API order/${email} failed ${res.status}: ${text}`);
  }
  return (await res.json()) as ApiResponse<Order>;
}

export async function fetchRandomDish(): Promise<Dish> {
  const res = await fetch(
    'https://themealdb.com/api/json/v1/1/random.php'
  );
  if (!res.ok) {
    throw new Error(`MealDB error: ${res.status}`);
  }
  const data: any = await res.json();
  const meal = data.meals[0];
  const price = Math.floor(Math.random() * 91) + 10; // $10–$100
  const calories = Math.floor(Math.random() * 801) + 200; // 200–1000
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    description: meal.strInstructions,
    imageSource: meal.strMealThumb,
    price,
    category: meal.strCategory,
    cousine: meal.strArea,
    calories,
  };
}

export async function searchDrinks(query: string): Promise<Drink[]> {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
      query
    )}`
  );
  if (!res.ok) {
    throw new Error(`CocktailDB error: ${res.status}`);
  }
  const data: any = await res.json();
  const raw = Array.isArray(data.drinks) ? data.drinks : [];
  return raw.map((d: any) => ({
    id: d.idDrink,
    name: d.strDrink,
    description: d.strInstructions,
    imageSource: d.strDrinkThumb,
    price: 5,
    category: d.strCategory,
    brewer: d.strAlcoholic,
  }));
}

export function fetchAllDrinks(): Promise<Drink[]> {
  return searchDrinks('');
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
  );
  if (!res.ok) {
    throw new Error(`CocktailDB error: ${res.status}`);
  }
  const data: any = await res.json();
  const raw = Array.isArray(data.drinks) ? data.drinks : [];
  return raw
    .map((d: any) => d.strCategory)
    .filter((c: string): c is string => Boolean(c));
}

export async function fetchDrinksByCategory(
  category: string
): Promise<Drink[]> {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
      category
    )}`
  );
  if (!res.ok) {
    throw new Error(`CocktailDB error: ${res.status}`);
  }
  const data: any = await res.json();
  const raw = Array.isArray(data.drinks) ? data.drinks : [];
  return raw.map((d: any) => ({
    id: d.idDrink,
    name: d.strDrink,
    description: '',
    imageSource: d.strDrinkThumb,
    price: 5,
    category,
    brewer: '',
  }));
}
