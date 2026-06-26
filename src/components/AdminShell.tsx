import Link from 'next/link';
import type { ReactNode } from 'react';
import { logout } from '@/actions/auth';

const NAV = [
  { href: '/', key: 'dashboard', label: 'Табло' },
  { href: '/orders', key: 'orders', label: 'Поръчки' },
  { href: '/quotes', key: 'quotes', label: '3D Заявки' },
  { href: '/leads', key: 'leads', label: 'Контакти' },
];

export function AdminShell({
  active,
  title,
  children,
}: {
  active: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white p-4">
        <div className="mb-6 px-2 text-lg font-bold">
          <span className="text-brand">EasyTech</span>3D
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${active === n.key ? 'bg-brand text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-auto pt-6">
          <button
            type="submit"
            className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-100"
          >
            Изход
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">{title}</h1>
        {children}
      </main>
    </div>
  );
}
