import { useState, useEffect } from "react";

const empty = { name: "", city: "", cuisine: "", price: "€", status: "gidilecek", rating: "", note: "", visitDate: "" };

export default function RestaurantForm({ onSubmit, editing, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(editing ? { ...editing, rating: editing.rating ?? "" } : empty);
  }, [editing]);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit(form);
    setForm(empty);
  };

  return (
    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {editing ? "Restoranı Düzenle" : "Yeni Restoran Ekle"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Restoran Adı *</label>
          <input name="name" value={form.name} onChange={handle} required placeholder="Örn: Çiya Sofrası"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Şehir</label>
          <input name="city" value={form.city} onChange={handle} placeholder="Örn: İstanbul"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Mutfak Türü</label>
          <input name="cuisine" value={form.cuisine} onChange={handle} placeholder="Örn: Türk, İtalyan"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Fiyat Aralığı</label>
          <select name="price" value={form.price} onChange={handle}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
            <option value="€">€ — Uygun</option>
            <option value="€€">€€ — Orta</option>
            <option value="€€€">€€€ — Pahalı</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Durum</label>
          <select name="status" value={form.status} onChange={handle}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
            <option value="gidilecek">Gidilecek</option>
            <option value="gidildi">Gidildi</option>
          </select>
        </div>
        {form.status === "gidildi" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Puan (1–10)</label>
              <input type="number" name="rating" value={form.rating} onChange={handle} min="1" max="10"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Ziyaret Tarihi</label>
              <input type="date" name="visitDate" value={form.visitDate} onChange={handle}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>
          </>
        )}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Not</label>
          <textarea name="note" value={form.note} onChange={handle} rows={2} placeholder="Önerilen yemek, atmosfer..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition">
          {editing ? "Güncelle" : "Ekle"}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} className="border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-5 py-2 rounded-lg transition">
            İptal
          </button>
        )}
      </div>
    </form>
  );
}