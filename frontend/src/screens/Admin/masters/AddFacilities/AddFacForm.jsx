import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';
const custumstyle = {
  width: '280px',
  height: '35px',
  background: '#FFFFFF',
  border: '1px solid #C5BFBF',
  borderRadius: '7px',
  paddingLeft: '0.5rem',
};
function AddFacForm({ setOpen }) {
  const [facilityInHindi, setfacilityInHindi] = useState('');
  const [facilityInEnglish, setfacilityInEnglish] = useState('');
  const [showloader, setshowloader] = useState(false);
  const handlesubmit = async () => {
    try {
      setshowloader(true);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}room/facility`, {
        name: facilityInEnglish,
        nameh: facilityInHindi,
      });

      console.log(res.data.data);
      if (res.data.data.status === true) {
        setshowloader(false);
        setOpen(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
      if (res.data.data.status === false) {
        setshowloader(false);
        setOpen(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };
  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div className="form-div">
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label htmlFor="fromNo">Facility in english</label>
                <input
                  style={{ width: '280px', height: '35px' }}
                  type="text"
                  id="fromNo"
                  placeholder="enter the facility in english"
                  className="forminput_add_user"
                  value={facilityInEnglish}
                  name="facilityInEnglish"
                  onChange={(e) => setfacilityInEnglish(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label htmlFor="toNo">Facility in hindi</label>

                <ReactTransliterate
                  style={custumstyle}
                  id="full-name"
                  required
                  placeholder="enter the dharamshala name in hindi"
                  value={facilityInHindi}
                  onChangeText={(facilityInHindi) => {
                    setfacilityInHindi(facilityInHindi);
                  }}
                  onChange={(e) => setfacilityInHindi(e.target.value)}
                  lang="hi"
                />
              </div>
            </div>
          </div>

          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              {showloader ? (
                <CircularProgress
                  style={{
                    width: '21px',
                    height: '21px',
                    color: 'white',
                  }}
                />
              ) : (
                'Update'
              )}
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
}

export default AddFacForm;
