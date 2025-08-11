// src/pages/auth/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { FormInput } from '@/components/ui/FormInput';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState<{
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (username && username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error('API URL is not defined in environment variables.');
      }

      await axios.post(
        `${apiUrl}/auth/register`,
        {
          email,
          password,
          username: username || undefined,
        },
        {
          timeout: 10000, // 10 seconds timeout
        }
      );

      localStorage.setItem('pendingEmail', email);

      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account before logging in.',
      });

      navigate('/verify-email');
    } catch (error: any) {
      console.error('Registration error:', error);

      const message =
        error.response?.data?.error ||
        error.message ||
        'An unexpected error occurred. Please try again.';

      toast({
        title: 'Registration failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-8 flex-1 flex flex-col justify-center">
      <div className="space-y-6 max-w-md mx-auto w-full">
        {/* Header with brand title */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl font-bold text-primary-foreground">LR</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Join Loop
              <span
                style={{ display: 'inline-block', transform: 'scaleX(-1)' }}
                aria-label="reversed R"
              >
                R
              </span>
              ebel
            </h1>
            <p className="text-muted-foreground">Create your account to get started</p>
          </div>
        </div>

        {/* Registration Card */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                type="text"
                label="Username (optional)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
                placeholder="Choose a username"
                autoComplete="username"
              />

              <FormInput
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />

              <FormInput
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />

              <LoadingButton
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Create Account
              </LoadingButton>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;


