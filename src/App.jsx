import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import AdminDashboard from "./Components/Admin/Dashboard";
import TeacherDashboard from "./Components/Teacher/TeacherDashboard";
import StudentDashboard from "./Components/Student/StudentDashboard";
import Signup from "./components/Auth/Signup"; 
import { useAuth } from "./Context/AuthContext";

function App() {
  const { setUser} = useAuth();
  const handleLogout = () => {
    setUser(null);
    navigate("/");
   }
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard currentUser={loggedUser} logout={handleLogout} />} />
        <Route path="/teacher" element={<TeacherDashboard currentUser={loggedUser}  logout={handleLogout}/>} />
        <Route path="/student" element={<StudentDashboard currentUser={loggedUser} logout={handleLogout} />} /> 
      </Routes>
    </Router>
  );
}

export default App;
