import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Define a helper type for user metadata extension
type UserProfile = {
  email: string | null;
  username?: string | null;
  verified?: boolean;
  created_at?: string | null;
};

const IndexPage: React.FC = () => {
  const { user, signOut } = useAuth();

  // Extract user metadata safely
  const userProfile: UserProfile = {
    email: user?.email ?? null,
    username: user?.user_metadata?.username ?? null,
    verified: user?.user_metadata?.verified ?? false,
    created_at: user?.created_at ?? null,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <Link to="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        {/* Profile Information */}
        <div className="max-w-2xl space-y-6">
          <Card className="shadow-loop-frame">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground">{userProfile.email ?? 'N/A'}</p>
              </div>

              {userProfile.username && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Username</label>
                  <p className="text-foreground">{userProfile.username}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <p className="text-foreground">
                  {userProfile.created_at
                    ? new Date(userProfile.created_at).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Verification Status</label>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      userProfile.verified ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  />
                  <p className="text-foreground">
                    {userProfile.verified ? 'Verified' : 'Pending Verification'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Card */}
          {!userProfile.verified && (
            <Card className="shadow-loop-frame">
              <CardHeader>
                <CardTitle>Account Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Verify your account to unlock all features and increase your earning potential.
                </p>
                <Link to="/verify">
                  <Button className="bg-primary text-primary-foreground shadow-loop-button hover:scale-hover">
                    Verify Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card className="shadow-loop-frame">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/withdraw" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Withdraw Funds
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => alert('Change password functionality coming soon!')}
                  className="flex-1"
                >
                  Change Password
                </Button>
              </div>

              <hr className="border-border" />

              <Button
                variant="outline"
                onClick={() => signOut()}
                className="w-full text-destructive hover:text-destructive"
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
