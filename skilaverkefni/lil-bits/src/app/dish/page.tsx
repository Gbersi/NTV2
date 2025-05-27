// src/app/dish/page.tsx
'use client'

import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
} from '@mui/joy'
import { OrderContext } from 'context/OrderContext'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

export default function DishPage() {
  const router = useRouter()
  const { order, setOrder } = useContext(OrderContext)

  const [meal, setMeal] = useState<Meal | null>(null)
  const [price, setPrice] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

 
  const loadMeal = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      const data = await res.json()
      const m = data.meals[0] as Meal
      setMeal(m)
      setPrice(parseFloat((Math.random() * 8 + 2).toFixed(2))) 
    } catch (err) {
      console.error(err)
      setError('Failed to fetch a meal. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMeal()
  }, [])

  const handleNext = () => {
    if (!meal) return
    setOrder({
      ...order,
      dish: {
        id: meal.idMeal,
        name: meal.strMeal,
        imageSource: meal.strMealThumb,
        price,
        category: '',
        cuisine: '',
        description: '',
      },
    })
    router.push('/drinks')
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !meal) {
    return (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography level="h4" color="danger">
          {error ?? 'No meal found.'}
        </Typography>
        <Button sx={{ mt: 2 }} onClick={loadMeal}>
          Try Again
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Card
        variant="outlined"
        sx={{
          maxWidth: 600,
          width: '100%',
          p: 3,
          textAlign: 'center',
          position: 'relative',
        }}
      >
      
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'rgba(0,0,0,0.7)',
            color: '#fff',
            px: 1.5,
            py: 0.5,
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          ${price.toFixed(2)}
        </Box>

        <Typography level="h2" sx={{ mb: 2 }}>
          Your Random Dish
        </Typography>

        <Box
          component="img"
          src={meal.strMealThumb}
          alt={meal.strMeal}
          sx={{
            width: '100%',
            height: 200,
            objectFit: 'cover',
            borderRadius: 2,
            mb: 2,
          }}
        />

        <Typography level="h4" sx={{ mb: 3 }}>
          {meal.strMeal}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={loadMeal}
            sx={{ flex: 1 }}
          >
            Generate New Dish
          </Button>
          <Button
            variant="solid"
            onClick={handleNext}
            sx={{
              flex: 1,
              backgroundColor: 'var(--color-secondary)',
              '&:hover': { backgroundColor: 'var(--color-accent)' },
            }}
          >
            Next: Choose Drinks
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
