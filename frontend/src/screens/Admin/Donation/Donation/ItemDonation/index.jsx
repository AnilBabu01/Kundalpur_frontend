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
import { useNavigate } from 'react-router-dom';
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

import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';
import { typesOfDonation } from '../common/Data';
import TotalAmountRow from '../common/TotalAmountRow';
import { ReactTransliterate } from 'react-transliterate';

const custumstyle = {
  width: '100%',
  borderRadius: 6,
  position: 'relative',
  backgroundColor: '#fcfcfb',
  border: '1px solid #C8C6D3',
  fontSize: 14,
  padding: 9.5,
};

const custommStyleInputTable = {
  width: '100%',
  position: 'relative',

  border: '1px solid #C8C6D3',
  fontSize: 14,
  padding: 9.5,
};
const ItemDonation = ({
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
  const [text, setText] = useState('');
  const [addText, setaddText] = useState('');
  const [hindiremark, sethindiremark] = useState('');
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
  const [genderp1, setgenderp1] = useState('SHRI');
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [donationItems, setDonationItems] = useState([
    {
      type: '',
      amount: '',
      remark: '',
      itemType: '',
      size: '',
      quantity: '',
      approxValue: '',
      unit: 'G',
    },
  ]);

  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        type: '',
        amount: '',
        remark: '',
        size: '',
        quantity: '',
        approxValue: '',
        unit: '',
      },
    ]);
  }
  function removeDonationItem(item) {
    setDonationItems(
      donationItems.filter((donationItem) => donationItem !== item),
    );
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
  const genderoptiins1 = [
    {
      id: 2,
      gender: 'SMT',
    },
    {
      id: 3,
      gender: 'M/s',
    },
  ];
  const unitss = [
    {
      id: 3,
      unit: 'KG',
    },
    {
      id: 4,
      unit: 'MG',
    },
    {
      id: 5,
      unit: 'UG',
    },
  ];
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

  const addItemDonation = async (e) => {
    try {
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
          if (
            fullName &&
            donationItems[0].amount &&
            donationItems[0].type &&
            mobileNo
          ) {
            const res = await axios.put(
              `${backendApiUrl}user/edit-item-donation`,
              {
                id: updateData?.id,
                name: fullName,
                gender: newMember ? genderp1 : genderp,
                phoneNo: mobileNo,
                address: address,
                new_member: newMember,
                modeOfDonation: 1,
                donation_date: updateData?.donation_date,
                donation_time: updateData?.donation_time,
                donation_item: donationItems,
              },
            );

            if (res.data.status === true) {
              handleClose();
            } else {
              Swal.fire('Error!', 'Somthing went wrong!!', 'error');
            }
          }
        }
      } else {
        console.log('clicked');

        if (
          fullName &&
          donationItems[0].itemType &&
          donationItems[0].type &&
          mobileNo
        ) {
          const modifiedDonationItems = donationItems.map((donationItem) => {
            return {
              ...donationItem,
              amount:
                Number(donationItem.quantity) *
                Number(donationItem.approxValue),
            };
          });

          const res = await axios.post(
            `${backendApiUrl}user/add-elecDonation`,
            {
              name: fullName,
              gender: newMember ? genderp1 : genderp,
              phoneNo: mobileNo,
              address: address,
              new_member: newMember,
              modeOfDonation: 4,
              donation_date: donationDate,
              donation_time: donationTime,
              donation_item: modifiedDonationItems,
            },
          );
          let totalamount = modifiedDonationItems?.amount
            ? modifiedDonationItems?.amount
            : modifiedDonationItems &&
              modifiedDonationItems.reduce(
                (n, { amount }) => parseFloat(n) + parseFloat(amount),
                0,
              );

          if (res.data.status === true) {
            setshowalert(true);
            handleClose();
            sendsms(totalamount);
            navigation('/reciept', {
              state: {
                userdata: res.data.data.data,
              },
            });
          } else {
            Swal.fire('Error!', 'Somthing went wrong!!', 'error');
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
        serverInstance('admin/donation-type?type=2', 'get'),
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
    if (updateData) {
      setAddress(updateData?.address);
      setFullName(updateData?.name);
      setMobileNo(updateData?.phoneNo);
      setDonationItems(updateData?.elecItemDetails);
      setgenderp(updateData?.gender);
      setgenderp1(updateData?.gender);
    }
    setopendashboard(true);
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form onSubmit={addItemDonation}>
          <Typography variant="h6" color={themeColor} align="center">
            {showUpdateBtn ? 'Upadte Cheque Donation' : 'Add Item Donation'}
          </Typography>
          <Typography variant="body2" color="primary" align="right">
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
                {!newMember ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Select
                      required
                      sx={{
                        width: '20%',
                        fontSize: 14,
                        '& .MuiSelect-select': {
                          padding: '1px',
                        },
                      }}
                      value={genderp1}
                      onChange={(e) => setgenderp1(e.target.value)}
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={'SHRI'}
                      >
                        SHRI
                      </MenuItem>
                      {genderoptiins1.map((item, idx) => {
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
                  </>
                )}
                Full Name
              </CustomInputLabel>
              {!newMember ? (
                <>
                  <ReactTransliterate
                    style={custumstyle}
                    id="full-name"
                    required
                    value={fullName}
                    onChangeText={(text) => {
                      setText(text);
                    }}
                    onChange={(e) => setFullName(e.target.value)}
                    lang="hi"
                  />
                </>
              ) : (
                <>
                  <CustomInput
                    id="full-name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomInputLabel required htmlFor="address">
                Address
              </CustomInputLabel>

              {!newMember ? (
                <>
                  <ReactTransliterate
                    style={custumstyle}
                    required
                    id="address"
                    value={address}
                    onChangeText={(address) => {
                      setAddress(address);
                    }}
                    onChange={(e) => setAddress(e.target.value)}
                    lang="hi"
                  />
                </>
              ) : (
                <>
                  <CustomInput
                    required
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </>
              )}
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
                      Donation item*
                      <IconButton aria-label="add" size="small">
                        <AddBoxIcon color="primary" onClick={addDonationItem} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 150,
                    }}
                  >
                    Item Type
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 80,
                    }}
                  >
                    Size
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 80,
                    }}
                  >
                    Units
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 100,
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 150,
                    }}
                  >
                    Approx Value
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 150,
                    }}
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
                              value={item.itemType_hi}
                            >
                              {item.itemType_hi}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        value={item.itemType}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'itemType',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        value={item.size}
                        onChange={(e) =>
                          handleDonationItemUpdate(item, 'size', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Select
                        required
                        sx={{
                          width: '90%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        value={item.unit}
                        defaultValue={item.unit}
                        onChange={(e) =>
                          handleDonationItemUpdate(item, 'unit', e.target.value)
                        }
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={'G'}
                        >
                          G
                        </MenuItem>
                        {unitss.map((item, idx) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item.unit}
                            >
                              {item.unit}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'quantity',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        type="number"
                        value={item.approxValue}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'approxValue',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      {!newMember ? (
                        <>
                          {showUpdateBtn ? (
                            <>
                              <div className="centerMain_remove_item">
                                <ReactTransliterate
                                  style={custommStyleInputTable}
                                  required
                                  value={item.remark}
                                  onChangeText={(item) => {
                                    handleDonationItemUpdate(
                                      item,
                                      'remark',
                                      e.target.value,
                                    );
                                  }}
                                  onChange={(e) =>
                                    handleDonationItemUpdate(
                                      item,
                                      'remark',
                                      e.target.value,
                                    )
                                  }
                                  lang="hi"
                                />
                                <div className="centerMain_remove_item_overLay">
                                  {idx > 0 && (
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
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="centerMain_remove_item">
                                <ReactTransliterate
                                  style={custommStyleInputTable}
                                  required
                                  value={hindiremark}
                                  onChangeText={(hindiremark) => {
                                    sethindiremark(hindiremark);
                                  }}
                                  onChange={(e) =>
                                    handleDonationItemUpdate(
                                      item,
                                      'remark',
                                      e.target.value,
                                    )
                                  }
                                  lang="hi"
                                />
                                <div className="centerMain_remove_item_overLay">
                                  {idx > 0 && (
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
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
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
export default ItemDonation;
