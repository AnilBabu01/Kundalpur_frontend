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
import "./Cheque.css";
const Cheque = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigation = useNavigate();

  useEffect(() => {
    getall_donation();
    setopendashboard(true);
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
      <div className="dashboarddiv">
        <div>
          <div className="main_center_header1">
            <h2 className="Cheque_text">Cheque donation report</h2>
            <div className="search-header">
              <div className="search-inner-div-reports">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Phone No" />
                <input type="text" placeholder="Cheque No" />

                <button>Search</button>
                <button>Reset</button>
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
              <TableHead style={{ background: "#FFEEE0" }}>
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
                      <RemoveRedEyeIcon />
                      <EditIcon
                        onClick={() =>
                          navigation(
                            `/admin-panel/masters/reports/changeStatus/${row.id}`
                          )
                        }
                      />
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

export default Cheque;
