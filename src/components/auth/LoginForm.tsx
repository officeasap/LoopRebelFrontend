import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { FormInput } from '@/components/ui/FormInput';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { login, isLoading, error, clearError } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await login({ email, password });
      toast({
        title: 'Welcome back!',
        description: 'Successfully logged in to LoopRebel.',
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="px-4 py-8 flex-1 flex flex-col justify-center">
      <div className="space-y-6">
        {/* Mobile Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl font-bold text-primary-foreground">LR</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">Sign in to LoopRebel</p>
          </div>
        </div>

        <Card>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />

              <FormInput
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded border border-destructive/20">
                  {error}
                </div>
              )}

              <LoadingButton
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Sign In
              </LoadingButton>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;