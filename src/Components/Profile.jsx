import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (!current) return navigate("/");
    setUser(current);
    setPreview(current.profilePic || "");
  }, [navigate]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = () => {
    if (newPassword.trim() !== "") {
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = allUsers.map((u) =>
        u.username === user.username ? { ...u, password: newPassword } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      user.password = newPassword;
      setNewPassword("");
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = reader.result;
      setUser({ ...user, profilePic: img });
      setPreview(img);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.username === user.username ? user : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Profile updated!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-center text-blue-700">My Profile</h2>

      <div className="flex justify-center">
        <img
          src={preview || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
      </div>
      <input type="file" onChange={handlePhotoUpload} className="block w-full" />

      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleInputChange}
        className="border p-2 rounded w-full"
        placeholder="Username"
      />

      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        className="border p-2 rounded w-full"
        placeholder="Email"
        disabled
      />

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="New Password"
      />
      <button
        onClick={handlePasswordChange}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
      >
        Change Password
      </button>

      <button
        onClick={handleSaveChanges}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Save Profile Changes
      </button>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
