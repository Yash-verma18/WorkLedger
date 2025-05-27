'use client';

import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <main
      className='min-h-screen w-full text-white flex flex-col items-center justify-center px-4 relative'
      style={{
        backgroundImage: "url('/bg.svg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </main>
  );
}
