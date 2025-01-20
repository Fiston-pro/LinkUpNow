"use client";

import { useState, useEffect } from "react";
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Use the methods from the AuthContext
  const { logIn, signUp, googleSignIn, SignUpWithGoogle, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user.uid) {
      router.push('/');
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      await logIn(email, password);
      router.push('/');
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed: " + error.message)
    }
  };

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      router.push('/');
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Signup failed: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => await SignUpWithGoogle();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-secondary p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-textPrimary">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-textPrimary">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={isLogin ? handleLogin : handleSignup}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-4"
        >
          {isLogin ? "Sign in with Google" : "Sign Up with Google"}
        </button>
        {/* <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-4"
        >
          Logout
        </button> */}
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
