import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',

            h1: {
              fontWeight: '700',
              fontSize: '2.5rem',
              fontFamily: 'var(--font-inter)',
            },

            h2: {
              fontWeight: '600',
              fontSize: '2rem',
              fontFamily: 'var(--font-inter)',
            },
          },
        },
      },
    },
  },

  plugins: [typography],
};

export default config;
