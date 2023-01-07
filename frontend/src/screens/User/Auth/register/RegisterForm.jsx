import { useState } from "react";
import VerifyMobile from "./VerifyMobile";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/sideimg.jpeg";
import Swal from "sweetalert2";
import axios from "axios";
import { backendApiUrl } from "../../../../config/config";
import "./registerform.scss";
const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, fullName, password, mobileNumber } = Object.fromEntries(
        new FormData(e.currentTarget)
      );

      if (
        typeof email === "string" &&
        typeof password === "string" &&
        typeof fullName === "string" &&
        typeof mobileNumber === "string"
      ) {
        console.log({ email, fullName, password, mobileNumber });
        const { data } = await axios.post(
          `${backendApiUrl}user/create-account`,
          {
            fullname: fullName,
            mobileno: mobileNumber,
            email: email,
            password: password,
          }
        );
        if (data.status === true) {
          Swal.fire("Great!", data.msg, "success");
          navigate("/login");
        } else {
          Swal.fire("Error!", "Mobile number or Email already exist", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error!", error.response.data.message, "error");

      console.log(error);
    }
  };

  return (
    <>
      <div className="mainlogin-div">
        <img className="img-container" src={logo} alt="logo " />
        <form onSubmit={handleSubmit} className="register-form">
          <div className="heading">Create Account</div>
          <div className="input-group">
            <label htmlFor="fullName">Full name</label>
            <input
              name="fullName"
              required
              type="text"
              id="full-name"
              placeholder="enter full name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="mobile-number">Mobile Number</label>
            <input
              name="mobileNumber"
              required
              type="tel"
              id="mobileNumber"
              placeholder="enter mobile number"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              required
              type="email"
              id="email"
              placeholder="enter email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              required
              title="*At least six characters"
              pattern=".{6,}"
              type="password"
              id="password"
              placeholder="enter password"
            />
            <div>*At least six characters</div>
          </div>
          <div className="input-group">
            <button type="submit" className="register-btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
