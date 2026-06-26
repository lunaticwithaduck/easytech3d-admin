'use server';

import { revalidatePath } from 'next/cache';
import { adminFetch } from '@/lib/api';

export async function updateOrderStatus(id: string, status: string): Promise<void> {
  await adminFetch(`/admin/orders/${id}/status`, { method: 'PATCH', body: { status } });
  revalidatePath('/orders');
  revalidatePath('/');
}

export async function updateQuoteStatus(id: string, status: string): Promise<void> {
  await adminFetch(`/admin/print-quotes/${id}/status`, { method: 'PATCH', body: { status } });
  revalidatePath('/quotes');
  revalidatePath('/');
}
