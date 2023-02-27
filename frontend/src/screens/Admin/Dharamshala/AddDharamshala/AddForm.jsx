import React from 'react';
import camera from '../../../../assets/camera.png';
function AddForm({ setOpen }) {
  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div className="form-div">
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label htmlFor="fromNo">dharamshala in english</label>
                <input
                  type="text"
                  id="fromNo"
                  placeholder="enter the dharamshala name in english"
                  className="forminput_add_user"
                  //   value={fromNo}
                  //   name="fromNo"
                  //   onChange={(e) => setfromNo(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label htmlFor="toNo">dharamshala in hindi</label>
                <input
                  id="text"
                  className="forminput_add_user"
                  type="text"
                  placeholder="enter the dharamshala name in hindi"
                  //   value={toNo}
                  //   name="toNo"
                  //   onChange={(e) => settoNo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="main_upload_sharam">
            <div className="cemera_inear_div">
              <img src={camera} alt="ss" />
            </div>
            <div className="selctimg_div">
              <label htmlFor="fromNo">Image 1 </label>
              <input
                id="text"
                className="forminput_add_user"
                type="file"
                placeholder="enter category name"
                //   value={toNo}
                //   name="toNo"
                //   onChange={(e) => settoNo(e.target.value)}
              />
            </div>
          </div>

          <div className="main_upload_sharam">
            <div className="cemera_inear_div">
              <img src={camera} alt="ss" />
            </div>
            <div className="selctimg_div">
              <label htmlFor="fromNo">Image 2 </label>
              <input
                id="text"
                className="forminput_add_user"
                type="file"
                placeholder="enter category name"
                //   value={toNo}
                //   name="toNo"
                //   onChange={(e) => settoNo(e.target.value)}
              />
            </div>
          </div>

          <div className="main_upload_sharam">
            <div className="cemera_inear_div">
              <img src={camera} alt="ss" />
            </div>
            <div className="selctimg_div">
              <label htmlFor="fromNo">Image 3 </label>
              <input
                id="text"
                className="forminput_add_user"
                type="file"
                placeholder="enter category name"
                //   value={toNo}
                //   name="toNo"
                //   onChange={(e) => settoNo(e.target.value)}
              />
            </div>
          </div>

          <div className="main_upload_sharam">
            <div className="cemera_inear_div">
              <img src={camera} alt="ss" />
            </div>
            <div className="selctimg_div">
              <label htmlFor="fromNo">Image 4 </label>
              <input
                id="text"
                className="forminput_add_user"
                type="file"
                placeholder="enter category name"
                //   value={toNo}
                //   name="toNo"
                //   onChange={(e) => settoNo(e.target.value)}
              />
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

export default AddForm;
