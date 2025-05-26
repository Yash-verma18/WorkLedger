// src/wagmi.config.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'WorkLedger',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // from WalletConnect
  chains: [sepolia],
  ssr: true,
});
