'use client';

import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const HIDDEN_PATHS = ['/login', '/auth/error'];

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (HIDDEN_PATHS.includes(pathname)) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const userName = session?.user?.name || session?.user?.email || '';
  const initials = userName
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-30 bg-[#06060A]/85 backdrop-blur-xl border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden shadow-[0_0_12px_rgba(59,130,246,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-700" />
            <span className="relative text-[11px] font-bold text-white tracking-wider">OS</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-semibold text-[var(--text-primary)] tracking-tight">
              Employee Portal
            </span>
            <span className="text-[10px] text-[var(--text-faint)] tracking-wide uppercase">
              Timesheets
            </span>
          </div>
        </div>

        {/* User & Actions */}
        <div className="flex items-center gap-2.5">
          {session?.user && (
            <>
              {/* User pill */}
              <div className="hidden sm:flex items-center gap-2.5 pl-1.5 pr-3.5 py-1 rounded-full bg-slate-800/50 border border-[var(--border-subtle)]">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/25 to-indigo-500/20 text-blue-400 ring-1 ring-blue-500/20">
                  <span className="text-[10px] font-bold leading-none">{initials}</span>
                </div>
                <span className="text-xs font-medium text-[var(--text-secondary)] truncate max-w-[130px]">
                  {session.user.name || session.user.email}
                </span>
              </div>

              <div className="w-px h-5 bg-[var(--border-subtle)] hidden sm:block" />

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-[var(--text-faint)] hover:text-rose-400 hover:bg-rose-500/[0.06]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
