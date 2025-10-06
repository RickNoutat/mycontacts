import { useAuthStore } from "../store/auth";

export default function Header() {
  const { user, logout } = useAuthStore();
  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-xl bg-black text-white grid place-items-center font-bold">
            MC
          </span>
          <span className="font-semibold">MyContacts</span>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm text-gray-600 hidden sm:block">
              {user.email}
            </span>
          )}
          <button onClick={logout} className="btn">
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}
