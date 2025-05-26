// src/app/order/page.tsx
'use client'

import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Typography, Button } from '@mui/joy'
import { OrderContext } from '../../context/OrderContext'

export default function OrderPage() {
  const { order, setOrder } = useContext(OrderContext)
  const [date, setDate] = useState(order.date || '')
  const [time, setTime] = useState(order.time || '16:00')
  const [people, setPeople] = useState(order.people || 1)
  const [email, setEmail] = useState(order.email || '')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!order.dish || !order.drinks) {
      router.push('/')
    }
  }, [order, router])

  const today = new Date().toISOString().split('T')[0]
  const isWeekday = (d: Date) => {
    const w = d.getDay()
    return w >= 1 && w <= 5
  }

  const handleSubmit = () => {
    setError(null)

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email.')
      return
    }
    if (!date) {
      setError('Select a date.')
      return
    }
    const chosen = new Date(date)
    chosen.setHours(0, 0, 0, 0)
    const todayZero = new Date()
    todayZero.setHours(0, 0, 0, 0)
    if (chosen < todayZero) {
      setError('Date must be today or later.')
      return
    }
    if (!isWeekday(chosen)) {
      setError('Date must be Mon–Fri.')
      return
    }
    if (!time) {
      setError('Select a time.')
      return
    }
    const [h] = time.split(':').map(Number)
    if (h < 16 || h > 23) {
      setError('Time between 16:00 and 23:00.')
      return
    }
    if (people < 1 || people > 10) {
      setError('People must be 1–10.')
      return
    }

    setOrder({
      ...order,
      date,
      time,
      people,
      email,
    })
    router.push('/receipt')
  }

  return (
    <Box
      component="section"
      sx={{
        backgroundImage: `url('/lilbits-order-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          p: 4,
          borderRadius: 2,
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography
          component="h2"
          sx={{ mb: 2, color: 'var(--color-primary)' }}
        >
          Finalize Your Order
        </Typography>
        {error && (
          <Typography sx={{ color: 'red', mb: 2 }}>{error}</Typography>
        )}
        <Box
          component="form"
          sx={{
            display: 'grid',
            gap: 2,
          }}
        >
          <label>
            Date{' '}
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Time{' '}
            <input
              type="time"
              value={time}
              min="16:00"
              max="23:00"
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <label>
            People{' '}
            <input
              type="number"
              value={people}
              min={1}
              max={10}
              onChange={(e) => setPeople(Number(e.target.value))}
            />
          </label>
          <label>
            Email{' '}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <Button variant="solid" onClick={handleSubmit}>
            Complete Order
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
