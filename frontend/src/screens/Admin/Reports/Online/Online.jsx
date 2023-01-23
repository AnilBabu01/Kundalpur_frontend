import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { serverInstance } from "../../../../API/ServerInstance";
import Swal from "sweetalert2";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PrintIcon from "@mui/icons-material/Print";
import "./Online.css";
const Online = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [isData, setisData] = React.useState([]);
  const [filterstate, setfilterstate] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refetch, setrefetch] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [deleteId, setdeleteId] = useState("");

  const handleClickOpen1 = (id) => {
    setOpen1(true);
    setdeleteId(id);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen1(false);
    serverInstance(
      `admin/donation-list?id=${deleteId}&mode=${1}`,
      "delete"
    ).then((res) => {
      if (res.status === true) {
        Swal.fire("Great!", "Cheque donation delete successfully", "success");
        setrefetch(!refetch);
        console.log(res);
      } else {
        Swal("Error", "somthing went  wrong", "error");
      }
      console.log(res);
    });
  };

  const getall_donation = () => {
    serverInstance("admin/donation-list", "get").then((res) => {
      if (res.status) {
        let filterData = res.data.filter(
          (item) => item.MODE_OF_DONATION === "ONLINE"
        );
        setisData(filterData);
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
  const printreceipt = (row) => {
    if (row.active === "0") {
    } else {
      navigation("/reciept", {
        state: {
          userdata: row,
        },
      });
    }
  };
  useEffect(() => {
    getall_donation();
    setopendashboard(true);
  }, [filterstate, refetch]);

  return (
    <>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After delete you cannot get again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Disagree</Button>
          <Button onClick={handleClose2} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div className="dashboarddiv">
        <div>
          <div className="main_center_header1">
            <h2 className="Cheque_text">Online donation report</h2>
            <div className="search-header">
              <div className="search-inner-div-reports">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Phone No" />
                <input type="text" placeholder="Date" />
                <input type="text" placeholder="Donation Type" />
                <button>Search</button>
                <button>Reset</button>
                <button>Export Report</button>
              </div>
              <div>
                {/* <InsertDriveFileIcon
                style={{ width: "45px", height: "36px", color: "#e96d00" }}
              />
              <PostAddIcon
                style={{ width: "45px", height: "36px", color: "#e96d00" }}
              /> */}
              </div>
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
                  <TableCell>Action</TableCell>
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

                    <TableCell>
                      <RemoveRedEyeIcon />
                      <PrintIcon
                        onClick={() => {
                          printreceipt(row);
                        }}
                      />
                      <DeleteForeverIcon
                        onClick={() => handleClickOpen1(row.id)}
                      />
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

export default Online;
