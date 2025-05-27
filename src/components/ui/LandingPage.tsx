import React from 'react';
import Image from 'next/image';
import WalletConnect from './WalletConnect';
const LandingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-8'>
      <Image
        src='/work.svg'
        alt='Work'
        width={1920}
        height={300}
        className='w-full max-w-[80%] object-contain mx-auto'
        priority
      />

      <WalletConnect />

      <Image
        src='/ledger.svg'
        alt='Ledger'
        width={1920}
        height={300}
        className='w-full max-w-[80%] object-contain mx-auto'
      />
    </div>
  );
};

export default LandingPage;
