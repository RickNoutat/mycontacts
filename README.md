
# MyContacts — Monorepo

- `client/` : Frontend React (placeholder pour aujourd'hui).
- `server/` : Backend Node/Express + MongoDB + Auth JWT + Swagger (inclus).

## Démarrage rapide (Backend uniquement aujourd'hui)

```bash
cd server
npm install
cp .env.example .env   # renseignez MONGO_URI et JWT_SECRET
npm run dev
```

Swagger disponible sur: `http://localhost:5000/api/docs`
