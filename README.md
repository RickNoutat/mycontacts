# 📇 MyContacts — Gestionnaire de contacts (MERN + JWT)

Application web **fullstack JavaScript** permettant à chaque utilisateur de gérer son carnet de contacts personnel.  
Stack : **MongoDB • Express • React (Vite) • Node.js**, avec **authentification JWT**, **Zustand** pour l’état global, et **TailwindCSS** pour le design.

---

## 🧱 Structure du projet

mycontacts/
┣ 📂client → Frontend (React + Vite + Zustand + Tailwind)
┗ 📂server → Backend (Node + Express + MongoDB + Swagger)

---

## 🚀 Fonctionnalités principales

### 🔐 Authentification JWT

- **Inscription** (`/auth/register`) : email unique, mot de passe hashé (bcrypt).
- **Connexion** (`/auth/login`) : renvoie un token JWT valide 24 h.
- Middleware `requireAuth` : protège toutes les routes `/contacts`.

### 📇 Gestion des contacts (CRUD)

- **GET** `/contacts` — liste uniquement les contacts de l’utilisateur connecté.
- **POST** `/contacts` — ajout d’un contact.
- **PATCH** `/contacts/:id` — mise à jour partielle.
- **DELETE** `/contacts/:id` — suppression.
- Validation Joi (nom, prénom, téléphone 10-20 caractères).
- Recherche par nom ou numéro (`?q=`).

### 🖥️ Interface React

- **Pages** : Login / Register / Contacts.
- **Zustand** : stores `auth` et `contacts`.
- **Axios** : injecte automatiquement le JWT.
- **TailwindCSS** : design minimaliste, responsive.
- **React Router** : navigation SPA protégée.

### 🧾 Documentation & Tests

- **Swagger UI** (`/api-docs`) pour tester l’API.
- **Tests Jest + Supertest** pour `/auth` et `/contacts`.
- **MongoMemoryServer** pour exécuter les tests sans base réelle.

---

## ⚙️ Installation locale

### 1️⃣ Cloner le repo

```bash
git clone https://github.com/RickNoutat/mycontacts
cd mycontacts
```

### 2️⃣ Backend

cd server
cp .env.example .env
pnpm install
pnpm dev

- Swagger disponible sur <http://localhost:5001/api-docs>
- API : <http://localhost:5001/api>

### 3️⃣ Frontend

cd ../client
cp .env.example .env
pnpm install
pnpm dev

- Frontend : <http://localhost:5173>

## 🔑 Variables d’environnement

> Backend (server/.env)

    PORT=5001
    NODE_ENV=development
    MONGO_URI=mongodb+srv://[user]:[pass]@cluster.mongodb.net/[db]
    JWT_SECRET=<long_secret_hex>
    JWT_EXPIRES_IN=1d
    CORS_ORIGIN=`http://localhost:5173`,`https://<site>.netlify.app`
    SWAGGER_SERVER_URL=<https://your-api.onrender.com/api>

> Frontend (client/.env)

    VITE_API_BASE_URL=<http://localhost:5001/api>
