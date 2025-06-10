import React, { useContext } from 'react';
import { Box } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import { OrderContext } from '../context/OrderContext';

interface SummaryItem {
  name: string;
  qty: number;
  price: number;
}

export default function OrderSummary() {
  const { order } = useContext(OrderContext);

  const items: SummaryItem[] = [];

  if (order.dish) {
    items.push({
      name: order.dish.name,
      qty: 1,
      price: order.dish.price,
    });
  }

  if (order.drinks) {
    order.drinks.forEach((d) => {
      items.push({
        name: d.name,
        qty: d.qty ?? 1,
        price: d.price,
      });
    });
  }

  const total: number = items.reduce(
    (sum: number, d: SummaryItem) => sum + d.price * d.qty,
    0,
  );

  return (
    <Box sx={{ padding: 16, borderLeft: '1px solid var(--color-border)' }}>
      <Typography sx={{ fontSize: '1.25rem', mb: 1 }}>Your Order</Typography>
      {items.map((d: SummaryItem, idx: number) => (
        <Box key={idx} sx={{ marginBottom: 1 }}>
          <Typography sx={{ fontSize: '1rem' }}>
            {d.name} × {d.qty} = ${(d.price * d.qty).toFixed(2)}
          </Typography>
        </Box>
      ))}
      <Divider sx={{ my: 1 }} />
      <Typography sx={{ fontWeight: 'bold', mt: 1 }}>
        Total: ${total.toFixed(2)}
      </Typography>
    </Box>
  );
}
