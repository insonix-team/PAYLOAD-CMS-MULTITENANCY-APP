'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type Card = {
  title: string;
  slug: string;
  image: any;
  description: string;
  cta?: {
    text: string;
    link: string;
  };
};

type Props = {
  data: {
    blockHeading: string;
    cards: Card[];
    columns?: 2 | 3 | 4;
    delay?: number;
    loading?: boolean;
    sectionColor?: string;
    sectionBackground?: any;
    headingColor?: any;
  };
  tenant?: string;
};

const gridCols: Record<2 | 3 | 4, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

export default function VerticleHoverCardsUI({ data }: Props) {
  const {
    blockHeading,
    cards = [],
    delay = 0,
    loading = false,
    columns = 3,
    sectionColor = 'bg',
    headingColor,
    sectionBackground,
  } = data;

  const colClass = gridCols[columns];

  // ⭐ Skeleton Loader
  if (loading) {
    return (
      <div className={`grid grid-cols-1 gap-6 ${colClass}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full h-[424px] bg-gray-200 animate-pulse p-4"></div>
        ))}
      </div>
    );
  }
  const bgImageUrl =
    typeof sectionBackground === 'string'
      ? sectionBackground
      : sectionBackground?.url
        ? `${sectionBackground.url}`
        : '';

  return (
    <section
      className={`py-20 relative bg-${sectionColor}`}
      style={{
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-2">
        <h2
          className={`text-3xl mb-10 font-bold ${headingColor === 'white' ? 'text-white' : 'text-black'}`}
        >
          {blockHeading}
        </h2>
        <div className={`grid grid-cols-1 gap-6 ${colClass}`}>
          {cards.map((card, index) => {
            const imageUrl =
              typeof card.image === 'string'
                ? card.image
                : card.image?.url
                  ? `${process.env.NEXT_PUBLIC_SERVER_URL || ''}${card.image.url}`
                  : '';

            return (
              <motion.div
                key={card.slug}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: (delay + index * 150) / 1000,
                }}
              >
                <div className="w-full h-[424px] overflow-hidden shadow-lg rounded-xs">
                  <Link
                    href={card.cta?.link || `/services/${card.slug}`}
                    className="group relative block w-full h-full"
                  >
                    {/* ⭐ Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out scale-105 group-hover:scale-110"
                      style={{ backgroundImage: `url('${imageUrl}')` }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-black/90 group-hover:from-black/0 group-hover:to-black/90 transition-all duration-700" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end px-4 text-white pb-5">
                      <h3 className="inline-flex w-fit my-4 px-4 py-1.5 rounded-full bg-secondary text-secondary-500 text-sm font-semibold tracking-wide shadow-sm group-hover:bg-primary transition">
                        {card.title}
                      </h3>

                      <p className="text-left text-sm line-clamp-3">{card.description}</p>

                      {/* ⭐ CTA BUTTON */}
                      {card.cta?.text && (
                        <span className="inline-block bg-primary/60 px-5 py-2 mt-3 text-sm font-semibold uppercase transition-all duration-300 opacity-80 group-hover:opacity-100 relative overflow-hidden after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-secondary-500 after:transition-all after:duration-300 group-hover:after:w-full">
                          {card.cta.text} →
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
