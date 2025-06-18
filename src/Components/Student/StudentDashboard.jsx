import { useState, useEffect } from "react";

const StudentDashboard = () => {
  const [timetable, setTimetable] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    course: "",
    level: "",
    semester: "",
  });
  const [filters, setFilters] = useState({
    course: "",
    level: "",
    semester: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
      setFilters({
        course: user.course || "",
        level: user.level || "",
        semester: user.semester || "",
      });
    }

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
    <div className="p-6 bg-white min-h-screen rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        Welcome, {currentUser.username || "Student"}
      </h2>

      {/* Display user details */}
      <div className="mb-6 text-sm bg-blue-50 p-4 rounded shadow-sm">
        <p><strong>Course:</strong> {currentUser.course || "Not set"}</p>
        <p><strong>Level:</strong> {currentUser.level || "Not set"}</p>
        <p><strong>Semester:</strong> {currentUser.semester || "Not set"}</p>
      </div>

      <p className="mb-4 text-gray-600">View your class timetable below:</p>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={filters.course}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="level"
          placeholder="Enter Level"
          value={filters.level}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="semester"
          placeholder="Enter Semester"
          value={filters.semester}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Timetable Table */}
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
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson, index) => (
                <tr key={index} className="border-t">
                  <td>{lesson.day}</td>
                  <td>{lesson.time}</td>
                  <td>{lesson.subject}</td>
                  <td>{lesson.teacher}</td>
                </tr>
              ))
            ) : (
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
