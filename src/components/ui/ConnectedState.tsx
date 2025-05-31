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
import { Navbar } from 'components/Navbar/Navbar';
import TestimonialForm from './TestimonialForm';

export type TestimonialType = {
  from: string;
  message: string;
  workDescription: string;
  rating: number;
  tip: string;
  timestamp: string;
};

const ConnectedState = () => {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [showTestimonialForm, setOpen] = useState(false);

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
    testimonials?.length > 0 && (
      <>
        <div className='w-full h-15 relative flex  items-center px-6 z-10  rounded-4xl  mt-2 '>
          <Navbar setOpen={setOpen} />
        </div>

        <p className='text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center'>
          Your Testimonials
        </p>
        <p className='text-base md:text-lg mt-4 text-white font-normal inter-var text-center'>
          Leverage the power of on chain work review.
        </p>

        {!showTestimonialForm && (
          <div className='mt-10'>
            <TestimonialsGrid testimonials={testimonials} />
          </div>
        )}

        {showTestimonialForm && (
          <TestimonialForm
            onSubmitted={() => setOpen(false)}
            setTestimonials={setTestimonials}
          />
        )}
      </>
    )
  );
};

export default ConnectedState;
