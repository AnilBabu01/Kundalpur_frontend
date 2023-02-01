import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminHeader from "../Header/AdminHeader";
import "./MainAdmin";
const MainAdmin = ({ setopendashboard }) => {
  // useEffect(() => {
  //   setopendashboard(true);
  // }, []);

  const {pathname} = useLocation()

  console.log(pathname,'this is header');

  return (
    <>
      <AdminHeader />
    </>
  );
};

export default MainAdmin;
