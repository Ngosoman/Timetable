// Same imports
import { useState, useEffect } from "react";

const TimetableList = () => {
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

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filtered = timetable.filter((entry) => {
    const matchesCourse = filters.course
      ? entry.course.toLowerCase().includes(filters.course.toLowerCase())
      : true;
    const matchesLevel = filters.level
      ? entry.level.toLowerCase().includes(filters.level.toLowerCase())
      : true;
    const matchesSemester = filters.semester
      ? entry.semester.toLowerCase().includes(filters.semester.toLowerCase())
      : true;

    return matchesCourse && matchesLevel && matchesSemester;
  });

  const handleDelete = (index) => {
    const updated = [...timetable];
    updated.splice(index, 1);
    setTimetable(updated);
    localStorage.setItem("timetable", JSON.stringify(updated));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6 space-y-4">

      <h2 className="text-xl font-bold mb-4 text-blue-700">Timetable Records</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input type="text" placeholder="Filter by Course" name="course" value={filters.course} onChange={handleFilterChange} className="border px-3 py-2 rounded" />
        <input type="text" placeholder="Filter by Level" name="level" value={filters.level} onChange={handleFilterChange} className="border px-3 py-2 rounded" />
        <input type="text" placeholder="Filter by Semester" name="semester" value={filters.semester} onChange={handleFilterChange} className="border px-3 py-2 rounded" />
      </div>

      <div className="overflow-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-2 px-4 text-left">Course</th>
              <th className="py-2 px-4 text-left">Level</th>
              <th className="py-2 px-4 text-left">Semester</th>
              <th className="py-2 px-4 text-left">Day</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-left">Unit</th>
              <th className="py-2 px-4 text-left">Teacher</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-2 text-center">{item.course}</td>
                <td className="py-2 px-2 text-center">{item.level}</td>
                <td className="py-2 px-2 text-center">{item.semester}</td>
                <td className="py-2 px-2 text-center">{item.day}</td>
                <td className="py-2 px-2 text-center ">{item.time}</td>
                <td className="py-2 px-2 text-center">{item.unit}</td>
                <td className="py-2 px-2 text-center">{item.teacher}</td>
                <td>
                  <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No matching timetable entries
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
        <button onClick={handlePrint} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Print Timetable
        </button>
      </div>
    </div>
  );
};

export default TimetableList;
