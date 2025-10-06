import { create } from "zustand";
import api from "../lib/api";

export const useContactsStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,
  q: "",

  async fetch(q) {
    set({ loading: true, error: null, q: q ?? get().q });
    try {
      const res = await api.get("/contacts", {
        params: { q: q ?? (get().q || undefined) },
      });
      set({ items: res.data.data ?? [], loading: false });
    } catch (e) {
      set({ error: e.response?.data?.message || e.message, loading: false });
      throw e;
    }
  },

  async create(payload) {
    const res = await api.post("/contacts", payload);
    set({ items: [res.data.data, ...get().items] });
    return res.data.data;
  },

  async update(id, patch) {
    const res = await api.patch(`/contacts/${id}`, patch);
    const updated = res.data.data;
    set({ items: get().items.map((c) => (c._id === id ? updated : c)) });
    return updated;
  },

  async remove(id) {
    await api.delete(`/contacts/${id}`);
    set({ items: get().items.filter((c) => c._id !== id) });
  },
}));
