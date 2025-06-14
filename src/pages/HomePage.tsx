import React from 'react';
import { Container } from '@mui/material';
import { CurrencyList } from '../components/CurrencyList';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <CurrencyList />
    </Container>
  );
};

export default HomePage; 