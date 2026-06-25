'use client';

import { useState } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';

export const FAQComponentUI = ({ data }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Collapsible FAQ Section */}
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10">{data.title}</h2>

          <div className="space-y-4">
            {data.items?.map((faq: any, i: number) => {
              const isOpen = openIndex === i;

              return (
                <div key={i} className="border border-gray-300 rounded-xl p-1">
                  <button
                    className="w-full flex justify-between items-center p-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    <span className="text-lg font-semibold">{faq.question}</span>
                    <span className="text-2xl">{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <div className="bg-card p-4 prose max-w-none">
                      <RichText data={faq.answer} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
