'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function Home() {
  const [work, setWork] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState('0.01');

  const handleSubmit = async () => {
    console.log({
      work,
      message,
      rating,
      tip,
    });

    // here you will integrate with the smart contract
  };

  return (
    <main className='max-w-xl mx-auto py-12 px-4 space-y-4'>
      <h1 className='text-3xl font-bold text-center font-comic'>
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

      <Button onClick={handleSubmit} className='w-full'>
        💸 Send Tip + Leave Review
      </Button>
    </main>
  );
}
