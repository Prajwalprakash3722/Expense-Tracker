import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutPage from "./Pages/About";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import ProfilePage from "./Pages/Profile";
import DashBoard from "./Pages/DashBoard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import DatePicker from "./components/Date";
function App() {
  return (
    <>
      <Router>
        <NavBar />
        {/* <DatePicker /> */}
        <Routes>
          {/* <Route path="/" exact component={HomePage} /> */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
