import React from 'react';
import { Box } from '@mui/joy';
import Typography from '@mui/joy/Typography';

interface StepIndicatorProps {
  currentStep: number;
  labels?: string[];
}

export default function StepIndicator({
  currentStep,
  labels = ['Dish', 'Drinks', 'Details', 'Receipt'],
}: StepIndicatorProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        my: 2,
        gap: 3,
      }}
    >
      {labels.map((label, idx) => (
        <Typography
          key={label}
          sx={{
            color: idx === currentStep ? 'var(--color-neutral)' : 'neutral.500',
            fontWeight: idx === currentStep ? 'bold' : 'normal',
          }}
        >
          {label}
        </Typography>
      ))}
    </Box>
  );
}
