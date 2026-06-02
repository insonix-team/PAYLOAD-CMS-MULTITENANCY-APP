'use client';

type MediaType = {
  url?: string | null;
  alt?: string | null;
};

type ButtonType = {
  label: string;
  url: string;
  style?: 'primary' | 'secondary';
};

type Props = {
  data: {
    media?: number | MediaType | null;
    position?: 'left' | 'right';
    overlayOpacity?: any;
    title?: string;
    tag?: string;
    backgroundImage?: string | MediaType | null; // <-- FIXED
    subtitle?: string;
    description?: string;
    buttons?: ButtonType[];
  };
  tenant?: string;
};
export const HeroLeftLayoutUI = ({ data }: Props) => {
  const {
    backgroundImage,
    overlayOpacity = 50,
    tag,
    title,
    subtitle,
    description,
    buttons = [],
  } = data;

  const bgUrl =
    typeof backgroundImage === 'string' ? backgroundImage : (backgroundImage?.url ?? '');

  const opacity = (overlayOpacity ?? 50) / 100;
  const hasButtons = buttons.length > 0;

  return (
    <section
      className="relative flex items-center justify-start text-white min-h-[90vh] bg-cover bg-top"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="absolute inset-0 bg-black" style={{ opacity }} />

      <div className="relative z-10 max-w-4xl text-left px-6">
        {tag && (
          <span className="inline-block mb-3 px-3 py-1 text-sm bg-white/20 rounded-full">
            {tag}
          </span>
        )}

        {title && <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>}

        {subtitle && <h2 className="text-xl md:text-2xl mt-3 text-white/80">{subtitle}</h2>}

        {description && <p className="mt-4 text-white/70 max-w-2xl mx-auto">{description}</p>}

        {hasButtons && (
          <div className="mt-6 flex gap-4 justify-start flex-wrap">
            {buttons.map((btn, i) => (
              <a
                key={i}
                href={btn.url}
                className={`bg-primary dark:bg-primary uppercase text-white! border-0 hover:bg-primary-600 shadow-2xl cursor-pointer px-8 md:px-8! py-2 transition ${btn.style === 'secondary' ? 'bg-secondary dark:bg-secondary text-primary' : 'bg-primary dark:bg-primary text-secondary'}`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
