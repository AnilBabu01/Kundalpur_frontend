import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./DonatedUsers.css";
import { serverInstance } from "../../../API/ServerInstance";
import Swal from "sweetalert2";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import AddDonatedUser from "./AddDonatedUser";
const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  p: 2,
  boxShadow: 24,
};
const DonatedUsers = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigation = useNavigate();

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, []);

  const getall_donation = () => {
    serverInstance("admin/donation-list", "get").then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal("Error", "somthing went  wrong", "error");
      }
      console.log(res);
    });
  };

  const downloadrecept = (row) => {
    navigation("/reciept", {
      state: {
        userdata: row,
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <h2>Add Donated User</h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>
              <div className="scrollbarrrr">
                <AddDonatedUser />
              </div>

              <div className="save-div-btn">
                <button className="save-btn1">Add Donation</button>
                <button onClick={() => handleClose()} className="calcel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="dashboarddiv">
        <div>
          <div className="main_center_header">
            {/* <div className="search-header">
              <div className="search-inner-div">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Phone No" />
                <button>Search</button>
              </div>
              <div></div>
            </div> */}

            <div className="add-btn-user">
              <button onClick={() => handleOpen()}>+Add</button>
            </div>
          </div>

          <div className="table-div-maain">
            {/* <TableContainer component={Paper}> */}
            <Table
              sx={{ minWidth: 650, width: "97%" }}
              aria-label="simple table"
            >
              <TableHead style={{ background: "#F1F0F0" }}>
                <TableRow>
                  <TableCell>S.No.</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Name </TableCell>
                  <TableCell>Donation Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Cheque No.</TableCell>
                  <TableCell>Date Of submission</TableCell>
                  <TableCell>Name of Bank</TableCell>
                  <TableCell>Payment id</TableCell>
                  <TableCell>certificate</TableCell>
                  <TableCell>Edit/Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? isData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : isData
                ).map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {" "}
                      {moment(row?.DATE_OF_DAAN).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{row.NAME}</TableCell>
                    <TableCell> {row.MODE_OF_DONATION}</TableCell>
                    <TableCell> {row.AMOUNT}</TableCell>
                    <TableCell>
                      {" "}
                      {row.CHEQUE_NO ? row.CHEQUE_NO : "-"}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {row.DATE_OF_CHEQUE ? row.DATE_OF_CHEQUE : "-"}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {row.NAME_OF_BANK ? row.NAME_OF_BANK : "-"}
                    </TableCell>

                    <TableCell> {row.PAYMENT_ID}</TableCell>
                    <TableCell
                      onClick={() => {
                        downloadrecept(row);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      downolod
                    </TableCell>
                    <TableCell>
                      <RemoveRedEyeIcon />
                      <DeleteForeverIcon />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={isData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    labelRowsPerPage={<span>Rows:</span>}
                    labelDisplayedRows={({ page }) => {
                      return `Page: ${page}`;
                    }}
                    backIconButtonProps={{
                      color: "secondary",
                    }}
                    nextIconButtonProps={{ color: "secondary" }}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "page number",
                      },
                    }}
                    // showFirstButton={true}
                    // showLastButton={true}
                    //ActionsComponent={TablePaginationActions}
                    //component={Box}
                    //sx and classes prop discussed in styling section
                  />
                </TableRow>
              </TableFooter>
            </Table>
            {/* </TableContainer> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DonatedUsers;
