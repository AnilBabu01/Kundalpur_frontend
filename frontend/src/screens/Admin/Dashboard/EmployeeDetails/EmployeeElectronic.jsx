import React, { useEffect, useState, useRef } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import exportFromJSON from 'export-from-json';
import Tooltip from '@mui/material/Tooltip';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';
const EmployeeElectronic = () => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getallelec = () => {
    serverInstance('admin/dash-employee-total-elec', 'get').then((res) => {
      console.log('emp', res.data.data);
      setisData(res.data.data);
    });
  };

  const ExportToExcel = () => {
    const fileName = 'TodayManualDonation';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        cash_amount: item?.cash_amount,
        bank_amount: item?.bank_amount,
        cheque_amount: item?.cheque_amount,
        total: item?.total,
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  const ExportPdff = (fileName) => {
    const doc = new jsPDF();

    const tableColumn = ['Cash', 'bank', 'Cheque', 'Total'];

    const tableRows = [];

    isData.forEach((item) => {
      const ticketData = [
        item?.cash_amount,
        item?.bank_amount,
        item?.cheque_amount,
        item?.total,
      ];

      tableRows.push(ticketData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(' ');

    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.text(`Report of ${fileName}`, 8, 9);
    doc.setFont('Lato-Regular', 'normal');
    doc.setFontSize(28);
    doc.save(`${fileName}_${dateStr}.pdf`);
  };
  useEffect(() => {
    getallelec();
  }, []);
  return (
    <>
      <div className="main_dash_daily_main">
        <div
          className="search-header-print"
          style={{
            width: '100%',

            paddingTop: '1%',
          }}
        >
          <Tooltip title="Export Excel File">
            <img
              onClick={() => ExportToExcel()}
              src={ExportExcel}
              alt="cc"
              style={{ width: '30px' }}
            />
          </Tooltip>
          &nbsp;&nbsp;
          <Tooltip title="Export Pdf File">
            <img
              onClick={() => ExportPdff('TodayManualDonation')}
              src={ExportPdf}
              alt="cc"
              style={{ width: '30px', marginRight: '2rem' }}
            />
          </Tooltip>
          <Tooltip title="Print">
            <img
              onClick={() => handlePrint()}
              src={Print}
              alt="cc"
              style={{ width: '30px', marginRight: '2rem' }}
            />
          </Tooltip>
          <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
            <p
              style={{
                color: '#FE0000',
                marginTop: '0px',
                marginBottom: '0px',
              }}
            >
              Donation(दान)
            </p>
          </div>
        </div>

        <div className="table-div-maai" ref={componentRef}>
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell> &nbsp;</TableCell>
                <TableCell>Cash</TableCell>
                <TableCell>Bank</TableCell>
                <TableCell>Cheque</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isData && (
                <>
                  {(rowsPerPage > 0
                    ? isData &&
                      isData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                    : isData && isData
                  ).map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell> &nbsp;</TableCell>

                      <TableCell>{row.cash_amount}</TableCell>

                      <TableCell>{row.bank_amount}</TableCell>
                      <TableCell>{row.cheque_amount}</TableCell>

                      <TableCell>{row.total}</TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
            <TableFooter>
              {/* <TableRow>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                  }}
                >
                  Total
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                  }}
                >
                {isData
                    ? isData.reduce(
                        (n, { cash_amount }) =>
                          parseFloat(n) + parseFloat(cash_amount),
                        0,
                      )
                    : '0'}
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                  }}
                >
                    {isData
                    ? isData.reduce(
                        (n, { cash_amount }) =>
                          parseFloat(n) + parseFloat(cash_amount),
                        0,
                      )
                    : '0'}
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                  }}
                >
                   {isData
                    ? isData.reduce(
                        (n, { cash_amount }) =>
                          parseFloat(n) + parseFloat(cash_amount),
                        0,
                      )
                    : '0'}
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                  }}
                >
                 {isData
                    ? isData.reduce(
                        (n, { cash_amount }) =>
                          parseFloat(n) + parseFloat(cash_amount),
                        0,
                      )
                    : '0'}
                </TableCell>
              </TableRow> */}
              <TableRow>
                <TablePagination
                  count={isData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[50, 100, 150]}
                  labelRowsPerPage={<span>Rows:</span>}
                  labelDisplayedRows={({ page }) => {
                    return `Page: ${page}`;
                  }}
                  backIconButtonProps={{
                    color: 'secondary',
                  }}
                  nextIconButtonProps={{ color: 'secondary' }}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'page number',
                    },
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
};

export default EmployeeElectronic;
