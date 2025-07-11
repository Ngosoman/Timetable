import { useEffect, useState } from "react";
import Users from "./Users";
import TimetableForm from "./TimetableForm";
import TimetableList from "./TimetableList";
import { Link } from "react-router-dom";
import ClickSpark from "../../Bits/ClickSpark";



const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  return (
    <ClickSpark
  sparkColor='#D0D043'
  sparkSize={37}
  sparkRadius={60}
  sparkCount={17}
  duration={1000}
>
 

    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Admin Dashboard
      </h1>
      <div className="flex justify-end mb-4">
  <Link
    to="/profile"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
  >
    My Profile
  </Link>
</div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="space-y-6">
          <Users users={users} />
          <TimetableForm users={users} />
        </div>

        
        <div>
          <TimetableList />
        </div>
       

      </div>
    </div>
    </ClickSpark>
  );
};

export default AdminDashboard;
