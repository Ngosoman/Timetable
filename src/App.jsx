import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import AdminDashboard from "./Components/Admin/Dashboard";
import TeacherDashboard from "./Components/Teacher/TeacherDashboard";
import StudentDashboard from "./Components/Student/StudentDashboard";
import Signup from "./Components/Auth/Signup"; 
import Profile from "./Components/Profile";



function App({loggedUser}) {
  
  
  
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Login  />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/signup" element={<Signup currentUser={loggedUser}  />} />
        <Route path="/admin" element={<AdminDashboard currentUser={loggedUser}  />} />
        <Route path="/teacher" element={<TeacherDashboard currentUser={loggedUser}  />} />
        <Route path="/student" element={<StudentDashboard currentUser={loggedUser}  />} /> 
        <Route path="/profile" element={<Profile currentUser={loggedUser}  />} />
      </Routes>
    </Router>
  );
}

export default App;
