import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import PrivateRoutes from "./utils/privateRoutes";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      {/* Container for displaying toast notifications */}
      <ToastContainer />

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Navigation bar */}
      <Navbar />

      {/* Define application routes */}
      <Routes>
        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
