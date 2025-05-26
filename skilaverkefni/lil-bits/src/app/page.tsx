// src/app/page.tsx
'use client'

import React, { useContext, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CssVarsProvider } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Grid from '@mui/joy/Grid'
import Card from '@mui/joy/Card'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import validator from 'validator'
import { OrderContext } from 'context/OrderContext'
import Footer from 'components/Footer'
import PageWrapper from 'components/PageWrapper'
import { fetchOrderByEmail } from 'lib/api'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HomePage() {
  return (
    <CssVarsProvider>
      <PageWrapper>
        <InnerHomePage />
      </PageWrapper>
    </CssVarsProvider>
  )
}

function InnerHomePage() {
  const { setOrder } = useContext(OrderContext)
  const router = useRouter()
  const slugEmail = useSearchParams().get('email') || ''

  // Hero slides (only used for carousel now)
  const [slides, setSlides] = useState<string[]>([])
  const [loadingSlides, setLoadingSlides] = useState(true)

  // Find-order state
  const [findEmail, setFindEmail] = useState('')
  const [findLoading, setFindLoading] = useState(false)
  const [findMessage, setFindMessage] = useState<string | null>(null)

  // load random images for the carousel
  useEffect(() => {
    async function load() {
      const imgs: string[] = []
      for (let i = 0; i < 5; i++) {
        try {
          const res = await fetch('https://themealdb.com/api/json/v1/1/random.php')
          const data = await res.json()
          imgs.push(data.meals[0].strMealThumb)
        } catch {}
      }
      setSlides(imgs)
      setLoadingSlides(false)
    }
    load()
  }, [])

  // auto-find if ?email=
  useEffect(() => {
    if (slugEmail) {
      setFindEmail(slugEmail)
      handleFind(slugEmail)
    }
  }, [slugEmail])

  const scrollToNewOrder = () => {
    document.getElementById('new-order')?.scrollIntoView({ behavior: 'smooth' })
  }

  const startOrder = () => {
    setOrder({})        // reset any old order
    router.push('/dish')
  }

  const handleFind = async (email: string) => {
    setFindLoading(true)
    setFindMessage(null)
    try {
      const res = await fetchOrderByEmail(email)
      if (res.success && res.order) {
        setOrder(res.order)
        router.push('/receipt')
      } else {
        setFindMessage('No order found for that email.')
      }
    } catch {
      setFindMessage('Network error. Try again.')
    } finally {
      setFindLoading(false)
    }
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Dark overlay so text stands out */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.4)',
          }}
        />
        {/* Floating Hero Text */}
        <Box
          sx={{
            position: 'relative',
            textAlign: 'center',
            color: '#fff',
            px: 2,
          }}
        >
          <Box component="h1" sx={{ fontSize: '3rem', mb: 1, fontWeight: 'bold' }}>
            Welcome to Lil Bits
          </Box>
          <Box component="p" sx={{ fontSize: '1.25rem', mb: 3 }}>
            Let us surprise you with a perfect meal and drink pairing.
          </Box>
          <Button
            variant="solid"
            size="lg"
            onClick={scrollToNewOrder}
            sx={{
              backgroundColor: 'var(--color-secondary)',
              '&:hover': { backgroundColor: 'var(--color-accent)' },
            }}
          >
            Start Order
          </Button>
        </Box>
      </Box>

      {/* Swiper Carousel */}
      {!loadingSlides && slides.length > 0 && (
        <Box sx={{ py: 4, px: 2, maxWidth: 1200, mx: 'auto' }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
          >
            {slides.map((url, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  component="img"
                  src={url}
                  alt={`slide ${idx + 1}`}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}

      {/* New & Find Order */}
      <Box id="new-order" sx={{ p: 4 }}>
        <Grid container spacing={2}>
          {/* New Order */}
          <Grid xs={6}>
            <Card variant="outlined" sx={{ p: 3 }}>
              <Box
                component="h2"
                sx={{
                  fontSize: '1.75rem',
                  mb: 2,
                  color: 'var(--color-primary)',
                  fontWeight: 'bold',
                }}
              >
                Ready to order?
              </Box>
              <Button
                variant="solid"
                onClick={startOrder}
                sx={{
                  width: '100%',
                  backgroundColor: 'var(--color-secondary)',
                  '&:hover': { backgroundColor: 'var(--color-accent)' },
                }}
              >
                Start Order
              </Button>
            </Card>
          </Grid>

          {/* Find Existing Order */}
          <Grid xs={6}>
            <Card variant="outlined" sx={{ p: 3 }}>
              <Box
                component="h2"
                sx={{
                  fontSize: '1.75rem',
                  mb: 2,
                  color: 'var(--color-primary)',
                  fontWeight: 'bold',
                }}
              >
                Find your order
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={findEmail}
                  onChange={(e) => setFindEmail(e.target.value)}
                  disabled={findLoading}
                  fullWidth
                />
                <Button
                  variant="soft"
                  onClick={() => handleFind(findEmail)}
                  loading={findLoading}
                  disabled={!findEmail}
                  sx={{
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)',
                  }}
                >
                  Find
                </Button>
              </Box>
              {findMessage && (
                <Box sx={{ color: 'var(--color-accent)' }}>{findMessage}</Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  )
}
