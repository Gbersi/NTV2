'use client';

import React from 'react';
import { useWizard } from 'react-use-wizard';
import { Box, LinearProgress } from '@mui/joy';

export default function ProgressBar() {
  const { activeStep, stepCount } = useWizard();
  const percent = (activeStep / stepCount) * 100;

  return (
    <Box sx={{ p: 2 }}>
   
      <Box sx={{ typography: 'body2', mb: 1 }}>
        Step {activeStep} of {stepCount}
      </Box>

      <LinearProgress
        determinate
        value={percent}
        color="primary"
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );
}
