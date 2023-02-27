import React from 'react';

function AddFacForm({ setOpen }) {
  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div className="form-div">
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label htmlFor="fromNo">Facility in english</label>
                <input
                  type="text"
                  id="fromNo"
                  placeholder="enter the facility in english"
                  className="forminput_add_user"
                  //   value={fromNo}
                  //   name="fromNo"
                  //   onChange={(e) => setfromNo(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label htmlFor="toNo">Facility in hindi</label>
                <input
                  id="text"
                  className="forminput_add_user"
                  type="text"
                  placeholder="enter the facility in hindi"
                  //   value={toNo}
                  //   name="toNo"
                  //   onChange={(e) => settoNo(e.target.value)}
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

export default AddFacForm;
