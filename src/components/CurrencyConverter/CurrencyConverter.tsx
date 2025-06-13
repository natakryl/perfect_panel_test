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
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { currencyApi } from '../../services/api';

const CurrencyConverter: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('RUB');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [result, setResult] = useState<string>('');
  const [rates, setRates] = useState<Record<string, string>>({});

  const convertCurrency = useCallback(() => {
    if (!amount || !fromCurrency || !toCurrency || !rates) return;

    const fromRate = parseFloat(rates[fromCurrency]);
    const toRate = parseFloat(rates[toCurrency]);

    if (isNaN(fromRate) || isNaN(toRate)) {
      setError('Ошибка конвертации: неверные курсы валют');
      return;
    }

    const result = (parseFloat(amount) * toRate) / fromRate;
    setResult(result.toFixed(2));
    setError(null);
  }, [amount, fromCurrency, toCurrency, rates]);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const rates = await currencyApi.getRates();
      setRates(rates);
    } catch {
      setError('Ошибка при загрузке курсов валют');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency && rates) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, rates, convertCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (loading && Object.keys(rates).length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Конвертер валют
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Сумма"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Из валюты</InputLabel>
            <Select
              value={fromCurrency}
              label="Из валюты"
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={handleSwapCurrencies} color="primary">
              <SwapHorizIcon />
            </IconButton>
          </Box>
          <FormControl fullWidth>
            <InputLabel>В валюту</InputLabel>
            <Select
              value={toCurrency}
              label="В валюту"
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {result && (
            <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
              {amount} {fromCurrency} = {result} {toCurrency}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CurrencyConverter; 