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
import { fetchOrderByEmail } from '../lib/api';

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
      for (let i = 0; i < 5; i++) {
        try {
          const r = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
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
        />
      </Box>

      <Typography
        component="h1"
        level="h2"
        sx={{
          mt: { xs: 0.5, md: 1 },
          fontFamily: '"Libre Baskerville", serif',
          fontSize: { xs: '2rem', md: '3rem' },
          letterSpacing: 1.2,
        }}
      >
        Welcome to Lil Bits
      </Typography>
      <Typography
        level="body-lg"
        sx={{
          mt: { xs: 0.25, md: 0.5 },
          fontSize: { xs: '1rem', md: '1.25rem' },
          maxWidth: 600,
          mx: 'auto',
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
            minWidth: 180,
            backgroundColor: '#3E6053',
            '&:hover': { backgroundColor: '#C16757' },
          }}
        >
          Start New Order
        </Button>

        <Box sx={{ textAlign: 'left' }}>
          <Typography level="body-sm" sx={{ mb: 1, color: '#ccc' }}>
            Have an existing order? Resume by email:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Input
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Button
              onClick={resume}
              variant="outlined"
              sx={{
                borderColor: '#3E6053',
                color: '#3E6053',
                '&:hover': { backgroundColor: 'rgba(62,96,83,0.1)' },
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

      {!loadingSlides && slides.length > 0 && (
        <Box sx={{ py: 6, px: 2 }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
            loop
          >
            {slides.map((url, i) => (
              <SwiperSlide key={i}>
                <Box
                  component="img"
                  src={url}
                  alt={`Slide ${i + 1}`}
                  sx={{
                    width: '100%',
                    height: { xs: 200, sm: 250, md: 300 },
                    objectFit: 'cover',
                    borderRadius: 2,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  );
}
