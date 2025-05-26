'use client'
import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Input,
  Select,
  Option,
  CircularProgress,
} from '@mui/joy'
import { useRouter } from 'next/navigation'
import { OrderContext } from 'context/OrderContext'

interface ApiDrink {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}

interface Drink extends ApiDrink {
  qty: number
  price: number
}

export default function DrinksPage() {
  const { order, setOrder } = useContext(OrderContext)
  const router = useRouter()

  const [cats, setCats] = useState<string[]>([])
  const [cat, setCat] = useState('All')
  const [term, setTerm] = useState('')
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!order.dish) return router.push('/dish')
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((r) => r.json())
      .then((d) => {
        const arr = d.drinks.map((x: any) => x.strCategory)
        setCats(['All', ...arr])
      })
      .catch(() => setCats(['All']))
  }, [order.dish, router])

  useEffect(() => {
    if (!cats.length) return
    loadByCat('All')
  }, [cats])

  useEffect(() => {
    if (term.trim()) loadBySearch(term.trim())
    else loadByCat(cat)
  }, [term])

  async function loadByCat(c: string) {
    setLoading(true)
    const url =
      c === 'All'
        ? 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
            c
          )}`
    try {
      const r = await fetch(url)
      const d = await r.json()
      const arr: ApiDrink[] = d.drinks || []
      setDrinks(
        arr.slice(0, 12).map((x) => ({
          ...x,
          qty: 0,
          price: parseFloat((Math.random() * 10 + 3).toFixed(2)),
        }))
      )
    } finally {
      setLoading(false)
    }
  }

  async function loadBySearch(t: string) {
    setLoading(true)
    const [byName, byIng] = await Promise.all([
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          t
        )}`
      ).then((r) => r.json()),
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
          t
        )}`
      ).then((r) => r.json()),
    ]).catch(() => [{ drinks: [] }, { drinks: [] }])
    const merged = new Map<string, ApiDrink>()
    ;[...(byName.drinks || []), ...(byIng.drinks || [])].forEach((x: any) =>
      merged.set(x.idDrink, x)
    )
    const arr = Array.from(merged.values())
    setDrinks(
      arr.map((x) => ({
        ...x,
        qty: 0,
        price: parseFloat((Math.random() * 10 + 3).toFixed(2)),
      }))
    )
    setLoading(false)
  }

  const inc = (id: string) =>
    setDrinks((d) =>
      d.map((x) => (x.idDrink === id ? { ...x, qty: x.qty + 1 } : x))
    )
  const dec = (id: string) =>
    setDrinks((d) =>
      d.map((x) => (x.idDrink === id ? { ...x, qty: Math.max(0, x.qty - 1) } : x))
    )

  const confirm = () => {
    const sel = drinks
      .filter((d) => d.qty > 0)
      .map((d) => ({
        id: d.idDrink,
        name: d.strDrink,
        description: '',
        imageSource: d.strDrinkThumb,
        price: d.price,
        category: cat === 'All' ? 'Drink' : cat,
        brewer: '',
        qty: d.qty,
      }))
    setOrder({ ...order, drinks: sel })
    router.push('/order')
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        component="h2"
        sx={{ fontSize: '2rem', mb: 2, color: 'var(--color-primary)' }}
      >
        Choose Your Drinks
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Input
          placeholder="Search by name or ingredient"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          sx={{ flex: 1, minWidth: 240 }}
        />
        <Select
          value={cat}
          onChange={(_, v) => v && setCat(v)}
          sx={{ minWidth: 200 }}
        >
          {cats.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {drinks.map((d) => (
            <Grid key={d.idDrink} xs={6} sm={4} md={3}>
              <Card
                variant="outlined"
                sx={{
                  p: 1,
                  bgcolor: d.qty > 0 ? 'rgba(144,238,144,0.3)' : 'background.body',
                  width: 260,
                  mx: 'auto',
                }}
              >
                <Box
                  component="img"
                  src={d.strDrinkThumb}
                  alt={d.strDrink}
                  sx={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 1 }}
                />
                <Typography sx={{ fontSize: '1.1rem', mt: 1 }}>
                  {d.strDrink}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                  ${d.price.toFixed(2)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Button size="sm" onClick={() => dec(d.idDrink)} disabled={d.qty === 0}>
                    –
                  </Button>
                  <Typography>{d.qty}</Typography>
                  <Button size="sm" onClick={() => inc(d.idDrink)}>
                    +
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="solid"
          color="neutral"
          onClick={confirm}
          disabled={drinks.every((d) => d.qty === 0)}
        >
          Confirm Selection
        </Button>
      </Box>
    </Box>
  )
}
