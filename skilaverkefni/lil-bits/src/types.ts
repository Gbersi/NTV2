
export type Provision = {
  id: string
  name: string
  description: string
  imageSource: string
  price: number
  category: string
}


export type Dish = Provision & {
  cuisine: string      
  calories?: number
}


export type Drink = Provision & {
  brewer: string
  qty?: number
}


export type Order = {
  id?: number
  email: string
  dish: Dish
  drinks: Drink[]
  date: string   
  time: string   
  people: number
}
