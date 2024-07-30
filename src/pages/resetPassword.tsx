import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/login.css";
import "../styles/buttons.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const { sendPasswordResetEmail } = useAuth();
  const router = useRouter();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      setStatus("success");
      setTimeout(() => router.push("/login"), 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error("Password reset failed:", error);
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                title="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded btn-custom"
            >
              Reset Password
            </button>
          </form>
          {status === "success" && (
            <p className="mt-4 text-500" style={{ color: "#49a4c4" }}>
              Password reset email sent! Redirecting to login...
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-500" style={{ color: "#ff7474" }}>
              Failed to send password reset email. Please try again.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
