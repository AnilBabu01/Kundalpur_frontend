import React from 'react';
import './Categoryform.css';
function Categoryform({ setOpen }) {
  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                  Dharamshala
                </label>
                <select className="select_optionssss">
                  <option>ss</option>
                </select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Facilities
                </label>
                <select className="select_optionssss">
                  <option>ss</option>
                </select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Category
                </label>
                <input
                  style={{ width: '280px', height: '35px' }}
                  type="text"
                  id="fromNo"
                  placeholder="enter rate"
                  className="forminput_add_user"
                  //   value={fromNo}
                  //   name="fromNo"
                  //   onChange={(e) => setfromNo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                  Rate
                </label>
                <input
                  style={{ width: '280px', height: '35px' }}
                  type="text"
                  id="fromNo"
                  placeholder="enter rate"
                  className="forminput_add_user"
                  //   value={fromNo}
                  //   name="fromNo"
                  //   onChange={(e) => setfromNo(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Advance Amount
                </label>
                <input
                  style={{ width: '280px', height: '35px' }}
                  type="text"
                  id="fromNo"
                  placeholder="enter rate"
                  className="forminput_add_user"
                  //   value={fromNo}
                  //   name="fromNo"
                  //   onChange={(e) => setfromNo(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  online availability
                </label>
                <select className="select_optionssss">
                  <option>None</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                  offline availability
                </label>
                <select className="select_optionssss">
                  <option>None</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Check Out Time
                </label>
                <input
                  style={{ width: '280px', height: '35px' }}
                  type="time"
                  id="fromNo"
                  placeholder="enter rate"
                  className="forminput_add_user"
                  //   value={fromNo}
                  //   name="fromNo"
                  //   onChange={(e) => setfromNo(e.target.value)}
                />
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
      </div>
    </>
  );
}

export default Categoryform;
