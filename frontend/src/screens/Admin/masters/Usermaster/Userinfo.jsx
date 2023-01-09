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
            <div>
              <form>
                <div className="form-main-div-profile">
                  <div>
                    <div className="input-group-profile">
                      <p htmlFor="name">Full Name</p>
                      <p>{isData?.name}</p>
                    </div>
                    <div className="input-group-profile">
                      <p>Email</p>
                      <p>{isData?.email}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="input-group-profile">
                        <p>Mobile Number</p>
                        <p> {isData?.mobileNo}</p>
                      </div>
                      <div className="input-group-profile">
                        <p>Address</p>
                        <p> {isData?.mobileNo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userinfo;
