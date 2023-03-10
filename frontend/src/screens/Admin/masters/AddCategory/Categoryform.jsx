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
import { ReactTransliterate } from 'react-transliterate';
const custominput = {
  border: '1px solid #B8B8B8',
  width: '280px',
  height: '39px',
  borderRadius: '5px',
  fontSize: '15px',
  paddingLeft: '0.5rem',
  color: 'gray',
};
export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '280px',
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
function Categoryform({ setOpen }) {
  const [categoryInhindi, setcategoryInhindi] = useState();
  const [categoryInenglish, setcategoryInenglish] = useState('');
  const [showloader, setshowloader] = useState(false);
  const handlesubmit = async () => {
    try {
      setshowloader(true);

      const data = {
        categoryInhindi: categoryInhindi,
        categoryInenglish: categoryInenglish,
      };
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}room/category`, data);

      if (res.data.data.status) {
        setOpen(false);
        setshowloader(false);
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
                  htmlFor="categoryInhindi"
                >
                  Category in hindi
                </label>

                <ReactTransliterate
                  style={custominput}
                  id="full-name"
                  required
                  placeholder="Enter the category in english"
                  value={categoryInhindi}
                  onChangeText={(categoryInhindi) => {
                    setcategoryInhindi(categoryInhindi);
                  }}
                  onChange={(e) => setcategoryInhindi(e.target.value)}
                  lang="hi"
                />
              </div>

              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="categoryInenglish"
                >
                  Category in english
                </label>
                <CustomInput
                  id="categoryInenglish"
                  name="categoryInenglish"
                  placeholder="Enter the category in english"
                  value={categoryInenglish}
                  onChange={(e) => setcategoryInenglish(e.target.value)}
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

export default Categoryform;
