'use client';

import { useTransition } from 'react';
import { statusTone } from '@/lib/format';

export function StatusSelect({
  id,
  value,
  options,
  action,
}: {
  id: string;
  value: string;
  options: { value: string; label: string }[];
  action: (id: string, status: string) => Promise<void>;
}) {
  const [pending, start] = useTransition();
  return (
    <select
      defaultValue={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value;
        start(() => action(id, next));
      }}
      className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none ${statusTone(value)} ${pending ? 'opacity-50' : ''}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
