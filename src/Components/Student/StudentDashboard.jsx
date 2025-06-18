import { useState, useEffect } from "react";

const StudentDashboard = ({ currentUser }) => {
  const [timetable, setTimetable] = useState([]);
  const [filters, setFilters] = useState({
    course: "",
    level: "",
    semester: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("timetable")) || [];
    setTimetable(data);
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredLessons = timetable.filter(
    (item) =>
      item.course.toLowerCase().includes(filters.course.toLowerCase()) &&
      item.level.toLowerCase().includes(filters.level.toLowerCase()) &&
      item.semester.toLowerCase().includes(filters.semester.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        Welcome, {currentUser.name}
      </h2>
     
      <p className="mb-4">View your class timetable below:</p>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="course"
          placeholder="Enter Course (e.g. BCOM)"
          value={filters.course}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="level"
          placeholder="Enter Level (e.g. Degree)"
          value={filters.level}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="semester"
          placeholder="Enter Semester (e.g. Semester 1)"
          value={filters.semester}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Timetable */}
      <div className="overflow-auto">
        <table className="w-full border text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map((lesson, index) => (
              <tr key={index} className="border-t">
                <td>{lesson.day}</td>
                <td>{lesson.time}</td>
                <td>{lesson.subject}</td>
                <td>{lesson.teacher}</td>
              </tr>
            ))}
            {filteredLessons.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No timetable found for the selected course/level/semester.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
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

export default StudentDashboard;
