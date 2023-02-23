import React from 'react';

function CheckinForm({ setOpen }) {
  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div className="main_div_checkin_div">
            <p>Details</p>
            <div>
              <div className="date_and_time_div">
                <div className="inpur_div_room">
                  <label>Date</label>
                  <input className="date_and_time_divinput" type="date" />
                </div>

                <div className="inpur_div_room">
                  <label>Time</label>
                  <input className="date_and_time_divinput" type="time" />
                </div>
              </div>

              <div className="minddle_div_room">
                <div className="minddle_div_room_innear">
                  <label>Full Name</label>
                  <input type="text" />
                </div>
                <div className="minddle_div_room_innear">
                  <label>Email</label>
                  <input type="text" />
                </div>
                <div className="minddle_div_room_innear">
                  <label>Mobile Number</label>
                  <input type="text" />
                </div>
              </div>

              <div className="minddle_div_room">
                <div className="minddle_div_room_innear_adddress">
                  <label>Full Name</label>
                  <input type="text" />
                </div>

                <div className="date_and_time_div_add">
                  <div
                    className="inpur_div_room_add"
                    style={{ marginRight: '1.1rem' }}
                  >
                    <label>City</label>
                    <input type="text" />
                  </div>

                  <div
                    className="inpur_div_room_add"
                    style={{ marginRight: '1.1rem' }}
                  >
                    <label>State</label>
                    <select>
                      <option>ss</option>
                    </select>
                  </div>

                  <div className="inpur_div_room_add">
                    <label>Pincode</label>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="minddle_div_room">
                <div className="minddle_div_room_innear">
                  <label>Id Proof</label>
                  <select className="select_optionssss">
                    <option>ss</option>
                  </select>
                </div>
                <div className="minddle_div_room_innear">
                  <label>Id Proof Number</label>
                  <input type="text" />
                </div>
                <div className="minddle_div_room_innear">
                  <label>Stay Days</label>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="main_div_checkin_div1">
            <p>Member Details</p>
            <div className="main_Btotn_check_div">
              <div className="main_ddsh_div">
                <div className="main_Btotn_check_div_input">
                  <label>Male</label>
                  <input type="text" />
                </div>
                <div className="main_Btotn_check_div_input">
                  <label>Female</label>
                  <input type="text" />
                </div>
                <div className="main_Btotn_check_div_input">
                  <label>Children</label>
                  <input type="text" />
                </div>
              </div>
              <div>
                <div className="number_inera_div">
                  <label>Total Member</label>
                  <input type="text" />
                </div>
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

export default CheckinForm;
