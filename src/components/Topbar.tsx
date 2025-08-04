import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInAuthButton from "./SignInAuthButton"; 
import { useAuthStore } from "@/store/useAuthStore";

const Topbar = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);

  return (
    <header className="w-full px-4 sm:px-6 py-3 bg-zinc-900 text-white shadow-md flex items-center justify-between">
      {/* Logo + Title */}
      <div className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-wide">
        <img src="/spotify.png" className="w-8 h-8 object-contain" alt="Spotify logo" />
        <span className="hidden sm:inline">Spotify</span>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-4 text-sm sm:text-base">
        {isAdmin && (
          <Link
            to="/admin"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition"
            title="Admin Dashboard"
          >
            <LayoutDashboardIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        )}

        <SignedIn>
          <SignOutButton>
            <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm sm:text-base">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>

        <SignedOut>
          <SignInAuthButton />
        </SignedOut>
      </div>
    </header>
  );
};

export default Topbar;
