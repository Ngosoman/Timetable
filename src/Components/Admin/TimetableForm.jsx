import { useState, useEffect } from "react";

const TimetableForm = () => {
  const [form, setForm] = useState({
    course: "",
    level: "",
    semester: "",
    day: "",
    time: "",
    unit: "",
    teacher: "",
  });

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const onlyTeachers = users.filter((u) => u.role === "teacher");
    setTeachers(onlyTeachers);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("timetable")) || [];
    const updated = [...existing, form];
    localStorage.setItem("timetable", JSON.stringify(updated));
    alert("Lesson added to timetable!");
    setForm({
      course: "",
      level: "",
      semester: "",
      day: "",
      time: "",
      unit: "",
      teacher: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Add Lesson to Timetable</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Updated Course Field */}
  <select
    name="course"
    required
    value={form.course}
    onChange={handleChange}
    className="border p-2 rounded"
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

  {/* Other Form Fields */}
  <input
    type="text"
    name="level"
    placeholder="Level"
    required
    value={form.level}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="semester"
    placeholder="Semester"
    required
    value={form.semester}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="day"
    placeholder="Day (e.g. Monday)"
    required
    value={form.day}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="time"
    placeholder="Time (e.g. 8:00AM - 10:00AM)"
    required
    value={form.time}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="unit"
    placeholder="Unit Name"
    required
    value={form.unit}
    onChange={handleChange}
    className="border p-2 rounded"
  />

  {/* Teacher Dropdown */}
  <select
    name="teacher"
    required
    value={form.teacher}
    onChange={handleChange}
    className="border p-2 rounded"
  >
    <option value="">Assign Teacher</option>
    {teachers.map((t, i) => (
      <option key={i} value={t.username}>
        {t.username}
      </option>
    ))}
  </select>
</div>


        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Lesson
        </button>
      </form>
    </div>
  );
};

export default TimetableForm;
