import React, {useState} from 'react';
import { Link, useHistory   } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory(); // Using useHistory for version 5
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }
    const usernameRegex = /^[A-Za-z0-9]{5,}$/;
    if (!usernameRegex.test(username)) {
      setError('Username must only contain alphanumeric and at least 5 characters.');
      return;
    }
    // Password validation: at least one lowercase, one uppercase, one number
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one lowercase letter, one uppercase letter, one number and one special character.');
      return;
    }

    // Save user data in localStorage or use global state management (like Redux)
    localStorage.setItem('userData', JSON.stringify({ username, email, password }));
    localStorage.setItem('fromRegister', 'true');
    // Navigate to the Select Genre page
    history.push('/select-genre');
  };

    return (
      <>
        <div className="flex min-h-screen flex-1 flex-col justify-center px-10 py-20 lg:px-14 bg-gray-900">
          <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
            <h2 className="mt-14 text-center text-5xl font-extrabold tracking-wide text-white">
              Create an Account
            </h2>
            <p className="mt-6 text-center text-2xl text-gray-400">
              Join MovIeVerse and start your journey!
            </p>
          </div>
  
          <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-2xl">
            <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-12">
              <div>
                <label htmlFor="username" className="block text-xl font-semibold text-white">
                  Username
                </label>
                <div className="mt-4">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    className="block w-full rounded-2xl bg-white/10 px-6 py-4 text-2xl font-semibold text-white outline-none focus:ring-4 focus:ring-blue-500 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xl font-semibold text-white">
                  Email
                </label>
                <div className="mt-4">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="block w-full rounded-2xl bg-white/10 px-6 py-4 text-2xl font-semibold text-white outline-none focus:ring-4 focus:ring-blue-500 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-xl font-semibold text-white">
                  Password
                </label>
                <div className="mt-4">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="block w-full rounded-2xl bg-white/10 px-6 py-4 text-2xl font-semibold text-white outline-none focus:ring-4 focus:ring-blue-500 placeholder:text-gray-400"
                  />
                </div>
              </div>
              {error && (
              <div className="mt-4 text-red-500 text-lg text-center">{error}</div>
            )}
              <div>
              <button type="submit"
                  className="flex w-full justify-center rounded-2xl bg-blue-600 px-6 py-4 text-2xl font-bold text-white shadow-md hover:bg-blue-500 transition-all hover:shadow-lg focus:ring-4 focus:ring-blue-500">
                  Next
                  </button>
              </div>
            </form>
  
            {/* Correct Link Usage */}
            <p className="mt-14 text-center text-xl text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-blue-400 hover:text-blue-300 transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </>
    );
}
