import React, { useState, useEffect } from "react";
import { backendApiUrl } from "../../../../config/config";
import { serverInstance } from "../../../../API/ServerInstance";
import Swal from "sweetalert2";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./ReceiptMater.css";
function ReceiptMater() {
  const [eleReceiptNo, seteleReceiptNo] = useState("");
  const [cacgReceiptNo, setcacgReceiptNo] = useState("");
  const [itemReceiptNo, setitemReceiptNo] = useState("");
  const [chequeReceiptNo, setchequeReceiptNo] = useState("");
  const [eleReceipts, seteleReceipts] = useState("");
  const [cachReceipts, setcachReceipts] = useState("");
  const [itemReceipts, setitemReceipts] = useState("");
  const [chequeReceipts, setchequeReceipts] = useState("");
  const [isData, setisData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [manageActivation, setmanageActivation] = useState(false);
  let status;
  console.log(chequeReceipts, itemReceipts, cachReceipts, eleReceipts);
  const handleSubmit = async () => {
    try {
      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      if (eleReceiptNo) {
        const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
          receipt: eleReceiptNo,
          type: 1,
        });
        if (res.data.status === true) {
          Swal.fire(
            "Great!",
            "Electronic receiptNo. Added Successfully",
            "success"
          );
        }
      }
      if (cacgReceiptNo) {
        console.log(cacgReceiptNo);
        const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
          receipt: cacgReceiptNo,
          type: 2,
        });
        if (res.data.status === true) {
          Swal.fire("Great!", "Cach receiptNo. Added Successfully", "success");
        }
      }
      if (itemReceiptNo) {
        const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
          receipt: itemReceiptNo,
          type: 3,
        });
        if (res.data.status === true) {
          Swal.fire("Great!", "Item receiptNo. Added Successfully", "success");
        }
      }
      if (chequeReceiptNo) {
        const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
          receipt: chequeReceiptNo,
          type: 4,
        });
        if (res.data.status === true) {
          Swal.fire(
            "Great!",
            "Cheque receiptNo. Added Successfully",
            "success"
          );
        }
      }
    } catch (error) {
      Swal.fire("Error!", error, "error");
    }
  };

  const getReceiptNo = () => {
    try {
      serverInstance("admin/get-receipt", "get").then((res) => {
        if (res.status) {
          setisData(res.data);
          let filterData1 = res.data.filter((item) => item.type === 1);
          seteleReceipts(filterData1);
          let filterData2 = res.data.filter((item) => item.type === 2);
          setcachReceipts(filterData2);
          let filterData3 = res.data.filter((item) => item.type === 3);
          setchequeReceipts(filterData3);
          let filterData4 = res.data.filter((item) => item.type === 4);
          setitemReceipts(filterData4);

          console.log("ress", res.data);
        }
      });
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deacivateAndactivateuser = async (id) => {
    try {
      if (!manageActivation) {
        status = 0;
      } else {
        status = 1;
      }

      setmanageActivation(!manageActivation);
      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      const { data } = await axios.post(
        `${backendApiUrl}admin/change-donation-type`,
        {
          id: id,
          status: status,
          type: 1,
        }
      );

      console.log(data.data);

      if (data.data.status === true) {
        Swal.fire(
          "Great!",
          !manageActivation
            ? "Donation Type Deactivate"
            : "Donation Type Activate",
          "success"
        );
        setrefetch(!refetch);
      }
      console.log("ss", res);
    } catch (error) {
      Swal("Error", error, "error");
    }
  };
  useEffect(() => {
    getReceiptNo();
  }, []);

  return (
    <div>
      <div className="main_reciept_master">
        <div className="right_input_label">
          <div className="ineear_dave_receipt_no">
            <label htmlFor="eleReceiptNo">
              Enter reciept no for electronic donation
            </label>
            <input
              type="text"
              id="eleReceiptNo"
              value={eleReceiptNo}
              name="eleReceiptNo"
              onChange={(e) => seteleReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="cacgReceiptNo">
              Enter reciept no for cach donation
            </label>
            <input
              type="text"
              id="cacgReceiptNo"
              value={cacgReceiptNo}
              name="cacgReceiptNo"
              onChange={(e) => setcacgReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="itemReceiptNo">
              Enter reciept no for Item donation
            </label>
            <input
              type="text"
              id="itemReceiptNo"
              value={itemReceiptNo}
              name="itemReceiptNo"
              onChange={(e) => setitemReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="chequeReceiptNo">
              Enter reciept no for cheque donation
            </label>
            <input
              type="text"
              id="chequeReceiptNo"
              value={chequeReceiptNo}
              name="chequeReceiptNo"
              onChange={(e) => setchequeReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Save</button>
          </div>
        </div>

        <div className="table_div_recipt">
          <div>
            <div>
              <h2>Electronic receipt no</h2>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead style={{ background: "#FFEEE0" }}>
                    <TableRow>
                      <TableCell align="left">Receipt</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {eleReceipts && (
                      <>
                        {(rowsPerPage > 0
                          ? eleReceipts &&
                            eleReceipts.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : eleReceipts && eleReceipts
                        ).map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="left">{row.receipt}</TableCell>
                            <TableCell>
                              {row.status === 1 ? "Avtive" : "Deactivate"}
                            </TableCell>
                            <TableCell>
                              {row.status === 1 ? (
                                <CloseIcon
                                  onClick={() =>
                                    deacivateAndactivateuser(row.id)
                                  }
                                />
                              ) : (
                                <CheckIcon
                                  onClick={() =>
                                    deacivateAndactivateuser(row.id)
                                  }
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        // count={isrow.length}
                        // rowsPerPage={rowsPerPage}
                        // page={page}
                        // onPageChange={handleChangePage}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
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
              </TableContainer>
            </div>
            <div>
              <h2>Cach receipt no</h2>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead style={{ background: "#FFEEE0" }}>
                    <TableRow>
                      <TableCell align="left">Receipt</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">dd</TableCell>
                      <TableCell align="left">dd</TableCell>
                      <TableCell align="left">Receipt</TableCell>
                    </TableRow>

                    {/* {(rowsPerPage > 0
                    ? isrow &&
                      isrow.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : isrow
                  ).map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <div style={{ display: "none" }}>
                        {(status = row.active)}
                      </div>
                      <TableCell align="left">
                        {moment(row?.DATE_OF_DAAN).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="left">{row.NAME}</TableCell>
                      <TableCell align="left">{row.MODE_OF_DONATION}</TableCell>
                      <TableCell align="left">{row.AMOUNT}</TableCell>
                      <TableCell align="left">
                        {row.CHEQUE_NO ? row.CHEQUE_NO : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.DATE_OF_CHEQUE ? row.DATE_OF_CHEQUE : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.NAME_OF_BANK ? row.NAME_OF_BANK : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.PAYMENT_ID ? row.PAYMENT_ID : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.PAYMENT_ID
                          ? "-"
                          : row.active === "0"
                          ? "Not Approved"
                          : "Approved"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          downloadrecept(row);
                        }}
                        align="left"
                        style={{
                          cursor: "pointer",
                          color: status === "0" ? "red" : "",
                        }}
                      >
                        downolod
                      </TableCell>
                    </TableRow>
                  ))} */}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        // count={isrow.length}
                        // rowsPerPage={rowsPerPage}
                        // page={page}
                        // onPageChange={handleChangePage}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
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
              </TableContainer>
            </div>
            <div>
              <h2>Item receipt no</h2>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead style={{ background: "#FFEEE0" }}>
                    <TableRow>
                      <TableCell align="left">Receipt</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">dd</TableCell>
                      <TableCell align="left">dd</TableCell>

                      <TableCell align="left">Action</TableCell>
                    </TableRow>

                    {/* {(rowsPerPage > 0
                    ? isrow &&
                      isrow.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : isrow
                  ).map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <div style={{ display: "none" }}>
                        {(status = row.active)}
                      </div>
                      <TableCell align="left">
                        {moment(row?.DATE_OF_DAAN).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="left">{row.NAME}</TableCell>
                      <TableCell align="left">{row.MODE_OF_DONATION}</TableCell>
                      <TableCell align="left">{row.AMOUNT}</TableCell>
                      <TableCell align="left">
                        {row.CHEQUE_NO ? row.CHEQUE_NO : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.DATE_OF_CHEQUE ? row.DATE_OF_CHEQUE : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.NAME_OF_BANK ? row.NAME_OF_BANK : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.PAYMENT_ID ? row.PAYMENT_ID : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.PAYMENT_ID
                          ? "-"
                          : row.active === "0"
                          ? "Not Approved"
                          : "Approved"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          downloadrecept(row);
                        }}
                        align="left"
                        style={{
                          cursor: "pointer",
                          color: status === "0" ? "red" : "",
                        }}
                      >
                        downolod
                      </TableCell>
                    </TableRow>
                  ))} */}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        // count={isrow.length}
                        // rowsPerPage={rowsPerPage}
                        // page={page}
                        // onPageChange={handleChangePage}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
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
              </TableContainer>
            </div>
            <div>
              <h2>Cheque receipt no</h2>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead style={{ background: "#FFEEE0" }}>
                    <TableRow>
                      <TableCell align="left">Receipt</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">Receipt</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>

                    {/* {(rowsPerPage > 0
                    ? isrow &&
                      isrow.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : isrow
                  ).map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <div style={{ display: "none" }}>
                        {(status = row.active)}
                      </div>
                      <TableCell align="left">
                        {moment(row?.DATE_OF_DAAN).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="left">{row.NAME}</TableCell>
                      <TableCell align="left">{row.MODE_OF_DONATION}</TableCell>
                      <TableCell align="left">{row.AMOUNT}</TableCell>
                      <TableCell align="left">
                        {row.CHEQUE_NO ? row.CHEQUE_NO : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.DATE_OF_CHEQUE ? row.DATE_OF_CHEQUE : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.NAME_OF_BANK ? row.NAME_OF_BANK : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.PAYMENT_ID ? row.PAYMENT_ID : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {row.PAYMENT_ID
                          ? "-"
                          : row.active === "0"
                          ? "Not Approved"
                          : "Approved"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          downloadrecept(row);
                        }}
                        align="left"
                        style={{
                          cursor: "pointer",
                          color: status === "0" ? "red" : "",
                        }}
                      >
                        downolod
                      </TableCell>
                    </TableRow>
                  ))} */}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        // count={isrow.length}
                        // rowsPerPage={rowsPerPage}
                        // page={page}
                        // onPageChange={handleChangePage}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
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
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptMater;
