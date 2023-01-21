// @ts-nocheck
import React, { useEffect, useState } from "react";
import { backendApiUrl } from "../../../../../config/config";
import { serverInstance } from "../../../../../API/ServerInstance";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { alpha } from "@mui/material/styles";

import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import { CustomInput, CustomInputLabel, CustomTableInput } from "../common";
import { typesOfDonation } from "../common/Data";
import TotalAmountRow from "../common/TotalAmountRow";

const ItemDonation = ({ setshowalert, handleClose, themeColor }) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
    palette: {
      primary: {
        main: themeColor,
      },
    },
  });
  const [donationTypes, setDonationTypes] = useState([]);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [transactionNo, setTransactionNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [formerror, setFormerror] = useState({});

  const [donationItems, setDonationItems] = useState([
    {
      type: "",
      amount: "",
      remark: "",
      itemType: "",
      size: "",
      quantity: "",
      approxValue: "",
    },
  ]);

  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        type: "",
        amount: "",
        remark: "",
        size: "",
        quantity: "",
        approxValue: "",
      },
    ]);
  }
  function removeDonationItem(item) {
    setDonationItems(
      donationItems.filter((donationItem) => donationItem !== item)
    );
  }

  console.log("donationItems", donationItems);
  function handleDonationItemUpdate(originalDonationItem, key, value) {
    setDonationItems(
      donationItems.map((donationItem) =>
        donationItem === originalDonationItem
          ? {
              ...donationItem,
              [key]: value,
            }
          : donationItem
      )
    );
  }

  var options = { year: "numeric", month: "short", day: "2-digit" };
  var today = new Date();
  const currDate = today
    .toLocaleDateString("en-IN", options)
    .replace(/-/g, " ");
  const currTime = today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const [donationDate, setDonationDate] = useState(today);

  const [donationTime, setDonationTime] = useState(
    today.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );

  const addItemDonation = async (e) => {
    e.preventDefault();
    console.log("clicked");
    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
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
            Number(donationItem.quantity) * Number(donationItem.approxValue),
        };
      });

      const res = await axios.post(`${backendApiUrl}user/add-elecDonation`, {
        name: fullName,
        phoneNo: mobileNo,
        address: address,
        prefix: "ITEM",
        new_member: newMember,
        modeOfDonation: 4,
        donation_date: donationDate,
        donation_time: donationTime,
        donation_item: modifiedDonationItems,
      });

      let totalamount = donationItems?.amount
        ? donationItems?.amount
        : donationItems &&
          donationItems.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0
          );

      if (res.data.status === true) {
        setshowalert(true);
        handleClose();
        sendsms(totalamount);
      } else {
        Swal.fire("Error!", "Somthing went wrong!!", "error");
      }
    }
  };
  const validate = (name, amount, phoneNo, donationtype) => {
    const errors = {};
    if (!name) {
      errors.name = "Please enter name";
    }
    return errors;
  };

  const getall_donatiions = () => {
    try {
      serverInstance("admin/donation-type?type=2", "get").then((res) => {
        if (res.status) {
          setDonationTypes(res.data);

          console.log(res.data);
        } else {
          Swal.fire("Error", "somthing went  wrong", "error");
        }
        console.log("sss", res);
      });
    } catch (error) {
      Swal.fire("Error!", error, "error");
    }
  };

  const sendsms = async (totalamount) => {
    try {
      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      const res = await axios.post(`${backendApiUrl}user/sms`, {
        mobile: mobileNo,
        amount: totalamount,
        url: "",
      });
      console.log("sent sms ", res);
      if (res.data.status === true) {
        Swal.fire("Great!", res.data.message, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error, "error");
    }
  };
  useEffect(() => {
    getall_donatiions();
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form onSubmit={addItemDonation}>
          <Typography variant="h6" color={themeColor} align="center">
            Add Item Donation
          </Typography>
          <Typography variant="body2" color="primary">
            {currDate} / {currTime}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              my: 2,
            }}
          >
            <Typography variant="body1">Are you new member:</Typography>
            <Button
              variant={newMember ? "outlined" : "contained"}
              sx={{
                borderColor: "#C8C8C8",
                fontSize: 12,
                minWidth: 40,
                padding: 0,
                color: newMember ? "#656565" : "#fff",
              }}
              onClick={() => setNewMember(false)}
            >
              {" "}
              No
            </Button>
            <Button
              onClick={() => setNewMember(true)}
              variant={newMember ? "contained" : "outlined"}
              sx={{
                borderColor: "#C8C8C8",
                fontSize: 12,
                minWidth: 40,
                padding: 0,
                color: newMember ? "#fff" : "#656565",
              }}
            >
              {" "}
              Yes
            </Button>
          </Box>
          <Grid container rowSpacing={2} columnSpacing={5}>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">Date</CustomInputLabel>
              <CustomInput
                type="date"
                id="donation-date"
                value={donationDate.toLocaleDateString("en-CA")}
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
                border: "1px solid #C4C4C4",
                "& th": {
                  padding: 0,
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor: "#E4E3E3",
                  color: "#05313C",
                  outline: "1px solid #C4C4C4",
                },
                "& td": {
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
                        paddingInline: "10px",
                        minWidth: 200,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Type of donation*
                      </p>
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
                          width: "100%",
                          fontSize: 14,
                          "& .MuiSelect-select": {
                            padding: "1px",
                          },
                        }}
                        value={item.type}
                        onChange={(e) =>
                          handleDonationItemUpdate(item, "type", e.target.value)
                        }
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={""}
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
                            "itemType",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        value={item.size}
                        onChange={(e) =>
                          handleDonationItemUpdate(item, "size", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        value={item.quantity}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            "quantity",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        value={item.approxValue}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            "approxValue",
                            e.target.value
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
                            "remark",
                            e.target.value
                          )
                        }
                        endAdornment={
                          idx > 0 && (
                            <InputAdornment position="start">
                              <IconButton
                                sx={{
                                  padding: "4px",
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
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mt: 2,
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                paddingX: 5,
                boxShadow: "none",
                color: "#fff",
              }}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
            <Button
              sx={{
                textTransform: "none",
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
