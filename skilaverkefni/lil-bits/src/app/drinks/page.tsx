'use client'

import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Input,
  Select,
  Option,
  CircularProgress,
} from '@mui/joy'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { OrderContext } from 'context/OrderContext'

interface RawDrink {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}
interface Drink extends RawDrink {
  price: number
  qty?: number
}

export default function DrinksPage() {
  const { order, setOrder } = useContext(OrderContext)
  const router = useRouter()

  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({})

  // 1) Load all categories
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then(res => res.json())
      .then(data => {
        const cats = data.drinks.map((c: { strCategory: string }) => c.strCategory)
        setCategories(['All', ...cats])
      })
      .catch(console.error)
  }, [])

  // 2) Fetch drinks whenever category changes
  useEffect(() => {
    setLoading(true)
    const url =
      activeCategory === 'All'
        ? 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
            activeCategory
          )}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const list: Drink[] = data.drinks.slice(0, 12).map((d: RawDrink) => ({
          ...d,
          price: parseFloat((Math.random() * 8 + 2).toFixed(2)),
        }))
        setDrinks(list)
        // ensure qtyMap has an entry for each
        setQtyMap(prev => {
          const next = { ...prev }
          list.forEach(d => {
            if (next[d.idDrink] == null) next[d.idDrink] = 0
          })
          return next
        })
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [activeCategory])

  // 3) Search/filter
  const filtered = useMemo(() => {
    if (!searchTerm) return drinks
    const t = searchTerm.toLowerCase()
    return drinks.filter(d => d.strDrink.toLowerCase().includes(t))
  }, [searchTerm, drinks])

  // Adjust quantity for a given drink
  const adjustQty = (id: string, delta: number) => {
    setQtyMap(prev => {
      const next = { ...prev }
      next[id] = Math.max(0, (next[id] || 0) + delta)
      return next
    })
  }

  // Confirm and navigate
  const handleConfirm = () => {
    const picked = drinks.filter(d => (qtyMap[d.idDrink] || 0) > 0)
    setOrder({
      ...order,
      drinks: picked.map(d => ({
        id: d.idDrink,
        name: d.strDrink,
        description: '',
        imageSource: d.strDrinkThumb,
        price: d.price,
        qty: qtyMap[d.idDrink]!,
        category: 'Drink',
        brewer: '',
      })),
    })
    router.push('/order')
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          flexWrap: 'wrap',
        }}
      >
        <Select
          value={activeCategory}
          onChange={(e, v) => setActiveCategory(v!)}
          sx={{ minWidth: 160 }}
        >
          {categories.map(cat => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>

        <Input
          placeholder="Search drinks..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ flex: 1, minWidth: 300 }}
        />

        <Button
          variant="solid"
          onClick={handleConfirm}
          disabled={!Object.values(qtyMap).some(n => n > 0)}
          sx={{
            backgroundColor: 'var(--color-secondary)',
            '&:hover': { backgroundColor: 'var(--color-accent)' },
          }}
        >
          Confirm Selection
        </Button>
      </Box>

      {/* Loading */}
      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filtered.map(d => {
            const q = qtyMap[d.idDrink] || 0
            return (
              <Grid key={d.idDrink} xs="auto">
                <Card
                  variant="outlined"
                  sx={{
                    width: 220,
                    p: 1,
                    position: 'relative',
                    bgcolor: q > 0 ? '#e8f5e9' : 'background.surface',
                    transition: 'transform .2s, box-shadow .2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 'md',
                    },
                  }}
                >
                  {/* Price badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      px: 1,
                      borderRadius: '4px',
                      fontSize: 12,
                    }}
                  >
                    ${d.price.toFixed(2)}
                  </Box>

                  {/* Image */}
                  <Box
                    component="img"
                    src={d.strDrinkThumb}
                    alt={d.strDrink}
                    sx={{
                      width: '100%',
                      height: 140,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />

                  {/* Name */}
                  <Box
                    sx={{
                      mt: 1,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {d.strDrink}
                  </Box>

                  {/* Qty controls */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <IconButton
                      size="sm"
                      onClick={() => adjustQty(d.idDrink, -1)}
                      disabled={q === 0}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ minWidth: 24, textAlign: 'center' }}>{q}</Box>
                    <IconButton size="sm" onClick={() => adjustQty(d.idDrink, +1)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}
    </Box>
)
}
