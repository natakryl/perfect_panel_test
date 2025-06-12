import { AUTH_CREDENTIALS } from '../constants';

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