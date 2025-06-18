import Users from "./Users";
import TimetableForm from "./TimetableForm";
import TimetableList from "./TimetableList";


const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setLoggedUser(null);
    navigate("/");
  };
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h1>
      <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Users & Timetable Form */}
        <div className="space-y-6">
          <Users />
          <TimetableForm />
        </div>

        {/* Right Column: List of Timetables */}
        <div>
          <TimetableList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
