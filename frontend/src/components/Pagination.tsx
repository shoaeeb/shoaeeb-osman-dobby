type Props = {
  pages: number;
  setPage: (page: number) => void;
};

const Pagination = ({ pages, setPage }: Props) => {
  const pageNumber: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }
  return (
    <div className="container mx-auto max-w-md  flex justify-center gap-1">
      {pageNumber.map((page) => (
        <button
          onClick={() => setPage(page)}
          key={page}
          className="px-3 py-1 border border-slate-300 mx-1 "
        >
          {page}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
