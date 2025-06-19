import { useState, useEffect } from "react";

const TimetableForm = ({ users }) => {
  const [form, setForm] = useState({
    course: "",
    level: "",
    semester: "",
    day: "",
    time: "",
    subject: "",
    teacher: ""
  });

  const [courseOptions, setCourseOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);

  useEffect(() => {
    // Filter unique course, level, semester from students
    const students = users.filter((u) => u.role === "student");
    const teachers = users.filter((u) => u.role === "teacher");

    const uniqueCourses = [...new Set(students.map((s) => s.course))];
    const uniqueLevels = [...new Set(students.map((s) => s.level))];
    const uniqueSemesters = [...new Set(students.map((s) => s.semester))];

    setCourseOptions(uniqueCourses);
    setLevelOptions(uniqueLevels);
    setSemesterOptions(uniqueSemesters);
    setTeacherOptions(teachers);
  }, [users]);

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
      subject: "",
      teacher: ""
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Add Lesson to Timetable</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Course */}
          <select
            name="course"
            required
            value={form.course}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Course</option>
            {courseOptions.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Level */}
          <select
            name="level"
            required
            value={form.level}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Level</option>
            {levelOptions.map((l, i) => (
              <option key={i} value={l}>
                {l}
              </option>
            ))}
          </select>

          {/* Semester */}
          <select
            name="semester"
            required
            value={form.semester}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Semester</option>
            {semesterOptions.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Day & Time */}
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

          {/* Subject */}
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            value={form.subject}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Assign Teacher */}
          <select
            name="teacher"
            required
            value={form.teacher}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Assign Teacher</option>
            {teacherOptions.map((t, i) => (
              <option key={i} value={t.username}>
                {t.username} ({t.subject})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Lesson
        </button>
      </form>
    </div>
  );
};

export default TimetableForm;
