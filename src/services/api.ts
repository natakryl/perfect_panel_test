import axios from 'axios';
import type { Currency } from '../types';

interface CurrencyData {
  symbol: string;
  quotes?: {
    USD?: {
      price: number;
    };
  };
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.alternative.me/v2/ticker/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const currencyApi = {
  getRates: async (): Promise<Record<string, string>> => {
    try {
      const response = await api.get('?limit=100');
      const rates: Record<string, string> = {};
      
      (Object.values(response.data.data) as CurrencyData[]).forEach((currency) => {
        if (currency.symbol && currency.quotes?.USD?.price) {
          rates[currency.symbol] = currency.quotes.USD.price.toString();
        }
      });
      
      return rates;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Ошибка при получении курсов валют: ${error.message}`);
      }
      throw new Error('Произошла неизвестная ошибка при получении курсов валют');
    }
  },

  convertRates: (rates: Record<string, string>): Currency[] => {
    return Object.entries(rates).map(([currency, rate]) => ({
      currency,
      rate,
    }));
  },
};

export const authApi = {
  login: async (username: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          username === import.meta.env.VITE_AUTH_USERNAME && 
          password === import.meta.env.VITE_AUTH_PASSWORD
        );
      }, 1000);
    });
  },
}; 



