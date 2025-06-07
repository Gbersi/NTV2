// src/app/receipt/page.tsx
'use client';

import React, { useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { OrderContext } from '../../context/OrderContext';

export default function ReceiptPage() {
  const { order } = useContext(OrderContext);
  const router = useRouter();

  // Redirect to home if email (and thus full order) is missing
  useEffect(() => {
    if (!order?.email) {
      router.replace('/');
    }
  }, [order, router]);

  // While redirecting, render nothing
  if (!order?.email) {
    return null;
  }

  // Compute subtotals and total
  const { dishSubtotal, drinksTotal, grandTotal } = useMemo(() => {
    const peopleCount = order.people ?? 1;
    const dishPrice = order.dish?.price ?? 0;
    const dishSubtotal = dishPrice * peopleCount;

    const drinksTotal = (order.drinks ?? []).reduce((sum, d) => {
      const qty = d.qty ?? 0;
      const unit = d.price ?? 0;
      return sum + unit * qty;
    }, 0);

    return {
      dishSubtotal,
      drinksTotal,
      grandTotal: dishSubtotal + drinksTotal,
    };
  }, [order]);

  return (
    <Box sx={{ p: 4, minHeight: '100vh', backgroundColor: 'rgba(255,255,255,0.8)' }}>
      {/* Page Title */}
      <Typography
        sx={{
          mb: 3,
          fontSize: '1.75rem',
          fontFamily: '“Playfair Display”, serif',
          letterSpacing: '0.5px',
          color: 'var(--color-primary)',
          textAlign: 'center',
        }}
      >
        Your Receipt
      </Typography>

      <Card
        variant="outlined"
        sx={{
          maxWidth: 800,
          mx: 'auto',
          p: 4,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          backgroundColor: 'var(--bg-light)',
        }}
      >
        {/* Dish Section */}
        <Typography sx={{ mb: 1, fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
          Dish
        </Typography>
        {order.dish ? (
          <Grid container spacing={2} alignItems="center">
            <Grid xs={12} sm={4}>
              <Box
                component="img"
                src={order.dish.imageSource}
                alt={order.dish.name}
                sx={{
                  width: '100%',
                  borderRadius: 1,
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                }}
              />
            </Grid>
            <Grid xs={12} sm={8}>
              <Typography sx={{ fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                {order.dish.name}
              </Typography>
              <Typography
                sx={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  mt: 0.5,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {order.dish.category}
              </Typography>
              <Typography sx={{ mt: 1, fontFamily: 'var(--font-body)' }}>
                ${order.dish.price.toFixed(2)} × {order.people} = ${dishSubtotal.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography>No dish selected</Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Drinks Section */}
        <Typography sx={{ mb: 1, fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
          Drinks
        </Typography>
        {order.drinks && order.drinks.length > 0 ? (
          <Grid container spacing={2}>
            {order.drinks.map((d) => {
              const qty = d.qty ?? 0;
              const unit = d.price ?? 0;
              const lineSubtotal = qty * unit;
              return (
                <Grid key={d.id} xs={12} sm={6} md={4}>
                  <Card variant="soft" sx={{ p: 1 }}>
                    <Box
                      component="img"
                      src={d.imageSource}
                      alt={d.name}
                      sx={{
                        width: '100%',
                        borderRadius: 1,
                        aspectRatio: '16/9',
                        objectFit: 'cover',
                      }}
                    />
                    <Typography
                      sx={{
                        mt: 1,
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'bold',
                      }}
                    >
                      {d.name} × {qty}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      ${unit.toFixed(2)} each
                    </Typography>
                    <Typography sx={{ mt: 0.5, fontFamily: 'var(--font-body)' }}>
                      Subtotal: ${lineSubtotal.toFixed(2)}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography>No drinks selected</Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Details Section */}
        <Typography sx={{ mb: 1, fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
          Details
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={2}>
          <Grid xs={6}>
            <Typography sx={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              People
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography sx={{ fontFamily: 'var(--font-body)' }}>{order.people}</Typography>
          </Grid>

          <Grid xs={6}>
            <Typography sx={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              Email
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography sx={{ fontFamily: 'var(--font-body)' }}>{order.email}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Total Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            fontFamily: 'var(--font-body)',
          }}
        >
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total</Typography>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            ${grandTotal.toFixed(2)}
          </Typography>
        </Box>
      </Card>

      {/* Edit Order Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="solid"
          sx={{
            backgroundColor: 'var(--color-primary)',
            '&:hover': { backgroundColor: 'var(--color-accent)' },
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            px: 4,
            py: 1.25,
            borderRadius: 1,
          }}
          onClick={() => router.push('/dish')}
        >
          Edit Order
        </Button>
      </Box>
    </Box>
  );
}
