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
          <input type="text" name="course" placeholder="Course" required value={form.course} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="level" placeholder="Level" required value={form.level} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="semester" placeholder="Semester" required value={form.semester} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="day" placeholder="Day (e.g. Monday)" required value={form.day} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="time" placeholder="Time (e.g. 8:00AM - 10:00AM)" required value={form.time} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="unit" placeholder="Unit Name" required value={form.unit} onChange={handleChange} className="border p-2 rounded" />

          <select name="teacher" required value={form.teacher} onChange={handleChange} className="border p-2 rounded">
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
