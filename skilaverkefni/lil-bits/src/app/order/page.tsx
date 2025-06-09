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
} from '@mui/joy';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { OrderContext } from '../../context/OrderContext';

export default function OrderPage() {
  const { order, setOrder } = useContext(OrderContext);
  const router = useRouter();

  // form state
  const [email, setEmail] = useState(order.email ?? '');
  const [date, setDate] = useState(order.date ?? '');
  const [time, setTime] = useState(order.time ?? '');
  const [people, setPeople] = useState(order.people ?? 1);

  // collapse
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // subtotals / total
  const dishSubtotal = (order.dish?.price ?? 0) * people;
  const drinksSubtotal = (order.drinks ?? []).reduce(
    (sum, d) => sum + (d.price ?? 0) * (d.qty ?? 0),
    0
  );
  const total = dishSubtotal + drinksSubtotal;

  const handleSubmit = () => {
    setOrder({ ...order, email, date, time, people });
    router.push('/receipt');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* ————— Main Form (centered) ————— */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflowY: 'auto',
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Typography level="h3" sx={{ textAlign: 'center', mb: 2 }}>
            Finalize Reservation
          </Typography>

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
            />
          </Box>

          <Box>
            <Typography level="body-md" sx={{ mb: 1 }}>
              Date
            </Typography>
            <Input
              type="date"
              required
              value={date}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDate(e.target.value)
              }
            />
          </Box>

          <Box>
            <Typography level="body-md" sx={{ mb: 1 }}>
              Time
            </Typography>
            <Input
              type="time"
              required
              value={time}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTime(e.target.value)
              }
            />
          </Box>

          <Box>
            <Typography level="body-md" sx={{ mb: 1 }}>
              People
            </Typography>
            <Input
              type="number"
              required
              value={people}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPeople(Math.max(1, +e.target.value))
              }
              slotProps={{ input: { min: 1 } }}
            />
          </Box>

          <Button
            type="submit"
            variant="solid"
            sx={{
              mt: 2,
              backgroundColor: '#3E6053',
              '&:hover': { backgroundColor: '#C16757' },
            }}
            disabled={!email || !date || !time || people < 1}
          >
            Confirm Reservation
          </Button>
        </Box>
      </Box>

      {/* ————— Collapsible Sidebar (full-height) ————— */}
      <Box
        sx={{
          position: 'relative',
          width: sidebarCollapsed ? 48 : 300,
          height: '100vh',
          transition: 'width .3s',
          bgcolor: 'rgba(255,255,255,0.9)',
          borderLeft: sidebarCollapsed
            ? 'none'
            : '1px solid rgba(0,0,0,0.1)',
          overflow: 'hidden',
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
            zIndex: 10,
            '&:hover': { bgcolor: '#C16757' },
          }}
        >
          {sidebarCollapsed ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>

        {!sidebarCollapsed && (
          <Box sx={{ p: 2, height: '100%', overflowY: 'auto' }}>
            <Typography level="h4" sx={{ mb: 1 }}>
              Your Order
            </Typography>
            <Divider sx={{ my: 1 }} />

            <Typography level="body-md" sx={{ fontWeight: '600' }}>
              Dishes:
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {order.dish
                ? `${order.dish.name} × ${people} = $${dishSubtotal.toFixed(
                    2
                  )}`
                : 'None'}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography level="body-md" sx={{ fontWeight: '600' }}>
              Drinks:
            </Typography>
            {(order.drinks ?? []).length > 0 ? (
              (order.drinks ?? []).map((d) => (
                <Typography key={d.id} sx={{ mb: 0.5 }}>
                  {d.name} × {d.qty} = $
                  {(d.qty! * d.price!).toFixed(2)}
                </Typography>
              ))
            ) : (
              <Typography sx={{ mb: 2 }}>None</Typography>
            )}

            <Divider sx={{ my: 1 }} />
            <Typography
              level="h4"
              sx={{ mt: 2, textAlign: 'right', fontWeight: '700' }}
            >
              Total: ${total.toFixed(2)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
