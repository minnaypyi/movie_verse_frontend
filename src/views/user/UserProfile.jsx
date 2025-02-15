import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./userprofile.css";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserProfile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    favouriteGenres: [],
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    // Fetch the user profile from API when the component mounts
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch(`http://${backendUrl}:8080/api/auth/profile/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!signal.aborted) {
            setUser({
              username: data.username,
              email: data.email,
              favouriteGenres: data.favouriteGenres,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          history.push("/login"); // Redirect to login if fetching fails
        });

      // Fetch watched movies count
      fetch(`http://${backendUrl}:8080/api/user-interactions/watched-count`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!signal.aborted) {
            setUser((prevState) => ({
              ...prevState,
              watchedMoviesCount: data.count || 0,
            }));
          }
        })
        .catch((error) =>
          console.error("Error fetching watched movies count:", error)
        );

      // Fetch favorite movies count
      fetch(`http://${backendUrl}:8080/api/user-interactions/favorite-count`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!signal.aborted) {
            setUser((prevState) => ({
              ...prevState,
              favoriteMoviesCount: data.count || 0,
            }));
          }
        })
        .catch((error) =>
          console.error("Error fetching favorite movies count:", error)
        );

      // Fetch reviews count
      fetch(`http://${backendUrl}:8080/api/reviews/user/review-count`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!signal.aborted) {
            setUser((prevState) => ({
              ...prevState,
              reviewCount: data.reviewCount || 0, // Change "data.count" to "data.reviewCount"
            }));
          }
        })
        .catch((error) =>
          console.error("Error fetching reviews count:", error)
        );
    } else {
      history.push("/login"); // Redirect to login if no authToken
    }
    const handleCloseModal = () => {
      // Clear the error when closing the modal
      setPasswordError("");
      setIsModalOpen(false);
    };
    return () => controller.abort(); // Cleanup function to cancel request
  }, [history]);

  const handleChangePassword = () => {
    // Password validation: at least one lowercase, one uppercase, one number
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must contain at least one lowercase letter, one uppercase letter, and one number."
      );
      return;
    }
    if (currentPassword === newPassword) {
      setPasswordError("New password must not be same as old password.");
    } else if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
      // Send the current and new password to the backend
      fetch(`http://${backendUrl}:8080/api/users/change-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })
        .then(async (response) => {
          const text = await response.text(); // Read response as plain text

          if (response.ok) {
            //alert(text || "Password changed successfully.");
            toast.success(text || "Password changed successfully.");
            handleCloseModal(); // Close modal on success
          } else {
            //alert(text || "Failed to change password. Please try again.");
            toast.error(text || "Failed to change password. Please try again.");
          }
        })
        .catch((error) => console.error("Error changing password:", error));
      //alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleDownloadUserInteractions = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch(
        `http://${backendUrl}:8080/api/user-interactions/getuserinteractions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length) {
            const csvData = convertToCSV(data); // Convert data to CSV format
            downloadCSV(csvData, "user_interactions.csv"); // Trigger file download
          } else {
            toast.error("No data available to download.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user interactions:", error);
          toast.error("Failed to fetch data.");
        });
    }
  };

  const downloadCSV = (csvData, filename) => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.click();
    }
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((header) => row[header]).join(",")
    );
    return [headers.join(","), ...rows].join("\n");
  };

  const handleCloseModal = () => {
    // Clear the error when closing the modal
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setIsModalOpen(false);
  };
  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Favourite Genres:</strong>
          {user.favouriteGenres && user.favouriteGenres.length > 0
            ? user.favouriteGenres.map((genre) => genre.name).join(", ")
            : "No favourite genres"}
        </p>
        <p>
          <strong>Watched Movies:</strong> {user.watchedMoviesCount || 0}
        </p>
        <p>
          <strong>Favorite Movies:</strong> {user.favoriteMoviesCount || 0}
        </p>
        <p>
          <strong>Reviews Given:</strong> {user.reviewCount || 0}
        </p>
      </div>
      <div className="button-group">
        <button onClick={() => setIsModalOpen(true)} className="btn-action">
          Change Password
        </button>
        {/* Download Button */}
        <button onClick={handleDownloadUserInteractions} className="btn-action">
          Download User Interactions
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Change Password</h2>
            <div>
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {passwordError && (
              <div className="error-container">
                <p className="error">{passwordError}</p>
              </div>
            )}
            <div className="modal-buttons">
              <button onClick={handleChangePassword}>Change Password</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
