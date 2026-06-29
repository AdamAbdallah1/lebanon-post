const categories = [
  { key: "top", label: "Top" },
  { key: "lebanon", label: "Lebanon" },
  { key: "world", label: "World" },
  { key: "sports", label: "Sports" },
  { key: "middleeast", label: "Middle East" }
];

function CategoryFilter({ category, setCategory }) {
  return (
    <div className="flex flex-row items-center gap-2 overflow-x-auto sm:flex-wrap pb-1 sm:pb-0 scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => setCategory(cat.key)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border transition-all whitespace-nowrap duration-200 ${
            category === cat.key
              ? "bg-neutral-100 border-neutral-100 text-black shadow-md"
              : "border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 bg-neutral-900/20"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;