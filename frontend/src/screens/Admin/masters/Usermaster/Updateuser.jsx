import React, { useState } from "react";
import profileimgs from "../../../../assets/profileimg.jpg";
import { useParams } from "react-router-dom";
import { backendApiUrl } from "../../../../config/config";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const formData = new FormData();
function Updateuser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [dob, setdob] = useState("");
  const [anniversary_date, setanniversary_date] = useState("");
  const [address, setaddress] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.headers.put[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      const { data } = await axios.put(`${backendApiUrl}admin/get-users`, {
        id: id,
        mobile: mobile,
        email: email,
        name: name,
      });

      if (data.status === true) {
        Swal.fire("Great!", data.msg, "success");
      }
      console.log(data);
    } catch (error) {
      Swal.fire("Error!", "Not upadate user", "error");
    }
  };

  return (
    <>
      <div className="dashboarddiv">
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
                  <div className="input-group-profile">
                    <label htmlFor="dob">Date of Birth </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      placeholder="enter dob"
                      value={dob}
                      onChange={(e) => setdob(e.target.value)}
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
                      <label htmlFor="address">Address</label>
                      <input
                        type="address"
                        id="address"
                        name="address"
                        placeholder="enter address"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                      />
                    </div>
                    <div className="input-group-profile">
                      <label htmlFor="anniversary_date">Anniversary date</label>
                      <input
                        type="date"
                        id="anniversary_date"
                        name="anniversary_date"
                        placeholder="enter anniversary"
                        value={anniversary_date}
                        onChange={(e) => setanniversary_date(e.target.value)}
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
    </>
  );
}

export default Updateuser;
