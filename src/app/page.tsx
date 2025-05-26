'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from 'components/ui/input';
import { Textarea } from 'components/ui/textarea';
import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { useAccount, useDisconnect, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';

import WalletConnect from 'components/ui/WalletConnect';
import { WorkLedgerABI } from 'contracts/WorkLedgerABI';
import { WORKLEDGER_ADDRESS } from 'lib/constants';

export default function Home() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { writeContractAsync, isPending } = useWriteContract();

  const [work, setWork] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState('0.01');

  const handleSubmit = async () => {
    try {
      if (!isConnected) return alert('Connect wallet first');
      if (!work || !message) return alert('Fill all fields');

      const txHash = await writeContractAsync({
        address: WORKLEDGER_ADDRESS,
        abi: WorkLedgerABI,
        functionName: 'leaveTestimonial',
        args: [work, message, rating],
        value: parseEther(tip),
      });

      console.log('✅ Tx submitted:', txHash);
      setWork('');
      setMessage('');
      setRating(5);
      setTip('0.01');
    } catch (err) {
      console.error('❌ Error submitting testimonial:', err);
      alert('Transaction failed. Check console for details.');
    }
  };

  return (
    <main className='min-h-screen w-full bg-sky-600 text-white flex flex-col items-center justify-center px-4 relative'>
      {isConnected ? (
        <>
          {/* Disconnect Button */}
          <div className='absolute top-6 right-6'>
            <Button
              variant='outline'
              className='text-white border-white hover:bg-white hover:text-blue-700'
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          </div>

          {/* Testimonial Form */}
          <div className='max-w-xl w-full space-y-4'>
            <h1 className='text-3xl font-bold text-center font-comic mb-2'>
              🧾 Leave a Testimonial
            </h1>

            <div className='space-y-2'>
              <Label>Work Description</Label>
              <Input
                placeholder='Built a cool dApp...'
                value={work}
                onChange={(e) => setWork(e.target.value)}
              />
            </div>

            <div className='space-y-2'>
              <Label>Your Message</Label>
              <Textarea
                placeholder='Yash was super fast and delivered amazing work!'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className='space-y-2'>
              <Label>Rating (1–5)</Label>
              <Input
                type='number'
                min='1'
                max='5'
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              />
            </div>

            <div className='space-y-2'>
              <Label>Tip in ETH</Label>
              <Input
                type='number'
                step='0.001'
                value={tip}
                onChange={(e) => setTip(e.target.value)}
              />
            </div>

            <Button
              onClick={handleSubmit}
              className='w-full bg-white text-blue-700 hover:bg-gray-200'
              disabled={isPending}
            >
              💸 {isPending ? 'Sending...' : 'Send Tip + Leave Review'}
            </Button>
          </div>
        </>
      ) : (
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
      )}
    </main>
  );
}
