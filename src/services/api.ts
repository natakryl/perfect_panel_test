import { AUTH_CREDENTIALS } from '../constants';
import axios from 'axios';
import type { Currency } from '../types';
import { API_BASE_URL } from '../constants';

interface CurrencyData {
  symbol: string;
  quotes?: {
    USD?: {
      price: number;
    };
  };
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const currencyApi = {
  getRates: async (): Promise<Record<string, string>> => {
    try {
      const response = await api.get('?limit=100');
      console.log('API Response:', response.data);
      
      const rates: Record<string, string> = {};
      
      (Object.values(response.data.data) as CurrencyData[]).forEach((currency) => {
        if (currency.symbol && currency.quotes?.USD?.price) {
          rates[currency.symbol] = currency.quotes.USD.price.toString();
        }
      });
      
      console.log('Processed rates:', rates); 
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
          username === AUTH_CREDENTIALS.username && 
          password === AUTH_CREDENTIALS.password
        );
      }, 1000);
    });
  },
}; 



