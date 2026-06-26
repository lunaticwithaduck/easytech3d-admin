import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';
import { isAuthed } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  if (await isAuthed()) redirect('/');
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-xs rounded-xl bg-white p-8 shadow-sm">
        <div className="mb-6 text-center text-xl font-bold">
          <span className="text-brand">EasyTech</span>3D · Admin
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
