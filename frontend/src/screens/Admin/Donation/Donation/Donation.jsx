import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { serverInstance } from "../../../../API/ServerInstance";
import Swal from "sweetalert2";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PrintIcon from "@mui/icons-material/Print";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import CashDonation from "./ElectronicDonation/ElectronicDonation";
import "./Donation.css";
const style = {
  position: "absolute",
  top: "48%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  p: 2,
  boxShadow: 24,
  borderRadius: "5px",
};
const Donation = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [showalert, setshowalert] = useState(false);
  const [msg, setmsg] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigation = useNavigate();

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, [showalert]);

  const getall_donation = () => {
    serverInstance("user/add-elecDonation", "get").then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal("Error", "somthing went  wrong", "error");
      }
    });
  };

  const deletedonation = (id) => {
    serverInstance(`user/add-elecDonation?id=${id}`, "delete").then((res) => {
      if (res.status === true) {
        Swal.fire(
          "Great!",
          "Eletronic donation delete successfully",
          "success"
        );
        setshowalert(true);
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
              <div className="add-div-close-div1">
                <h2> Add Electronic Donation</h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>

              <CashDonation
                setOpen={setOpen}
                setshowalert={setshowalert}
                setmsg={setmsg}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="dashboarddiv">
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
                  <TableCell>Receipt No</TableCell>
                  <TableCell>Phone No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Address</TableCell>
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
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.phoneNo}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {row.elecItemDetails.reduce(
                        (n, { amount }) => parseFloat(n) + parseFloat(amount),
                        0
                      )}
                    </TableCell>
                    <TableCell> {row.address}</TableCell>

                    <TableCell>
                      <RemoveRedEyeIcon
                        onClick={() =>
                          navigation(`/admin-panel/infoElectronic/${row.id}`)
                        }
                      />

                      <DeleteForeverIcon
                        onClick={() => deletedonation(row.id)}
                      />
                      <PrintIcon
                        onClick={() => {
                          printreceipt(row);
                        }}
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

export default Donation;
