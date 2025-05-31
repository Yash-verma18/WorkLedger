// src/app/layout.tsx
'use client';

import './globals.css';
import { ReactNode, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../wagmi.config'; // adjust path if needed
import '@rainbow-me/rainbowkit/styles.css';
import { WavyBackground } from 'components/ui/wavy-background';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang='en'>
      <body>
        <WavyBackground className=''>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </WavyBackground>
      </body>
    </html>
  );
}
