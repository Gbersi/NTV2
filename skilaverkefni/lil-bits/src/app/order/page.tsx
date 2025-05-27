'use client'

import React, { useContext, useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Grid,
  Typography,
  FormControl,
  FormLabel,
} from '@mui/joy'
import { OrderContext } from 'context/OrderContext'

export default function OrderPage() {
  const { order, setOrder } = useContext(OrderContext)
  const router = useRouter()

  // Local form state
  const [email, setEmail] = useState(order.email ?? '')
  const [date, setDate] = useState(order.date ?? '')
  const [time, setTime] = useState(order.time ?? '16:00')
  const [people, setPeople] = useState<number>(order.people ?? 1)
  const [error, setError] = useState<string | null>(null)

  // If no dish was picked, bounce back to home
  useEffect(() => {
    if (!order.dish) {
      router.replace('/')
    }
  }, [order.dish, router])

  const handleSubmit = () => {
    setError(null)

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!date) {
      setError('Please select a date.')
      return
    }
    const picked = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (picked < today) {
      setError('Date cannot be in the past.')
      return
    }
    if (!time) {
      setError('Please select a time.')
      return
    }
    if (people < 1 || people > 10) {
      setError('Number of people must be between 1 and 10.')
      return
    }

    // Save into context and go to receipt
    setOrder({ ...order, email, date, time, people })
    router.push('/receipt')
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', my: 4, px: 2 }}>
      <Typography level="h2" sx={{ mb: 2, textAlign: 'center' }}>
        Finalize Reservation
      </Typography>

      {error && (
        <Typography color="danger" sx={{ mb: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={2}>
        {/* Email */}
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Box
              component="input"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              sx={{
                width: '100%',
                p: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            />
          </FormControl>
        </Grid>

        {/* Date */}
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Box
              component="input"
              type="date"
              value={date}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDate(e.target.value)
              }
              sx={{
                width: '100%',
                p: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            />
          </FormControl>
        </Grid>

        {/* Time */}
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Time</FormLabel>
            <Box
              component="input"
              type="time"
              value={time}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTime(e.target.value)
              }
              sx={{
                width: '100%',
                p: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            />
          </FormControl>
        </Grid>

        {/* People */}
        <Grid xs={12}>
          <FormControl>
            <FormLabel>People</FormLabel>
            <Box
              component="input"
              type="number"
              value={people}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPeople(+e.target.value)
              }
              sx={{
                width: '100%',
                p: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
              min={1}
              max={10}
            />
          </FormControl>
        </Grid>

        {/* Submit */}
        <Grid xs={12}>
          <Button
            variant="solid"
            fullWidth
            onClick={handleSubmit}
            sx={{
              backgroundColor: 'var(--color-secondary)',
              '&:hover': { backgroundColor: 'var(--color-accent)' },
            }}
          >
            Confirm Reservation
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
