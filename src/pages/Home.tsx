import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Gift, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Mobile Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
            <Star className="w-10 h-10 text-primary-foreground" />
          </div>
          {/* Title Removed */}

          <p className="text-muted-foreground px-4">
            Earn rewards through engaging activities and challenges on your mobile device.
          </p>
        </div>

        {/* Mobile CTA */}
        <div className="space-y-4">
          {isAuthenticated && user ? (
            <div className="space-y-4">
              <p className="text-foreground">Welcome back!</p>
              <Link to="/dashboard" className="block">
                <Button size="lg" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <Link to="/login" className="block">
                <Button size="lg" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/register" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Features Grid */}
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">Complete tasks and challenges</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Track Progress</h3>
              <p className="text-sm text-muted-foreground">Monitor earnings in real-time</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Withdraw Anytime</h3>
              <p className="text-sm text-muted-foreground">Quick and easy withdrawals</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
