// src/app/page.tsx
'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Divider from '@mui/joy/Divider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { OrderContext } from '../context/OrderContext';
import { fetchOrderByEmail } from '../lib/api';

export default function HomePage() {
  const router = useRouter();
  const { order, setOrder } = useContext(OrderContext);

  const [slides, setSlides] = useState<string[]>([]);
  const [loadingSlides, setLoadingSlides] = useState(true);

  const [emailInput, setEmailInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loadingCheck, setLoadingCheck] = useState(false);

  // On mount: load 3 random food images for the hero carousel
  React.useEffect(() => {
    async function loadRandomImages() {
      try {
        const imgs: string[] = [];
        for (let i = 0; i < 3; i++) {
          const res = await fetch('https://themealdb.com/api/json/v1/1/random.php');
          const data = await res.json();
          imgs.push(data.meals[0].strMealThumb as string);
        }
        setSlides(imgs);
      } catch {
        // If carousel fails, silently ignore
      } finally {
        setLoadingSlides(false);
      }
    }
    loadRandomImages();
  }, []);

  // Handle email submit
  const handleEmailSubmit = async () => {
    setError(null);
    const email = emailInput.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoadingCheck(true);
    try {
      const response = await fetchOrderByEmail(email);
      if (response.success && response.order) {
        // Found an existing order → preload into context and navigate to receipt
        setOrder(response.order);
        router.push('/receipt');
      } else {
        // No existing order (404) → start a new one
        setOrder({ email, people: 1, dish: undefined, drinks: [] });
        router.push('/dish');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while checking your email. Please try again.');
    } finally {
      setLoadingCheck(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 2,
        py: 4,
        minHeight: '100vh',
        background: 'var(--bg-light)',
      }}
    >
      {/* ===== Hero Carousel ===== */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          mb: 6,
        }}
      >
        {loadingSlides ? (
          <Box
            sx={{
              height: 300,
              bgcolor: 'var(--border-light)',
              borderRadius: 2,
              animation: 'pulse 1.5s infinite',
            }}
          />
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            style={{ borderRadius: 12, overflow: 'hidden' }}
          >
            {slides.map((url, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  component="img"
                  src={url}
                  alt={`slide ${idx + 1}`}
                  sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>

      {/* ===== Welcome & Resume Section ===== */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: '2.5rem',
            fontFamily: '“Playfair Display”, serif',
            letterSpacing: '1px',
            mb: 1,
            color: 'var(--color-primary)',
          }}
        >
          Welcome to Gourmet Random
        </Typography>
        <Typography
          sx={{
            fontSize: '1.1rem',
            fontFamily: 'var(--font-body)',
            mb: 2,
            color: '#555',
          }}
        >
          Let us surprise you with a perfect meal-and-drink pairing.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography
          sx={{
            mb: 1,
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          Have an existing order? Enter your email to resume:
        </Typography>
        <Box sx={{ position: 'relative', mb: error ? 1 : 3 }}>
          <Input
            placeholder="your.email@example.com"
            size="lg"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            sx={{
              width: '100%',
              fontFamily: 'var(--font-body)',
            }}
          />
        </Box>
        {error && (
          <Typography color="danger" sx={{ mb: 2, fontFamily: 'var(--font-body)' }}>
            {error}
          </Typography>
        )}
        <Button
          variant="solid"
          size="lg"
          onClick={handleEmailSubmit}
          disabled={loadingCheck}
          sx={{
            backgroundColor: 'var(--color-secondary)',
            fontFamily: 'var(--font-body)',
            '&:hover': { backgroundColor: 'var(--color-accent)' },
            width: '100%',
          }}
        >
          {loadingCheck ? 'Checking…' : 'Resume / Start Order'}
        </Button>
      </Box>
    </Box>
  );
}
