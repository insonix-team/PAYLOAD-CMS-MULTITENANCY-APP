import type { CardsWithIcons } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';

const directionMap: Record<string, string> = {
  'to-r': 'bg-gradient-to-r',
  'to-l': 'bg-gradient-to-l',
  'to-t': 'bg-gradient-to-t',
  'to-b': 'bg-gradient-to-b',
  radial: 'bg-[radial-gradient(circle)]',
};

const colorMap: Record<string, string> = {
  primary: 'from-primary-500 to-primary-700',
  secondary: 'from-secondary-500 to-secondary-700',
  gray: 'from-gray-500 to-gray-700',
  white: 'from-white to-gray-100',
};

export const CardsWithIconsBlockUI = ({ data }: { data?: CardsWithIcons }) => {
  const block = data;
  if (!block) return null;

  const desktopCols = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  }[block.columns ?? 3];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-10">{block.blockHeading}</h2>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${desktopCols}`}>
          {block.cards?.map((card, i) => {
            const iconObj = typeof card.icon === 'object' ? card.icon : null;
            const iconUrl = iconObj?.url ? `${iconObj.url}` : null;

            const direction = directionMap[card.gradientDirection ?? 'to-r'];
            const from = colorMap[card.gradientFrom ?? 'primary'];
            const to = colorMap[card.gradientTo ?? 'secondary'];

            return (
              <div
                key={i}
                className={`
                  p-8 rounded-xl shadow text-center
                  ${direction} ${from} ${to}
                `}
              >
                {iconUrl && (
                  <div className="w-12 h-12 rounded-full bg-gray-50 mx-auto mb-4 flex justify-center items-center">
                    <img src={iconUrl} alt={card.title} className="w-10 h-10 object-contain" />
                  </div>
                )}

                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>

                <RichText
                  className="prose max-w-none"
                  data={
                    card.description ?? {
                      root: {
                        type: 'root',
                        children: [],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                      },
                    }
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
