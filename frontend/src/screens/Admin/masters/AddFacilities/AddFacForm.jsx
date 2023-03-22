import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '37.2rem',
  fontFamily: 'Poppins',
  backgroundColor: '#fff',
  borderRadius: 6,
  '& .MuiInputBase-input': {
    border: '1px solid #B8B8B8',
    borderRadius: 6,
    width: '100%',
    fontSize: 15,
    padding: 8,
    paddingLeft: 12,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
function AddFacForm({ setOpen }) {
  const [facilityname, setfacilityname] = useState('');
  const [commentss, setcommentss] = useState('');
  const [showloader, setshowloader] = useState(false);
  const handlesubmit = async () => {
    try {
      setshowloader(true);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}room/facility`, {
        name: facilityname,
        comments: commentss,
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
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="facilityname"
                >
                  Facilities Name
                </label>
                <CustomInput
                  id="facilityname"
                  name="facilityname"
                  placeholder="Enter facility name"
                  value={facilityname}
                  onChange={(e) => setfacilityname(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
                  htmlFor="commentss"
                >
                  Comments
                </label>
                <CustomInput
                  id="commentss"
                  name="commentss"
                  placeholder="Enter comments"
                  value={commentss}
                  onChange={(e) => setcommentss(e.target.value)}
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
