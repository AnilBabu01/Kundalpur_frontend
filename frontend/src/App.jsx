import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainAdmin from "../src/screens/Admin/MainAdmin/MainAdmin";
import Navbar from "./screens/User/Header/Navbar";
import Footer from "./screens/User/Footer/Footer";
import MainRoutes from "./routes/MainRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/redux/action/AuthAction";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const [opendashboard, setopendashboard] = useState(false);
  const [showreciept, setshowreciept] = useState(false);
  if (!sessionStorage.getItem("token")) {
  }

  const gett = () => {
    dispatch(loadUser());
  };

  useEffect(() => {
    gett();
  }, []);

  return (
    <>
      <Router>
        {!opendashboard && !showreciept ? <Navbar /> : ""}
        {opendashboard && <MainAdmin />}
        <MainRoutes
          setopendashboard={setopendashboard}
          setshowreciept={setshowreciept}
        />
        <AdminRoutes
          setopendashboard={setopendashboard}
          setshowreciept={setshowreciept}
        />
        {!opendashboard && !showreciept ? <Footer /> : ""}
      </Router>
    </>
  );
}

export default App;
