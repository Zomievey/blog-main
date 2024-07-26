import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, signout } = useAuth();

  return (
    <nav className="nav p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl"></div>
        <div className="space-x-4">
          {user && (
            <Link href="/" legacyBehavior>
              <a className="text-white">Home</a>
            </Link>
          )}
          {user ? (
            <button onClick={signout} className="text-white">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" legacyBehavior>
                <a className="text-white">Login</a>
              </Link>
              <Link href="/signup" legacyBehavior>
                <a className="text-white">Signup</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
