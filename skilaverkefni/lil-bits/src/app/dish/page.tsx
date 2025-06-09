'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  IconButton,
  Typography,
  Divider,
} from '@mui/joy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { OrderContext } from '../../context/OrderContext';

interface ApiMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

interface Dish {
  id: string;
  name: string;
  category: string;
  imageSource: string;
  price: number;
}

export default function DishPage() {
  const { order, setOrder } = useContext(OrderContext);
  const router = useRouter();

  const [dish, setDish] = useState<Dish | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fetch + preload random dish
  useEffect(() => {
    pickDish();
  }, []);

  function pickDish() {
    setLoadingImage(true);
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((r) => r.json())
      .then((data) => {
        const m: ApiMeal = data.meals[0];
        const next: Dish = {
          id: m.idMeal,
          name: m.strMeal,
          category: m.strCategory,
          imageSource: m.strMealThumb,
          price: parseFloat((Math.random() * 90 + 10).toFixed(2)),
        };
        // Preload
        const img = new Image();
        img.src = next.imageSource;
        img.onload = () => {
          setDish(next);
          setLoadingImage(false);
        };
        img.onerror = () => {
          setDish(next);
          setLoadingImage(false);
        };
      })
      .catch(console.error);
  }

  const handleSelect = () => {
    if (!dish) return;
    setOrder({ ...order, dish });
    router.push('/drinks');
  };

  const guestCount   = order.people ?? 1;
  const dishSubtotal = (dish?.price ?? 0) * guestCount;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'visible',           // ← allow toggle to overflow
      }}
    >
      {/* === Dish card === */}
      <Box sx={{ flex: 1, p: 4, overflowY: 'auto' }}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 450,
            mx: 'auto',
            p: 2,
            position: 'relative',
            transition: 'transform .2s, box-shadow .2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            },
            // fade image in/out on reload
            '.dish-img': {
              transition: 'opacity .3s',
              opacity: loadingImage ? 0 : 1,
            },
          }}
        >
          {dish && (
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: '#fff',
                px: 1,
                borderRadius: 1,
                fontSize: '0.75rem',
              }}
            >
              ${dish.price.toFixed(2)}
            </Box>
          )}

          {dish && (
            <Box
              component="img"
              src={dish.imageSource}
              alt={dish.name}
              className="dish-img"
              sx={{
                width: '100%',
                height: 260,
                objectFit: 'cover',
                borderRadius: 1,
                mb: 2,
              }}
            />
          )}

          <Typography level="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            {dish?.name ?? 'Loading…'}
          </Typography>
          <Typography
            level="body-sm"
            sx={{ textAlign: 'center', color: 'neutral.500', mb: 3 }}
          >
            {dish?.category ?? ''}
          </Typography>

          {/* center buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              startDecorator={<RefreshIcon />}
              onClick={pickDish}
              disabled={loadingImage}
              sx={{
                borderColor: '#C16757',
                color: '#C16757',
                '&:hover': { bgcolor: 'rgba(193,103,87,0.1)' },
              }}
            >
              New Dish
            </Button>
            <Button
              variant="solid"
              endDecorator={<CheckCircleIcon />}
              onClick={handleSelect}
              disabled={!dish}
              sx={{
                backgroundColor: '#3E6053',
                '&:hover': { backgroundColor: '#C16757' },
              }}
            >
              Select Dish
            </Button>
          </Box>
        </Card>
      </Box>

      {/* === Collapsible sidebar === */}
      <Box
        sx={{
          position: 'relative',
          width: sidebarCollapsed ? 48 : 320,
          transition: 'width .3s',
          bgcolor: 'rgba(255,255,255,0.9)',
          borderLeft: sidebarCollapsed
            ? 'none'
            : '1px solid rgba(0,0,0,0.1)',
          overflowY: 'auto',
        }}
      >
        <IconButton
          aria-label={
            sidebarCollapsed
              ? 'Expand order summary'
              : 'Collapse order summary'
          }
          onClick={() => setSidebarCollapsed((v) => !v)}
          sx={{
            position: 'absolute',
            top: '50%',
            left: -24,
            transform: 'translateY(-50%)',
            bgcolor: '#3E6053',
            color: '#fff',
            width: 40,
            height: 40,
            borderRadius: '50%',
            boxShadow: 2,
            zIndex: 99,
            '&:hover': { bgcolor: '#C16757' },
          }}
        >
          {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>

        {!sidebarCollapsed && (
          <Box sx={{ p: 2 }}>
            <Typography level="h4" sx={{ mb: 1 }}>
              Your Order
            </Typography>
            <Divider sx={{ my: 1 }} />

            <Typography level="body-md" sx={{ fontWeight: 'bold' }}>
              Dishes:
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {dish
                ? `${dish.name} × ${guestCount} = $${dishSubtotal.toFixed(2)}`
                : 'None'}
            </Typography>

            <Divider sx={{ my: 1 }} />
            <Typography
              level="title-lg"
              component="h5"
              sx={{
                mt: 2,
                textAlign: 'right',
                fontWeight: 'bold',
              }}
            >
              Total: ${dishSubtotal.toFixed(2)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
