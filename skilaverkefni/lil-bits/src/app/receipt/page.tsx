// src/app/receipt/page.tsx
'use client';

import React, { useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Card, Divider, Grid, Button } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import { OrderContext } from '../../context/OrderContext';

export default function ReceiptPage() {
  const { order } = useContext(OrderContext);
  const router = useRouter();

  // Redirect home if they haven’t completed reservation
  useEffect(() => {
    if (!order?.email) {
      router.replace('/');
    }
  }, [order, router]);

  if (!order?.email) return null;

  // Calculate prices
  const { dishPrice, drinksTotal, total } = useMemo(() => {
    const dp = (order.dish?.price ?? 0) * (order.people ?? 1);
    const dt = (order.drinks ?? []).reduce(
      (sum, d) => sum + (d.price ?? 0) * (d.qty ?? 0),
      0
    );
    return {
      dishPrice: dp,
      drinksTotal: dt,
      total: dp + dt,
    };
  }, [order]);

  return (
    <Box
      component="section"
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 8 },
        position: 'relative',
        zIndex: 1,            // sit above the Background
      }}
    >
      {/* Page title on the raw background */}
      <Typography
        component="h1"
        level="h2"
        sx={{
          textAlign: 'center',
          color: 'var(--color-primary)',
          mb: 4,
          fontFamily: '"Libre Baskerville", serif',
          letterSpacing: 1.2,
        }}
      >
        Your Receipt
      </Typography>

      {/* Center the frosted card */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          variant="outlined"
          sx={{
            width: '100%',
            maxWidth: 800,
            p: 4,
            bgcolor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            borderRadius: 2,
          }}
        >
          {/* Dish Section */}
          <Typography level="h4" sx={{ mb: 2 }}>
            Dish
          </Typography>
          {order.dish ? (
            <Grid container spacing={2} alignItems="center">
              <Grid xs={12} sm={4}>
                <Box
                  component="img"
                  src={order.dish.imageSource}
                  alt={order.dish.name}
                  sx={{ width: '100%', borderRadius: 1 }}
                />
              </Grid>
              <Grid xs={12} sm={8}>
                <Typography level="title-lg" sx={{ fontWeight: 'bold' }}>
                  {order.dish.name}
                </Typography>
                <Typography level="body-sm" sx={{ color: 'neutral.500', mb: 1 }}>
                  {order.dish.category}
                </Typography>
                <Typography>
                  ${(order.dish.price ?? 0).toFixed(2)} × {order.people} = $
                  {dishPrice.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography>No dish selected</Typography>
          )}

          <Divider sx={{ my: 4 }} />

          {/* Drinks Section */}
          <Typography level="h4" sx={{ mb: 2 }}>
            Drinks
          </Typography>
          {order.drinks && order.drinks.length > 0 ? (
            <Grid container spacing={2}>
              {order.drinks.map((d) => {
                const qty = d.qty ?? 0;
                const price = d.price ?? 0;
                return (
                  <Grid key={d.id} xs={12} sm={6} md={4}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box
                        component="img"
                        src={d.imageSource}
                        alt={d.name}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: 1,
                        }}
                      />
                      <Box>
                        <Typography level="body-md">{d.name}</Typography>
                        <Typography level="body-sm" sx={{ color: 'neutral.500' }}>
                          ${price.toFixed(2)} × {qty} = $
                          {(price * qty).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography>No drinks selected</Typography>
          )}

          <Divider sx={{ my: 4 }} />

          {/* Details & Total */}
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography level="body-sm" sx={{ color: 'neutral.500' }}>
                People
              </Typography>
              <Typography>{order.people}</Typography>
            </Grid>
            <Grid xs={6}>
              <Typography level="body-sm" sx={{ color: 'neutral.500' }}>
                Email
              </Typography>
              <Typography>{order.email}</Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 4,
            }}
          >
            <Typography level="title-lg" sx={{ fontWeight: 'bold' }}>
              Total
            </Typography>
            <Typography level="title-lg" sx={{ fontWeight: 'bold' }}>
              ${total.toFixed(2)}
            </Typography>
          </Box>
        </Card>
      </Box>

      {/* Edit Order */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="solid"
          onClick={() => router.push('/dish')}
          sx={{
            backgroundColor: 'var(--color-primary)',
            '&:hover': { backgroundColor: 'var(--color-accent)' },
            px: 4,
            py: 1.5,
          }}
        >
          Edit Order
        </Button>
      </Box>
    </Box>
  );
}
