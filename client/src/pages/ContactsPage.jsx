import { useEffect, useState } from "react";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import ContactItem from "../components/ContactItem";
import { useContactsStore } from "../store/contacts";

export default function ContactsPage() {
  const { items, fetch, create, update, remove, loading, error } =
    useContactsStore();
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch();
  }, [fetch]); // première charge

  const onSearch = (e) => {
    e.preventDefault();
    fetch(q);
  };

  return (
    <div className="min-h-dvh bg-gray-50">
      <Header />
      <main className="mx-auto max-w-5xl p-4 space-y-6">
        <section className="card space-y-3">
          <h2 className="font-semibold">Ajouter un contact</h2>
          <ContactForm onSubmit={(data) => create(data)} />
        </section>

        <section className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Mes contacts</h2>
          <form onSubmit={onSearch} className="flex gap-2">
            <input
              className="input"
              placeholder="Rechercher (nom / tél.)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="btn">Rechercher</button>
          </form>
        </section>

        {loading && <p className="text-gray-600">Chargement…</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && items.length === 0 && (
          <p className="text-gray-600">Aucun contact.</p>
        )}

        <div className="grid gap-3">
          {items.map((c) => (
            <ContactItem
              key={c._id}
              c={c}
              onUpdate={update}
              onDelete={remove}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
