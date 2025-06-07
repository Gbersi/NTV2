// src/app/order/page.tsx
'use client';

import React, { useContext, useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { OrderContext } from '../../context/OrderContext';

export default function OrderPage() {
  const { order, setOrder } = useContext(OrderContext);
  const [email, setEmail] = useState(order.email ?? '');
  const [date, setDate] = useState(order.date ?? '');
  const [time, setTime] = useState(order.time ?? '16:00');
  const [people, setPeople] = useState<number>(order.people ?? 1);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Redirect home if no dish selected
  useEffect(() => {
    if (!order.dish) {
      router.replace('/');
    }
  }, [order.dish, router]);

  const handleSubmit = () => {
    setError(null);

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Validate date
    if (!date) {
      setError('Please select a date.');
      return;
    }
    const picked = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (picked < today) {
      setError('Date cannot be in the past.');
      return;
    }
    // Validate time
    if (!time) {
      setError('Please select a time.');
      return;
    }
    // Validate people
    if (people < 1 || people > 10) {
      setError('Number of people must be between 1 and 10.');
      return;
    }

    setOrder({ ...order, email, date, time, people });
    router.push('/receipt');
  };

  const inputStyles = {
    width: '100%',
    p: 1,
    border: '1px solid var(--border-light)',
    borderRadius: 1,
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    '&:focus-visible': {
      borderColor: 'var(--color-primary)',
      boxShadow: '0 0 0 2px rgba(62,96,83,0.2)',
      outline: 'none',
    },
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundColor: 'rgba(255,255,255,0.8)',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: { xs: '100%', sm: 480 },
          mx: 'auto',
          p: 4,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          backgroundColor: 'var(--bg-light)',
        }}
      >
        <Typography
          sx={{
            mb: 3,
            textAlign: 'center',
            fontSize: '1.5rem',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '0.5px',
            color: 'var(--color-primary)',
          }}
        >
          Finalize Reservation
        </Typography>

        {error && (
          <Typography
            color="danger"
            sx={{ mb: 2, textAlign: 'center', fontSize: '0.95rem' }}
          >
            {error}
          </Typography>
        )}

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Email */}
          <FormControl>
            <FormLabel sx={{ fontFamily: 'var(--font-body)' }}>Email</FormLabel>
            <Box
              component="input"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="you@example.com"
              sx={inputStyles}
            />
          </FormControl>

          {/* Date */}
          <FormControl>
            <FormLabel sx={{ fontFamily: 'var(--font-body)' }}>Date</FormLabel>
            <Box
              component="input"
              type="date"
              value={date}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
              sx={inputStyles}
            />
          </FormControl>

          {/* Time */}
          <FormControl>
            <FormLabel sx={{ fontFamily: 'var(--font-body)' }}>Time</FormLabel>
            <Box
              component="input"
              type="time"
              value={time}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
              sx={inputStyles}
            />
          </FormControl>

          {/* People */}
          <FormControl>
            <FormLabel sx={{ fontFamily: 'var(--font-body)' }}>People</FormLabel>
            <Box
              component="input"
              type="number"
              value={people}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPeople(Math.max(1, Math.min(10, +e.target.value)))
              }
              placeholder="1"
              min={1}
              max={10}
              sx={inputStyles}
            />
          </FormControl>

          {/* Submit */}
          <Button
            variant="solid"
            onClick={handleSubmit}
            sx={{
              backgroundColor: 'var(--color-secondary)',
              '&:hover': { backgroundColor: 'var(--color-accent)' },
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              py: 1.5,
              borderRadius: 1,
              mt: 2,
            }}
          >
            Confirm Reservation
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
