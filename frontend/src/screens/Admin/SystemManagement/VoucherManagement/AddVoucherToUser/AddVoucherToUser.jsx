import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../../config/config';
import { serverInstance } from '../../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import axios from 'axios';
import './AddVoucherToUser.css';

const AddVoucherToUser = ({ setOpen }) => {
  const [isData, setisData] = React.useState([]);
  const [fromNo, setfromNo] = useState('');
  const [toNo, settoNo] = useState('');
  const [assingTo, setassingTo] = useState();
  const [empname, setempname] = useState('');

  console.log(empname, assingTo);

  const handlesubmit = async () => {
    try {
      if (!fromNo && !toNo && !assingTo) {
        Swal.fire('Error!', 'All fields required', 'error');
      }
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}user/add-voucher-user`, {
        from: fromNo,
        to: toNo,
        user: Number(assingTo),
        name: empname,
      });

      console.log(res.data.data);
      if (res.data.data.message) {
        Swal.fire('Great!', 'VOUCHER GENERATED SUCCESSFULLY', 'success');
        setOpen(false);
      }
      // if (res.data.status === false) {
      //   Swal.fire("Error!", res.data.message, "error");
      //   setOpen(false);
      // }
    } catch (error) {
      // Swal.fire("Error!", error.response.data.message, "error");
      setOpen(false);
    }
  };
  const getall_donation = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  useEffect(() => {
    getall_donation();
  }, [open]);
  return (
    <>
      <div className="cash-donation-div">
        <div
          className="cash-donation-container-innser"
          style={{ paddingLeft: '2rem' }}
        >
          <div className="form-div">
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label htmlFor="fromNo">From Number</label>
                <input
                  type="number"
                  id="fromNo"
                  required
                  placeholder="From VC"
                  className="forminput_add_user"
                  value={fromNo}
                  name="fromNo"
                  onChange={(e) => setfromNo(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label htmlFor="toNo">To Number </label>
                <input
                  id="toNo"
                  required
                  className="forminput_add_user"
                  type="number"
                  placeholder="To VC"
                  value={toNo}
                  name="toNo"
                  onChange={(e) => settoNo(e.target.value)}
                />
              </div>
              <div className="inner-input-div2">
                <label htmlFor="assingTo">Assign To </label>
                <select
                  className="inner-input-div1-select12"
                  id="assingTo"
                  value={assingTo}
                  required
                  name="assingTo"
                  onChange={(e) => setassingTo(e.target.value)}
                >
                  {isData &&
                    isData.map((item, index) => {
                      return (
                        <option
                          onClick={() => {
                            console.log('click');
                          }}
                          key={index}
                          value={item.id}
                        >
                          {item.Username}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>

          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              Save
            </button>
            <button
              onClick={() => setOpen(false)}
              className="save-div-btn-btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVoucherToUser;
