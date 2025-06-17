import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import AdminDashboard from "./Components/Admin/Dashboard";
import TeacherDashboard from "./Components/Teacher/Dashboard";
import StudentDashboard from "./Components/Student/Dashboard";
import Signup from "./components/Auth/Signup"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
