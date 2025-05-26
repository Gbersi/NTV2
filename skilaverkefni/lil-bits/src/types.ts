
export type Provision = {
  id: string
  name: string
  description: string
  imageSource: string
  price: number
  category: string
}

/**
 * A Dish from TheMealDB, with optional calories.
 */
export type Dish = Provision & {
  cuisine: string      // fixed typo from "cousine"
  calories?: number
}

/**
 * A Drink from CocktailDB, with optional qty.
 */
export type Drink = Provision & {
  brewer: string
  qty?: number
}

/**
 * An Order placed by a user.
 */
export type Order = {
  id?: number
  email: string
  dish: Dish
  drinks: Drink[]
  date: string   // YYYY-MM-DD
  time: string   // HH:mm
  people: number
}
