import React, { useState, useEffect } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box,
  Button,
  ButtonBase,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './Categoryform.css';
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
function UpdateCategory({ setOpen, updatedata }) {
  const [commentss, setcommentss] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [showloader, setshowloader] = useState(false);
  const handlesubmit = async () => {
    try {
      setshowloader(true);

      const data = {
        name: categoryname,
        comments: commentss,
        category_id: updatedata?.category_id,
      };
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.put(`${backendApiUrl}room/category`, data);

      if (res.data.data.status) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
      if (res.data.data.status === false) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  useEffect(() => {
    if (updatedata) {
      setcategoryname(updatedata?.name);
      setcommentss(updatedata?.comment);
    }
  }, []);

  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="categoryname"
                >
                  Category Name
                </label>
                <CustomInput
                  id="categoryname"
                  name="categoryname"
                  placeholder="Enter category name"
                  value={categoryname}
                  onChange={(e) => setcategoryname(e.target.value)}
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
}

export default UpdateCategory;
