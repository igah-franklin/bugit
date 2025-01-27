import { Button } from '@/components/ui/button'
import { MailCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <MailCheck className="mx-auto h-16 w-16 text-gray-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign Up Successful!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for signing up. We&apos;ve sent a verification email to your inbox. Please check your email and click on
          the verification link to activate your account.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <p className="text-sm text-blue-800">
            If you don&apos;t see the email in your inbox, please check your spam folder.
          </p>
        </div>
        <Button variant={'secondary'} asChild className="w-full">
          <Link href="/login">Return to Login</Link>
        </Button>
      </div>
    </div>
  )
}
