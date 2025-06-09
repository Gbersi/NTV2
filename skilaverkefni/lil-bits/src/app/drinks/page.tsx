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

interface RawDrink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface Drink extends RawDrink {
  price: number;
}

export default function DrinksPage() {
  const { order, setOrder } = useContext(OrderContext);
  const router = useRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // track quantities by drink ID
  const [qtyMap, setQtyMap] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    (order.drinks ?? []).forEach((d) => {
      init[d.id] = d.qty ?? 0;
    });
    return init;
  });

  // sidebar collapsed state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // compute subtotals & total
  const { dishPrice, total } = useMemo(() => {
    const guests = order.people ?? 1;
    const dp = (order.dish?.price ?? 0) * guests;
    const dt = (order.drinks ?? []).reduce(
      (sum, d) => sum + (d.price ?? 0) * (d.qty ?? 0),
      0
    );
    return { dishPrice: dp, total: dp + dt };
  }, [order]);

  // load categories
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((r) => r.json())
      .then((data) => {
        const cats = Array.isArray(data.drinks)
          ? data.drinks.map((c: any) => c.strCategory)
          : [];
        setCategories(['All', ...cats]);
      })
      .catch(console.error);
  }, []);

  // load drinks on category change
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
        const raw: RawDrink[] = Array.isArray(data.drinks)
          ? data.drinks
          : [];
        const list: Drink[] = raw.slice(0, 12).map((d) => ({
          ...d,
          price: parseFloat((Math.random() * 8 + 2).toFixed(2)),
        }));
        setDrinks(list);

        // seed qtyMap so every card has a count
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

  // filter by search
  const filtered = useMemo(() => {
    if (!searchTerm) return drinks;
    const t = searchTerm.toLowerCase();
    return drinks.filter((d) =>
      d.strDrink.toLowerCase().includes(t)
    );
  }, [searchTerm, drinks]);

  // update quantity
  const handleQtyChange = (d: Drink, delta: number) => {
    const id = d.idDrink;
    const curr = qtyMap[id] ?? 0;
    const nextQty = Math.max(0, curr + delta);

    setQtyMap((p) => ({ ...p, [id]: nextQty }));
    setOrder((o) => {
      const others = (o.drinks ?? []).filter((x) => x.id !== id);
      if (nextQty > 0) {
        others.push({
          id,
          name: d.strDrink,
          description: '',
          imageSource: d.strDrinkThumb,
          price: d.price,
          qty: nextQty,
          category: activeCategory,
          brewer: '',
        });
      }
      return { ...o, drinks: others };
    });
  };

  const goToOrder = () => router.push('/order');

  return (
    <Box sx={{ display: 'flex' /* page scroll only */ }}>
      {/* 1) Main content */}
      <Box sx={{ flex: 1, p: 4 }}>
        {/* filters + button */}
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
            placeholder="Search drinks…"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            sx={{ flex: 1, minWidth: 200 }}
          />

          <Button
            onClick={goToOrder}
            disabled={!((order.drinks ?? []).length > 0)}
            sx={{
              backgroundColor: '#3E6053',
              '&:hover': { backgroundColor: '#C16757' },
            }}
          >
            Continue to Order
          </Button>
        </Box>

        {/* grid of cards */}
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
            filtered.map((d) => {
              const q = qtyMap[d.idDrink] ?? 0;
              return (
                <Card
                  key={d.idDrink}
                  variant="outlined"
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    position: 'relative',
                    transition: 'transform .15s, box-shadow .15s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  {/* price badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      px: 1,
                      borderRadius: 1,
                      fontSize: '0.7rem',
                    }}
                  >
                    ${d.price.toFixed(2)}
                  </Box>

                  {/* image */}
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

                  {/* title */}
                  <Typography
                    level="title-md"
                    sx={{
                      mt: 1,
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {d.strDrink}
                  </Typography>

                  {/* qty controls */}
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
                      disabled={q === 0}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ width: 24, textAlign: 'center' }}>
                      {q}
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

      {/* 2) Collapsible Sidebar */}
      <Box
        sx={{
          position: 'relative',
          width: sidebarCollapsed ? 48 : 300,
          transition: 'width .3s',
          bgcolor: 'rgba(255,255,255,0.9)',
          borderLeft: sidebarCollapsed
            ? 'none'
            : '1px solid rgba(0,0,0,0.1)',
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
          {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>

        {!sidebarCollapsed && (
          <Box sx={{ p: 2 }}>
            <Typography level="h4" sx={{ mb: 1 }}>
              Your Order
            </Typography>
            <Divider sx={{ my: 1 }} />

            <Typography level="body-md" sx={{ fontWeight: '600' }}>
              Dishes:
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {order.dish
                ? `${order.dish.name} × ${order.people ?? 1} = $${dishPrice.toFixed(
                    2
                  )}`
                : 'None'}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography level="body-md" sx={{ fontWeight: '600' }}>
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

            <Divider sx={{ my: 1 }} />
            <Typography
              level="title-lg"
              sx={{
                mt: 2,
                textAlign: 'right',
                fontWeight: '700',
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
