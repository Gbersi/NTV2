'use client'

import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Card, Divider, Grid, Typography, Button } from '@mui/joy'
import { OrderContext } from 'context/OrderContext'

export default function ReceiptPage() {
  const { order } = useContext(OrderContext)
  const router = useRouter()


  useEffect(() => {
    if (!order?.email) router.replace('/')
  }, [order, router])

  if (!order?.email) return null

  const dishPrice = order.dish?.price ?? 0
  const drinksTotal = (order.drinks ?? []).reduce(
    (sum, d) => sum + d.price * (d.qty ?? 0),
    0
  )
  const total = dishPrice + drinksTotal

  return (
    <Box sx={{ p: 4 }}>
      {/* Title */}
      <Typography
        level="h2"
        mb={3}
        sx={{ color: 'var(--color-primary)' }}
      >
        Your Receipt
      </Typography>

      <Card
        variant="outlined"
        sx={{
          p: 3,
          mb: 4,
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(6px)',
        }}
      >
        {/* Dish Section */}
        <Typography level="h4" mb={1}>
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
              {/* Dish name */}
              <Typography sx={{ fontWeight: 'bold' }}>
                {order.dish.name}
              </Typography>
              {/* Category as secondary */}
              <Typography
                sx={{ color: 'neutral.500', fontSize: 'smaller', mt: 0.5 }}
              >
                {order.dish.category}
              </Typography>
              {/* Price */}
              <Typography sx={{ mt: 1 }}>
                ${dishPrice.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography>No dish selected</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Drinks Section */}
        <Typography level="h4" mb={1}>
          Drinks
        </Typography>
        {order.drinks && order.drinks.length > 0 ? (
          <Grid container spacing={2}>
            {order.drinks.map((d) => (
              <Grid key={d.id} xs={12} sm={6} md={4}>
                <Card variant="soft" sx={{ p: 1 }}>
                  <Box
                    component="img"
                    src={d.imageSource}
                    alt={d.name}
                    sx={{ width: '100%', borderRadius: 1 }}
                  />
                  {/* Drink name & qty */}
                  <Typography sx={{ mt: 1 }}>
                    {d.name} × {d.qty}
                  </Typography>
                  {/* Unit price secondary */}
                  <Typography
                    sx={{ color: 'neutral.500', fontSize: 'smaller' }}
                  >
                    ${d.price.toFixed(2)} each
                  </Typography>
                  {/* Subtotal */}
                  <Typography sx={{ mt: 0.5 }}>
                    Subtotal: ${(d.price * d.qty!).toFixed(2)}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No drinks selected</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Details Section */}
        <Typography level="h4" mb={1}>
          Details
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={2}>
          <Grid xs={6}>
            <Typography sx={{ color: 'neutral.500' }}>People</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography>{order.people}</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography sx={{ color: 'neutral.500' }}>Email</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography>{order.email}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Total */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
          }}
        >
          <Typography level="h4">Total</Typography>
          <Typography level="h4">${total.toFixed(2)}</Typography>
        </Box>
      </Card>

      {/* Edit button */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="solid"
          sx={{
            backgroundColor: 'var(--color-primary)',
            '&:hover': { backgroundColor: 'var(--color-accent)' },
          }}
          onClick={() => router.push('/dish')}
        >
          Edit Order
        </Button>
      </Box>
    </Box>
  )
}
