type Props = {
  name: string;
  img: string;
};

const Post = ({ name, img }: Props) => {
  return (
    <div className="flex flex-col p-5 max-w-md border border-slate-300 shadow">
      <p className="text-sm font-bold">{name}</p>
      <img src={img} alt={name} className="object-cover object-center" />
    </div>
  );
};
export default Post;
