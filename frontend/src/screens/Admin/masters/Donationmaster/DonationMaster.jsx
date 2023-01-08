import React, { useState, useEffect } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { serverInstance } from "../../../../API/ServerInstance";
import Fade from "@mui/material/Fade";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import { backendApiUrl } from "../../../../config/config";
import Swal from "sweetalert2";
import axios from "axios";
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
import "./DonationMaster.css";
function DonationMaster() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isData, setisData] = React.useState([]);
  const [refetch, setrefetch] = useState(false);
  const [donationtype_in_hindi, setdonationtype_in_hindi] = useState("");
  const [donationtype_in_eng, setdonationtype_in_eng] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const typesOfDonation = ["Please Select donation types", "Online", "Cheque"];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      const { data } = await axios.post(`${backendApiUrl}admin/donation-type`, {
        type_en: donationtype_in_eng,
        type_hi: donationtype_in_hindi,
      });
      if (data.status === true) {
        Swal.fire("Great!", "User Added Successfully", "success");
        handleClose();
      }
    } catch (error) {
      Swal.fire("Error!", error.response.data.message, "error");
      handleClose();
    }
  };

  const getall_donatiions = () => {
    serverInstance("admin/donation-type", "get").then((res) => {
      if (res.status) {
        setisData(res.data);

        console.log(res.data);
      } else {
        Swal("Error", "somthing went  wrong", "error");
      }
      console.log("sss", res);
    });
  };
  useEffect(() => {
    getall_donatiions();
  }, [refetch]);

  const deletedonation = (id) => {
    serverInstance(`admin/donation-type"?id=${id}`, "delete").then((res) => {
      if (res.status === true) {
        Swal.fire("Great!", "User delete successfully", "success");
        setrefetch(true);
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
                  <h2>Add New Donation Type</h2>
                  <CloseIcon onClick={() => handleClose()} />
                </div>
                <hr />
                <div className="main-input-div1">
                  <div className="inner-input-div1">
                    <label htmlFor="donationtype_in_hindi">
                      Enter donation type in hindi 
                    </label>
                    <input
                      type="text"
                      id="donationtype_in_hindi"
                      value={donationtype_in_hindi}
                      name="donationtype_in_hindi"
                      onChange={(e) => setdonationtype_in_hindi(e.target.value)}
                    />
                    <label htmlFor="donationtype_in_eng">
                      Enter donation type in english 
                    </label>
                    <input
                      type="text"
                      id="donationtype_in_eng"
                      value={donationtype_in_eng}
                      name="donationtype_in_eng"
                      onChange={(e) => setdonationtype_in_eng(e.target.value)}
                    />
                  </div>
                </div>

                <div className="save-div-btn">
                  <button className="save-btn1">Add </button>
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
                <TableCell>S.No.</TableCell>

                <TableCell> Type Donation (hindi)</TableCell>
                <TableCell> Type Donation (english) </TableCell>
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

                  <TableCell>{row.type_hi}</TableCell>
                  <TableCell>{row.type_hi}</TableCell>
                  <TableCell>
                    <EditIcon /> <DeleteForeverIcon />
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

export default DonationMaster;
