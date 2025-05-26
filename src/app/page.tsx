'use client';

import { useState } from 'react';
import { Input } from 'components/ui/input';
import { Textarea } from 'components/ui/textarea';
import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';

import WalletConnect from 'components/ui/WalletConnect';
import { WorkLedgerABI } from 'contracts/WorkLedgerABI';
import { WORKLEDGER_ADDRESS } from 'lib/constants';

export default function Home() {
  const { isConnected } = useAccount();
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
    <main className='max-w-xl mx-auto py-12 px-4 space-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold font-comic'>
          🧾 Leave a Testimonial
        </h1>
        <WalletConnect />
      </div>

      {!isConnected ? (
        <p className='text-center mt-8 text-gray-600'>
          Please connect your wallet to leave a testimonial.
        </p>
      ) : (
        <>
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
            className='w-full'
            disabled={isPending}
          >
            💸 {isPending ? 'Sending...' : 'Send Tip + Leave Review'}
          </Button>
        </>
      )}
    </main>
  );
}
