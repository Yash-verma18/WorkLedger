'use client';

import Image from 'next/image';
import { TestimonialType } from './ConnectedState';
import { useState } from 'react';

type Props = {
  testimonials: TestimonialType[];
  setTestimonials?: React.Dispatch<React.SetStateAction<TestimonialType[]>>;
};

export default function TestimonialsGrid({ testimonials }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  return (
    <div className='w-full py-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {testimonials.map((t, i) => (
        <div
          key={i}
          className='rounded-2xl bg-white p-5 shadow-xl flex flex-col gap-3 text-black'
        >
          {/* Avatar and Address */}
          <div className='bg-gray-100 rounded-xl px-4 py-2 text-sm font-bold w-full'>
            <div className='flex items-center justify-baseline gap-3 w-full'>
              <Image src='/avatar.svg' alt='Avatar' width={56} height={56} />
              <div>
                <p className='font-semibold text-lg'>@orbit</p>
                <p className='text-gray-500 text-xs'>
                  {t.from.slice(0, 6)}...{t.from.slice(-4)}
                </p>
              </div>
            </div>
          </div>

          {/* Tip and Rating */}
          <div className='flex gap-2'>
            <div className='bg-gray-100 rounded-xl px-4 py-2 text-sm font-bold w-full'>
              <p className='text-xs text-gray-500'>TIP</p>
              <p className='text-lg'>{t.tip}</p>
            </div>
            <div className='bg-gray-100 rounded-xl px-4 py-2 text-sm font-bold w-full'>
              <p className='text-xs text-gray-500'>RATING</p>
              <p className='text-lg'>⭐ {t.rating}/5</p>
            </div>
          </div>

          {/* Message */}
          <div className='bg-gray-100 rounded-xl px-4 py-2 w-full'>
            <p className='text-lg font-semibold'>{t.message}</p>
          </div>

          {/* Banner */}
          <div className='text-white rounded-xl overflow-hidden relative h-24 flex items-end px-4 py-3 mt-2'>
            <Image
              src='/banner1.svg'
              alt='Banner'
              fill
              className='absolute top-0 left-0 w-full h-full object-cover z-0'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-black/30 z-10' />
            <div className='relative z-10'>
              <p className='text-xs text-gray-200 uppercase'>Work Details</p>
              {t.workDescription.length > 50 ? (
                <span className='text-xl font-extrabold'>
                  {expandedIndex === i ? (
                    <>
                      {t.workDescription}{' '}
                      <button
                        onClick={() => setExpandedIndex(null)}
                        className='text-sm text-blue-200 underline ml-1'
                      >
                        less..
                      </button>
                    </>
                  ) : (
                    <>
                      {t.workDescription.slice(0, 30)}...
                      <button
                        onClick={() => setExpandedIndex(i)}
                        className='text-sm text-blue-200 underline ml-1'
                      >
                        more..
                      </button>
                    </>
                  )}
                </span>
              ) : (
                <span className='text-xl font-extrabold'>
                  {t.workDescription}
                </span>
              )}
            </div>
          </div>

          {/* Timestamp */}
          <p className='text-xs text-right text-gray-500'>{t.timestamp}</p>
        </div>
      ))}
    </div>
  );
}
