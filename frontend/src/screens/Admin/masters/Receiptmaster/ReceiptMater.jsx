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
  const [CashReceipts, setCashReceipts] = useState("");
  const [itemReceipts, setitemReceipts] = useState("");
  const [chequeReceipts, setchequeReceipts] = useState("");
  const [isData, setisData] = useState([]);
  const [refetch, setrefetch] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [manageActivation, setmanageActivation] = useState(false);
  let status;
  console.log(chequeReceipts, itemReceipts, CashReceipts, eleReceipts);
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
          Swal.fire("Great!", "Cash receiptNo. Added Successfully", "success");
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
          setCashReceipts(filterData2);
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

  const deacivateAndactivateuser = async (id, type) => {
    try {
      if (!manageActivation) {
        status = 0;
      } else {
        status = 1;
      }

      setmanageActivation(!manageActivation);
      axios.defaults.headers.put[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      const { data } = await axios.put(`${backendApiUrl}admin/create-receipt`, {
        id: id,
        status: status,
        type: type,
      });

      console.log(data.data);
      setrefetch(!refetch);
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
  }, [refetch]);

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
              placeholder="reciept no for electronic"
              onChange={(e) => seteleReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="cacgReceiptNo">
              Enter reciept no for Cash donation
            </label>
            <input
              type="text"
              id="cacgReceiptNo"
              value={cacgReceiptNo}
              name="cacgReceiptNo"
              placeholder=" reciept no for Cash donation"
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
              placeholder="reciept no for Item donation"
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
              placeholder="reciept no for cheque donation"
              onChange={(e) => setchequeReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Save</button>
          </div>
        </div>

        <div className="table_div_recipt">
          <div className="ScrollStyle">
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
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                      deacivateAndactivateuser(row.id, 1)
                                    }
                                  />
                                ) : (
                                  <CheckIcon
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 1)
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
                          count={eleReceipts.length}
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
                      {itemReceipts && (
                        <>
                          {(rowsPerPage > 0
                            ? itemReceipts &&
                              itemReceipts.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : itemReceipts && itemReceipts
                          ).map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                      deacivateAndactivateuser(row.id, 4)
                                    }
                                  />
                                ) : (
                                  <CheckIcon
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 4)
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
                          count={itemReceipts.length}
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
                </TableContainer>
              </div>
            </div>
            <div>
              <div>
                <h2>Cash receipt no</h2>
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
                      {CashReceipts && (
                        <>
                          {(rowsPerPage > 0
                            ? CashReceipts &&
                              CashReceipts.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : CashReceipts && CashReceipts
                          ).map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                      deacivateAndactivateuser(row.id, 2)
                                    }
                                  />
                                ) : (
                                  <CheckIcon
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 2)
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
                          count={CashReceipts.length}
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
                      {chequeReceipts && (
                        <>
                          {(rowsPerPage > 0
                            ? chequeReceipts &&
                              chequeReceipts.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : chequeReceipts && chequeReceipts
                          ).map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                                      deacivateAndactivateuser(row.id, 3)
                                    }
                                  />
                                ) : (
                                  <CheckIcon
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 3)
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
                          count={chequeReceipts.length}
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
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptMater;
