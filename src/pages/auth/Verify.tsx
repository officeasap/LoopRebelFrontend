// src/pages/auth/Verify.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { FormInput } from '@/components/ui/FormInput';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const VerifyEmail: React.FC = () => {
  const [email, setEmail] = useState<string>(() => localStorage.getItem('pendingEmail') || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // On mount: handle supabase redirect tokens (access_token, refresh_token)
  useEffect(() => {
    (async () => {
      const url = new URL(window.location.href);
      const access_token = url.searchParams.get('access_token');
      const refresh_token = url.searchParams.get('refresh_token');

      if (access_token) {
        setIsLoading(true);
        try {
          // Set session on client
          await supabase.auth.setSession({ access_token, refresh_token });
          // Get current user
          const { data: userData, error: userErr } = await supabase.auth.getUser();
          if (userErr) throw userErr;

          const user = userData?.user;
          if (user && user.email && (user.email_confirmed_at || user.confirmed_at || user?.identities?.length > 0)) {
            toast({ title: 'Verified!', description: 'Email verified automatically. Redirecting...' });
            // optional: remove pendingEmail
            localStorage.removeItem('pendingEmail');
            setTimeout(() => navigate('/dashboard'), 900);
            return;
          }

          // fallback: ask server to check verification if tokens did not mark user as verified
        } catch (err: any) {
          console.error('Redirect verify error:', err);
          toast({ title: 'Verification error', description: err?.message || 'Could not complete verification', variant: 'destructive' });
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, []);

  // manual check: call backend to inspect auth.users row
  const checkVerification = async () => {
    if (!email) {
      toast({ title: 'Email required', description: 'Please enter the email you registered with', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(`${API}/auth/verify`, { email });
      if (res.data?.verified) {
        toast({ title: 'Email Verified', description: 'You can now log in.' });
        localStorage.removeItem('pendingEmail');
        navigate('/login');
      } else {
        toast({ title: 'Not Verified', description: 'Please click the link in your email to verify, then try again.' , variant: 'destructive'});
      }
    } catch (err: any) {
      toast({ title: 'Check failed', description: err.response?.data?.error || 'Server error', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-foreground">✓</span>
            </div>
            <h1 className="text-2xl font-bold">Verify Your Email</h1>
            <p className="text-muted-foreground">
              Enter the email you used to register (or click the verification link from your inbox).
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); checkVerification(); }} className="space-y-4">
            <FormInput
              type="email"
              label="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); localStorage.setItem('pendingEmail', e.target.value); }}
              placeholder="your@email.com"
              required
            />

            <LoadingButton type="submit" size="lg" className="w-full" isLoading={isLoading}>
              Check Verification Status
            </LoadingButton>
          </form>

          <div className="mt-4 text-sm text-center text-muted-foreground">
            If you clicked the email link, this page may verify you automatically. If not, paste the same email you used to register and press "Check Verification Status".
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
