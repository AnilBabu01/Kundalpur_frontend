import React, { useState, useEffect } from 'react';
import profileimgs from '../../../assets/profileimg.jpg';
import { useNavigate } from 'react-router-dom';
import { backendUrl, backendApiUrl } from '../../../config/config';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../../Redux/redux/action/AuthAction';
import axios from 'axios';
import './ProfileAdminAndEmp.css';
const formData = new FormData();
function ProfileAdminAndEmp({ setOpen4 }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');

  const [address, setaddress] = useState('');
  const [profile_image, setprofile_image] = useState('');
  const [previewprofile, setpreviewprofile] = useState('');
  const [profileimg, setprofileimg] = useState('');
  const [signature, setsignature] = useState('');

  const { user } = useSelector((state) => state.userReducer);
  console.log(user);
  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      formData.set('name', name);
      formData.set('mobile', mobile);
      formData.set('email', email);
      formData.set('password', password);
      formData.set('dob', dob);
      formData.set('anniversary_date', anniversary_date);
      formData.set('address', address);
      formData.set('profile_image', profile_image);
      formData.set('sign', signature);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.post(
        `${backendApiUrl}user/update-profile`,

        formData,
        config,
      );

      if (res.data.status) {
        Swal.fire('Great!', res.data.msg, 'success');
        dispatch(loadUser());
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
    }
  };
  console.log('url', profileimg);
  useEffect(() => {
    // if (user) {
    //   setname(user?.name);
    //   setaddress(user?.address);
    //   setemail(user?.email);
    //   setmobile(user?.mobileNo);
    //   setanniversary_date(user?.anniversary_date);
    //   setdob(user?.dob);
    //   setprofileimg(`${backendUrl}uploads/images/${user?.profile_image}`);
    // }
  }, []);

  return (
    <>
      <div>
        <div
          className="main-inear-prifile-div"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className="right-inear-div-profile">
            <div className="upload-profile-div-main">
              <input
                className="adminprofile_input"
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
                  src={
                    previewprofile
                      ? previewprofile
                      : profileimg
                      ? profileimg
                      : profileimgs
                  }
                  alt="profileimg"
                />
              </div>
              <p>Upload Photo</p>
            </div>
          </div>
        </div>
        <div className="form-main-div-profile">
          <div>
            <div className="adminprofile_input">
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
            <div className="adminprofile_input">
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
              <div className="adminprofile_input">
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
              <div className="adminprofile_input">
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
            </div>
          </div>
        </div>

        <div className="save-div-btn">
          <button onClick={() => submitHandler()} className="save-div-btn-btn">
            Update
          </button>
          <button
            onClick={() => setOpen4(false)}
            className="save-div-btn-btn-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileAdminAndEmp;
