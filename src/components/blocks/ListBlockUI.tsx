export const ListBlockUI = ({ data }: any) => {
  return (
    <section className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{data.heading}</h2>

      <ul className="space-y-3">
        {data.items?.map((item: any, i: number) => (
          <li key={i} className="flex items-center gap-2">
            <span>✔️</span>
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  )
}
