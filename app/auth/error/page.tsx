import Link from 'next/link';
import { ShieldX, ArrowLeft } from 'lucide-react';

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const isAccessDenied = error === 'AccessDenied';

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#09090B]">
      <div className="w-full max-w-[420px] space-y-6 animate-slide-up">
        {/* Error icon */}
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
            <ShieldX className="w-7 h-7 text-red-400" />
          </div>
        </div>

        {/* Error message */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1">
            <span className="text-[11px] font-semibold text-red-400 tracking-wide uppercase">
              Access Denied
            </span>
          </div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
            {isAccessDenied
              ? 'Only OneSolve emails are allowed'
              : 'Unable to sign you in'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
            {isAccessDenied ? (
              <>
                To access the Employee Portal you need a Google account ending with{' '}
                <span className="font-semibold text-[var(--text-secondary)]">@onesolve.io</span> or{' '}
                <span className="font-semibold text-[var(--text-secondary)]">@onesolve.in</span>.
              </>
            ) : (
              <>
                This might be a temporary issue or a configuration problem. You can try again, or
                reach out to your administrator.
              </>
            )}
          </p>
        </div>

        {/* Help card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[var(--radius-lg)] shadow-[0_4px_32px_rgba(0,0,0,0.3)] p-5 space-y-4 text-center">
          <p className="text-[12px] text-[var(--text-faint)] leading-relaxed">
            {isAccessDenied ? (
              <>
                If you believe you should have access, contact your OneSolve administrator so they
                can provision your account or update your email domain.
              </>
            ) : (
              <>
                If this keeps happening, share a screenshot of this page with the engineering team
                so we can investigate.
              </>
            )}
          </p>

          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center gap-2 h-10 rounded-[var(--radius-sm)]
              border border-zinc-700 text-[var(--text-secondary)] text-sm font-medium
              hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5
              transition-all duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}
