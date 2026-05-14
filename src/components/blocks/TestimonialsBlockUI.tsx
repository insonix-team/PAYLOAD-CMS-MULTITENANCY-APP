export const TestimonialsBlockUI = ({ data }: any) => {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">{data.heading}</h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {data.items?.map((t: any, i: number) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <p className="mb-4">"{t.review}"</p>

            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-gray-500">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
