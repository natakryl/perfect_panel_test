import { AUTH_CREDENTIALS } from '../constants';
import axios from 'axios';
import type { Currency } from '../types';
import { API_BASE_URL } from '../constants';



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
      
      Object.values(response.data.data).forEach((currency: any) => {
        if (currency.symbol && currency.quotes?.USD?.price) {
          rates[currency.symbol] = currency.quotes.USD.price.toString();
        }
      });
      
      console.log('Processed rates:', rates); 
      return rates;
    } catch (error) {
      console.error('Error fetching rates:', error);
      throw error;
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



