import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { serverInstance } from "../../../../API/ServerInstance";
import Swal from "sweetalert2";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import EditIcon from "@mui/icons-material/Edit";
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
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import PrintIcon from "@mui/icons-material/Print";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import ChangeStatus from "./ChangeStatus";
import SimCardAlertIcon from "@mui/icons-material/SimCardAlert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Cheque.css";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  p: 2,
  boxShadow: 24,
  borderRadius: "5px",
};
const Cheque = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refetch, setrefetch] = useState(false);
  const navigation = useNavigate();
  const [open1, setOpen1] = React.useState(false);
  const [deleteId, setdeleteId] = useState("");
  const [open, setOpen] = React.useState(false);
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
      `admin/donation-list?id=${deleteId}&mode=${2}`,
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

  const handleOpen = (id) => {
    setOpen(true);
    setdeleteId(id);
  };

  const handleClose = () => setOpen(false);

  const getall_donation = () => {
    serverInstance("admin/donation-list", "get").then((res) => {
      if (res.status) {
        let filterData = res.data.filter(
          (item) => item.MODE_OF_DONATION === "CHEQUE"
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
  }, [refetch]);
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
              <div className="add-div-close-div1">
                <h2>Update cheque status</h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>
              <ChangeStatus id={deleteId} handleClose={handleClose} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="dashboarddiv">
        <div>
          <div className="main_center_header1">
            <h2 className="Cheque_text">Cheque donation report</h2>
            <div className="search-header">
              <div className="search-inner-div-reports">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Phone No" />
                <input type="date" placeholder="Date" />
                <select name="cars" id="cars">
                  <option value="volvo">Select option</option>
                  <option value="saab">Cash donation</option>
                  <option value="mercedes">cheque donation</option>
                  <option value="audi">Electronic donation</option>
                  <option value="audi">Item donation</option>
                </select>
                <button>Search</button>
                <button>Reset</button>
                <SimCardAlertIcon />
                <PictureAsPdfIcon />
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
                  <TableCell>certificate</TableCell>
                  <TableCell>View/Edit/Delete</TableCell>
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
                      <RemoveRedEyeIcon
                        onClick={() =>
                          navigation(`/admin-panel/reports/chequeinfo`, {
                            state: {
                              data: row,
                            },
                          })
                        }
                      />

                      <EditIcon onClick={() => handleOpen(row.id)} />
                      <PrintIcon />
                      <DownloadIcon
                        onClick={() => {
                          printreceipt(row);
                        }}
                      />
                      <CancelIcon />
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

export default Cheque;
