'use client';

import TestimonialForm from 'components/ui/TestimonialForm';
import { useState } from 'react';

const page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <TestimonialForm
        onSubmitted={() => setOpen(false)}
        setTestimonials={() => {}}
      />
    </div>
  );
};

export default page;
