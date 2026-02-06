'use client';

import { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

function LoginContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#09090B]">
      <div className="w-full max-w-[400px] space-y-8 animate-slide-up">
        {/* Branding */}
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(59,130,246,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700" />
              <span className="relative text-base font-bold text-white tracking-wide">OS</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
              Sign in to your workspace
            </h1>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-[320px] mx-auto">
              Use your OneSolve Google account to access timesheets and internal resources.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[var(--radius-lg)] shadow-[0_4px_32px_rgba(0,0,0,0.3)] accent-bar-top p-6 space-y-5">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-[var(--text-muted)] tracking-[0.08em] uppercase">
              Continue with
            </p>
            <p className="text-[13px] text-[var(--text-faint)] leading-relaxed">
              We&apos;ll use your Google account to verify your OneSolve email.
            </p>
          </div>

          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: from })}
            className="w-full flex items-center justify-center gap-3 h-11 px-4 rounded-[var(--radius-sm)] cursor-pointer
              bg-white text-zinc-900 font-semibold text-sm
              shadow-[0_1px_3px_rgba(0,0,0,0.3)]
              hover:bg-zinc-100 hover:shadow-[0_2px_12px_rgba(255,255,255,0.08)]
              active:bg-zinc-200
              transition-all duration-150 ease-out"
          >
            {/* Google "G" logo */}
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Sign in with Google</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
            <span className="text-[10px] text-[var(--text-faint)] uppercase tracking-widest">Restricted</span>
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          </div>

          <p className="text-[12px] leading-relaxed text-[var(--text-faint)] text-center">
            Only accounts with{' '}
            <span className="font-medium text-blue-400">@onesolve.io</span> or{' '}
            <span className="font-medium text-blue-400">@onesolve.in</span> email addresses can
            sign in.
          </p>
        </div>

        {/* Footer */}
        <p className="text-[11px] text-[var(--text-faint)] text-center leading-relaxed">
          By signing in, you agree to OneSolve&apos;s internal usage and data access policies.
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
