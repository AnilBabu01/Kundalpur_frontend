import React from 'react';
import './ChangePassword.css';
function ChangePassword({ setOpen5 }) {
  return (
    <>
      <p className="password_warning">Password must have</p>
      <p className="password_warning">
        . have at least 8 characters
        <br />. have at least one uper case
        <br />. have at least one special character (!, %, @, #, etc.)
      </p>
      <div className="adminprofile_input">
        <label htmlFor="address">Old Password</label>
        <input
          style={{ width: '99%' }}
          type="address"
          id="address"
          name="address"
          placeholder="enter address"
          //   value={address}
          //   onChange={(e) => setaddress(e.target.value)}
        />
      </div>
      <div className="adminprofile_input">
        <label htmlFor="address">New Password</label>
        <input
          style={{ width: '99%' }}
          type="address"
          id="address"
          name="address"
          placeholder="enter address"
          //   value={address}
          //   onChange={(e) => setaddress(e.target.value)}
        />
      </div>
      <div className="adminprofile_input">
        <label htmlFor="address">Confirm New Password</label>
        <input
          style={{ width: '99%' }}
          type="address"
          id="address"
          name="address"
          placeholder="enter address"
          //   value={address}
          //   onChange={(e) => setaddress(e.target.value)}
        />
      </div>
      <div className="save-div-btn">
        <button className="save-div-btn-btn">Upload</button>
        <button
          onClick={() => setOpen5(false)}
          className="save-div-btn-btn-cancel"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default ChangePassword;
