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
      <div className='flex-grow flex items-center justify-center'>
        <div className='auth-container'>
          <h1>Login</h1>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <label>Email</label>
              <input
                title='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='relative'>
              <label>Password</label>
              <input
                title='password'
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className='password-toggle'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <button type='submit' className='btn-custom'>
              Login
            </button>
          </form>
          {loginStatus === "success" && (
            <p className='mt-4' style={{ color: "#49a4c4" }}>
              Login successful! Redirecting...
            </p>
          )}
          {loginStatus === "error" && (
            <p className='mt-4' style={{ color: "#fa7677" }}>
              Incorrect email or password.
            </p>
          )}
          <div className='mt-4 signup-btn'>
            <Link href='/resetPassword' legacyBehavior>
              <a className='forgot-password'>Forgot Password?</a>
            </Link>
          </div>
          <div className='tooltip-container'>
            <ImInfo className='info-icon' />
            <div className='tooltip'>
              All registered users can log in here to access the blog. If you do
              not already have an account, you can signup for one by navigating
              to the signup page.
            </div>
          </div>
          <div className='mt-4'>
            <span>
              Don't want to sign up?
              <br /> Use our generic login:
              <br />
              <strong>Email:</strong> everyone@gmail.com
              <br />
              <strong>Password:</strong> password!
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
