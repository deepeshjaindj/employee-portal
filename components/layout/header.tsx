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
    <header className="sticky top-0 z-30 border-glow-bottom" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700" />
            <span className="relative text-[11px] font-bold text-stone-950 tracking-wide">OS</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">
              Employee Portal
            </span>
            <span className="text-[11px] text-[var(--text-faint)]">
              Timesheets & projects
            </span>
          </div>
        </div>

        {/* User & Actions */}
        <div className="flex items-center gap-3">
          {session?.user && (
            <>
              {/* User pill */}
              <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[var(--bg-hover)] border border-[var(--border-subtle)]">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600/20 text-amber-400">
                  <span className="text-[9px] font-bold leading-none">{initials}</span>
                </div>
                <span className="text-xs font-medium text-[var(--text-secondary)] truncate max-w-[140px]">
                  {session.user.name || session.user.email}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-[var(--text-faint)] hover:text-red-400 hover:bg-red-500/5"
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
