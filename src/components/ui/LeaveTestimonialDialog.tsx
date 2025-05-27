// components/ui/LeaveTestimonialDialog.tsx

'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import TestimonialForm from './TestimonialForm';

export default function LeaveTestimonialDialog({
  setTestimonials,
}: {
  setTestimonials: (testimonials: any[]) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' className='text-blue-700'>
          Leave Testimonial
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-xl bg-white'>
        <TestimonialForm
          onSubmitted={() => setOpen(false)}
          setTestimonials={setTestimonials}
        />
      </DialogContent>
    </Dialog>
  );
}
