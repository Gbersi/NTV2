"use client";	
// src/app/page.tsx
import CocktailList from './CocktailList';
import React from 'react';
import './globals.css'; // Import global styles
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  return (
    <div>
      <CocktailList />
    </div>
  );
}
