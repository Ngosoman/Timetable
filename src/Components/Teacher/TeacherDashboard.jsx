import { useState, useEffect } from "react";

const TeacherDashboard = ({ currentUser }) => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const allLessons = JSON.parse(localStorage.getItem("timetable")) || [];
    const myLessons = allLessons.filter(
      (lesson) => lesson.teacher === currentUser.name
    );
    setLessons(myLessons);
  }, [currentUser.name]);

  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        Welcome, {currentUser.name}
      </h2>
      
      <p className="mb-4">Here are your assigned lessons:</p>

      <div className="overflow-auto">
        <table className="w-full border text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th>Course</th>
              <th>Level</th>
              <th>Semester</th>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
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
                <td>{item.subject}</td>
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

export default TeacherDashboard;
