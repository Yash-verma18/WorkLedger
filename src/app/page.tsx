'use client';

import { useAccount } from 'wagmi';

import ConnectedState from 'components/ui/ConnectedState';
import LandingPage from 'components/ui/LandingPage';
import PageWrapper from 'components/ui/PageWrapper';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <PageWrapper>
      {isConnected ? <ConnectedState /> : <LandingPage />}
    </PageWrapper>
  );
}
