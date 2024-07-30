import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/signup.css";
import { ImInfo } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/buttons.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signupStatus, setSignupStatus] = useState("");
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordPattern.test(password)) {
      setSignupStatus("passwordError");
      return;
    }

    try {
      await signup(email, password, username);
      setSignupStatus("success");
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      console.error("Signup failed:", error);
      setSignupStatus("error");
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md relative'>
          <h1 className='text-2xl font-bold mb-6'>Signup</h1>
          <form onSubmit={handleSignup} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium'>Username</label>
              <input
                title='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='w-full p-2 border rounded'
              />
            </div>
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
                  className='absolute right-2 top-3 text-gray-500'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded btn-custom'
            >
              Signup
            </button>
          </form>
          {signupStatus === "success" && (
            <p className='mt-4 text-500' style={{ color: "#49a4c4" }}>
              Signup successful! Redirecting...
            </p>
          )}
          {signupStatus === "error" && (
            <p className='mt-4 text-500' style={{ color: "#ff7474" }}>
              Signup failed. Please try again.
            </p>
          )}
          {signupStatus === "passwordError" && (
            <p className='mt-4 text-500' style={{ color: "#ff7474" }}>
              Password must be at least 6 characters long and contain at least one special character.
            </p>
          )}
          <div className='tooltip-container'>
            <ImInfo />
            <div className='tooltip'>
              If you are a new user, signup here. Once you have signed up, use
              the login page to access the blog.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
