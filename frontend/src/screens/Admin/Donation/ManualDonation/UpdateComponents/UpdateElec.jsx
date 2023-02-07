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
import { typesOfDonation } from '../common/Data';
import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';
import TotalAmountRow from '../common/TotalAmountRow';

const UpdateElec = ({
  setshowalert,
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,
  handleOpen4,
}) => {
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
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [formerror, setFormerror] = useState({});
  const [genderp, setgenderp] = useState('श्री');
  const [donationItems, setDonationItems] = useState([
    {
      type: '',
      amount: '',
      remark: '',
      transactionNo: '',
      BankName: '',
    },
  ]);

  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        type: '',
        amount: '',
        remark: '',
        transactionNo: '',
        BankName: '',
      },
    ]);
  }
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
  const getDonatedUserDetails = () => {
    serverInstance(
      `admin/getuser-by-num-manual?mobile=${mobileNo}`,
      'get',
    ).then((res) => {
      if (res.status) {
        setFullName(res.data.name);
        setAddress(res.data.address);
        setgenderp(res.data.gender);
      }
    });
  };

  if (mobileNo.length === 10 && fetchuserdetail === true) {
    getDonatedUserDetails();
    setfetchuserdetail(false);
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

  const addElectronicDonation = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      if (showUpdateBtn) {
        console.log('upadte');

        if (
          fullName &&
          donationItems[0].amount &&
          donationItems[0].type &&
          mobileNo
        ) {
          const res = await axios.put(
            `${backendApiUrl}admin/edit-manual-elec-donation`,
            {
              id: updateData?.id,
              name: fullName,
              phoneNo: mobileNo,
              ReceiptNo: receiptNo,
              address: address,
              new_member: newMember,
              modeOfDonation: 1,
              donation_date: updateData?.donation_date,
              donation_time: updateData?.donation_time,
              donation_item: donationItems,
            },
          );

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
          const res = await axios.post(
            `${backendApiUrl}admin/manual-donation`,
            {
              name: fullName,
              gender: genderp,
              phoneNo: mobileNo,
              ReceiptNo: receiptNo,
              address: address,
              new_member: newMember,
              modeOfDonation: 1,
              donation_date: donationDate,
              donation_time: donationTime,
              donation_item: donationItems,
            },
          );

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
            handleOpen4();
          }
        }
      }
    } catch (error) {
      Swal.fire('Error!', 'Somthing went wrong!!', 'error');
    }
  };
  const validate = (name, amount, phoneNo, donationtype) => {
    const errors = {};
    if (!name) {
      errors.name = 'Please enter name';
    }
    return errors;
  };

  const getall_donatiions = () => {
    try {
      Promise.all([
        serverInstance('admin/donation-type?type=1', 'get'),
        serverInstance('admin/voucher-get', 'get'),
      ]).then(([res, item]) => {
        if (res.status) {
          setDonationTypes(res.data);
          console.log(res.data);
        } else {
          Swal.fire('Error', 'somthing went  wrong', 'error');
        }

        console.log('sss', res, item);
      });
    } catch (error) {
      Swal.fire('Error!', error, 'error');
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
    } catch (error) {}
  };
  useEffect(() => {
    getall_donatiions();
    setDonationTypes(typesOfDonation);
    if (updateData) {
      setAddress(updateData?.address);
      setFullName(updateData?.name);
      setMobileNo(updateData?.phoneNo);
      setDonationItems(updateData?.manualItemDetails);
    }
  }, []);
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form onSubmit={addElectronicDonation}>
          <Typography variant="h6" color={themeColor} align="center">
            {showUpdateBtn
              ? 'Update Manual Electronic Donation'
              : 'Add Manual Electronic Donation'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: themeColor,
            }}
            align="right"
          >
            {currDate} / {currTime}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              my: 2,
            }}
          >
            <Typography variant="body1">Change language:</Typography>
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
              Hindi
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
              English
            </Button>
          </Box>
          <Grid container rowSpacing={2} columnSpacing={5}>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="receiptNo">
                Receipt No
              </CustomInputLabel>
              <CustomInput
                type="text"
                id="receiptNo"
                value={receiptNo}
                onChange={(event) => {
                  setReceiptNo(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container rowSpacing={2} columnSpacing={5}>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">Date</CustomInputLabel>
              <CustomInput
                required
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
                required
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
                  {genderoptiins &&
                    genderoptiins.map((item, idx) => {
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
                required
                id="full-name"
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
                  <TableCell
                    sx={{
                      minWidth: 100,
                    }}
                    align="center"
                  >
                    Amount*
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 120,
                    }}
                    align="center"
                  >
                    Bank Name*
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 150,
                    }}
                    align="center"
                  >
                    Transaction No.
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 100,
                    }}
                    align="center"
                  >
                    Remark
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donationItems &&
                  donationItems.map((item, idx) => (
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
                            handleDonationItemUpdate(
                              item,
                              'type',
                              e.target.value,
                            )
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
                          {donationTypes &&
                            donationTypes.map((item, idx) => {
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
                          required
                          value={item.BankName}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'BankName',
                              e.target.value,
                            )
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <CustomTableInput
                          value={item.transactionNo}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'transactionNo',
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

export default UpdateElec;
