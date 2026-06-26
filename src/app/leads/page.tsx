import { AdminShell } from '@/components/AdminShell';
import { adminFetch } from '@/lib/api';
import { requireAuth } from '@/lib/auth';
import { fmtDate } from '@/lib/format';
import type { BackInStock, ContactMessage, Subscriber } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  await requireAuth();
  const [messages, subscribers, backInStock] = await Promise.all([
    adminFetch<ContactMessage[]>('/admin/messages'),
    adminFetch<Subscriber[]>('/admin/subscribers'),
    adminFetch<BackInStock[]>('/admin/back-in-stock'),
  ]);

  return (
    <AdminShell active="leads" title="Контакти">
      <div className="flex flex-col gap-8">
        <section>
          <h2 className="mb-3 font-semibold text-slate-900">Запитвания ({messages.length})</h2>
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <ul className="divide-y divide-slate-100">
              {messages.map((m) => (
                <li key={m.id} className="px-4 py-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{m.name} · <span className="text-slate-500">{m.email}</span></span>
                    <span className="text-xs text-slate-400">{fmtDate(m.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{m.message}</p>
                </li>
              ))}
              {messages.length === 0 && <li className="px-4 py-3 text-sm text-slate-400">Няма запитвания</li>}
            </ul>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-3 font-semibold text-slate-900">Абонати ({subscribers.length})</h2>
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              <ul className="divide-y divide-slate-100">
                {subscribers.map((s) => (
                  <li key={s.id} className="flex justify-between px-4 py-2.5 text-sm">
                    <span>{s.email}{s.firstName ? ` · ${s.firstName} ${s.lastName ?? ''}` : ''}</span>
                    <span className="text-xs text-slate-400">{fmtDate(s.createdAt)}</span>
                  </li>
                ))}
                {subscribers.length === 0 && <li className="px-4 py-2.5 text-sm text-slate-400">Няма абонати</li>}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-slate-900">Чакат наличност ({backInStock.length})</h2>
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              <ul className="divide-y divide-slate-100">
                {backInStock.map((b) => (
                  <li key={b.id} className="flex justify-between px-4 py-2.5 text-sm">
                    <span>{b.email} · <span className="text-slate-500">{b.productHandle}</span></span>
                    <span className="text-xs text-slate-400">{fmtDate(b.createdAt)}</span>
                  </li>
                ))}
                {backInStock.length === 0 && <li className="px-4 py-2.5 text-sm text-slate-400">Няма заявки</li>}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
