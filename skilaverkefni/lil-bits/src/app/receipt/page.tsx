'use client';

import React, { useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Card, Divider, Grid, Button, Typography } from '@mui/joy';
import { OrderContext } from '../../context/OrderContext';

export default function ReceiptPage() {
  const { order } = useContext(OrderContext);
  const router = useRouter();

  const { dishTotal, drinksTotal, grandTotal } = useMemo(() => {
    const dp = (order?.dish?.price ?? 0) * (order?.people ?? 1);
    const dt = (order?.drinks ?? []).reduce(
      (sum, d) => sum + (d.price ?? 0) * (d.qty ?? 0),
      0,
    );
    return { dishTotal: dp, drinksTotal: dt, grandTotal: dp + dt };
  }, [order]);

  useEffect(() => {
    if (!order?.email) {
      router.replace('/');
    }
  }, [order, router]);

  if (!order?.email) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        px: { xs: 1, md: 6 },
        py: { xs: 3, md: 8 },
        position: 'relative',
        zIndex: 1,
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Glowing Gold Title */}
      <Typography
        component="h1"
        className="glowGoldTitle"
        sx={{
          mb: 4,
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 700,
          fontSize: { xs: '2.1rem', md: '2.6rem' },
          textAlign: 'center',
        }}
      >
        Your Receipt
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Card
          variant="outlined"
          sx={{
            width: '100%',
            maxWidth: 700,
            p: 4,
            bgcolor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(10px)',
            boxShadow:
              '0 8px 32px rgba(50,60,40,0.08), 0 1.5px 8px rgba(50,96,83,0.08)',
            borderRadius: '2.2rem',
            border: '1.2px solid #c8b27333',
          }}
        >
          {/* Dish Section */}
          <Typography
            level="h4"
            sx={{
              mb: 2,
              fontFamily: '"Cormorant Garamond", serif',
              color: '#3e6053',
              fontWeight: 700,
              fontSize: '1.5rem',
            }}
          >
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
                    borderRadius: 2,
                    boxShadow: '0 3px 18px #c8b27322',
                  }}
                />
              </Grid>
              <Grid xs={12} sm={8}>
                <Typography
                  level="title-lg"
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 700,
                    fontSize: '1.35rem',
                  }}
                >
                  {order.dish.name}
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{
                    color: 'neutral.500',
                    mb: 1,
                    fontStyle: 'italic',
                  }}
                >
                  {order.dish.category}
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  ${(order.dish.price ?? 0).toFixed(2)} × {order.people} = $
                  {dishTotal.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography>No dish selected</Typography>
          )}

          <Divider sx={{ my: 4 }} />

          {/* Drinks Section */}
          <Typography
            level="h4"
            sx={{
              mb: 2,
              fontFamily: '"Cormorant Garamond", serif',
              color: '#3e6053',
              fontWeight: 700,
              fontSize: '1.5rem',
            }}
          >
            Drinks
          </Typography>
          {order.drinks && order.drinks.length > 0 ? (
            <Grid container spacing={2}>
              {order.drinks.map((d) => (
                <Grid key={d.id} xs={12} sm={6} md={4}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box
                      component="img"
                      src={d.imageSource}
                      alt={d.name}
                      sx={{
                        width: 70,
                        height: 70,
                        objectFit: 'cover',
                        borderRadius: 2,
                        boxShadow: '0 1.5px 10px #c8b27325',
                      }}
                    />
                    <Box>
                      <Typography
                        level="body-md"
                        sx={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontWeight: 700,
                        }}
                      >
                        {d.name}
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{ color: 'neutral.500', fontSize: '1em' }}
                      >
                        ${(d.price ?? 0).toFixed(2)} × {d.qty} = $
                        {(d.price * d.qty).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No drinks selected</Typography>
          )}

          <Divider sx={{ my: 4 }} />

          {/* Details */}
          <Grid container spacing={2} sx={{ mb: 1 }}>
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

          {/* Price Breakdown */}
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>Food Total</Typography>
              <Typography>${dishTotal.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
            >
              <Typography>Drinks Total</Typography>
              <Typography>${drinksTotal.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                level="title-lg"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                  fontSize: '1.28rem',
                  color: '#3e6053',
                }}
              >
                Grand Total
              </Typography>
              <Typography
                level="title-lg"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                  fontSize: '1.28rem',
                  color: '#3e6053',
                }}
              >
                ${grandTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Edit Order */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="solid"
          onClick={() => router.push('/dish')}
          sx={{
            background: 'linear-gradient(90deg, #3E6053 70%, #c8b273 120%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.12rem',
            borderRadius: '0.9em',
            px: 4,
            py: 1.2,
            letterSpacing: 0.5,
            boxShadow: '0 2px 18px #c8b27329',
            '&:hover': {
              background: 'linear-gradient(90deg, #BA2329 80%, #c8b273 120%)',
            },
          }}
        >
          Edit Order
        </Button>
      </Box>
    </Box>
  );
}
