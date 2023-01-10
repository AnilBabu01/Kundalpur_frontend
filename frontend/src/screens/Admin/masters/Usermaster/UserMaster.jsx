import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { serverInstance } from "../../../../API/ServerInstance";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { backendApiUrl } from "../../../../config/config";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Swal from "sweetalert2";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};
import "./UserMaster.css";
function UserMaster() {
  const navigation = useNavigate();
  const [isData, setisData] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [refetch, setrefetch] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendApiUrl}user/create-account`, {
        fullname: name,
        mobileno: phone,
        email: email,
        password: password,
      });
      if (data.status === true) {
        Swal.fire("Great!", "User Added Successfully", "success");
        handleClose();
        setemail("");
        setpassword("");
        setname("");
        setphone("");
      }
    } catch (error) {
      Swal.fire("Error!", error.response.data.message, "error");
      handleClose();
    }
  };

  const getall_users = () => {
    serverInstance("admin/get-users", "get").then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal("Error", "somthing went  wrong", "error");
      }
      console.log(res);
    });
  };

  useEffect(() => {
    getall_users();
  }, [refetch, open]);

  const deleteuser = (id) => {
    serverInstance(`admin/del-users?id=${id}`, "delete").then((res) => {
      if (res.status === true) {
        Swal.fire("Great!", "User delete successfully", "success");
        setrefetch(!refetch);
      } else {
        Swal("Error", "somthing went  wrong", "error");
      }
      console.log(res);
    });
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
              <form onSubmit={handlesubmit}>
                <div className="add-div-close-div">
                  <h2>Add New User</h2>
                  <CloseIcon onClick={() => handleClose()} />
                </div>
                <hr />
                <div></div>

                <div className="main-input-div1">
                  <div className="inner-input-div1">
                    <label htmlFor="name">Full name</label>
                    <input
                      id="name"
                      text="text"
                      name="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                  <div className="inner-input-div1">
                    <label htmlFor="phone">Mobile Number</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="main-input-div1">
                  <div className="inner-input-div1">
                    <label htmlFor="email">Email</label>
                    <input
                      text="text"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  <div className="inner-input-div1">
                    <label htmlFor="password">Password</label>
                    <input
                      text="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="save-div-btn">
                  <button className="save-btn1">Add User</button>
                  <button onClick={() => handleClose()} className="calcel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>

      <div>
        <div className="search-header">
          <div className="search-inner-div">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Phone No" />
            <button>Search</button>
            <button>Reset</button>
          </div>
        </div>
        <hr style={{ color: "#e96d00" }} />
        <div className="add-btn-user">
          <button onClick={handleOpen}>+Add</button>
        </div>
        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: "100%" }}
            aria-label="simple table"
          >
            <TableHead style={{ background: "#FFEEE0" }}>
              <TableRow>
                <TableCell>Sn</TableCell>

                <TableCell>Name</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Email-Id</TableCell>
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

                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.mobileNo}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <RemoveRedEyeIcon
                      onClick={() =>
                        navigation(`/admin-panel/masters/userinfo`, {
                          state: {
                            userdata: row,
                          },
                        })
                      }
                    />
                    <EditIcon
                      onClick={() =>
                        navigation(`/admin-panel/masters/updateuser`, {
                          state: {
                            userdata: row,
                          },
                        })
                      }
                    />
                    <DeleteForeverIcon onClick={() => deleteuser(row.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  // count={isData.length}
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
        </div>
      </div>
    </>
  );
}

export default UserMaster;
