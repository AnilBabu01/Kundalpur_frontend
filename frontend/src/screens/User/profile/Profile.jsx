import React, { useState } from "react";
import profileimgs from "../../../assets/profileimg.jpg";
import { updateProfile } from "../../../Redux/redux/action/AuthAction";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import "./Profile.css";
const formData = new FormData();
function Profile() {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [dob, setdob] = useState("");
  const [anniversary_date, setanniversary_date] = useState("");
  const [address, setaddress] = useState("");
  const [profile_image, setprofile_image] = useState("");
  const [previewprofile, setpreviewprofile] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    formData.set("name", name);
    formData.set("mobile", mobile);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("dob", dob);
    formData.set("anniversary_date", anniversary_date);
    formData.set("address", address);
    formData.set("profile_image", profile_image);

    dispatch(updateProfile(formData));
  };
  const { isUpdated } = useSelector((state) => state.userReducer);
  if (isUpdated) {
    Swal.fire("Profile Updated!", "success");
  }
  return (
    <>
      <div className="Profile-main-div">
        <div>
          <form onSubmit={submitHandler}>
            <div className="main-inear-prifile-div">
              <div className="left-inear-div-profile">
                <h2>Complete your Profile</h2>
              </div>

              <div className="right-inear-div-profile">
                <div className="upload-profile-div-main">
                  <input
                    type="file"
                    name="profile"
                    onChange={(e) => {
                      setprofile_image(e.target.files[0]);
                      console.log(e.target.files[0]);
                      setpreviewprofile(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <div className="profile-img-div">
                    <img
                      src={previewprofile ? previewprofile : profileimgs}
                      alt="profileimg"
                    />
                  </div>
                  <p>Upload Photo</p>
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
                    <label htmlFor="password">Create password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="enter password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
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
            <div className="input-group-profile1">
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
            <div className="save-btn-profile-div">
              <button className="save-btn-profile">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
