import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [name, setName] = useState(search.name);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    search.saveSearch(name);
    navigate("/search");
  };

  return (
    <div className="container mx-auto max-w-md flex gap-5 justify-center items-center shadow border border-slate-300 p-5 ">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search by name"
          type="search"
          className="w-full px-5 py-1 border border-gray-500 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-2 py-1">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
