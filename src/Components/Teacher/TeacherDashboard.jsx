import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGreetings from "../useGreetings";

const TeacherDashboard = () => {
  const {greeting, holidayMessage}= useGreetings();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [form, setForm] = useState({
    course: "",
    level: "",
    semester: "",
    day: "",
    time: "",
    Unit: "",
  });

  // Fetch user and lessons
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "teacher") {
      navigate("/teacher");
    } else {
      setCurrentUser(user);
      const allLessons = JSON.parse(localStorage.getItem("timetable")) || [];
      const myLessons = allLessons.filter((lesson) => lesson.teacher === user.username);
      setLessons(myLessons);
    }
  }, [navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const welcome = (e)  => {

  }

  const handleAddLesson = (e) => {
    e.preventDefault();
    const newLesson = {
      ...form,
      teacher: currentUser.username,
    };
    const allLessons = JSON.parse(localStorage.getItem("timetable")) || [];
    allLessons.push(newLesson);
    localStorage.setItem("timetable", JSON.stringify(allLessons));
    setLessons([...lessons, newLesson]);

    // Reset form
    setForm({
      course: "",
      level: "",
      semester: "",
      day: "",
      time: "",
      Unit: "",
    });
  };


  return (
    <div className="p-6 bg-white min-h-screen rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        {greeting} {holidayMessage && ` - ${holidayMessage}`}  {currentUser?.username}
      </h2>

      <p className="mb-4">Here are your assigned lessons:</p>

      {/* Lesson Table */}
      <div className="overflow-auto mb-6">
        <table className="w-full border text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th>Course</th>
              <th>Level</th>
              <th>Semester</th>
              <th>Day</th>
              <th>Time</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((item, index) => (
              <tr key={index} className="border-t">
                <td>{item.course}</td>
                <td>{item.level}</td>
                <td>{item.semester}</td>
                <td>{item.day}</td>
                <td>{item.time}</td>
                <td>{item.Unit}</td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No lessons assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Lesson Form */}
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="font-bold mb-3">Add Lesson</h3>
        <form
          onSubmit={handleAddLesson}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            name="course"
            placeholder="Course"
            value={form.course}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="level"
            placeholder="Level"
            value={form.level}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="semester"
            placeholder="Semester"
            value={form.semester}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="day"
            placeholder="Day"
            value={form.day}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="time"
            placeholder="Time"
            value={form.time}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="Unit"
            placeholder="Unit"
            value={form.unit}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />

          <div className="md:col-span-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Lesson
            </button>
          </div>
        </form>
      </div>

      <div className="text-right">
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Print My Timetable
        </button>
      </div>
    </div>
  );
};

export default TeacherDashboard;
