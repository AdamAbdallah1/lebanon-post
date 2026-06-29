import { useEffect } from "react";

function SearchBar({ search, setSearch }) {
  useEffect(() => {
    const delay = setTimeout(() => {}, 400);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search news..."
      className="w-full md:w-96 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
    />
  );
}

export default SearchBar;