'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Card, IconButton, Typography, Divider } from '@mui/joy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { OrderContext } from '../../context/OrderContext';
import glassStyles from '../../styles/glasscard.module.css';

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
        const img = new window.Image();
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
      .catch(() => setLoadingImage(false));
  }

  const handleSelect = () => {
    if (!dish) return;
    setOrder({ ...order, dish });
    router.push('/drinks');
  };

  const guestCount = order.people ?? 1;
  const dishPrice = (dish?.price ?? 0) * guestCount;
  const drinksSubtotal = (order.drinks ?? []).reduce(
    (sum, d) => sum + (d.price ?? 0) * (d.qty ?? 0),
    0,
  );
  const total = dishPrice + drinksSubtotal;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'visible',
      }}
    >
      {/* === Dish card === */}
      <Box sx={{ flex: 1, p: 4, overflowY: 'auto' }}>
        <Card
          className={glassStyles.glassCard}
          variant="outlined"
          sx={{
            maxWidth: 450,
            mx: 'auto',
            p: 2,
            position: 'relative',
            // fade image in/out on reload
            '.dish-img': {
              transition: 'opacity .3s',
              opacity: loadingImage ? 0 : 1,
            },
          }}
        >
          {dish && (
            <span className={glassStyles.priceBadge}>
              ${dish.price.toFixed(2)}
            </span>
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

          <Typography
            level="h4"
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
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

      {/* === Collapsible Sidebar === */}
      <Box
        sx={{
          position: 'relative',
          width: sidebarCollapsed ? 48 : 300,
          transition: 'width .3s',
          bgcolor: 'rgba(255,255,255,0.93)',
          borderLeft: sidebarCollapsed
            ? 'none'
            : '1px solid rgba(200,178,115,0.13)',
        }}
      >
        <IconButton
          aria-label={
            sidebarCollapsed ? 'Expand order summary' : 'Collapse order summary'
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
            <Typography level="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
              Your Order
            </Typography>
            <Divider sx={{ my: 1, borderColor: 'var(--color-gold,#c8b273)' }} />

            <Typography level="body-md" sx={{ fontWeight: 600 }}>
              Dishes:
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {dish
                ? `${dish.name} × ${guestCount} = $${dishPrice.toFixed(2)}`
                : 'None'}
            </Typography>

            <Divider sx={{ my: 1, borderColor: 'var(--color-gold,#c8b273)' }} />

            <Typography level="body-md" sx={{ fontWeight: 600 }}>
              Drinks:
            </Typography>
            {(order.drinks ?? []).length > 0 ? (
              (order.drinks ?? []).map((d) => (
                <Typography key={d.id} sx={{ mb: 0.5 }}>
                  {d.name} × {d.qty} = ${(d.qty! * d.price!).toFixed(2)}
                </Typography>
              ))
            ) : (
              <Typography sx={{ mb: 2 }}>None</Typography>
            )}

            <Divider sx={{ my: 1, borderColor: 'var(--color-gold,#c8b273)' }} />
            <Typography
              level="title-lg"
              sx={{
                mt: 2,
                textAlign: 'right',
                fontWeight: 700,
                color: '#3E6053',
              }}
            >
              Total: ${total.toFixed(2)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
