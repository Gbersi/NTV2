import React, { useContext } from 'react'
import { OrderContext } from '../context/OrderContext'

interface SummaryItem {
  name: string
  qty: number
  price: number
}

export default function OrderSummary() {
  const { order } = useContext(OrderContext)

 
  const items: SummaryItem[] = []

  if (order.dish) {
    items.push({
      name: order.dish.name,
      qty: 1,
      price: order.dish.price,
    })
  }

  if (order.drinks) {
    order.drinks.forEach((d) => {
      items.push({
        name: d.name,
        qty: d.qty ?? 1,
        price: d.price,
      })
    })
  }

 
  const total: number = items.reduce(
    (sum: number, d: SummaryItem) => sum + d.price * d.qty,
    0
  )

  return (
    <div style={{ padding: 16 }}>
      <h3>Your Order</h3>
      {items.map((d: SummaryItem, idx: number) => (
        <div key={idx} style={{ marginBottom: 8 }}>
          {d.name} × {d.qty} = ${ (d.price * d.qty).toFixed(2) }
        </div>
      ))}
      <hr />
      <div style={{ fontWeight: 'bold', marginTop: 8 }}>
        Total: ${total.toFixed(2)}
      </div>
    </div>
  )
}
