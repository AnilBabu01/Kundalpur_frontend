import React, { useEffect } from "react";
import Chart from "./Chart";
import "./Dashboard.css";
import OrdersTable from "./OrdersTable";
import TotalInfoCard from "./TotalInfoCard";
const Dashboard = ({ setopendashboard }) => {
  useEffect(() => {
    setopendashboard(true);
  }, []);
  return (
    <>
      <div className="dashboarddiv">
        <div className="main_coomig_div">
          <div className="cooming_div">
            <h2>Coming soon</h2>
          </div>
          <div className="cooming_div">
            <h2>Coming soon</h2>
          </div>
          <div className="cooming_div">
            <h2>Coming soon</h2>
          </div>
          <div className="cooming_div">
            <h2>Coming soon</h2>
          </div>
          <div className="cooming_div">
            <h2>Coming soon</h2>
          </div>
          <div className="cooming_div">
            <h2>Coming soon</h2>
          </div>
          <div className="cooming_div">
            <h2>Coming soon</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
