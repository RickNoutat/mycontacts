import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      loading: false,
      error: null,

      async register(email, password) {
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );
          const json = await res.json();
          if (!res.ok) throw new Error(json?.message || "Register failed");
          set({ token: json.data.token, user: json.data.user, loading: false });
          return json.data;
        } catch (e) {
          set({ error: e.message, loading: false });
          throw e;
        }
      },

      async login(email, password) {
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );
          const json = await res.json();
          if (!res.ok) throw new Error(json?.message || "Login failed");
          set({ token: json.data.token, user: json.data.user, loading: false });
          return json.data;
        } catch (e) {
          set({ error: e.message, loading: false });
          throw e;
        }
      },

      logout() {
        set({ token: null, user: null });
      },
    }),
    { name: "auth" }
  )
);
