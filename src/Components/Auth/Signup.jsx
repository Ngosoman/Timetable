import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    course: "",
    level: "",
    semester: "",
    subject: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Normally, here you'd send to backend
    alert("Account created!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 border rounded-xl"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {role === "teacher" && (
          <input
            type="text"
            name="subject"
            placeholder="Course You Teach"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
        )}

        {role === "student" && (
          <>
            <input
              type="text"
              name="course"
              placeholder="Course"
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <input
              type="text"
              name="level"
              placeholder="Level (Certificate, Degree, etc)"
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <input
              type="text"
              name="semester"
              placeholder="Semester"
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
