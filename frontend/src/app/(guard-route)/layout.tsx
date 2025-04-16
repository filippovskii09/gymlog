import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function GuardRouteLayout({ children }: { children: ReactNode }) {
  const token = (await cookies()).get('refreshToken')?.value;

  if (!token) {
    redirect('/login');
  }

  return children;
}
