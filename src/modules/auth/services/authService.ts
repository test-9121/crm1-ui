
import { api } from "@/modules/common/services/api";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/sign-in', { email, password });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },
};
