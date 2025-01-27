"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoginFormValues, loginSchema } from "@/lib/validation-schema"
import { Icons } from "@/components/icons"
import { setAccessToken, setRefreshToken } from "@/services/token.service"
import { signInAction } from "@/actions/auth/sign-in-action"
import { redirect, useRouter } from "next/navigation"
import { googleSignInAction } from "@/actions/auth/google-auth-action"




export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null) // Optional: to show error messages
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: responseData, status } = await signInAction(data);
      if (status === 200) {
        setAccessToken(responseData.accessToken);
        setRefreshToken(responseData.refreshToken);
        router.push('/')
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error: any) {
      setError(error?.message || "An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleGoogleSignIn = async () => {
    try {
      const { data, status } = await googleSignInAction();
      if(status===200){
        window.open(data.redirectUrl, '_self');
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} className="py-5" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="***********" {...field} className="py-5" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button type="button" variant="outline" onClick={handleGoogleSignIn} className="w-full py-6" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
      </form>
    </Form>
  )
}
