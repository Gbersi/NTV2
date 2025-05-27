// src/index.ts

import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Order } from './types';

const app = express();

// Enable CORS for your Next.js frontend
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

// Parse JSON bodies
app.use(bodyParser.json());

// In-memory store
let orders: Order[] = [];
let nextId = 1;

// POST /create-order
app.post('/create-order', (req: Request, res: Response): void => {
  const order = req.body as Order;
  order.id = nextId++;
  orders.push(order);
  res.json({ success: true, order });
});

// PUT /update-order
app.put('/update-order', (req: Request, res: Response): void => {
  const updated = req.body as Order;
  const idx = orders.findIndex(o => o.email === updated.email);
  if (idx === -1) {
    res.status(404).json({ success: false });
    return;
  }
  updated.id = orders[idx].id;
  orders[idx] = updated;
  res.json({ success: true, order: updated });
});


app.get('/order/:email', (req: Request, res: Response): void => {
  const email = req.params.email;
  const order = orders.find(o => o.email === email);
  if (!order) {
    res.status(404).json({ success: false });
    return;
  }
  res.json({ success: true, order });
});

// Start server
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(port, () => {
  console.log(`🛎️  Orders API listening at http://localhost:${port}`);
});
