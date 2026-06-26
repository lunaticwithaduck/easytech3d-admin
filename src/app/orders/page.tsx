import { updateOrderStatus } from '@/actions/status';
import { AdminShell } from '@/components/AdminShell';
import { StatusSelect } from '@/components/StatusSelect';
import { adminFetch } from '@/lib/api';
import { requireAuth } from '@/lib/auth';
import { ORDER_STATUS, fmtDate, lv } from '@/lib/format';
import type { AdminOrder } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  await requireAuth();
  const orders = await adminFetch<AdminOrder[]>('/admin/orders');

  return (
    <AdminShell active="orders" title={`Поръчки (${orders.length})`}>
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">№</th>
              <th className="px-4 py-3">Клиент</th>
              <th className="px-4 py-3">Артикули</th>
              <th className="px-4 py-3">Плащане</th>
              <th className="px-4 py-3">Сума</th>
              <th className="px-4 py-3">Дата</th>
              <th className="px-4 py-3">Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{o.orderNumber}</td>
                <td className="px-4 py-3">
                  <div>{o.name}</div>
                  <div className="text-xs text-slate-500">{o.email} · {o.phone}</div>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  <div>{o.itemCount} бр · {o.city}</div>
                  {o.deliveryType === 'OFFICE' ? (
                    <div className="text-xs font-medium text-sky-700">
                      📦 {o.shippingMethod === 'SPEEDY' ? 'Спиди' : 'Еконт'} офис: {o.officeName}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">До адрес · {o.address1}</div>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">{o.paymentMethod === 'COD' ? 'Наложен платеж' : 'Карта'}</td>
                <td className="px-4 py-3 font-semibold text-slate-900">{lv(o.totalCents)}</td>
                <td className="px-4 py-3 text-slate-500">{fmtDate(o.createdAt)}</td>
                <td className="px-4 py-3">
                  <StatusSelect id={o.id} value={o.status} options={ORDER_STATUS} action={updateOrderStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <div className="p-6 text-center text-slate-400">Няма поръчки</div>}
      </div>
    </AdminShell>
  );
}
