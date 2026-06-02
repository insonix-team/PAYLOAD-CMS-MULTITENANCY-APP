export const CardsBlockUI = ({ data }: any) => {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">{data.heading}</h2>

      <div
        className={`grid gap-6 ${
          data.columns === '2'
            ? 'md:grid-cols-2'
            : data.columns === '4'
              ? 'md:grid-cols-4'
              : 'md:grid-cols-3'
        }`}
      >
        {data.cards?.map((card: any, i: number) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            {card.image?.url && (
              <img src={card.image.url} className="w-full h-40 object-cover rounded-lg mb-4" />
            )}

            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>

            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
