import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // Step 1: Verify, Step 2: Reset Password
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const history = useHistory();
  const [error, setError] = useState("");
  // Check if the user is already logged in
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      // If logged in, redirect to the home page or login page
      history.push("/"); // Redirect to home page
    }
  }, [history]);

  const handleVerifyUser = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://${backendUrl}:8080/api/auth/verify-user`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      }
    );

    const data = await response.text();
    if (response.ok) {
      setStep(2); // Move to password reset step
    } else {
      toast.error(data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character."
      );
      return;
    }

    const response = await fetch(
      `http://${backendUrl}:8080/api/users/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, newPassword }),
      }
    );

    const data = await response.text();
    toast.success(data);

    if (response.ok) {
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page after success
      }, 500);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-10 py-20 lg:px-14 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-14 text-center text-5xl font-extrabold tracking-wide text-white">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>
        <p className="mt-6 text-center text-2xl text-gray-400">
          {step === 1
            ? "Enter your username and email to verify"
            : "Enter a new password"}
        </p>
      </div>

      <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-2xl">
        <form
          action="#"
          method="POST"
          onSubmit={step === 1 ? handleVerifyUser : handleResetPassword}
          className="space-y-12"
        >
          {step === 1 ? (
            <>
              <div>
                <label
                  htmlFor="username"
                  className="block text-xl font-semibold text-white"
                >
                  Username
                </label>
                <div className="mt-4">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    className="block w-full rounded-2xl bg-white/10 px-6 py-4 text-2xl font-semibold text-white outline-none focus:ring-4 focus:ring-blue-500 placeholder:text-gray-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xl font-semibold text-white"
                >
                  Email Address
                </label>
                <div className="mt-4">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-2xl bg-white/10 px-6 py-4 text-2xl font-semibold text-white outline-none focus:ring-4 focus:ring-blue-500 placeholder:text-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-xl font-semibold text-white"
                >
                  New Password
                </label>
                <div className="mt-4">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    autoComplete="new-password"
                    className="block w-full rounded-2xl bg-white/10 px-6 py-4 text-2xl font-semibold text-white outline-none focus:ring-4 focus:ring-blue-500 placeholder:text-gray-400"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            {error && (
              <div className="mt-4 text-red-500 text-lg text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="flex w-full justify-center rounded-2xl bg-blue-600 px-6 py-4 text-2xl font-bold text-white shadow-md hover:bg-blue-500 transition-all hover:shadow-lg focus:ring-4 focus:ring-blue-500"
            >
              {step === 1 ? "Verify" : "Reset Password"}
            </button>
          </div>
        </form>

        <p className="mt-14 text-center text-xl text-gray-300">
          Remembered your password?{" "}
          <a
            href="/login"
            className="font-bold text-blue-400 hover:text-blue-300 transition"
          >
            Go to Login
          </a>
        </p>
      </div>
    </div>
  );
}
