// src/lib/api.ts
import axios from 'axios';
import { supabase } from './supabaseClient'; // adjust path if needed

// -------------------- AUTH API --------------------
export const authApi = {
  login: async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  },

  register: async (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
  },

  verify: async ({ token }: { token: string }) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await axios.post(`${baseUrl}/api/auth/verify`, { token });
    return response.data; // Expected: { valid: boolean }
  },
};

// -------------------- WALLET API --------------------
export const walletApi = {
  getBalance: async (userId: string) => {
    const { data, error } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (error) throw new Error(error.message);
    return data.balance;
  },

  requestWithdrawal: async (amount: number) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await axios.post(`${baseUrl}/payouts/request`, { amount });
    return response.data;
  },
};

// -------------------- USER PROFILE API --------------------
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};
