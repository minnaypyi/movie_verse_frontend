import React, { useState, useEffect  } from "react";
import { useHistory  } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const genres = [
  "Action",
  "Drama",
  "Comedy",
  "Documentary",
  "Horror",
  "Science Fiction",
  "Animation",
  "Fantasy",
];

export default function SelectGenre() {
  const history = useHistory();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the user came from the registration page
    if (!localStorage.getItem('fromRegister') || localStorage.getItem('fromRegister') !== 'true') {
      history.push('/register'); // Redirect to register page if not
    }
  }, [history]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedGenres.length === 0) {
      setError('Please select at least one genre.');
      return;
    }

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Combine the user data with selected genres
    const fullUserData = {
      ...userData,
      favoriteGenres: selectedGenres,
    };

    // Send combined data to the backend for registration
    try {
      const response = await fetch(`http://${backendUrl}:8080/api/auth/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullUserData),
      });

      if (response.ok) {
        console.log("Trying to log in");
        // After successful registration, log the user in by sending login request
        const loginResponse = await fetch(`http://${backendUrl}:8080/api/auth/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userData.username, // assuming username is available in userData
            password: userData.password, // assuming password is available in userData
          }),
        });
        if (loginResponse.ok) {
          console.log("Login Success");
          const loginData = await loginResponse.json();
          // Store token and username in localStorage
          localStorage.setItem("authToken", loginData.token);
          localStorage.setItem("username", userData.username);

          // Redirect to home on successful login
          localStorage.removeItem("userData");  // Clean up the temporary user data
          localStorage.removeItem("fromRegister");
          history.push('/'); // Or wherever you want to redirect after login
        } else {
          setError('Login failed after registration.');
        }

        localStorage.removeItem("userData");
        history.push('/'); // Redirect to home on success
      } else {
        setError('Registration failed.');
      }
    } catch (error) {
      setError('Network error, please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-lg text-center">
        <h2 className="text-4xl font-extrabold text-white">Kick Start Recommendation</h2>
        <p className="text-gray-400 text-2xl mt-3 mb-8">Choose your interests.</p>

        <div className="space-y-5">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`w-full py-4 rounded-lg text-2xl font-semibold transition ${
                selectedGenres.includes(genre)
                  ? "bg-blue-100 text-black"
                  : "bg-gray-800 text-white"
              }`}
            >
              {genre}
              {selectedGenres.includes(genre) && " ✓"}
            </button>
          ))}
        </div>
        
        {error && <p className="text-red-500 mt-4">{error}</p>}

        <button onClick={handleSubmit} className="mt-8 w-full py-4 bg-blue-600 text-white text-2xl font-bold rounded-lg hover:bg-blue-500 transition flex items-center justify-center">
          Sign Up
        </button>


      </div>
    </div>
  );
}
