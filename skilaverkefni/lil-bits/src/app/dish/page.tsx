'use client'
import React, { useEffect, useState, useContext } from 'react'
import { Box, Card, Typography, Button, CircularProgress } from '@mui/joy'
import { useRouter } from 'next/navigation'
import { OrderContext } from 'context/OrderContext'

interface ApiMeal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
}

export default function DishPage() {
  const [meal, setMeal] = useState<ApiMeal | null>(null)
  const [loading, setLoading] = useState(true)
  const { order, setOrder } = useContext(OrderContext)
  const router = useRouter()

  useEffect(() => {
    async function fetchDish() {
      try {
        const r = await fetch(
          'https://www.themealdb.com/api/json/v1/1/random.php'
        )
        const data = await r.json()
        setMeal(data.meals[0])
      } catch {
      } finally {
        setLoading(false)
      }
    }
    fetchDish()
  }, [])

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    )
  if (!meal)
    return <Typography>Failed to load. Please try again.</Typography>

  // Map to your type + random price/calories
  const price = parseFloat((Math.random() * 20 + 5).toFixed(2))
  const calories = Math.floor(Math.random() * 800 + 200)

  const handleSelect = () => {
    setOrder({
      ...order,
      dish: {
        id: meal.idMeal,
        name: meal.strMeal,
        description: '', // omit instructions
        imageSource: meal.strMealThumb,
        price,
        category: meal.strInstructions.slice(0, 20), // or map properly
        cuisine: 'Unknown',
        calories,
      },
    })
    router.push('/drinks')
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Card variant="outlined" sx={{ p: 3 }}>
        <Typography level="h2" sx={{ color: 'var(--color-primary)', mb: 2 }}>
          Your Random Dish
        </Typography>
        <Box
          component="img"
          src={meal.strMealThumb}
          alt={meal.strMeal}
          sx={{ width: '100%', borderRadius: 1, mb: 2 }}
        />
        <Typography level="h3" sx={{ mb: 1 }}>
          {meal.strMeal}
        </Typography>
        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
          ${price.toFixed(2)} &bull; {calories} kcal
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="soft"
            onClick={() => window.location.reload()}
            sx={{ flex: 1 }}
          >
            Pick Another
          </Button>
          <Button
            variant="solid"
            onClick={handleSelect}
            sx={{
              flex: 1,
              backgroundColor: 'var(--color-secondary)',
              '&:hover': { backgroundColor: 'var(--color-accent)' },
            }}
          >
            Looks Good → Drinks
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
