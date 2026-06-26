'use client';

import { useActionState } from 'react';
import { login } from '@/actions/auth';

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {} as { error?: string });
  return (
    <form action={action} className="flex flex-col gap-3">
      <input
        name="password"
        type="password"
        placeholder="Парола"
        // biome-ignore lint/a11y/noAutofocus: single-field login screen.
        autoFocus
        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand"
      />
      {state?.error && <p className="text-sm text-rose-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand px-4 py-2 font-semibold text-white disabled:opacity-60"
      >
        {pending ? '…' : 'Вход'}
      </button>
    </form>
  );
}
