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
  IconButton,
  Select,
  Option,
  Input,
  Typography,
  Divider,
} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { OrderContext } from '../../context/OrderContext';
import glassStyles from '../../styles/glasscard.module.css';

interface RawDrink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface Drink extends RawDrink {
  price: number;
  qty?: number;
}

interface CategoryResponse {
  drinks: { strCategory: string }[];
}

interface FilterResponse {
  drinks: RawDrink[];
}

export default function DrinksPage() {
  const { order, setOrder } = useContext(OrderContext);
  const router = useRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [qtyMap, setQtyMap] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    (order.drinks ?? []).forEach((d) => {
      init[d.id] = d.qty ?? 0;
    });
    return init;
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { dishPrice, total } = useMemo(() => {
    const guests = order.people ?? 1;
    const dp = (order.dish?.price ?? 0) * guests;
    const dt = (order.drinks ?? []).reduce(
      (sum, d) => sum + (d.price ?? 0) * (d.qty ?? 0),
      0,
    );
    return { dishPrice: dp, total: dp + dt };
  }, [order]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json() as Promise<CategoryResponse>)
      .then((data) => {
        const cats = data.drinks.map((c) => c.strCategory);
        setCategories(['All', ...cats]);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    const url =
      activeCategory === 'All'
        ? 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(activeCategory)}`;

    fetch(url)
      .then((res) => res.json() as Promise<FilterResponse>)
      .then((data) => {
        const list = data.drinks.slice(0, 18).map((d) => ({
          ...d,
          price: parseFloat((Math.random() * 8 + 2).toFixed(2)),
        }));
        setDrinks(list);
        setQtyMap((prev) => {
          const next = { ...prev };
          list.forEach((d) => {
            if (next[d.idDrink] == null) next[d.idDrink] = 0;
          });
          return next;
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const [searchResults, setSearchResults] = useState<Drink[] | null>(null);

  useEffect(() => {
    let ignore = false;
    const fetchSearch = async () => {
      if (!searchTerm) {
        setSearchResults(null);
        return;
      }
      setLoading(true);

      const byNameRes = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`,
      );
      const byNameJson = await byNameRes.json();
      const byName: RawDrink[] = Array.isArray(byNameJson.drinks)
        ? byNameJson.drinks
        : [];

      const byIngRes = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(searchTerm)}`,
      );
      const byIngJson = await byIngRes.json();
      const byIngredient: RawDrink[] = Array.isArray(byIngJson.drinks)
        ? byIngJson.drinks
        : [];

      const all: Record<string, RawDrink> = {};
      byName.forEach((d) => (all[d.idDrink] = d));
      byIngredient.forEach((d) => (all[d.idDrink] = d));
      const merged: Drink[] = Object.values(all).map((d) => ({
        ...d,
        price: parseFloat((Math.random() * 8 + 2).toFixed(2)),
      }));

      if (!ignore) {
        setSearchResults(merged.slice(0, 18));
        setLoading(false);
      }
    };
    fetchSearch();
    return () => {
      ignore = true;
    };
  }, [searchTerm]);

  const displayedDrinks = searchTerm ? (searchResults ?? []) : drinks;

  const handleQtyChange = (drink: Drink, delta: number) => {
    const id = drink.idDrink;
    const nextQty = Math.max(0, (qtyMap[id] ?? 0) + delta);
    setQtyMap((prev) => ({ ...prev, [id]: nextQty }));
    setOrder((o) => {
      const others = (o.drinks ?? []).filter((x) => x.id !== id);
      if (nextQty > 0) {
        others.push({
          id: id,
          name: drink.strDrink,
          description: '',
          imageSource: drink.strDrinkThumb,
          price: drink.price,
          qty: nextQty,
          category: activeCategory,
          brewer: '',
        });
      }
      return { ...o, drinks: others };
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Select
            value={activeCategory}
            onChange={(_, v) => setActiveCategory(v!)}
            placeholder="Category"
            sx={{ minWidth: 180 }}
          >
            {categories.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="Search by name or ingredient…"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            sx={{ flex: 1, minWidth: 200 }}
          />
          <Button
            onClick={() => router.push('/order')}
            disabled={!((order.drinks ?? []).length > 0)}
            sx={{
              backgroundColor: 'var(--color-primary)',
              '&:hover': { backgroundColor: 'var(--color-secondary)' },
            }}
          >
            Continue to Order
          </Button>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))',
          }}
        >
          {loading ? (
            <Typography>Loading…</Typography>
          ) : (
            displayedDrinks.map((d) => {
              const qty = qtyMap[d.idDrink] ?? 0;
              return (
                <Card
                  className={glassStyles.glassCard}
                  key={d.idDrink}
                  variant="outlined"
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    position: 'relative',
                  }}
                >
                  <span className={glassStyles.priceBadge}>
                    ${d.price.toFixed(2)}
                  </span>

                  <Box
                    component="img"
                    src={d.strDrinkThumb}
                    alt={d.strDrink}
                    sx={{
                      width: '100%',
                      height: 120,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />

                  <Typography
                    level="title-md"
                    sx={{
                      mt: 1,
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {d.strDrink}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <IconButton
                      variant="solid"
                      color="danger"
                      size="sm"
                      onClick={() => handleQtyChange(d, -1)}
                      disabled={qty === 0}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ width: 24, textAlign: 'center' }}>
                      {qty}
                    </Typography>
                    <IconButton
                      variant="solid"
                      color="success"
                      size="sm"
                      onClick={() => handleQtyChange(d, +1)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Card>
              );
            })
          )}
        </Box>
      </Box>

      {/* Collapsible Sidebar */}
      <Box
        sx={{
          position: 'relative',
          width: sidebarCollapsed ? 48 : 300,
          minHeight: '100vh',
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
                ? `${order.dish.name} × ${order.people ?? 1} = $${dishPrice.toFixed(
                    2,
                  )}`
                : 'None'}
            </Typography>

            <Divider sx={{ my: 1, borderColor: 'var(--color-gold,#c8b273)' }} />

            <Typography level="body-md" sx={{ fontWeight: 600 }}>
              Drinks:
            </Typography>
            {(order.drinks ?? []).length > 0 ? (
              order.drinks!.map((d) => (
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
