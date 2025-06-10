import type { NextConfig } from 'next';

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.themealdb.com', 'www.thecocktaildb.com'],
  },
};

module.exports = nextConfig;
