import React from 'react';
import { Button } from './button';
import TestimonialsGrid from './TestimonialsGrid';
import { useDisconnect } from 'wagmi';
import LeaveTestimonialDialog from './LeaveTestimonialDialog';

const ConnectedState = () => {
  const { disconnect } = useDisconnect();

  return (
    <>
      <div className='absolute top-6 right-6 flex gap-4'>
        <LeaveTestimonialDialog />
        <Button
          variant='outline'
          className='text-blue-700 border-white hover:bg-white hover:text-blue-700'
          onClick={() => disconnect()}
        >
          Disconnect
        </Button>
      </div>

      <TestimonialsGrid />
    </>
  );
};

export default ConnectedState;
