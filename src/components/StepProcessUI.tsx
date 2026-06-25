'use client';

import Image from 'next/image';

type Card = {
  title: string;
  description?: string;
  icon?: {
    url?: string;
    alt?: string;
  };
  svg_icon?: string;
};

type Props = {
  data: {
    heading: string;
    subtitle?: string;
    columns?: '2' | '3' | '4';
    backgroundImage?: {
      url?: string;
    };
    cards: Card[];
  };
  tenant?: string;
};

export default function StepProcessUI({ data }: Props) {
  const { heading, subtitle, columns, backgroundImage, cards } = data;

  const gridCols = {
    '2': 'lg:grid-cols-2',
    '3': 'lg:grid-cols-3',
    '4': 'lg:grid-cols-4',
  };
  return (
    <section
      className="py-20 lg:py-24 relative  bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
      }}
    >
      <div
        className="
    absolute inset-0
  bg-gradient-to-b from-white/70 to-secondary/50

  "
      ></div>
      <div className="container relative mx-auto px-4">
        {/* Heading */}
        <div className="text-left mx-auto mb-16">
          <h2
            className="mt-3 mb-3 text-black! text-3xl leading-tight "
            aria-describedby="about-description"
          >
            {heading}
          </h2>
          <p className="text-lg text-gray-500!"> {subtitle}</p>
        </div>

        {/* Cards */}

        <div className={`grid sm:grid-cols-2 gap-6 ${gridCols[data.columns || '4']}`}>
          {data.cards?.map((service, index) => (
            <div key={index} className="group relative text-center transition-all duration-300">
              {/* Connector Line */}
              {index < data.cards.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-gray-300 z-0" />
              )}

              {/* Icon */}
              <div className="relative z-10 mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center shadow mb-6">
                {service.svg_icon ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: service.svg_icon }}
                    className="w-10 h-10 flex items-center justify-center"
                  />
                ) : service.icon?.url ? (
                  <Image
                    src={service.icon.url}
                    alt={service.icon.alt || service.title}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                ) : null}
              </div>

              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>

              <p className="text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
