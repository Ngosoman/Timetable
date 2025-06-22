import { useState, useEffect } from "react";
import useGreetings from "../useGreetings";
import { Link } from "react-router-dom";
import LetterGlitch from "../../Bits/LetterGlitch";

const StudentDashboard = () => {
  const { greeting, holidayMessage } = useGreetings();
  const [timetable, setTimetable] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    course: "",
    level: "",
    semester: "",
    year: ""
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }

    const data = JSON.parse(localStorage.getItem("timetable")) || [];

    // Only show lessons matching user's course
    const courseLessons = user
      ? data.filter((lesson) => lesson.course === user.course)
      : [];

    setTimetable(courseLessons);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 bg-white min-h-screen rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        {greeting} {holidayMessage && ` - ${holidayMessage}`} {currentUser.username}
      </h2>
      <div className="flex justify-end mb-4">
  <Link
    to="/profile"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
  >
    My Profile
  </Link>
</div>

      {/* Display student details */}
      <div className="mb-6 text-sm bg-blue-50 p-4 rounded shadow-sm space-y-1">
        <p><strong>Course:</strong> {currentUser.course || "Not set"}</p>
        <p><strong>Level:</strong> {currentUser.level || "Not set"}</p>
        <p><strong>Semester:</strong> {currentUser.semester || "Not set"}</p>
        {/* <p><strong>Year:</strong> {currentUser.year || "Not set"}</p> */}
      </div>

      <p className="mb-4 text-gray-600">Your class timetable for <strong>{currentUser.course}</strong> is shown below:</p>

      {/* Timetable Table */}
      <div className="overflow-auto">
        <table className="w-full border text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">Day</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Unit</th>
              <th className="border px-4 py-2">Teacher</th>
            </tr>
          </thead>
          <tbody>
            {timetable.length > 0 ? (
              timetable.map((lesson, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2 text-center">{lesson.day}</td>
                  <td className="border px-4 py-2 text-center">{lesson.time}</td>
                  <td className="border px-4 py-2 text-center">{lesson.unit}</td>
                  <td className="border px-4 py-2 text-center">{lesson.teacher}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No lessons available for your course yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Print Button */}
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
