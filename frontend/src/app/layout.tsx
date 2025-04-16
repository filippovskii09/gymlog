import PageLayout from '@/components/layouts/PageLayout';
import ReduxProvider from '@/providers/ReduxProvider';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

const notoSansJP = {
  fontFamily: "'Noto Sans JP', sans-serif",
  subsets: ['latin', 'japanese'],
};

export const metadata: Metadata = {
  title: 'GymLog',
  description: 'Your assistant in the gym',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: notoSansJP.fontFamily }}>
        <PageLayout>
          <ReduxProvider>{children}</ReduxProvider>
        </PageLayout>
      </body>
    </html>
  );
}
