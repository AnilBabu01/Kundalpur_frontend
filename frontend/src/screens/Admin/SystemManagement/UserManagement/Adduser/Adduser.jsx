import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../../config/config';
import { serverInstance } from '../../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Adduser.css';

const Adduser = ({ setOpen }) => {
  const [username, setusername] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [role, setrole] = useState('');
  const [status, setstatus] = useState(false);

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      if (username) {
        const res = await axios.post(`${backendApiUrl}admin/add-employee`, {
          Username: username,
          Mobile: mobile,
          Email: email,
          Address: address,
          Password: password,
          Role: role,
          Rid: 2,
          Status: status === 'true' ? true : false,
        });
        console.log(res.data);
        if (res.data.status === true) {
          Swal.fire('Great!', res.data.message, 'success');
          setOpen(false);
        }
        if (res.data.status === false) {
          Swal.fire('Error!', res.data.message, 'error');
          setOpen(false);
        }
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      setOpen(false);
    }
  };

  return (
    <>
      <div className="cash-donation-di">
        <form onSubmit={handlesubmit}>
          <div
            className="cash-donation-container-innser"
            style={{ paddingLeft: '2rem' }}
          >
            <div className="form-div">
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <label htmlFor="mobile">Mobile No</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                    className="forminput_add_user"
                  />

                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    className="forminput_add_user"
                  />
                </div>
              </div>
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <label htmlFor="username">Username</label>
                  <input
                    text="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    className="forminput_add_user"
                  />
                  <label>Password</label>
                  <input
                    htmlFor="password"
                    text="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    className="forminput_add_user"
                  />
                </div>
              </div>
            </div>
            <div className="form-div">
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <labe htmlFor="email" l>
                    Email Address
                  </labe>
                  <input
                    text="email"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="forminput_add_user"
                  />
                </div>
              </div>

              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <label htmlFor="role"> User Role</label>
                  <select
                    className="inner-input-div1-select_add"
                    type="text"
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                  >
                    <option value="None">Select Role</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Donation And Booking">
                      Donation And Booking
                    </option>
                    <option value="Room Booking">Room Booking</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Store">Store</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manual Donation">Manual Donation</option>
                    <option value="Elect Donation">Elect Donation</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-div">
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <label htmlFor="status">Status</label>
                  <select
                    className="inner-input-div1-select_add"
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setstatus(e.target.value)}
                  >
                    <option value="None">Status</option>
                    <option value={true}>Active</option>
                    <option value={false}>De-Active</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="save-div-btn">
              <button className="save-div-btn-btn">Save</button>
              <button
                onClick={() => setOpen(false)}
                className="save-div-btn-btn-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Adduser;
