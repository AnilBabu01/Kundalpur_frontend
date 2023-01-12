import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { serverInstance } from "../../../../API/ServerInstance";
import { useLocation, useNavigate } from "react-router-dom";
function Userinfo() {
  const { id } = useParams();
  const location = useLocation();
  const navigation = useNavigate();
  const [isData, setisData] = React.useState(null);
  console.log("data form", isData);
  useEffect(() => {
    if (location.state) {
      setisData(location.state?.userdata);
    } else {
      navigation("/admin-panel/master");
    }
  }, []);

  console.log(isData);
  const getinfo = () => {
    try {
      serverInstance(`user/get-elecdonation?id=${id}`, "get").then((res) => {
        if (res.status) {
          setisData(res.data);
          console.log(res);
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    getinfo();
  }, []);
  return (
    <>
      <div className="dashboarddiv">
        <div className="main-user-info">
          <div className="Profile-main-div-master">
            <h2
              className="info_head_color"
              style={{ textAlign: "center", marginBottom: "1rem" }}
            >
              User Details
            </h2>
            <div className="main_emep_info_innear_content">
              <div>
                <p className="info_head_color">Full Name</p>
                <p>{isData?.name}</p>
                <p className="info_head_color">Email</p>
                <p>{isData?.email}</p>
              </div>
              <div>
                <p className="info_head_color">Mobile Number</p>
                <p> {isData?.mobileNo}</p>
                <p className="info_head_color">Address</p>
                <p> {isData?.mobileNo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userinfo;
