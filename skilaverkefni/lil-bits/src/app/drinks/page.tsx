// src/app/drinks/page.tsx
'use client';

import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  ChangeEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Select,
  Option,
  Input,
  Divider,
  Typography,
} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OrderSummary from '../../components/OrderSummary';
import { OrderContext } from '../../context/OrderContext';

interface RawDrink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface Drink extends RawDrink {
  price: number;
}

interface OrderItem {
  id: string;
  name: string;
  description: string;
  imageSource: string;
  price: number;
  qty: number;
  category: string;
  brewer: string;
}

export default function DrinksPage() {
  const { order, setOrder } = useContext(OrderContext);
  const router = useRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * qtyMap holds quantities for EVERY drink ID the user has ever seen/selected.
   * We seed it from order.drinks on first render, then on every new category we add missing keys
   * but never wipe existing ones. Each time qtyMap changes, we immediately merge into context
   * so the sidebar (OrderSummary) shows live changes.
   */
  const [qtyMap, setQtyMap] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    (order.drinks || []).forEach((item) => {
      initial[item.id] = item.qty;
    });
    return initial;
  });

  // 1) Load categories from TheCocktailDB
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((r) => r.json())
      .then((data) => {
        const cats = data.drinks.map((c: { strCategory: string }) => c.strCategory);
        setCategories(['All', ...cats]);
      })
      .catch(console.error);
  }, []);

  // 2) Fetch drinks whenever activeCategory changes
  useEffect(() => {
    setLoading(true);
    const url =
      activeCategory === 'All'
        ? 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
            activeCategory
          )}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const list: Drink[] = (data.drinks || [])
          .slice(0, 12)
          .map((d: RawDrink) => ({
            ...d,
            price: parseFloat((Math.random() * 8 + 2).toFixed(2)), // random $2–$10
          }));
        setDrinks(list);

        // Add missing IDs to qtyMap (but keep the old ones)
        setQtyMap((prev) => {
          const next = { ...prev };
          list.forEach((d) => {
            if (next[d.idDrink] == null) {
              next[d.idDrink] = 0;
            }
          });
          return next;
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  // 3) Filter drinks by searchTerm
  const filtered = useMemo(() => {
    if (!searchTerm) return drinks;
    const t = searchTerm.toLowerCase();
    return drinks.filter((d) => d.strDrink.toLowerCase().includes(t));
  }, [searchTerm, drinks]);

  // Whenever qtyMap changes, immediately reflect it into order.drinks context
  // so the right‐hand sidebar (OrderSummary) updates live.
  useEffect(() => {
    // Build a merged map: start from existing order.drinks
    const merged: Record<string, OrderItem> = {};
    (order.drinks || []).forEach((itm) => {
      merged[itm.id] = { ...itm };
    });

    // For every key in qtyMap where qty > 0, either update or insert
    Object.entries(qtyMap).forEach(([id, qty]) => {
      if (qty > 0) {
        // If we already have that item in order, update qty
        if (merged[id]) {
          merged[id].qty = qty;
        } else {
          // Else, find from the full drinks array (could be from a past category)
          const foundInCurrent = drinks.find((d) => d.idDrink === id);
          if (foundInCurrent) {
            merged[id] = {
              id: id,
              name: foundInCurrent.strDrink,
              description: '',
              imageSource: foundInCurrent.strDrinkThumb,
              price: foundInCurrent.price,
              qty: qty,
              category: activeCategory,
              brewer: '',
            };
          } else {
            // In rare case it’s from a previous category, look up by scanning all categories
            // (We can’t fetch all categories’ arrays quickly here; if user changes categories, prev category’s list might not be in state.)
            // As a simpler fallback, we’ll keep whatever’s already in merged (if any). Otherwise we ignore. 
            // Practically, setOrder will reconcile on Confirm too.
          }
        }
      } else {
        // qty is 0 => remove from merged if it existed
        if (merged[id]) {
          delete merged[id];
        }
      }
    });

    // Convert back to array
    const mergedArray = Object.values(merged);
    setOrder({ ...order, drinks: mergedArray });
  }, [qtyMap]);

  // Increase or decrease a given drink’s quantity
  const adjustQty = (id: string, delta: number) => {
    setQtyMap((prev) => {
      const current = prev[id] || 0;
      const nextQty = Math.max(0, current + delta);
      return { ...prev, [id]: nextQty };
    });
  };

  // When user clicks Confirm, simply navigate to /order
  // (The sidebar is already up‐to‐date because of the above effect.)
  const handleConfirm = () => {
    router.push('/order');
  };

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* ==== MAIN CONTENT ==== */}
      <Box
        sx={{
          flex: 1,
          p: 0,
          pt: '80px', // space for the sticky bar
          backgroundColor: 'transparent',
          overflowY: 'auto',
        }}
      >
        {/* ===== STICKY CATEGORY / SEARCH / CONFIRM BAR ===== */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {/* Category Select */}
          <Select
            size="md"
            value={activeCategory}
            onChange={(e, v) => setActiveCategory(v!)}
            placeholder="Category"
            sx={{
              minWidth: 160,
              fontFamily: 'var(--font-body)',
            }}
          >
            {categories.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>

          {/* Search Input */}
          <Input
            size="md"
            placeholder="Search drinks..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            sx={{
              flex: 1,
              minWidth: 300,
              fontFamily: 'var(--font-body)',
            }}
          />

          {/* Confirm Button */}
          <Button
            size="md"
            variant="solid"
            onClick={handleConfirm}
            disabled={!Object.values(qtyMap).some((n) => n > 0)}
            sx={{
              backgroundColor: 'var(--color-secondary)',
              fontFamily: 'var(--font-body)',
              '&:hover': { backgroundColor: 'var(--color-accent)' },
            }}
          >
            Confirm Selection
          </Button>
        </Box>

        {/* ===== DRINK CARDS GRID ===== */}
        {loading ? (
          <Grid container spacing={2} sx={{ px: 2, mt: 2 }}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Grid key={idx} xs={12} sm={6} md={4} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: 'var(--border-light)',
                    height: 260,
                    borderRadius: 2,
                    animation: 'pulse 1.5s infinite',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ px: 2, mt: 2 }}
          >
            {filtered.map((d) => {
              const q = qtyMap[d.idDrink] || 0;
              return (
                <Grid key={d.idDrink} xs={12} sm={6} md={4}>
                  <Card
                    variant="outlined"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: 300, // fixed height for uniform cards
                      p: 1,
                      position: 'relative',
                      bgcolor: q > 0 ? '#f0f8f2' : 'var(--bg-light)',
                      transition: 'transform .2s, box-shadow .2s',
                      fontFamily: 'var(--font-body)',
                      '&:hover': {
                        transform: 'translateY(-4px) scale(1.02)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    {/* Price badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'var(--color-primary)',
                        color: '#fff',
                        px: 1,
                        borderRadius: '4px',
                        fontSize: 12,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      ${d.price.toFixed(2)}
                    </Box>

                    {/* Image (fixed height, covers top) */}
                    <Box
                      component="img"
                      src={d.strDrinkThumb}
                      alt={d.strDrink}
                      sx={{
                        width: '100%',
                        height: 140,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />

                    {/* Drink Name (centered, ellipsis) */}
                    <Box
                      sx={{
                        mt: 1,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {d.strDrink}
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    {/* Quantity Controls (bottom) */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 2,
                      }}
                    >
                      <IconButton
                        size="sm"
                        onClick={() => adjustQty(d.idDrink, -1)}
                        disabled={q === 0}
                        color="neutral"
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Box sx={{ minWidth: 24, textAlign: 'center', fontFamily: 'var(--font-body)' }}>
                        {q}
                      </Box>

                      <IconButton
                        size="sm"
                        onClick={() => adjustQty(d.idDrink, +1)}
                        color="primary"
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>

      {/* ==== RIGHT‐HAND STICKY SIDEBAR (OrderSummary) ==== */}
      <Box
        sx={{
          width: 300,
          position: 'sticky',
          top: 80, // same offset as the sticky bar above
          right: 0,
          height: 'calc(100vh - 80px)',
          overflowY: 'auto',
          background: 'rgba(255,255,255,0.9)',
          borderLeft: '1px solid var(--border-light)',
          p: 2,
          fontFamily: 'var(--font-body)',
          display: { xs: 'none', md: 'block' }, // hide on phones
        }}
      >
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontFamily: 'var(--font-heading)',
            mb: 1,
          }}
        >
          Your Order
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <OrderSummary />
      </Box>
    </Box>
  );
}

