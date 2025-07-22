import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInAuthButton from "./SignInAuthButton"; 

const Topbar = () => {
  const isAdmin = false;

  return (
    <header className="w-full px-6 py-3 bg-zinc-900 text-white shadow-md flex items-center justify-between">
      <div className="text-xl font-bold tracking-wide">Spotify</div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" title="Admin Dashboard">
            <LayoutDashboardIcon className="text-emerald-400 hover:text-emerald-300 transition duration-200" />
          </Link>
        )}

        <SignedIn>
           <SignInAuthButton />
        </SignedIn>

        <SignedOut>
          <SignInAuthButton />
        </SignedOut>
      </div>
    </header>
  );
};

export default Topbar;
