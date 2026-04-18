import { useState, useCallback } from "react";
import { createRestaurant } from "../interfaces/restaurant";
import RestaurantForm from "../components/RestaurantForm";
import RestaurantCard from "../components/RestaurantCard";
import FilterBar from "../components/FilterBar";

const KEY = "forknote_restaurants";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const save = (data) => localStorage.setItem(KEY, JSON.stringify(data));

export default function RestaurantListPage() {
  const [restaurants, setRestaurants] = useState(load);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("tümü");
  const [search, setSearch] = useState("");

  const handleAdd = useCallback((data) => {
    setRestaurants(prev => {
      const updated = [createRestaurant(data), ...prev];
      save(updated);
      return updated;
    });
    setShowForm(false);
  }, []);

  const handleUpdate = useCallback((data) => {
    setRestaurants(prev => {
      const updated = prev.map(r => r.id === editing.id
        ? { ...r, ...data, rating: data.rating ? Number(data.rating) : null }
        : r
      );
      save(updated);
      return updated;
    });
    setEditing(null);
    setShowForm(false);
  }, [editing]);

  const handleDelete = useCallback((id) => {
    if (!window.confirm("Bu restoranı silmek istediğinden emin misin?")) return;
    setRestaurants(prev => {
      const updated = prev.filter(r => r.id !== id);
      save(updated);
      return updated;
    });
  }, []);

  const handleEdit = useCallback((restaurant) => {
    setEditing(restaurant);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filtered = restaurants.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filter === "tümü") return true;
    if (filter === "gidildi") return r.status === "gidildi";
    if (filter === "gidilecek") return r.status === "gidilecek";
    if (["€", "€€", "€€€"].includes(filter)) return r.price === filter;
    return true;
  });

  const stats = {
    total: restaurants.length,
    visited: restaurants.filter(r => r.status === "gidildi").length,
    wishlist: restaurants.filter(r => r.status === "gidilecek").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🍴 ForkNote</h1>
            <p className="text-sm text-gray-500 mt-0.5">Kişisel Restoran Defteri</p>
          </div>
          <button
            onClick={() => { setEditing(null); setShowForm(!showForm); }}
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition">
            {showForm && !editing ? "Kapat" : "+ Ekle"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Toplam", value: stats.total, color: "bg-teal-50 text-teal-700" },
            { label: "Gidildi", value: stats.visited, color: "bg-green-50 text-green-700" },
            { label: "Gidilecek", value: stats.wishlist, color: "bg-amber-50 text-amber-700" },
          ].map(s => (
            <div key={s.label} className={`rounded-xl p-3 text-center ${s.color}`}>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {showForm && (
          <RestaurantForm
            onSubmit={editing ? handleUpdate : handleAdd}
            editing={editing}
            onCancel={() => { setEditing(null); setShowForm(false); }}
          />
        )}

        <FilterBar filter={filter} onFilterChange={setFilter} search={search} onSearchChange={setSearch} />

        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">🍽️</div>
              <p className="text-sm">Henüz restoran yok. Bir tane ekle!</p>
            </div>
          ) : (
            filtered.map(r => (
              <RestaurantCard key={r.id} restaurant={r} onEdit={handleEdit} onDelete={handleDelete} />
            ))
          )}
        </div>

      </div>
    </div>
  );
}