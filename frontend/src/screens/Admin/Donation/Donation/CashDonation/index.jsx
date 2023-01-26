// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../../config/config';
import { serverInstance } from '../../../../../API/ServerInstance';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { alpha } from '@mui/material/styles';

import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Moment from 'moment-js';
import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';
import TotalAmountRow from '../common/TotalAmountRow';

const CashDonation = ({
  setshowalert,
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,
}) => {
  console.log('upadte data is', updateData);
  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins',
    },
    palette: {
      primary: {
        main: themeColor,
      },
    },
  });
  const [donationTypes, setDonationTypes] = useState([]);
  const [receiptNo, setReceiptNo] = useState('');

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [transactionNo, setTransactionNo] = useState('');
  const [bankName, setBankName] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [formerror, setFormerror] = useState({});
  const [genderp, setgenderp] = useState('श्री');
  const [donationItems, setDonationItems] = useState([
    {
      type: '',
      amount: '',
      remark: '',
    },
  ]);
  console.log('this is gender', genderp);
  const genderoptiins = [
    {
      id: 2,
      gender: 'श्रीमति',
    },
    {
      id: 3,
      gender: 'मे.',
    },
    {
      id: 4,
      gender: 'कु.',
    },
  ];

  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        type: '',
        amount: '',
        remark: '',
      },
    ]);
  }
  function removeDonationItem(item) {
    setDonationItems(
      donationItems.filter((donationItem) => donationItem !== item),
    );
  }

  console.log('donationItems', donationItems);
  function handleDonationItemUpdate(originalDonationItem, key, value) {
    setDonationItems(
      donationItems.map((donationItem) =>
        donationItem === originalDonationItem
          ? {
              ...donationItem,
              [key]: value,
            }
          : donationItem,
      ),
    );
  }

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const [donationDate, setDonationDate] = useState(today);

  const [donationTime, setDonationTime] = useState(
    today.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
  );

  const addCashDonation = async (e) => {
    axios.defaults.headers.post[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    axios.defaults.headers.put[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    e.preventDefault();
    if (showUpdateBtn) {
      console.log('upadte');

      if (
        fullName &&
        donationItems[0].amount &&
        donationItems[0].type &&
        mobileNo
      ) {
        const res = await axios.put(`${backendApiUrl}user/add-elecDonation`, {
          id: updateData?.id,
          name: fullName,
          phoneNo: mobileNo,
          address: address,
          prefix: 'CASH',
          new_member: newMember,
          modeOfDonation: 2,
          donation_date: updateData?.donation_date,
          donation_time: updateData?.donation_date,
          donation_item: donationItems,
        });

        if (res.data.status === true) {
          setshowalert(true);
          handleClose();
        } else {
          Swal.fire('Error!', 'Somthing went wrong!!', 'error');
        }
      }
    } else {
      console.log('clicked');

      if (
        fullName &&
        donationItems[0].amount &&
        donationItems[0].type &&
        mobileNo
      ) {
        const res = await axios.post(`${backendApiUrl}user/add-elecDonation`, {
          name: fullName,
          phoneNo: mobileNo,
          address: address,
          prefix: 'CASH',
          new_member: newMember,
          modeOfDonation: 2,
          donation_date: donationDate,
          donation_time: donationTime,
          donation_item: donationItems,
        });

        let totalamount = donationItems?.amount
          ? donationItems?.amount
          : donationItems &&
            donationItems.reduce(
              (n, { amount }) => parseFloat(n) + parseFloat(amount),
              0,
            );

        if (res.data.status === true) {
          setshowalert(true);
          handleClose();

          sendsms(totalamount);
        } else {
          Swal.fire('Error!', 'Somthing went wrong!!', 'error');
        }
      }
    }
  };

  const sendsms = async (totalamount) => {
    try {
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const res = await axios.post(`${backendApiUrl}user/sms`, {
        mobile: mobileNo,
        amount: totalamount,
        url: '',
      });
      console.log('sent sms ', res);
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };
  const getall_donatiions = () => {
    try {
      Promise.all([
        serverInstance('admin/donation-type?type=1', 'get'),
        serverInstance('admin/get-receipt?type=2', 'get'),
      ]).then(([res, item]) => {
        if (res.status) {
          setDonationTypes(res.data);
          console.log(res.data);
        } else {
          Swal.fire('Error', 'somthing went  wrong', 'error');
        }
        if (item.status) {
          setReceiptNo(item.data);
        }
        console.log('sss', res, item);
      });
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  useEffect(() => {
    getall_donatiions();
    if (updateData) {
      setAddress(updateData?.address);
      setFullName(updateData?.name);
      setMobileNo(updateData?.phoneNo);
      setDonationItems(updateData?.elecItemDetails);
    }
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form onSubmit={addCashDonation}>
          <Typography variant="h6" color={'primary'} align="center">
            {showUpdateBtn ? 'Update Cash Donation' : 'Add Cash Donation'}
          </Typography>
          <Typography variant="body2" color="primary">
            {currDate} / {currTime}
          </Typography>
          <Typography variant="body2" my={1}>
            Receipt No:
            {updateData?.ReceiptNo ? updateData?.ReceiptNo : receiptNo}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              my: 2,
            }}
          >
            <Typography variant="body1">Are you new member:</Typography>
            <Button
              variant={newMember ? 'outlined' : 'contained'}
              sx={{
                borderColor: '#C8C8C8',
                fontSize: 12,
                minWidth: 40,
                padding: 0,
                color: newMember ? '#656565' : '#fff',
              }}
              onClick={() => setNewMember(false)}
            >
              {' '}
              No
            </Button>
            <Button
              onClick={() => setNewMember(true)}
              variant={newMember ? 'contained' : 'outlined'}
              sx={{
                borderColor: '#C8C8C8',
                fontSize: 12,
                minWidth: 40,
                padding: 0,
                color: newMember ? '#fff' : '#656565',
              }}
            >
              {' '}
              Yes
            </Button>
          </Box>
          <Grid container rowSpacing={2} columnSpacing={5}>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">Date</CustomInputLabel>
              <CustomInput
                type="date"
                id="donation-date"
                value={donationDate.toLocaleDateString('en-CA')}
                onChange={(event) => {
                  setDonationDate(new Date(event.target.value));
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-time">Time</CustomInputLabel>
              <CustomInput
                type="time"
                id="donation-time"
                value={donationTime}
                onChange={(event) => {
                  setDonationTime(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputLabel required htmlFor="mobile-no">
                Mobile Number
              </CustomInputLabel>
              <CustomInput
                required
                id="mobile-no"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomInputLabel required htmlFor="full-name">
                <Select
                  required
                  sx={{
                    width: '20%',
                    fontSize: 14,
                    '& .MuiSelect-select': {
                      padding: '1px',
                    },
                  }}
                  value={genderp}
                  onChange={(e) => setgenderp(e.target.value)}
                >
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={'श्री'}
                  >
                    श्री
                  </MenuItem>
                  {genderoptiins.map((item, idx) => {
                    return (
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        key={item.id}
                        value={item.gender}
                      >
                        {item.gender}
                      </MenuItem>
                    );
                  })}
                </Select>
                Full Name
              </CustomInputLabel>
              <CustomInput
                id="full-name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomInputLabel required htmlFor="address">
                Address
              </CustomInputLabel>
              <CustomInput
                required
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
          </Grid>
          <TableContainer
            sx={{
              mt: 4,
            }}
          >
            <Table
              stickyHeader
              sx={{
                border: '1px solid #C4C4C4',
                '& th': {
                  padding: 0,
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor: '#E4E3E3',
                  color: '#05313C',
                  outline: '1px solid #C4C4C4',
                },
                '& td': {
                  padding: 0,
                  fontSize: 14,
                },
              }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box
                      sx={{
                        paddingInline: '10px',
                        minWidth: 200,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      Type of donation*
                      <IconButton aria-label="add" size="small">
                        <AddBoxIcon color="primary" onClick={addDonationItem} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="center">Amount*</TableCell>
                  <TableCell align="center">Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donationItems.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell
                      style={{
                        paddingInline: 8,
                      }}
                    >
                      <Select
                        required
                        sx={{
                          width: '100%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        value={item.type}
                        onChange={(e) =>
                          handleDonationItemUpdate(item, 'type', e.target.value)
                        }
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={''}
                        >
                          Please select
                        </MenuItem>
                        {donationTypes.map((item, idx) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item.type_hi}
                            >
                              {item.type_hi}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        required
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'amount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        value={item.remark}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'remark',
                            e.target.value,
                          )
                        }
                        endAdornment={
                          idx > 0 && (
                            <InputAdornment position="start">
                              <IconButton
                                sx={{
                                  padding: '4px',
                                }}
                                onClick={() => removeDonationItem(item)}
                              >
                                <RemoveCircleOutlineIcon
                                  color="primary"
                                  fontSize="small"
                                />
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}

                <TotalAmountRow donationItems={donationItems} />
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              mt: 2,
            }}
          >
            {showUpdateBtn ? (
              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                  boxShadow: 'none',
                }}
                variant="contained"
                type="submit"
              >
                Update
              </Button>
            ) : (
              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                  boxShadow: 'none',
                }}
                variant="contained"
                type="submit"
              >
                Save
              </Button>
            )}

            <Button
              sx={{
                textTransform: 'none',
                paddingX: 5,
              }}
              variant="contained"
              color="error"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </ThemeProvider>
    </Box>
  );
};
export default CashDonation;
