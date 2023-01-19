import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import "./ReceiptMater.css";
function ReceiptMater() {
  return (
    <div>
      <div className="main_reciept_master">
        <div className="right_input_label">
          <div className="ineear_dave_receipt_no">
            <label>Enter reciept no for electronic donation</label>
            <input type="text" />
            <button>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label>Enter reciept no for cach donation</label>
            <input type="text" />
            <button>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label>Enter reciept no for Item donation</label>
            <input type="text" />
            <button>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label>Enter reciept no for cheque donation</label>
            <input type="text" />
            <button>Save</button>
          </div>
        </div>
        <div className="table_div_recipt">
          <Table
            sx={{ minWidth: 650, width: "100%" }}
            aria-label="simple table"
          >
            <TableHead style={{ background: "#FFEEE0" }}>
              <TableRow>
                <TableCell>Electronic </TableCell>
                <TableCell>Cach</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Cheque</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>hhh</TableCell>
              {/* {isData &&
                (rowsPerPage > 0
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
                    <TableCell>{row.itemType_hi}</TableCell>
                    <TableCell>{row.itemType_en}</TableCell>
                    <TableCell>
                      {row.status === 1 ? "Active" : "Deactive"}
                    </TableCell>
                    <TableCell>
                      <EditIcon onClick={() => handleOpen3(row)} />
                      <DeleteForeverIcon
                        onClick={() => handleClickOpen1(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))} */}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  // count={isData.length}
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
        </div>
      </div>
    </div>
  );
}

export default ReceiptMater;
