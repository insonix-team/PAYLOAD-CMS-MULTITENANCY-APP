export const ImageBlockUI = ({ data }: any) => {
  return (
    <section className="py-10 text-center">
      <img src={data.image?.url} className="mx-auto rounded-xl shadow-md" />
      {data.caption && <p className="text-gray-500 mt-2">{data.caption}</p>}
    </section>
  );
};
