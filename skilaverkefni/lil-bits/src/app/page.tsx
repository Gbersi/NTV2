'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Button, Input, Typography } from '@mui/joy';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { OrderContext } from '../context/OrderContext';
import { fetchOrderByEmail } from './api/orders';

export default function HomePage() {
  const router = useRouter();
  const { setOrder } = useContext(OrderContext);

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [slides, setSlides] = useState<string[]>([]);
  const [loadingSlides, setLoadingSlides] = useState(true);

  useEffect(() => {
    (async function loadSlides() {
      const imgs: string[] = [];
      for (let i = 0; i < 8; i++) {
        try {
          const r = await fetch(
            'https://www.themealdb.com/api/json/v1/1/random.php',
          );
          const d = await r.json();
          imgs.push(d.meals[0].strMealThumb);
        } catch {}
      }
      setSlides(imgs);
      setLoadingSlides(false);
    })();
  }, []);

  const startNew = () => {
    setOrder({});
    router.push('/dish');
  };

  const resume = async () => {
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    try {
      const resp = await fetchOrderByEmail(email.trim().toLowerCase());
      if (!resp.success || !resp.order) {
        setError('No order found for that email.');
        return;
      }
      setOrder(resp.order);
      router.push('/receipt');
    } catch {
      setError('Error checking order. Try again.');
    }
  };

  return (
    <Box
      component="main"
      sx={{
        textAlign: 'center',
        color: '#fff',
        pt: 1,
        pb: { xs: 4, md: 6 },
        px: 2,
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <Box sx={{ mx: 'auto', width: 240, height: 240, position: 'relative' }}>
        <Image
          src="/lil-bits-logo.png"
          alt="Lil Bits Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>

      <Typography
        component="h1"
        level="h2"
        sx={{
          mt: { xs: 0.5, md: 1 },
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: { xs: '2rem', md: '3.2rem' },
          letterSpacing: 1.2,
          color: '#2A4036',
          textShadow: '0 2px 16px #c8b27311',
          fontWeight: 700,
        }}
      >
        Welcome to Lil Bits
      </Typography>
      <Typography
        level="body-lg"
        sx={{
          mt: { xs: 0.25, md: 0.5 },
          fontSize: { xs: '1.08rem', md: '1.32rem' },
          maxWidth: 620,
          mx: 'auto',
          color: '#3E6053',
          fontWeight: 500,
        }}
      >
        Enjoy our bite-sized meals and incredible cocktail selection.
      </Typography>

      <Box
        sx={{
          mt: { xs: 2, md: 3 },
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={startNew}
          sx={{
            minWidth: 190,
            backgroundColor: '#3E6053',
            fontSize: '1.12rem',
            fontWeight: 600,
            py: 1.2,
            px: 2.6,
            borderRadius: '1.2em',
            boxShadow: '0 2px 16px #3e605318',
            '&:hover': { backgroundColor: '#C16757' },
          }}
        >
          Start New Order
        </Button>

        <Box sx={{ textAlign: 'left', minWidth: 300 }}>
          <Typography
            level="body-sm"
            sx={{ mb: 1, color: '#888', fontWeight: 500 }}
          >
            Have an existing order? Resume by email:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Input
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ flex: 1, fontSize: '1.08rem' }}
            />
            <Button
              onClick={resume}
              variant="outlined"
              sx={{
                borderColor: '#3E6053',
                color: '#3E6053',
                fontWeight: 700,
                px: 2,
                '&:hover': { backgroundColor: 'rgba(62,96,83,0.09)' },
              }}
            >
              Resume
            </Button>
          </Box>
          {error && (
            <Typography color="danger" level="body-sm" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Enlarged carousel */}
      {!loadingSlides && slides.length > 0 && (
        <Box
          sx={{
            py: { xs: 3, md: 7 },
            px: { xs: 0, md: 8 },
            maxWidth: { xs: '99vw', md: '1240px' },
            mx: 'auto',
            width: '100%',
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
            loop
            style={{
              minHeight: 270,
              maxHeight: 340,
              paddingBottom: 38,
              borderRadius: '2rem',
              background: 'rgba(255,255,255,0.09)',
              boxShadow: '0 4px 36px #3e60532a',
            }}
          >
            {slides.map((url, i) => (
              <SwiperSlide key={i}>
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: 220, sm: 260, md: 320 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={url}
                    alt={`Dish Slide ${i + 1}`}
                    width={340}
                    height={260}
                    style={{
                      width: '100%',
                      maxHeight: 320,
                      objectFit: 'cover',
                      borderRadius: '1.5rem',
                      boxShadow: '0 1.5px 12px #c8b27327',
                    }}
                    loading="lazy"
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  );
}
