'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './button';
import TestimonialsGrid from './TestimonialsGrid';
import LeaveTestimonialDialog from './LeaveTestimonialDialog';
import { useDisconnect } from 'wagmi';
import { readContract } from 'wagmi/actions';

import { WORKLEDGER_ADDRESS } from 'lib/constants';
import { WorkLedgerABI } from 'contracts/WorkLedgerABI';
import { formatEther } from 'viem';

import { config } from 'wagmi.config';
import Image from 'next/image';

export type TestimonialType = {
  from: string;
  message: string;
  workDescription: string;
  rating: number;
  tip: string;
  timestamp: string;
};

const ConnectedState = () => {
  const { disconnect } = useDisconnect();
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await readContract(config, {
          address: WORKLEDGER_ADDRESS,
          abi: WorkLedgerABI,
          functionName: 'getAllTestimonials',
        });

        const mapped = (data as any[]).map((t: any) => ({
          from: t.from,
          message: t.message,
          workDescription: t.workDescription,
          rating: Number(t.rating),
          tip: `${formatEther(BigInt(t.amount))} ETH`,
          rawTimestamp: Number(t.timestamp), // keep raw timestamp for sorting
          timestamp: new Date(Number(t.timestamp) * 1000).toLocaleString(),
        }));

        // Sort by timestamp descending (latest first)
        const sorted = mapped.sort((a, b) => b.rawTimestamp - a.rawTimestamp);

        setTestimonials(sorted);
      } catch (err) {
        console.error('❌ Failed to fetch testimonials:', err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    testimonials.length > 0 && (
      <>
        <div className='w-full h-15 relative flex  items-center px-6 z-10  rounded-4xl  mt-2 '>
          <Image
            src='/banner1.svg'
            alt='Navbar Background'
            fill
            className='absolute top-0 left-0 w-full h-full object-cover z-0 rounded-4xl opacity-20'
          />

          <div className='flex gap-4 justify-between z-20'>
            <h1 className='text-white text-2xl font-bold'>Work Ledger</h1>

            <LeaveTestimonialDialog setTestimonials={setTestimonials} />
            <Button
              variant='outline'
              className=' text-blue-700 transition duration-200'
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          </div>
        </div>

        <div className='mt-10'>
          <TestimonialsGrid testimonials={testimonials} />
        </div>
      </>
    )
  );
};

export default ConnectedState;
