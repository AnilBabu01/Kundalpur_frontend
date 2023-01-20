import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { serverInstance } from "../../../../API/ServerInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import Adduser from "./Adduser/Adduser";
import "./UserManagement.css";

const style = {
  position: "absolute",
  top: "48%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  p: 2,
  boxShadow: 24,
  borderRadius: "5px",
};
const UserManagement = ({ setopendashboard }) => {
  const navigate = useNavigate();
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
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
    serverInstance(`admin/add-employee?id=${deleteId}`, "delete").then(
      (res) => {
        if (res.status === true) {
          Swal.fire("Great!", "User delete successfully", "success");
          setrefetch(true);
        } else {
          Swal("Error", "somthing went  wrong", "error");
        }
        console.log(res);
      }
    );
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getall_donation = () => {
    serverInstance("admin/add-employee", "get").then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal("Error", "somthing went  wrong", "error");
      }
      console.log(res);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, [refetch, open, open1]);
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
                <h2> Add User</h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>

              <Adduser setOpen={setOpen} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="dashboarddiv">
        <div className="uemploye_main">
          <div className="search-header-employee">
            <div className="search-inner-div">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Phone No" />
              <button>Search</button>
              <button>Reset</button>
            </div>
          </div>
          <hr style={{ color: "#e96d00" }} />
          <div>
            <div className="main_center_header">
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
                <TableHead style={{ background: "#FFEEE0" }}>
                  <TableRow>
                    <TableCell>Sr No.</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Status</TableCell>
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

                      <TableCell>{row.Username}</TableCell>
                      <TableCell>{row.Email}</TableCell>
                      <TableCell> {row.Mobile}</TableCell>
                      <TableCell> {row.Address}</TableCell>

                      <TableCell>
                        {row.Status ? "Active" : "De-Active"}
                      </TableCell>

                      <TableCell>
                        <RemoveRedEyeIcon
                          onClick={() =>
                            navigate("/admin-panel/masters/employeeUserInfo", {
                              state: {
                                userdata: row,
                              },
                            })
                          }
                        />
                        <EditIcon />
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
      </div>
    </>
  );
};

export default UserManagement;
