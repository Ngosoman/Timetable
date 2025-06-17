import { useState, useEffect } from "react";

const Users = () => {
  // Simulate users fetched from localStorage or backend
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const handlePasswordChange = (index, newPassword) => {
    const updated = [...users];
    updated[index].password = newPassword;
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const filteredUsers = filterRole === "all"
    ? users
    : users.filter(user => user.role === filterRole);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">User Accounts</h2>

      <div className="flex gap-4 mb-4">
        <label className="font-medium">Filter by Role:</label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border px-3 py-1 rounded-md"
        >
          <option value="all">All</option>
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
        </select>
      </div>

      <table className="w-full border border-gray-300 rounded-xl text-sm">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Password</th>
            <th>Change Password</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.password}</td>
              <td>
                <input
                  type="text"
                  placeholder="New Password"
                  onChange={(e) =>
                    handlePasswordChange(index, e.target.value)
                  }
                  className="border px-2 py-1 rounded-md"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
