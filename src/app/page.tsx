import { AdminShell } from '@/components/AdminShell';
import { adminFetch } from '@/lib/api';
import { requireAuth } from '@/lib/auth';
import { fmtDate, lv, statusTone } from '@/lib/format';
import type { AdminStats } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  await requireAuth();
  const s = await adminFetch<AdminStats>('/admin/stats');

  const cards = [
    { label: 'Приходи', value: lv(s.revenueCents) },
    { label: 'Поръчки', value: s.ordersCount },
    { label: '3D Заявки', value: s.quotesCount },
    { label: 'Запитвания', value: s.messagesCount },
    { label: 'Абонати', value: s.subscribersCount },
    { label: 'Чакат наличност', value: s.backInStockCount },
  ];

  return (
    <AdminShell active="dashboard" title="Табло">
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{c.label}</div>
            <div className="mt-1 text-2xl font-bold text-slate-900">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 font-semibold text-slate-900">Последни поръчки</h2>
          <ul className="divide-y divide-slate-100">
            {s.recentOrders.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                <span className="truncate">
                  <span className="font-medium">{o.orderNumber}</span> · {o.name}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusTone(o.status)}`}>{o.status}</span>
                  <span className="font-semibold">{lv(o.totalCents)}</span>
                </span>
              </li>
            ))}
            {s.recentOrders.length === 0 && <li className="py-2 text-sm text-slate-400">Няма поръчки</li>}
          </ul>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 font-semibold text-slate-900">Последни 3D заявки</h2>
          <ul className="divide-y divide-slate-100">
            {s.recentQuotes.map((q) => (
              <li key={q.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                <span className="truncate">
                  <span className="font-medium">{q.quoteNumber}</span> · {q.name} · {q.material}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusTone(q.status)}`}>{q.status}</span>
                  <span className="font-semibold">{lv(q.totalPriceCents)}</span>
                </span>
              </li>
            ))}
            {s.recentQuotes.length === 0 && <li className="py-2 text-sm text-slate-400">Няма заявки</li>}
          </ul>
        </section>
      </div>
      <p className="mt-6 text-xs text-slate-400">Последно обновяване: {fmtDate(new Date().toISOString())}</p>
    </AdminShell>
  );
}
