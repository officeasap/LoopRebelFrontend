import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { walletApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader } from '@/components/ui/Loader';
import { useToast } from '@/hooks/use-toast';
import type { WalletInfo } from '@/types/api';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletInfo = async () => {
      try {
        setIsLoading(true);
        const info = await walletApi.getWalletInfo();
        setWalletInfo(info);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to load wallet info';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletInfo();
  }, [toast]);

  const handleLogout = () => {
    logout();
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader size="lg" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Mobile Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              {user?.email}
            </p>
          </div>
          <Link to="/verify">
            <Button variant="outline" size="sm">
              Verify
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Wallet Overview */}
      <div className="space-y-4">
        {/* Main Balance Card */}
        <Card className="p-6 text-center bg-primary text-primary-foreground">
          <h3 className="text-sm opacity-80 mb-2">Current Balance</h3>
          <p className="text-3xl font-bold">
            ${walletInfo?.balance.toFixed(2) || '0.00'}
          </p>
          <Link to="/withdraw" className="block mt-4">
            <Button 
              variant="secondary" 
              className="w-full" 
              disabled={!walletInfo?.balance || walletInfo.balance <= 0}
            >
              Withdraw Funds
            </Button>
          </Link>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <h4 className="text-xs text-muted-foreground mb-1">Total Earned</h4>
            <p className="text-lg font-bold text-foreground">
              ${walletInfo?.totalEarned.toFixed(2) || '0.00'}
            </p>
          </Card>
          
          <Card className="p-4 text-center">
            <h4 className="text-xs text-muted-foreground mb-1">Pending</h4>
            <p className="text-lg font-bold text-muted-foreground">
              ${walletInfo?.pendingWithdrawals.toFixed(2) || '0.00'}
            </p>
          </Card>
        </div>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            {error ? (
              <div className="text-center py-8">
                <p className="text-destructive">{error}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            ) : walletInfo?.transactions && walletInfo.transactions.length > 0 ? (
              <div>
                {walletInfo.transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-4 border-b border-border last:border-b-0"
                  >
                    <div>
                      <p className="font-medium capitalize text-sm">{transaction.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        ${transaction.amount.toFixed(2)}
                      </p>
                      <p className={`text-xs capitalize ${
                        transaction.status === 'completed' ? 'text-green-600' :
                        transaction.status === 'failed' ? 'text-destructive' :
                        'text-muted-foreground'
                      }`}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 px-4">
                <p className="text-muted-foreground">No transactions yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Start earning to see your activity
                </p>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;