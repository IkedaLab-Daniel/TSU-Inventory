'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth-context'

export default function LoginPage() {
  const { user, login } = useAuth()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect already-authenticated users
  useEffect(() => {
    if (user) {
      router.replace('/dashboard')
    }
  }, [user, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const success = login(email, password)

    if (success) {
      router.replace('/dashboard')
    } else {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    setError('Google sign-in is not available in this prototype.')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#e0f2fe]">
      {/* Header */}
      <header className="bg-[#1e3a8a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Philippines Seal */}
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <Image
              src="/ph-seal.svg"
              alt="Republic of the Philippines"
              fill
              className="object-contain"
            />
          </div>
          
          {/* Mabalacat City Seal */}
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <Image
              src="/mabalacat-seal.svg"
              alt="Mabalacat City"
              fill
              className="object-contain"
            />
          </div>
          
          {/* City Name */}
          <div className="text-white">
            <div className="text-xs md:text-sm font-normal tracking-wide">
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div className="text-lg md:text-xl font-bold tracking-wide">
              MABALACAT CITY
            </div>
            <div className="text-xs md:text-sm font-normal tracking-wide">
              PROVINCE OF PAMPANGA
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="flex items-center gap-3">
          <span className="text-white text-sm hidden md:inline">
            Don't have an account?
          </span>
          <Button
            variant="default"
            className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e3a8a] font-semibold px-6"
          >
            Register
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        <div className="w-full grid lg:grid-cols-2">
          {/* Left Side - Login Form */}
          <div className="flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                {/* Welcome Text */}
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-2">
                    Welcome Back!
                  </h1>
                  <p className="text-[#64748b] text-base">
                    Sign in to your account to continue
                  </p>
                </div>

                {/* Demo credentials hint */}
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 space-y-1">
                  <p className="font-semibold">Demo Credentials:</p>
                  <p>Admin: admin@tau.edu.ph / admin123</p>
                  <p>Staff: staff@tau.edu.ph / staff123</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#0f172a]">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<Mail className="w-5 h-5" />}
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#0f172a]">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<Lock className="w-5 h-5" />}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0f172a] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <Checkbox
                      id="remember"
                      label="Remember me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <Link
                      href="/forgot-password"
                      className="text-sm text-[#2563eb] hover:underline font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold text-base disabled:opacity-60"
                  >
                    {loading ? 'Signing in...' : 'Login'}
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#e2e8f0]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-[#64748b]">OR</span>
                    </div>
                  </div>

                  {/* Google Sign In */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleSignIn}
                    className="w-full h-12 border-2 border-[#e2e8f0] hover:bg-[#f8fafc] font-medium text-base"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </form>

                {/* Terms & Privacy */}
                <div className="mt-8 text-center text-sm text-[#64748b]">
                  By continuing, you agree to our{' '}
                  <Link
                    href="/terms"
                    className="text-[#2563eb] hover:underline font-medium"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-[#2563eb] hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Background Image */}
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#bfdbfe]/50 to-[#e0f2fe]/50">
              <Image
                src="/mabalacat-building.jpg"
                alt="Mabalacat City Building"
                fill
                className="object-cover mix-blend-multiply"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
