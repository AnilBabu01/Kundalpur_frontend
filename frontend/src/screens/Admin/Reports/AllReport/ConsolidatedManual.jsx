import React, { useEffect, useState, useRef } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import { ExportPdfmanul } from '../../compoments/ExportPdf';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import { ReactSpinner } from 'react-spinning-wheel';
import { useReactToPrint } from 'react-to-print';
import 'react-spinning-wheel/dist/style.css';

const ConsolidatedManual = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showalert, setshowalert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openupdate, setopenupdate] = useState(false);
  const [empmanuldonation, setempmanuldonation] = useState('');
  const [userrole, setuserrole] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const componentRef2 = useRef();

  const handlePrint2 = useReactToPrint({
    content: () => componentRef2.current,
  });
  const ExportToExcel = () => {
    const fileName = 'ManualCashReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Date: Moment(item.donation_date).format('DD-MM-YYYY'),
        'Receipt No': item?.ReceiptNo,
        'Voucher No': item?.voucherNo,
        'Phone No': item?.phoneNo,
        name: item?.name,
        Address: item?.address,
        'Head/Item': item?.elecItemDetails.map((row) => {
          return row.type;
        }),
        Amount: item?.elecItemDetails.reduce(
          (n, { amount }) => parseFloat(n) + parseFloat(amount),
          0,
        ),
        remark: item?.elecItemDetails.map((row) => {
          return row.remark;
        }),
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  const getAllManualDonationDetails = () => {
    serverInstance('admin/user-manual-report   ', 'get').then((res) => {
      console.log('report', res.data);
      setempmanuldonation(res.data);
    });
  };
  useEffect(() => {
    getAllManualDonationDetails();

    setopendashboard(true);

    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [showalert, openupdate, open]);

  return (
    <>
      <div
        style={{ marginLeft: '5rem', marginRight: '1rem', marginTop: '1rem' }}
      >
        <div className="search-header">
          <div className="search-inner-div-reports">
            <div style={{ width: '80%' }}>
              <h2 style={{ marginBottom: '1rem' }}>Manual Donation Details</h2>
            </div>
            <img
              onClick={() => handlePrint2()}
              src={Print}
              alt="s"
              style={{ width: '30px' }}
            />
            <img
              onClick={() => ExportToExcel()}
              src={ExportExcel}
              alt="s"
              style={{ width: '30px' }}
            />

            <img
              onClick={() => ExportPdfmanul(isData, 'ManualCashReport')}
              src={ExportPdf}
              alt="ss"
              style={{ width: '30px' }}
            />
          </div>
          <div></div>
        </div>
      </div>

      <div className="table-div-maain" ref={componentRef2}>
        <Table sx={{ minWidth: 650, width: '100%' }} aria-label="simple table">
          <TableHead style={{ background: '#FFEEE0' }}>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Date </TableCell>
              <TableCell>User</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empmanuldonation ? (
              <>
                {(rowsPerPage > 0
                  ? empmanuldonation
                      .reverse()
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                  : empmanuldonation
                ).map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>{row.created_by}</TableCell>
                    <TableCell>
                      {Moment(row.donation_date).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.totalDonationAmount}</TableCell>
                  </TableRow>
                ))}
                <TableCell>&nbsp;</TableCell>
                <TableCell>&nbsp;</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>
                  {empmanuldonation
                    ? empmanuldonation.reduce(
                        (n, { totalDonationAmount }) =>
                          parseFloat(n) + parseInt(totalDonationAmount),
                        0,
                      )
                    : '0'}
                </TableCell>
              </>
            ) : (
              <>
                <TableCell colSpan={8} align="center">
                  <ReactSpinner />
                </TableCell>
              </>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={empmanuldonation.length}
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
    </>
  );
};

export default ConsolidatedManual;
