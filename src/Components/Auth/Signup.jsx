import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "student",
    course: "",
    level: "",
    semester: "",
    subject: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.username === formData.username);
    if (exists) {
      setMessage("Username already exists!");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    // 🔐 Set currentUser immediately
    localStorage.setItem("currentUser", JSON.stringify(formData));

    // ✅ Optional: clear form
    setFormData({
      username: "",
      password: "",
      role: "student",
      course: "",
      level: "",
      semester: "",
      subject: "",
    });

    setMessage("Account created successfully! Redirecting...");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full border mb-3 px-3 py-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border mb-3 px-3 py-2 rounded"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border mb-3 px-3 py-2 rounded"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {/* If Student */}
        {formData.role === "student" && (
          <>
            <select
              name="course"
              onChange={handleChange}
              required
              className="w-full border mb-3 px-3 py-2 rounded"
            >
              <option value="">Select Course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Accounting">Accounting</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Economics">Economics</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Architecture">Architecture</option>
              <option value="Education (Arts)">Education (Arts)</option>
              <option value="Education (Science)">Education (Science)</option>
              <option value="Early Childhood Education">Early Childhood Education</option>
              <option value="Fine Arts">Fine Arts</option>
              <option value="Literature">Literature</option>
              <option value="Nursing">Nursing</option>
              <option value="Medicine & Surgery">Medicine & Surgery</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Public Health">Public Health</option>
              <option value="Law">Law</option>
              <option value="Criminology">Criminology</option>
              <option value="Psychology">Psychology</option>
              <option value="Political Science">Political Science</option>
              <option value="International Relations">International Relations</option>
              <option value="Journalism & Media">Journalism & Media</option>
              <option value="Hospitality Management">Hospitality Management</option>
              <option value="Tourism & Travel">Tourism & Travel</option>
              <option value="Fashion Design">Fashion Design</option>
              <option value="Agribusiness">Agribusiness</option>
              <option value="Environmental Science">Environmental Science</option>
              <option value="Supply Chain Management">Supply Chain Management</option>
              <option value="Human Resource Management">Human Resource Management</option>
            </select>

            <select
              name="level"
              onChange={handleChange}
              required
              className="w-full border mb-3 px-3 py-2 rounded"
            >
              <option value="">Select Level</option>
              <option value="Certificate">Certificate</option>
              <option value="Diploma">Diploma</option>
              <option value="Degree">Degree</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>

            <select
              name="semester"
              onChange={handleChange}
              required
              className="w-full border mb-3 px-3 py-2 rounded"
            >
              <option value="">Select Semester</option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3</option>
            </select>

            <select
              name="Year"
              onChange={handleChange}
              required
              className="w-full border mb-3 px-3 py-2 rounded"
            >
              <option value="">Select Year</option>
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
              <option value="Year 4">Year 4</option>
            </select>
          </>
        )}

        {/* If Teacher */}
        {formData.role === "teacher" && (
          <select
            name="subject"
            onChange={handleChange}
            required
            className="w-full border mb-3 px-3 py-2 rounded"
          >
            <option value="">Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="Kiswahili">Kiswahili</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Computer Studies">Computer Studies</option>
            <option value="Programming Fundamentals">Programming Fundamentals</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
            <option value="Database Systems">Database Systems</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Accounting Principles">Accounting Principles</option>
            <option value="Financial Management">Financial Management</option>
            <option value="Marketing Strategies">Marketing Strategies</option>
            <option value="Business Law">Business Law</option>
            <option value="Education Psychology">Education Psychology</option>
            <option value="Curriculum Development">Curriculum Development</option>
            <option value="Public Speaking">Public Speaking</option>
            <option value="Creative Writing">Creative Writing</option>
            <option value="Journalism & Media">Journalism & Media</option>
            <option value="Nursing Practice">Nursing Practice</option>
            <option value="Pharmacology">Pharmacology</option>
            <option value="Public Health">Public Health</option>
            <option value="Tourism & Hospitality">Tourism & Hospitality</option>
            <option value="Fashion Design">Fashion Design</option>
            <option value="Agricultural Studies">Agricultural Studies</option>
          </select>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

        {message && (
          <p className="text-red-500 text-sm mt-3 text-center">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;
