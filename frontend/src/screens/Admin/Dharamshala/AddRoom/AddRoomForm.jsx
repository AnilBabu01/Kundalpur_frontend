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
                  Category Name
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
                  Rate
                </label>
                <input
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
                <select className="select_optionssss">
                  <option>ss</option>
                </select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Linked Account
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
                  Facilities
                </label>
                <select className="select_optionssss">
                  <option>ss</option>
                </select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Check Out Type
                </label>
                <select className="select_optionssss">
                  <option>ss</option>
                </select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Status
                </label>
                <select className="select_optionssss">
                  <option>ss</option>
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