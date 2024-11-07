import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ isLandingPage = false }) {
  const { user, signout } = useAuth();

  return (
    <nav className={`nav ${isLandingPage ? "nav-landing" : ""} p-5`}>
      <div className='navbar-container flex-end items-center'>
        <div className='flex items-center'>
          {user && (
            <Link href='/' legacyBehavior>
              <a className='nav-link text-white'>Home</a>
            </Link>
          )}
          {user ? (
            <button onClick={signout} className='nav-link text-white'>
              Logout
            </button>
          ) : (
            <>
              <Link href='/login' legacyBehavior>
                <a className='nav-link text-white'>Login</a>
              </Link>
              <Link href='/signup' legacyBehavior>
                <a className='nav-link text-white'>Sign Up</a>
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
