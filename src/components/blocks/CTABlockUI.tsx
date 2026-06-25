'use client';

export const CTABlockUI = ({ data, tenant }: any) => {
  return (
    <section className="py-16 text-center bg-black text-white">
      <h2 className="text-3xl font-bold mb-4">{data.heading}</h2>

      <p className="mb-6">{data.subtext}</p>

      <a
        href={`/${tenant}${data.buttonLink}`}
        className="bg-white text-black px-6 py-3 rounded-full font-semibold"
      >
        {data.buttonText}
      </a>
    </section>
  );
};
