'use client';

import Image from 'next/image';

const mockTestimonials = [
  {
    from: '0x196G...31Bh',
    message: 'Well done',
    workDescription: 'Built a full dashboard',
    rating: 5,
    tip: '0.02 ETH',
    timestamp: '2 hours ago',
  },
  {
    from: '0xFA3C...29De',
    message: 'Quick delivery and amazing results.',
    workDescription: 'Designed a landing page',
    rating: 4,
    tip: '0.05 ETH',
    timestamp: '1 day ago',
  },
  {
    from: '0x8eD3...40Zq',
    message: 'Code quality was superb. Thanks!',
    workDescription: 'Integrated payment gateway',
    rating: 5,
    tip: '0.03 ETH',
    timestamp: '3 days ago',
  },
];

export default function TestimonialsGrid() {
  return (
    <div className='w-full py-8 px-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {mockTestimonials.map((t, i) => (
        <div
          key={i}
          className='rounded-2xl bg-white p-5 shadow-xl flex flex-col gap-3 text-black'
        >
          {/* Avatar and Address */}
          <div className='bg-gray-100 rounded-xl px-4 py-2 text-sm font-bold w-full'>
            <div className='flex items-center justify-baseline gap-3 w-full '>
              <Image src='/avatar.svg' alt='Avatar' width={56} height={56} />
              <div>
                <p className='font-semibold text-lg'>@orbit</p>
                <p className=' text-gray-500'>{t.from}</p>
              </div>
            </div>
          </div>

          {/* Tip and Rating */}
          <div className='flex gap-2 '>
            <div className='bg-gray-100 rounded-xl px-4 py-2 text-sm font-bold w-full'>
              <p className='text-xs text-gray-500'>TIP</p>
              <p className='text-lg'>{t.tip}</p>
            </div>
            <div className='bg-gray-100 rounded-xl px-4 py-2 text-sm font-bold w-full '>
              <p className='text-xs text-gray-500'>RATING</p>
              <p className='text-lg'>⭐ {t.rating}/5</p>
            </div>
          </div>

          {/* Message */}
          <div className='bg-gray-100 rounded-xl px-4 py-2 w-full'>
            <p className='text-lg font-semibold'>{t.message}</p>
          </div>

          {/* Banner */}
          <div className=' text-white rounded-xl overflow-hidden relative h-24 flex items-end px-4 py-3 mt-2'>
            <Image
              src='/banner1.svg'
              alt='Banner'
              fill
              className='absolute top-0 left-0 w-full h-full object-cover z-0'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-black/30 z-10' />
            <div className='relative z-10'>
              <p className='text-xs text-gray-200 uppercase'>Work Details</p>
              <p className='text-xl font-extrabold'>{t.workDescription}</p>
            </div>
          </div>

          {/* Timestamp */}
          <p className='text-xs text-right text-gray-500'>{t.timestamp}</p>
        </div>
      ))}
    </div>
  );
}
