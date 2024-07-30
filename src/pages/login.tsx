import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { ImInfo } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../components/NavBar";
import "../styles/login.css";
import "../styles/buttons.css";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const { signin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("userEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signin(email, password);
      if (typeof window !== "undefined") {
        localStorage.setItem("userEmail", email);
      }
      setLoginStatus("success");
      setTimeout(() => router.push("/"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Login failed:", error);
      setLoginStatus("error");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md relative'>
          <h1 className='text-2xl font-bold mb-6'>Login</h1>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium'>Email</label>
              <input
                title='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full p-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Password</label>
              <div className='relative'>
                <input
                  title='password'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='w-full p-2 border rounded pr-10'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute right-2 top-3 text-gray-500'
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded btn-custom'
            >
              Login
            </button>
          </form>
          {loginStatus === "success" && (
            <p className='mt-4 text-500' style={{ color: "#49a4c4" }}>
              Login successful! Redirecting...
            </p>
          )}
          {loginStatus === "error" && (
            <p className='mt-4 text-500' style={{ color: "#ff7474" }}>
              Incorrect email or password.
            </p>
          )}
          <div className='mt-4'>
            <Link href='/resetPassword' legacyBehavior>
              <a className='hover:underline' style={{ color: "#ff7474" }}>
                Forgot Password?
              </a>
            </Link>
          </div>
          <div className='tooltip-container'>
            <ImInfo />
            <div className='tooltip'>
              All registered users can log in here to access the blog. If you do
              not already have an account, you can sign up for one by clicking
              the "Signup" link in the navigation bar.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
