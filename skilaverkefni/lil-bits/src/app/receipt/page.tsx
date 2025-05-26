// src/app/receipt/page.tsx
'use client'

import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Card, Typography, Divider, Button, Grid } from '@mui/joy'
import { OrderContext } from '../../context/OrderContext'

export default function ReceiptPage() {
  const { order } = useContext(OrderContext)
  const router = useRouter()

  useEffect(() => {
    if (!order || !order.email) {
      router.replace('/')
    }
  }, [order, router])

  if (!order || !order.dish) return null

  const dishTotal = order.dish.price * (order.people || 1)
  const drinksTotal =
    order.drinks?.reduce(
      (sum, d) => sum + d.price * (d.qty || 1),
      0
    ) || 0
  const total = dishTotal + drinksTotal

  return (
    <Box
      component="section"
      sx={{
        backgroundImage: `url('/lilbits-receipt.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        p: 4,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 3,
          backgroundColor: 'rgba(255,255,255,0.8)',
        }}
      >
        <Typography
          component="h2"
          sx={{ mb: 3, color: 'var(--color-primary)' }}
        >
          Your Receipt
        </Typography>

        {/* Dish */}
        <Typography component="h3" sx={{ mb: 1 }}>
          Dish
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid xs={4}>
            <Box
              component="img"
              src={order.dish.imageSource}
              alt={order.dish.name}
              sx={{ width: '100%', borderRadius: 1 }}
            />
          </Grid>
          <Grid xs={8}>
            <Typography>{order.dish.name}</Typography>
            <Typography>
              Price: ${order.dish.price.toFixed(2)}
            </Typography>
            <Typography>Qty: {order.people}</Typography>
            <Typography>
              Subtotal: ${dishTotal.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Divider />

        {/* Drinks */}
        <Typography component="h3" sx={{ my: 2 }}>
          Drinks
        </Typography>
        {order.drinks && order.drinks.length > 0 ? (
          order.drinks.map((d, i) => (
            <Grid
              container
              spacing={2}
              key={i}
              sx={{ mb: 1 }}
            >
              <Grid xs={3}>
                <Box
                  component="img"
                  src={d.imageSource}
                  alt={d.name}
                  sx={{ width: '100%', borderRadius: 1 }}
                />
              </Grid>
              <Grid xs={9}>
                <Typography>{d.name}</Typography>
                <Typography>
                  Price: ${d.price.toFixed(2)}
                </Typography>
                <Typography>Qty: {d.qty}</Typography>
                <Typography>
                  Subtotal: ${(d.price * d.qty!).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography>No drinks selected</Typography>
        )}
        <Divider sx={{ my: 2 }} />

        {/* People & Email */}
        <Typography>People: {order.people}</Typography>
        <Typography>Email: {order.email}</Typography>
        <Divider sx={{ my: 2 }} />

        {/* Total */}
        <Typography
          component="h3"
          sx={{ mt: 2, fontWeight: 'bold' }}
        >
          Total: ${total.toFixed(2)}
        </Typography>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="solid"
            onClick={() => router.push('/')}
            sx={{ mr: 2 }}
          >
            Home
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push('/dish')}
          >
            Edit
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
