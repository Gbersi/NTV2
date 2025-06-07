// src/context/OrderContext.tsx

'use client';

import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { Order } from '../types';

interface OrderContextType {
  order: Partial<Order>;
  setOrder: Dispatch<SetStateAction<Partial<Order>>>;
  reset: () => void;
}

export const OrderContext = createContext<OrderContextType>({
  order: {},
  setOrder: () => {},
  reset: () => {},
});

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<Partial<Order>>({});
  const reset = () => setOrder({});
  return (
    <OrderContext.Provider value={{ order, setOrder, reset }}>
      {children}
    </OrderContext.Provider>
  );
}
OrderProvider.displayName = 'OrderProvider';
OrderContext.displayName = 'OrderContext';
