import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import profileimgs from "../../../../assets/profileimg.jpg";
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
        <div className="Profile-main-div-master">
          <div>
            <form>
              <div className="form-main-div-profile">
                <div>
                  <div className="input-group-profile">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="name"
                      id="name"
                      name="name"
                      placeholder="enter name"
                      value={isData?.name}
                      // onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                  <div className="input-group-profile">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="enter email"
                      value={isData?.email}
                    />
                  </div>
                  <div className="input-group-profile">
                    <label htmlFor="dob">Date of Birth </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      placeholder="enter dob"
                      value={isData?.dob}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <div className="input-group-profile">
                      <label htmlFor="mobile">Mobile Number</label>
                      <input
                        type="mobile"
                        id="mobile"
                        name="mobile"
                        placeholder="enter phone"
                        value={isData?.mobileNo}
                      />
                    </div>
                    <div className="input-group-profile">
                      <label htmlFor="address">Address</label>
                      <input
                        type="address"
                        id="address"
                        name="address"
                        placeholder="enter address"
                        value={isData?.mobileNo}
                      />
                    </div>
                    <div className="input-group-profile">
                      <label htmlFor="anniversary_date">Anniversary date</label>
                      <input
                        type="date"
                        id="anniversary_date"
                        name="anniversary_date"
                        placeholder="enter anniversary"
                        //   value={anniversary_date}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userinfo;
