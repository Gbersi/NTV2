// src/app/dish/page.tsx
'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../../styles/DishCard.module.css'; // <-- adjusted path
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
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch a random dish on mount
  useEffect(() => {
    fetchRandomDish();
  }, []);

  function fetchRandomDish() {
    setLoading(true);
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((r) => r.json())
      .then((data) => {
        const m: ApiMeal = data.meals[0];
        setDish({
          id: m.idMeal,
          name: m.strMeal,
          category: m.strCategory,
          imageSource: m.strMealThumb,
          price: parseFloat((Math.random() * 10 + 5).toFixed(2)),
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  const handleSelect = () => {
    if (!dish) return;
    setOrder({ ...order, dish });
    router.push('/drinks');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <main
        style={{
          flex: 1,
          padding: '32px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading || !dish ? (
          <div className={styles.card}>
            <div className={styles.image} style={{ backgroundColor: '#f0f0f0' }} />
            <div className={styles.content}>
              <h2 className={styles.title}>Loading…</h2>
              <p className={styles.meta}>Please wait while we fetch a dish.</p>
            </div>
          </div>
        ) : (
          <div className={styles.card}>
            <div className={styles.image}>
              <Image
                src={dish.imageSource}
                alt={dish.name}
                layout="fill"
                objectFit="cover"
                quality={80}
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
              />
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}>{dish.name}</h2>
              <p className={styles.meta}>{dish.category}</p>
              <div className={styles.priceCalories}>
                <span>${dish.price.toFixed(2)}</span>
                {/* Add calories or other info here if desired */}
              </div>
              <div className={styles.buttonRow}>
                <button className={styles.button} onClick={fetchRandomDish}>
                  Pick Another Dish
                </button>
                <button className={styles.button} onClick={handleSelect}>
                  Select Dish
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Sidebar Order Summary (placeholder) */}
      <aside
        style={{
          width: '300px',
          borderLeft: '1px solid var(--border-light)',
          padding: '32px',
          background: 'rgba(255,255,255,0.9)',
          position: 'sticky',
          top: '80px',
          height: 'calc(100vh - 80px)',
          overflowY: 'auto',
        }}
      >
        {/* Replace with <OrderSummary /> if you have it */}
        <p style={{ fontFamily: 'Inter, sans-serif', color: '#777777' }}>
          Your current order will appear here.
        </p>
      </aside>
    </div>
  );
}

// Helper to re‐fetch another random dish
async function fetchRandomDish() {
  // Implementation is in the component above
}
