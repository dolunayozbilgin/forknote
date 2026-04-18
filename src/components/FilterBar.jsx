export default function FilterBar({ filter, onFilterChange, search, onSearchChange }) {
  const filters = [
    { value: "tümü", label: "Tümü" },
    { value: "gidildi", label: "Gidildi" },
    { value: "gidilecek", label: "Gidilecek" },
    { value: "€", label: "€" },
    { value: "€€", label: "€€" },
    { value: "€€€", label: "€€€" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Restoran veya şehir ara..."
        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`text-sm px-4 py-2 rounded-lg font-medium transition ${
              filter === f.value
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}