import React, { useState, useEffect } from 'react';
import { backendApiUrl } from '../../../../config/config';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
function ChangeStatus({ id, handleClose }) {
  const navigate = useNavigate();
  const [paymentId, setpaymentId] = useState('');
  const [approvevalue, setapprovevalue] = useState('');
  console.log(id);

  const handlesubmit = async () => {
    try {
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}admin/cheque-status`, {
        status: Number(approvevalue),
        id: id,
        PAYMENT_ID: paymentId,
      });
      if (res.data.status) {
        Swal.fire('Great!', res.data.msg, 'success');
        navigate('/admin-panel/reports/cheque');
        handleClose(false);
      }
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <div>
          <div className="Status_main_div">
            <label htmlFor="Payment id">Payment id</label>
            <input
              type="text"
              name="paymentId"
              id="paymentId"
              value={paymentId}
              placeholder="Payment id"
              onChange={(e) => setpaymentId(e.target.value)}
            />
            <label htmlFor="type">Status</label>
            <select
              className="inner-input-div1-select-cheque"
              id="type"
              name="mode"
              value={approvevalue}
              onChange={(e) => setapprovevalue(e.target.value)}
            >
              <option value={0}> Not approved</option>
              <option value={1}>Approved</option>
            </select>
            <button onClick={() => handlesubmit()}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeStatus;
