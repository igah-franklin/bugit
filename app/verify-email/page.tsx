'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setAccessToken, setRefreshToken } from '@/services/token.service';
import { verifyEmailAction } from '@/actions/auth/verify-email-action';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [verificationState, setVerificationState] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');
  const router = useRouter();

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setVerificationState('error');
        return;
      }

      setVerificationState('loading');
      
      try {
        // Replace this with your actual verification logic
        // Example: const response = await fetch(`/api/verify?code=${code}`);
        // await new Promise(resolve => setTimeout(resolve, 1500));
        const { data, status } = await verifyEmailAction(token);
        
        // Simulate successful verification
        // In reality, you would check the response from your API
        if (status === 200) { // Replace with your validation logic
          setVerificationState('success');
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          router.push('/login')
        } else {
          setVerificationState('error');
        }
      } catch (error) {
        setVerificationState('error');
      }
    }

    if (token) {
      verifyToken();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Code Verification</h1>
        
        {verificationState === 'idle' && !token && (
          <div className="text-gray-600 bg-yellow-500">
            No verification code provided
          </div>
        )}

        {verificationState === 'loading' && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            <p className="text-gray-600">Verifying your code...</p>
          </div>
        )}

        {verificationState === 'success' && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <div>
              <p className="text-green-600 font-medium">Verification Successful!</p>
              <p className="text-gray-500 mt-2">Your code has been verified successfully.</p>
            </div>
          </div>
        )}

        {verificationState === 'error' && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="h-12 w-12 text-red-500" />
            <div>
              <p className="text-red-600 font-medium">Verification Failed</p>
              <p className="text-gray-500 mt-2">
                {!token 
                  ? "No verification code found in URL" 
                  : "The provided code is invalid or has expired"}
              </p>
            </div>
          </div>
        )}
      </div>
  </div>
  </div>
  )}
   