import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";

export default function AuthForm({ mode = "login" }) {
  const navigate = useNavigate();
  const { login, register, loading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") await login(email, password);
      else await register(email, password);
      navigate("/contacts");
    } catch {
      /* error déjà dans store */
    }
  };

  return (
    <div className="min-h-[80vh] grid place-items-center">
      <div className="card w-full max-w-md">
        <h1 className="text-xl font-semibold mb-3">
          {mode === "login" ? "Se connecter" : "Créer un compte"}
        </h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              className="input mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Mot de passe</label>
            <input
              className="input mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              minLength={8}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "..." : mode === "login" ? "Connexion" : "Inscription"}
          </button>
        </form>
        <div className="text-sm text-gray-600 mt-3">
          {mode === "login" ? (
            <>
              Pas de compte ?{" "}
              <Link to="/register" className="underline">
                Inscription
              </Link>
            </>
          ) : (
            <>
              Déjà inscrit ?{" "}
              <Link to="/login" className="underline">
                Connexion
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
