import { useState } from "react";
import ContactForm from "./ContactForm";

export default function ContactItem({ c, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="card">
      {!editing ? (
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-medium">
              {c.firstName} {c.lastName}
            </div>
            <div className="text-sm text-gray-600">{c.phone}</div>
          </div>
          <div className="flex gap-2">
            <button className="btn" onClick={() => setEditing(true)}>
              Éditer
            </button>
            <button className="btn" onClick={() => onDelete(c._id)}>
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <ContactForm
            initial={c}
            onSubmit={async (patch) => {
              await onUpdate(c._id, patch);
              setEditing(false);
            }}
          />
          <button className="btn w-full" onClick={() => setEditing(false)}>
            Annuler
          </button>
        </div>
      )}
    </div>
  );
}
