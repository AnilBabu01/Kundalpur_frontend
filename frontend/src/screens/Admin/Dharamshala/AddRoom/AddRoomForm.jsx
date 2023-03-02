import React from 'react';

function AddRoomForm({ setOpen }) {
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
                  Room Number
                </label>
                <input
                  style={{ width: '280px', height: '35px' }}
                  id="text"
                  className="forminput_add_user"
                  type="text"
                  placeholder="enter category name"
                  //   value={toNo}
                  //   name="toNo"
                  //   onChange={(e) => settoNo(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Facilities
                </label>
                <select className="select_optionssss">
                  <option>ss</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                  Category
                </label>
                <select className="select_optionssss">
                  <option>ss</option>
                </select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Rate
                </label>
                <input
                  style={{ width: '280px', height: '35px' }}
                  id="text"
                  className="forminput_add_user"
                  type="text"
                  placeholder="enter category name"
                  //   value={toNo}
                  //   name="toNo"
                  //   onChange={(e) => settoNo(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Advance Amount
                </label>
                <input
                  style={{ width: '280px', height: '35px' }}
                  id="text"
                  className="forminput_add_user"
                  type="text"
                  placeholder="enter category name"
                  //   value={toNo}
                  //   name="toNo"
                  //   onChange={(e) => settoNo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                  Check Out Time
                </label>
                <input
                  style={{ width: '280px', height: '35px' }}
                  id="text"
                  className="forminput_add_user"
                  type="time"
                  placeholder="enter category name"
                  //   value={toNo}
                  //   name="toNo"
                  //   onChange={(e) => settoNo(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Room Type
                </label>
                <select className="select_optionssss">
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Both</option>
                </select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Status
                </label>
                <select className="select_optionssss">
                  <option>Enable</option>
                  <option>Disable</option>
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
      </div>
    </>
  );
}

export default AddRoomForm;
