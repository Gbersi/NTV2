'use client';

import React, { useState, useContext, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Input,
  Typography,
  IconButton,
  Divider,
  Card,
} from '@mui/joy';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import toast from 'react-hot-toast';
import { OrderContext } from '../../context/OrderContext';

function isDateTodayOrFuture(dateStr: string) {
  if (!dateStr) return false;
  const today = new Date();
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return d >= today;
}
function isMondayToFriday(dateStr: string) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const dow = d.getDay();
  return dow >= 1 && dow <= 5;
}
function isValidTime(timeStr: string) {
  if (!timeStr) return false;
  const [h] = timeStr.split(':').map(Number);
  return h >= 16 && h < 23;
}

export default function OrderPage() {
  const { order, setOrder } = useContext(OrderContext);
  const router = useRouter();

  const [email, setEmail] = useState(order.email ?? '');
  const [date, setDate] = useState(order.date ?? '');
  const [time, setTime] = useState(order.time ?? '');
  const [people, setPeople] = useState(order.people ?? 1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const dishSubtotal = (order.dish?.price ?? 0) * people;
  const drinksSubtotal = (order.drinks ?? []).reduce(
    (sum, d) => sum + (d.price ?? 0) * (d.qty ?? 0),
    0,
  );
  const total = dishSubtotal + drinksSubtotal;

  const validDate = isDateTodayOrFuture(date) && isMondayToFriday(date);
  const validTime = isValidTime(time);
  const validPeople = people >= 1 && people <= 10;
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const canSubmit = validEmail && validDate && validTime && validPeople;

  const handleSubmit = async () => {
    localStorage.setItem('lilbits_email', email);

    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...order, email, date, time, people }),
    });
    const result = await res.json();

    setOrder({ ...order, email, date, time, people });

    if (result?.order && result?.order.id) {
      toast.success(`Order for ${email} updated successfully.`);
    } else {
      toast.success(`Order for ${email} created successfully.`);
    }

    router.push('/receipt');
  };

  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        background: 'none',
      }}
    >
      {/* Main Card */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 1, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: '100%',
            maxWidth: 470,
            p: { xs: 2, md: 4 },
            mt: { xs: 1, md: 6 },
            background: 'rgba(255,255,255,0.89)',
            backdropFilter: 'blur(10px)',
            boxShadow:
              '0 8px 32px rgba(50,60,40,0.09), 0 1.5px 8px rgba(50,96,83,0.08)',
            borderRadius: '1.5rem',
            border: '1.5px solid rgba(200,178,115,0.13)',
          }}
        >
          <Typography
            level="h2"
            sx={{
              textAlign: 'center',
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              fontSize: '2.1rem',
              color: '#3E6053',
              mb: 2,
              letterSpacing: '0.03em',
            }}
          >
            Finalize Reservation
          </Typography>
          <Divider sx={{ mb: 3, borderColor: 'var(--color-gold,#c8b273)' }} />
          <Box
            component="form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (canSubmit) handleSubmit();
            }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              width: '100%',
            }}
          >
            {/* Email */}
            <Box>
              <Typography level="body-md" sx={{ mb: 1 }}>
                Email
              </Typography>
              <Input
                type="email"
                required
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                sx={{
                  fontSize: '1.1rem',
                  borderRadius: '0.7em',
                  background: '#fff',
                  boxShadow: '0 2px 10px rgba(62,96,83,0.03)',
                  '&:focus-within': {
                    borderColor: 'var(--color-gold,#c8b273)',
                    boxShadow: '0 0 0 2px #c8b27333',
                  },
                }}
              />
            </Box>
            {/* Date */}
            <Box>
              <Typography level="body-md" sx={{ mb: 1 }}>
                Date{' '}
                <span style={{ fontSize: 13, color: '#C16757' }}>
                  (Mon–Fri, today/future only)
                </span>
              </Typography>
              <Input
                type="date"
                required
                value={date}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
                slotProps={{ input: { min: todayStr } }}
                sx={{
                  fontSize: '1.1rem',
                  borderRadius: '0.7em',
                  background: '#fff',
                  boxShadow: '0 2px 10px rgba(62,96,83,0.03)',
                  '&:focus-within': {
                    borderColor: 'var(--color-gold,#c8b273)',
                    boxShadow: '0 0 0 2px #c8b27333',
                  },
                }}
                error={!!date && !validDate}
              />
              {!!date && !validDate && (
                <Typography
                  sx={{ color: '#C16757', fontSize: '0.93em', mt: 0.5 }}
                >
                  Pick a weekday (Mon–Fri), today or a future date.
                </Typography>
              )}
            </Box>
            {/* Time */}
            <Box>
              <Typography level="body-md" sx={{ mb: 1 }}>
                Time{' '}
                <span style={{ fontSize: 13, color: '#C16757' }}>
                  (16:00–23:00)
                </span>
              </Typography>
              <Input
                type="time"
                required
                value={time}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTime(e.target.value)
                }
                slotProps={{ input: { min: '16:00', max: '23:00' } }}
                sx={{
                  fontSize: '1.1rem',
                  borderRadius: '0.7em',
                  background: '#fff',
                  boxShadow: '0 2px 10px rgba(62,96,83,0.03)',
                  '&:focus-within': {
                    borderColor: 'var(--color-gold,#c8b273)',
                    boxShadow: '0 0 0 2px #c8b27333',
                  },
                }}
                error={!!time && !validTime}
              />
              {!!time && !validTime && (
                <Typography
                  sx={{ color: '#C16757', fontSize: '0.93em', mt: 0.5 }}
                >
                  Reservation time must be between 16:00 and 23:00.
                </Typography>
              )}
            </Box>
            {/* People */}
            <Box>
              <Typography level="body-md" sx={{ mb: 1 }}>
                People{' '}
                <span style={{ fontSize: 13, color: '#C16757' }}>(1–10)</span>
              </Typography>
              <Input
                type="number"
                required
                value={people}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPeople(Math.max(1, Math.min(10, +e.target.value)))
                }
                slotProps={{ input: { min: 1, max: 10 } }}
                sx={{
                  fontSize: '1.1rem',
                  borderRadius: '0.7em',
                  background: '#fff',
                  boxShadow: '0 2px 10px rgba(62,96,83,0.03)',
                  '&:focus-within': {
                    borderColor: 'var(--color-gold,#c8b273)',
                    boxShadow: '0 0 0 2px #c8b27333',
                  },
                }}
                error={!validPeople}
              />
              {!validPeople && (
                <Typography
                  sx={{ color: '#C16757', fontSize: '0.93em', mt: 0.5 }}
                >
                  Must be between 1 and 10 people.
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              variant="solid"
              sx={{
                mt: 2,
                background: 'linear-gradient(92deg, #C16757, #3E6053 90%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.18rem',
                borderRadius: '0.85em',
                px: 4,
                py: 1.3,
                boxShadow: '0 4px 24px rgba(62,96,83,0.09)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  background:
                    'linear-gradient(92deg, #3E6053 70%, #BA2329 100%)',
                },
              }}
              disabled={!canSubmit}
            >
              Confirm Reservation
            </Button>
          </Box>
        </Card>
      </Box>

      {/* === Collapsible Sidebar (matches dish/drinks) === */}
      <Box
        sx={{
          position: 'relative',
          width: sidebarCollapsed ? 48 : 300,
          height: '100vh',
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
            bgcolor: 'var(--color-primary)',
            color: '#fff',
            width: 40,
            height: 40,
            borderRadius: '50%',
            boxShadow: 2,
            zIndex: 10,
            '&:hover': { bgcolor: 'var(--color-secondary)' },
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
              {order.dish
                ? `${order.dish.name} × ${people} = $${dishSubtotal.toFixed(2)}`
                : 'None'}
            </Typography>

            <Divider sx={{ my: 1, borderColor: 'var(--color-gold,#c8b273)' }} />

            <Typography level="body-md" sx={{ fontWeight: 600 }}>
              Drinks:
            </Typography>
            {(order.drinks ?? []).length > 0 ? (
              order.drinks?.map((d) => (
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
