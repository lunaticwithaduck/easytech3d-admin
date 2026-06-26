import { updateQuoteStatus } from '@/actions/status';
import { AdminShell } from '@/components/AdminShell';
import { StatusSelect } from '@/components/StatusSelect';
import { adminFetch } from '@/lib/api';
import { requireAuth } from '@/lib/auth';
import { QUOTE_STATUS, fmtDate, fmtSize, lv } from '@/lib/format';
import type { AdminQuote } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function QuotesPage() {
  await requireAuth();
  const quotes = await adminFetch<AdminQuote[]>('/admin/print-quotes');

  return (
    <AdminShell active="quotes" title={`3D Заявки (${quotes.length})`}>
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">№</th>
              <th className="px-4 py-3">Клиент</th>
              <th className="px-4 py-3">Спецификация</th>
              <th className="px-4 py-3">Файлове</th>
              <th className="px-4 py-3">Цена</th>
              <th className="px-4 py-3">Дата</th>
              <th className="px-4 py-3">Статус</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{q.quoteNumber}</td>
                <td className="px-4 py-3">
                  <div>{q.name}</div>
                  <div className="text-xs text-slate-500">{q.email} · {q.phone}</div>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {q.material} / {q.color}
                  <div className="text-xs text-slate-400">{q.infill}% · {q.dims}mm · {q.totalWeightG}г · ×{q.qty}</div>
                </td>
                <td className="px-4 py-3 text-xs">
                  {q.files.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {q.files.map((f) => (
                        <a
                          key={f.id}
                          href={`/api/quote-file/${q.id}/${f.id}`}
                          download
                          className="inline-flex items-center gap-1 font-medium text-sky-600 hover:underline"
                        >
                          ⬇ {f.fileName}
                          <span className="text-slate-400">({fmtSize(f.sizeBytes)})</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400">{q.fileNames.join(', ') || '—'}</span>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900">{lv(q.totalPriceCents)}</td>
                <td className="px-4 py-3 text-slate-500">{fmtDate(q.createdAt)}</td>
                <td className="px-4 py-3">
                  <StatusSelect id={q.id} value={q.status} options={QUOTE_STATUS} action={updateQuoteStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {quotes.length === 0 && <div className="p-6 text-center text-slate-400">Няма заявки</div>}
      </div>
    </AdminShell>
  );
}
