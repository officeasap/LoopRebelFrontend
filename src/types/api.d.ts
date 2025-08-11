// LoopRebel API Types
export interface User {
  id: string;
  email: string;
  username?: string;
  telegramId?: string;
  verified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username?: string;
}

export interface VerifyRequest {
  token: string;
}

export interface VerifyResponse {
  valid: boolean;
  user?: User;
}

export interface WithdrawRequest {
  amount: number;
}

export interface WithdrawResponse {
  txid: string;
  newBalance: number;
}

export interface WalletInfo {
  balance: number;
  totalEarned: number;
  pendingWithdrawals: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'withdrawal' | 'earning' | 'bonus';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  txid?: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}