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
import { useNavigate } from 'react-router-dom';
const ElectronicDonation = ({
  setshowalert,
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,
  setopendashboard,
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

  const navigation = useNavigate();

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
    serverInstance(`admin/getuser-by-num?mobile=${mobileNo}`, 'get').then(
      (res) => {
        if (res.status) {
          setFullName(res.data.name);
          setAddress(res.data.address);
          setgenderp(res.data.gender);
        }
      },
    );
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

  var date = today.toISOString().substring(0, 10);
  const [donationDate, setDonationDate] = useState(date);

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
          const res = await axios.put(`${backendApiUrl}user/add-elecDonation`, {
            id: updateData?.id,
            name: fullName,
            phoneNo: mobileNo,
            address: address,
            new_member: newMember,
            modeOfDonation: 1,
            donation_date: updateData?.donation_date,
            donation_time: updateData?.donation_time,
            donation_item: donationItems,
          });

          if (res.data.status === true) {
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
            `${backendApiUrl}user/add-elecDonation`,
            {
              name: fullName,
              gender: genderp,
              phoneNo: mobileNo,
              prefix: 'ELEC',
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

          console.log('rr', res);
          if (res.data.status === true) {
            setshowalert(true);
            handleClose();
            sendsms(totalamount);

            navigation('/reciept', {
              state: {
                userdata: res.data.data.data,
              },
            });
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
        if (item.status) {
          setReceiptNo(item.data);
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
      setDonationItems(updateData?.elecItemDetails);
    }

    setopendashboard(true);
  }, []);
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form onSubmit={addElectronicDonation}>
          <Typography variant="h6" color={themeColor} align="center">
            {showUpdateBtn
              ? 'Update Electronic Donation'
              : 'Add Electronic Donation'}
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
          <Typography variant="body2" my={1}>
            {updateData?.ReceiptNo ? 'Receipt No :' : ' Voucher No :'}
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
              <CustomInputLabel htmlFor="donation-date">Date</CustomInputLabel>
              <CustomInput
                required
                type="date"
                id="donation-date"
                value={donationDate}
                onChange={(event) => {
                  setDonationDate(
                    new Date(event.target.value).toISOString().substring(0, 10),
                  );
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

// const ElectronicDonation = ({ setOpen, setshowalert, handleClose }) => {
//   const [donationtype, setdonationtype] = useState('');
//   const [amount, setamount] = useState('');
//   const [remark, setremark] = useState('');
//   const [name, setname] = useState('');
//   const [address, setaddress] = useState('');
//   const [transactionNo, setTransactionNo] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [new_member, setnew_member] = useState(false);
//   const [phoneNo, setphoneNo] = useState('');
//   const [isData, setisData] = React.useState([]);
//   const [noOfRows, setNoOfRows] = useState({ id: 1 });
//   const [rowsData, setRowsData] = useState([noOfRows]);
//   const [formerror, setFormerror] = useState({});
//   const [item, setitem] = useState([]);
//   console.log(isData);

//   const RemoveRow = (index) => {
//     const data = rowsData.filter((i) => i.id !== index);

//     setRowsData(data);
//     console.log(index);
//   };
//   const itemClick = () => {
//     // @ts-ignore
//     setitem((prev) => [
//       ...prev,
//       {
//         amount: amount,
//         remark: remark,
//         type: donationtype,
//       },
//     ]);
//     setdonationtype('');
//     setamount('');
//     setremark('');
//   };
//   const date = new Date();

//   let day = date.getDate();
//   let month = date.getMonth() + 1;
//   let year = date.getFullYear();

//   let hour = date.getHours();
//   let min = date.getMinutes();
//   const time = `${hour}:${min}`;
//   const currentDate = `${year}-${month}-${day}`;

//   const addelectronicdonation = async (e) => {
//     e.preventDefault();
//     setFormerror(validate(name, amount, phoneNo, donationtype));
//     let data;
//     if (item.length === 0) {
//       data = [
//         {
//           amount: amount,
//           remark: remark,
//           type: donationtype,
//         },
//       ];
//     }

//     if (item.length > 0) {
//       itemClick();
//       console.log('item from electronic', item);
//     }

//     axios.defaults.headers.post[
//       'Authorization'
//     ] = `Bearer ${sessionStorage.getItem('token')}`;
//     if (name && amount && donationtype && phoneNo) {
//       const res = await axios.post(`${backendApiUrl}user/add-elecDonation`, {
//         name: name,
//         phoneNo: phoneNo,
//         address: address,
//         new_member: new_member,
//         donation_date: currentDate,
//         donation_time: time,
//         donation_item: data ? data : item,
//       });

//       console.log(res.data.status);

//       if (res.data.status === true) {
//         setshowalert(true);
//         handleClose();
//       } else {
//         Swal.fire('Error!', 'Somthing went wrong!!', 'error');
//       }
//     }
//   };
//   const validate = (name, amount, phoneNo, donationtype) => {
//     const errors = {};

//     if (!name) {
//       errors.name = 'Please enter name';
//     }

//     return errors;
//   };

//   const getall_donatiions = () => {
//     try {
//       serverInstance('admin/donation-type', 'get').then((res) => {
//         if (res.status) {
//           setisData(res.data);

//           console.log(res.data);
//         } else {
//           Swal.fire('Error', 'somthing went  wrong', 'error');
//         }
//         console.log('sss', res);
//       });
//     } catch (error) {
//       Swal.fire('Error!', error, 'error');
//     }
//   };
//   useEffect(() => {
//     getall_donatiions();
//   }, []);
//   return (
//     <>
//       <NewForm setshowalert={setshowalert} handleClose={handleClose} />
//       <div className="cash-donation-div">
//         <div className="cash-donation-container-innser">
//           <h2>Electronic Donation</h2>
//           <div>
//             <form onSubmit={addelectronicdonation}>
//               <p>Voucher No:</p>
//               <div className="form-input-div">
//                 <div className="inner-input-div2">
//                   <label>Phone No:</label>
//                   <input
//                     text="text"
//                     className="forminput"
//                     placeholder="Enter phone no"
//                     value={phoneNo}
//                     name="phoneNo"
//                     onChange={(e) => setphoneNo(e.target.value)}
//                   />
//                   <p style={{ color: "red", marginTop: "5px" }}>
//                     {formerror.phoneNo}
//                   </p>
//                   <label>Donation Date:</label>
//                   <input
//                     type="text"
//                     value={currentDate}
//                     className="forminput"
//                     name="todaydate"
//                   />
//                 </div>

//                 <div className={"inner-input-div2"}>
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     className="forminput"
//                     placeholder="Full name"
//                     value={name}
//                     name="name"
//                     onChange={(e) => setname(e.target.value)}
//                   />
//                   <p style={{ color: "red", marginTop: "5px" }}>
//                     {formerror.name}
//                   </p>
//                   <label>Donation Time:</label>
//                   <input
//                     type="text"
//                     value={`${time} PM`}
//                     className="forminput"
//                   />
//                 </div>
//                 <div className="inner-input-div2">
//                   <div className="inner-input-div2">
//                     <label>Address:</label>
//                     <input
//                       type="text"
//                       className="forminput"
//                       placeholder="Enter address"
//                       value={address}
//                       name="address"
//                       onChange={(e) => setaddress(e.target.value)}
//                     />
//                   </div>
//                   <div className="inner-input-div2">
//                     <label>Transaction No:</label>
//                     <input
//                       type="text"
//                       className="forminput"
//                       placeholder="Enter transaction no."
//                       value={transactionNo}
//                       name="transactionNo"
//                       onChange={(e) => setTransactionNo(e.target.value)}
//                     />
//                   </div>

//                 </div>
//                 <div className="inner-input-div2">
//                   <div className="inner-input-div2">
//                     <label>Bank name:</label>
//                     <input
//                       type="text"
//                       className="forminput"
//                       placeholder="Enter bank name"
//                       value={bankName}
//                       name="bankName"
//                       onChange={(e) => setBankName(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     New Member:
//                     <input
//                       type="radio"
//                       name="selected"
//                       value="yes1"
//                       onChange={() => setnew_member(false)}
//                     />
//                     No
//                     <input
//                       type="radio"
//                       name="selected"
//                       value="yes2"
//                       onChange={() => setnew_member(true)}
//                     />
//                     Yes
//                   </div>
//                 </div>
//               </div>

//               <div className="save-div-btn4">
//                 <button className="save-btn1">Save</button>
//                 <button onClick={() => setOpen(false)} className="calcel-btn1">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>

//           <div className="table_scrol_barrr">
//             <table className="styled-table">
//               <thead>
//                 <tr>
//                   <th style={{ textAlign: "center", width: "21rem" }}>
//                     Type of donation
//                   </th>
//                   <th style={{ textAlign: "center", width: "27rem" }}>Amout</th>
//                   <th colspan="2" style={{ textAlign: "center" }}>
//                     Remark
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                     <select
//                       className="inner-input-div1-select "
//                       id="type"
//                       name="donationtype"
//                       // value={donationtype}
//                       onChange={(e) => setdonationtype(e.target.value)}
//                     >
//                       {isData &&
//                         isData.map((item) => (
//                           <option key={item.id} value={item.type_hi}>
//                             {item.type_hi}
//                           </option>
//                         ))}
//                     </select>
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       className="forminput1"
//                       placeholder="Amout"
//                       name="amount"
//                       // value={amount}
//                       onChange={(e) => {
//                         setamount(e.target.value);

//                         console.log(e.target.value);
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       className="forminput1"
//                       placeholder="remark"
//                       name="remark"
//                       // value={remark}
//                       onChange={(e) => setremark(e.target.value)}
//                     />
//                   </td>
//                   <td style={{ width: "8rem" }}></td>
//                 </tr>
//                 {rowsData.length > 1 &&
//                   rowsData.slice(1).map((item, index) => {
//                     return (
//                       <tr key={item.id}>
//                         <td>
//                           {" "}
//                           <select
//                             className="inner-input-div1-select "
//                             id="type"
//                             name="mode"
//                             // value={donationtype}
//                             onChange={(e) => setdonationtype(e.target.value)}
//                           >
//                             {isData &&
//                               isData.map((item) => (
//                                 <option key={item.id} value={item.type_hi}>
//                                   {item.type_hi}
//                                 </option>
//                               ))}
//                           </select>
//                         </td>
//                         <td>
//                           {" "}
//                           <input
//                             type="text"
//                             className="forminput1"
//                             placeholder="Amout"
//                             name="amount"
//                             // value={amount}
//                             onChange={(e) => {
//                               setamount(e.target.value);

//                               console.log(e.target.value);
//                             }}
//                           />
//                         </td>
//                         <td>
//                           {" "}
//                           <input
//                             type="text"
//                             className="forminput1"
//                             placeholder="remark"
//                             name="remark"
//                             // value={remark}
//                             onChange={(e) => setremark(e.target.value)}
//                           />
//                         </td>
//                         <td
//                           onClick={() => RemoveRow(item.id)}
//                           style={{ width: "8rem" }}
//                         >
//                           Remove
//                         </td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <td>Total</td>
//                   <td>0.00</td>
//                   <td colspan="2"></td>
//                 </tr>
//               </tfoot>
//             </table>
//             <button
//               onClick={() => {
//                 setNoOfRows({ id: noOfRows.id + 1 });
//                 rowsData.push(noOfRows);
//                 itemClick();
//               }}
//               className="add_itrm_btn"
//             >
//               Add Dontion Item
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

export default ElectronicDonation;
