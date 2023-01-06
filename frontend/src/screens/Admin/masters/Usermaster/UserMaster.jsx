import React, { useState } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
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
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                <h2>Add New User</h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>
              <hr />
              <div></div>

              <div className="main-input-div1">
                <div className="inner-input-div1">
                  <label>Phone No</label>
                  <input text="text" />
                </div>
                <div className="inner-input-div1">
                  <label>Date Of Birth</label>
                  <input type="date" />
                </div>
              </div>
              <div className="main-input-div1">
                <div className="inner-input-div1">
                  <label>Password</label>
                  <input text="text" />
                </div>
                <div className="inner-input-div1">
                  <label>Address</label>
                  <input text="text" />
                </div>
              </div>
              <div className="save-div-btn">
                <button className="save-btn1">Add User</button>
                <button onClick={() => handleClose()} className="calcel-btn">
                  Cancel
                </button>
              </div>
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
          <div>
            <InsertDriveFileIcon
              style={{ width: "45px", height: "36px", color: "#e96d00" }}
            />
            <PostAddIcon
              style={{ width: "45px", height: "36px", color: "#e96d00" }}
            />
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
                <TableCell>Title</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Email-Id</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>1</TableCell>
              <TableCell>Mr</TableCell>
              <TableCell>Anil Babu</TableCell>
              <TableCell>7505786956</TableCell>
              <TableCell>anilb9850@gmail.com</TableCell>
              <TableCell>
                <RemoveRedEyeIcon /> <EditIcon /> <DeleteForeverIcon />
              </TableCell>
              {/* {(rowsPerPage > 0
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
                    <TableCell>
                      {" "}
                      {row.NAME_OF_BANK ? row.NAME_OF_BANK : "-"}
                    </TableCell>
                    <TableCell> {row.PAYMENT_ID}</TableCell>
                  
                  </TableRow>
                ))} */}
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
