import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Mail, Lock, ChefHat, User } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { auth } from "../firebase.js";
import { useAuth } from "../hooks/useAuth.js";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignUp = async (e) => {
    e?.preventDefault?.();
    setMessage("");
    if (name === "") {
      setMessageType("error");
      setMessage("Please fill your name!");
      return;
    }
    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Password and confirm password are not the same!");
      return;
    }
    if (!regex.test(password)) {
      setMessageType("error");
      setMessage(
        "Password must be at least 8 characters long and contain both letters and numbers",
      );
      return;
    }
    if (!email.trim()) {
      setMessageType("error");
      setMessage("Please enter your email.");
      return;
    }

    setSubmitting(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name.trim() });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessageType("error");
      const code = error?.code ?? "";
      if (code === "auth/email-already-in-use") {
        setMessage("This email is already registered.");
      } else if (code === "auth/weak-password") {
        setMessage("Password is too weak.");
      } else if (code === "auth/invalid-email") {
        setMessage("Invalid email address.");
      } else if (code === "auth/operation-not-allowed") {
        setMessage(
          "Email/Password sign-in is disabled. Enable it in Firebase Console → Authentication → Sign-in method.",
        );
      } else if (code === "auth/invalid-api-key") {
        setMessage("Invalid Firebase API key. Check your .env matches Project settings.");
      } else {
        setMessage(
          error?.message || "Registration failed. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFF0E0] border-t-[#FF7A00]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#FFB84D] rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#7ED957] rounded-full opacity-20 blur-3xl" />

        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-[#FF7A00] to-[#FFB84D] p-4 rounded-2xl">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl text-center mb-2 font-extrabold">TigerCook</h1>
            <p className="text-center text-gray-600 mb-6">Create your account to start cooking</p>

            {message && (
              <div
                className={`mb-4 p-4 rounded-xl text-sm ${
                  messageType === "error"
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-green-50 text-green-600 border border-green-200"
                }`}
              >
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setMessage("");
                    }}
                    className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-[#FF7A00] bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="your.email@college.edu"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMessage("");
                    }}
                    autoComplete="email"
                    className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-[#FF7A00] bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setMessage("");
                    }}
                    autoComplete="new-password"
                    className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-[#FF7A00] bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setMessage("");
                    }}
                    autoComplete="new-password"
                    className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-[#FF7A00] bg-white"
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={handleSignUp}
                disabled={submitting}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FFB84D] hover:from-[#E66D00] hover:to-[#FFA73D] text-white font-bold disabled:opacity-60"
              >
                {submitting ? "Creating account…" : "Sign up"}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <Link to="/login">
                <Button
                  className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold"
                >
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
