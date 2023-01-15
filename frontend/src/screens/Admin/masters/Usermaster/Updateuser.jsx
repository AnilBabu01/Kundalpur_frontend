import React, { useState, useEffect } from "react";
import { backendApiUrl } from "../../../../config/config";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Updateuser({ setopendashboard }) {
  const location = useLocation();
  const navigation = useNavigate();
  const [isData, setisData] = React.useState(null);
  const [name, setname] = useState(isData?.name);
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.headers.put[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      const { data } = await axios.put(`${backendApiUrl}admin/get-users`, {
        id: isData?.id,
        mobile: mobile,
        email: email,
        name: name,
        password: password,
      });

      if (data.status === true) {
        Swal.fire("Great!", data.msg, "success");
      }
      console.log(data);
    } catch (error) {
      Swal.fire("Error!", "Not upadate user", "error");
    }
  };
  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      setisData(location.state?.userdata);
      setname(location.state?.userdata.name);
      setaddress(location.state?.userdata.address);
      setemail(location.state?.userdata.email);
      setmobile(location.state?.userdata.mobileNo);
    } else {
      navigation("/admin-panel/master");
    }
    setopendashboard(true);
  }, []);

  console.log(isData?.id);
  return (
    <>
      <div className="dashboarddiv">
        <div className="main-user-info">
          <div className="Profile-main-div-master">
            <div>
              <form onSubmit={submitHandler}>
                <div className="main-inear-prifile-div">
                  <div className="left-inear-div-profile">
                    <h2>Update user</h2>
                  </div>

                  <div className="right-inear-div-profile">
                    <div className="upload-profile-div-main">
                      <div></div>
                    </div>
                  </div>
                </div>
                <div className="form-main-div-profile">
                  <div>
                    <div className="input-group-profile">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="name"
                        id="name"
                        name="name"
                        placeholder="enter name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                    <div className="input-group-profile">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="enter email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
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
                          value={mobile}
                          onChange={(e) => setmobile(e.target.value)}
                        />
                      </div>
                      <div className="input-group-profile">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="enter password"
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="save-btn-profile-div">
                  <button className="save-btn-profile">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Updateuser;
