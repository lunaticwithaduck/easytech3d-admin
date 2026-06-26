export const lv = (cents: number): string => `${(cents / 100).toFixed(2)} лв`;

export const fmtSize = (bytes: number): string =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export const fmtDate = (iso: string): string =>
  new Date(iso).toLocaleString('bg-BG', { dateStyle: 'medium', timeStyle: 'short' });

export const ORDER_STATUS: { value: string; label: string }[] = [
  { value: 'PENDING_PAYMENT', label: 'Чака плащане' },
  { value: 'CONFIRMED', label: 'Потвърдена' },
  { value: 'FULFILLED', label: 'Изпълнена' },
  { value: 'CANCELLED', label: 'Отказана' },
];

export const QUOTE_STATUS: { value: string; label: string }[] = [
  { value: 'NEW', label: 'Нова' },
  { value: 'QUOTED', label: 'Оферирана' },
  { value: 'ACCEPTED', label: 'Приета' },
  { value: 'REJECTED', label: 'Отказана' },
];

const TONE: Record<string, string> = {
  PENDING_PAYMENT: 'bg-amber-100 text-amber-700',
  CONFIRMED: 'bg-emerald-100 text-emerald-700',
  FULFILLED: 'bg-sky-100 text-sky-700',
  CANCELLED: 'bg-rose-100 text-rose-700',
  NEW: 'bg-amber-100 text-amber-700',
  QUOTED: 'bg-sky-100 text-sky-700',
  ACCEPTED: 'bg-emerald-100 text-emerald-700',
  REJECTED: 'bg-rose-100 text-rose-700',
};
export const statusTone = (s: string): string => TONE[s] ?? 'bg-slate-100 text-slate-600';
