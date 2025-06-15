import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { SwapHoriz as SwapIcon } from '@mui/icons-material';
import { currencyApi } from '../../services/api';
import type { Currency } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';

const CurrencyConverter: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('1');
  const debouncedAmount = useDebounce(amount, 500);
  const [fromCurrency, setFromCurrency] = useState<string>('BTC');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [result, setResult] = useState<string>('');
  const [resultWithCommission, setResultWithCommission] = useState<string>('');
  const COMMISSION_RATE = Number(import.meta.env.VITE_COMMISSION_RATE) || 0.03;

  const convertCurrency = useCallback(() => {
    if (!debouncedAmount || !fromCurrency || !toCurrency) return;

    const fromRate = parseFloat(currencies.find(c => c.currency === fromCurrency)?.rate || '1');
    const toRate = parseFloat(currencies.find(c => c.currency === toCurrency)?.rate || '1');
    const baseResult = (Number(debouncedAmount) * toRate) / fromRate;
    const commission = baseResult * COMMISSION_RATE;
    const totalResult = baseResult + commission;
    
    setResult(baseResult.toFixed(8));
    setResultWithCommission(totalResult.toFixed(8));
  }, [debouncedAmount, fromCurrency, toCurrency, currencies, COMMISSION_RATE]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        setError(null);
        const rates = await currencyApi.getRates();
        const currencyList = currencyApi.convertRates(rates);
        setCurrencies(currencyList);
      } catch {
        setError('Failed to fetch exchange rates');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (debouncedAmount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [debouncedAmount, fromCurrency, toCurrency, convertCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const isUpdating = amount !== debouncedAmount;

  if (loading && currencies.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Конвертер валют
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          label="Сумма"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ width: '200px' }}
        />
        <FormControl sx={{ width: '200px' }}>
          <InputLabel 
            sx={{ 
              backgroundColor: 'white',
              px: 0.5,
              '&.Mui-focused': {
                backgroundColor: 'white'
              }
            }}
          >
            Из валюты
          </InputLabel>
          <Select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Выберите исходную валюту' }}
          >
            <MenuItem value="" disabled>
              Выберите валюту
            </MenuItem>
            {currencies.map((currency) => (
              <MenuItem key={currency.currency} value={currency.currency}>
                {currency.currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton onClick={handleSwapCurrencies} color="primary">
          <SwapIcon />
        </IconButton>

        <FormControl sx={{ width: '200px' }}>
          <InputLabel 
            sx={{ 
              backgroundColor: 'white',
              px: 0.5,
              '&.Mui-focused': {
                backgroundColor: 'white'
              }
            }}
          >
            В валюту
          </InputLabel>
          <Select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Выберите целевую валюту' }}
          >
            <MenuItem value="" disabled>
              Выберите валюту
            </MenuItem>
            {currencies
              .filter(currency => currency.currency !== fromCurrency)
              .map((currency) => (
              <MenuItem key={currency.currency} value={currency.currency}>
                {currency.currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {isUpdating ? (
        <Box mt={3}>
          <Typography variant="h6" align="center" color="text.secondary">
            Обновление...
          </Typography>
        </Box>
      ) : result && (
        <Box mt={3}>
          <Typography variant="h6" align="center">
            {debouncedAmount} {fromCurrency} → {resultWithCommission} {toCurrency} ({result} {toCurrency} + {COMMISSION_RATE * 100}%)
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CurrencyConverter; 