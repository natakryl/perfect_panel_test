import React from 'react';
import { Container } from '@mui/material';
import { CurrencyConverter } from '../components/CurrencyConverter';

const ConverterPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <CurrencyConverter />
    </Container>
  );
};

export default ConverterPage; 