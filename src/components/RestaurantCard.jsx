const cuisineEmoji = (cuisine) => {
  const map = { türk: "🥙", italian: "🍕", italyan: "🍕", japon: "🍣", çin: "🥡", meksika: "🌮", hint: "🍛", fransız: "🥐" };
  return map[cuisine?.toLowerCase()] || "🍽️";
};

export default function RestaurantCard({ restaurant, onEdit, onDelete }) {
  const { name, city, cuisine, price, status, rating, note, visitDate } = restaurant;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-start gap-4 hover:shadow-md transition">
      <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl flex-shrink-0">
        {cuisineEmoji(cuisine)}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          {city}{cuisine ? ` · ${cuisine}` : ""}
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            status === "gidildi" ? "bg-teal-100 text-teal-700" : "bg-amber-100 text-amber-700"
          }`}>
            {status === "gidildi" ? "Gidildi" : "Gidilecek"}
          </span>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {price}
          </span>
          {rating && (
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-50 text-yellow-600">
              ⭐ {rating}/10
            </span>
          )}
          {visitDate && (
            <span className="text-xs text-gray-400">{visitDate}</span>
          )}
        </div>
        {note && <p className="text-xs text-gray-400 mt-2 italic">"{note}"</p>}
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0">
        <button onClick={() => onEdit(restaurant)}
          className="text-xs text-teal-600 hover:text-teal-800 font-medium border border-teal-200 hover:border-teal-400 px-3 py-1 rounded-lg transition">
          Düzenle
        </button>
        <button onClick={() => onDelete(restaurant.id)}
          className="text-xs text-red-500 hover:text-red-700 font-medium border border-red-200 hover:border-red-400 px-3 py-1 rounded-lg transition">
          Sil
        </button>
      </div>
    </div>
  );
}