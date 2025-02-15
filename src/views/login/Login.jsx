import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as route from "@app/constants/routes";

// import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the login data
    const loginData = {
      username,
      password,
    };

    try {
      // Send the login request using fetch
      const response = await fetch(
        `http://${backendUrl}:8080/api/auth/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData), // Send the login data in the request body
        }
      );

      // Handle the response
      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Check if the response contains a token
      if (data.token) {
        // Save the token in localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", username);
        // Optionally, redirect to another page after successful login
        console.log("Login successful:", data);
        if (location.pathname === "/login") {
          // If the user is on the login page, redirect to home
          history.push("/"); // Redirect to home page (or any other page)
          setTimeout(function () {
            window.location.reload();
          }, 10); // Delay the reload for a short time to allow the back action to complete
        } else {
          // 🔥 Force a page reload to reflect changes immediately
          window.history.back();
          setTimeout(function () {
            window.location.reload();
          }, 10); // Delay the reload for a short time to allow the back action to complete
        }
      } else {
        // Handle error if token is not returned
        console.error("Token not found in the response");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Invalid username or password");
      // Handle error (show a message, etc.)
    }
  };
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-10 py-20 lg:px-14 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <h2 className="mt-14 text-center text-5xl font-extrabold tracking-wide text-white">
            Welcome to MovIeVerse
          </h2>
          <p className="mt-6 text-center text-2xl text-gray-400">
            Sign in to continue
          </p>
        </div>

        <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-2xl">
          <form
            action="#"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-12"
          >
            {error && (
              <div className="bg-red-600 text-white text-center p-4 rounded-xl">
                {error}
              </div>
            )}
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xl font-semibold text-white"
                >
                  Password
                </label>
                <div className="text-lg">
                  <a
                    href={route.FORGOTPASSWORD}
                    className="font-semibold text-blue-400 hover:text-blue-300 transition"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-4">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-2xl bg-white/10 px-6 py-4 text-2xl font-semibold text-white outline-none focus:ring-4 focus:ring-blue-500 placeholder:text-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-2xl bg-blue-600 px-6 py-4 text-2xl font-bold text-white shadow-md hover:bg-blue-500 transition-all hover:shadow-lg focus:ring-4 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-14 text-center text-xl text-gray-300">
            Not a member?{" "}
            <Link
              to="/register"
              className="font-bold text-blue-400 hover:text-blue-300 transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
