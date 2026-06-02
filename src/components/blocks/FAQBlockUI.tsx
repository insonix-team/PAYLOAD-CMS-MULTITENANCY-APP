'use client';
import { useState } from 'react';

export const FAQBlockUI = ({ data }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">{data.heading}</h2>

      {data.faqs?.map((faq: any, i: number) => (
        <div key={i} className="border-b py-4">
          <button
            className="w-full text-left font-semibold"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {faq.question}
          </button>

          {openIndex === i && <div className="mt-2 text-gray-600">{faq.answer}</div>}
        </div>
      ))}
    </section>
  );
};
