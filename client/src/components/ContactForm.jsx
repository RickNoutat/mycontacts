import { useState } from "react";

export default function ContactForm({ onSubmit, initial }) {
  const [firstName, setFirstName] = useState(initial?.firstName || "");
  const [lastName, setLastName] = useState(initial?.lastName || "");
  const [phone, setPhone] = useState(initial?.phone || "");

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, phone });
  };

  return (
    <form onSubmit={submit} className="grid gap-2 sm:grid-cols-4">
      <input
        className="input"
        placeholder="Prénom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        className="input"
        placeholder="Nom"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        className="input"
        placeholder="Téléphone (10–20)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        minLength={10}
        maxLength={20}
      />
      <button className="btn btn-primary">
        {initial ? "Mettre à jour" : "Ajouter"}
      </button>
    </form>
  );
}
