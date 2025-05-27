'use client';

import { useState } from 'react';
import { Input } from './input';
import { Textarea } from './textarea';
import { Button } from './button';
import { Label } from './label';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { WorkLedgerABI } from 'contracts/WorkLedgerABI';
import { WORKLEDGER_ADDRESS } from 'lib/constants';

interface TestimonialFormProps {
  onSubmitted?: () => void;
}

export default function TestimonialForm({ onSubmitted }: TestimonialFormProps) {
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

      await writeContractAsync({
        address: WORKLEDGER_ADDRESS,
        abi: WorkLedgerABI,
        functionName: 'leaveTestimonial',
        args: [work, message, rating],
        value: parseEther(tip),
      });

      setWork('');
      setMessage('');
      setRating(5);
      setTip('0.01');
      onSubmitted?.();
    } catch (err) {
      console.error('❌ Error submitting testimonial:', err);
      alert('Transaction failed. Check console for details.');
    }
  };

  return (
    <div className='space-y-4'>
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

      <Button onClick={handleSubmit} className='w-full' disabled={isPending}>
        💸 {isPending ? 'Sending...' : 'Send Tip + Leave Review'}
      </Button>
    </div>
  );
}
