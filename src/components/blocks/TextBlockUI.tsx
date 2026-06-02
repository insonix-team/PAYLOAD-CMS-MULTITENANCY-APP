// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TextBlockUI = ({ data }: any) => {
  return (
    <section className="py-10 px-6 max-w-3xl mx-auto">
      <div className="prose">{data.content}</div>
    </section>
  );
};
