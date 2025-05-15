
import { api } from "@/modules/common/services/api";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/api/auth/sign-in", { email, password });
    return response.data;
  },

  verify2FA: async (sessionToken: string, code: string) => {
    // Convert code to integer and send as query parameter
    const codeAsInt = parseInt(code, 10);
    
    // Create URLSearchParams to match backend's @RequestParam expectations
    const params = new URLSearchParams();
    params.append('code', codeAsInt.toString());
    params.append('jwtToken', sessionToken);
    
    // Make API call to the endpoint matching your backend
    const response = await api.post(`/api/auth/public/verify-2fa-login`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  register: async (userData: any) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },

  resetPassword: async (email: string) => {
    const response = await api.post("/api/auth/reset-password", { email });
    return response.data;
  },

  confirmResetPassword: async (token: string, password: string) => {
    const response = await api.post("/api/auth/confirm-reset-password", {
      token,
      password,
    });
    return response.data;
  },

  loggedInUser: async () => {
    const response = await api.get("/api/auth/me");
    return response.data;
  },
};
