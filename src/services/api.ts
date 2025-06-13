import { AUTH_CREDENTIALS } from '../constants';
import type { Currency } from '../types';

const API_BASE_URL = 'https://api.exchangerate.host';

export const authApi = {
  login: async (username: string, password: string): Promise<boolean> => {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
      return true;
    }
    throw new Error('Invalid credentials');
  }
};

export const currencyApi = {
  getRates: async (): Promise<Record<string, string>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/latest`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.rates;
    } catch (error: unknown) {
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



