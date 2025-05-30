'use client';

import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LandingPage from 'components/ui/LandingPage';
import PageWrapper from 'components/ui/PageWrapper';

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();
  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard');
    }
  }, [isConnected, router]);

  return (
    <PageWrapper>
      <LandingPage />
    </PageWrapper>
  );
}
