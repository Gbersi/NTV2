// src/app/page.tsx
'use client'

import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CssVarsProvider } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import PageWrapper from 'components/PageWrapper'
import Footer from 'components/Footer'
import { OrderContext } from 'context/OrderContext'

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


  const [slides, setSlides] = useState<string[]>([])
  const [loadingSlides, setLoadingSlides] = useState(true)

  useEffect(() => {
    async function load() {
      const imgs: string[] = []
      for (let i = 0; i < 5; i++) {
        try {
          const res = await fetch('https://themealdb.com/api/json/v1/1/random.php')
          const data = await res.json()
          imgs.push(data.meals[0].strMealThumb)
        } catch {
        
        }
      }
      setSlides(imgs)
      setLoadingSlides(false)
    }
    load()
  }, [])

  const startOrder = () => {
 
    setOrder({})
    router.push('/dish')
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
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.4)',
          }}
        />
        {/* Hero Content */}
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
            onClick={startOrder}
            sx={{
              backgroundColor: 'var(--color-secondary)',
              '&:hover': { backgroundColor: 'var(--color-accent)' },
            }}
          >
            Start Order
          </Button>
        </Box>
      </Box>

      {/* Carousel */}
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

      {/* Footer */}
      <Footer />
    </Box>
  )
}
