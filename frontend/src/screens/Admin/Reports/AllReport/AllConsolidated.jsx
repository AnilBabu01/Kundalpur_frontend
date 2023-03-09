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
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import { ExportPdfmanul } from '../../compoments/ExportPdf';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import AllReportTap from '../AllReport/AllReportTap';
import { ReactSpinner } from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
import { useReactToPrint } from 'react-to-print';
import OnlineTotal from '../AllReport/Totals/OnlineTotal';
import ChequeTotal from '../AllReport/Totals/ChequeTotal';
import Chequestotal from '../AllReport/Totals/ChequeTotal';
import Cashtotal from '../AllReport/Totals/Cashtotal';
import ElecTotal from '../AllReport/Totals/ElecTotal';
import Itemtotal from '../AllReport/Totals/Itemtotal';
const AllConsolidated = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [empylist, setempylist] = useState('');
  const [headlist, setheadlist] = useState('');
  const [userrole, setuserrole] = useState('');
  const [empId, setempId] = useState('');
  const [type, settype] = useState('');
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [SearchHead, setSearchHead] = useState('');
  const componentRef2 = useRef();

  const handlePrint2 = useReactToPrint({
    content: () => componentRef2.current,
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getAllEmp = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setempylist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const gettypehead = () => {
    serverInstance('admin/donation-type?type=1', 'get').then((res) => {
      if (res.status) {
        setheadlist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const ExportToExcel = () => {
    const fileName = 'HeadReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Head: item?.type,
        Count: item?.count,
        'Amount Cheque': item?.cheque_amount ? item?.cheque_amount : '0',
        'Amount Electronic': item?.electric_amount
          ? item?.electric_amount
          : '0',
        'Amount Item': item?.item_amount ? item?.item_amount : '0',
        'Amount Cash': item?.cash_amount ? item?.cash_amount : '0',
        Total: item?.total_amount ? item?.total_amount : '0',
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  const ExportToExcel1 = () => {
    const fileName = 'Report';
    const exportType = 'xls';
    var data = [];
    SearchHead &&
      SearchHead.map((item, index) => {
        data.push({
          Date: Moment(item.donation_date).format('DD-MM-YYYY'),
          'Receipt No': item?.ReceiptNo,
          'Voucher No': item?.voucherNo,
          'Phone No': item?.phoneNo,
          name: item?.name,
          Address: item?.address,
          'Head/Item': item?.elecItemDetails
            ? item?.elecItemDetails.map((row) => {
                return row.type;
              })
            : item?.type,
          Amount: item?.elecItemDetails
            ? item?.elecItemDetails.reduce(
                (n, { amount }) => parseFloat(n) + parseFloat(amount),
                0,
              )
            : item?.Amount,
          remark: item?.elecItemDetails
            ? item?.elecItemDetails.map((row) => {
                return row.remark;
              })
            : item?.remark,
          'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
        });
      });
    exportFromJSON({ data, fileName, exportType });
  };
  const filterdata = async () => {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const res = await axios.get(
      `${backendApiUrl}admin/centralized-report?user=${empId}&fromDate=${datefrom}&toDate=${dateto}&type=${type}`,
    );
    console.log('filter data is now', res.data.data);
    if (res.data.data) {
      setisData(res.data.data);
    }
  };

  const filterHead = async (type) => {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const res = await axios.get(
      `${backendApiUrl}user/searchAllDonation?employeeid=${empId}&type=${type}&fromDate=${datefrom}&toDate=${dateto}`,
    );
    console.log('Head data is ', res.data.data);
    if (res.data.status) {
      setSearchHead(res.data.data);
    }
  };

  useEffect(() => {
    setopendashboard(true);
    getAllEmp();
    gettypehead();
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  const resetbutn = () => {
    setdatefrom('');
    setdateto('');
    setempId('');
    setisData('');
    setSearchHead('');
  };
  return (
    <>
      <AllReportTap setopendashboard={setopendashboard} />

      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <p>All Consolidated Report</p>
        <div>
          <div className="search-header">
            <div className="search-inner-div-reports">
              <input
                type="date"
                placeholder="From"
                value={datefrom}
                name="datefrom"
                onChange={(e) => {
                  setdatefrom(e.target.value);
                }}
              />
              <input
                type="date"
                placeholder="From"
                value={dateto}
                name="dateto"
                onChange={(e) => {
                  setdateto(e.target.value);
                }}
              />
              <select
                style={{ width: '14%' }}
                value={type}
                name="type"
                onChange={(e) => settype(e.target.value)}
              >
                <option>Type/Head</option>
                {headlist &&
                  headlist.map((item, index) => (
                    <option key={index} value={item.type_hi}>
                      {item.type_hi}
                    </option>
                  ))}
              </select>
              <select
                style={{ width: '14%' }}
                value={empId}
                name="empId"
                onChange={(e) => setempId(e.target.value)}
              >
                <option>Select User</option>
                {empylist &&
                  empylist.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.Username}
                    </option>
                  ))}
              </select>
              <button onClick={() => filterdata()}>Search</button>
              <button onClick={() => resetbutn()}>Reset</button>
              <img
                onClick={() => handlePrint2()}
                src={Print}
                alt="ss"
                style={{ width: '30px' }}
              />
              <img
                onClick={() => ExportToExcel()}
                src={ExportExcel}
                alt="s"
                style={{ width: '30px' }}
              />

              <img
                onClick={() => ExportPdfmanul(isData, 'HeadReport')}
                src={ExportPdf}
                alt="ss"
                style={{ width: '30px' }}
              />
            </div>
            <div></div>
          </div>
        </div>

        <div className="table-div-maain" ref={componentRef2}>
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#FFEEE0' }}>
              <TableRow>
                <TableCell>&nbsp; </TableCell>
                <TableCell>Staff Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Online</TableCell>
                <TableCell>Cheque</TableCell>
                <TableCell>Amount Cheque</TableCell>
                <TableCell>Amount Electronic</TableCell>
                <TableCell>Amount Item</TableCell>
                <TableCell>Amount Cash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isData ? (
                <>
                  {(rowsPerPage > 0
                    ? isData
                        .reverse()
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                    : isData
                  ).map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      {' '}
                      <TableCell>&nbsp;</TableCell>
                      <TableCell onClick={() => filterHead(row.type)}>
                        {row.employeeName ? row.employeeName : '-'}
                      </TableCell>
                      <TableCell>
                        {row.TYPE
                          ? row.MODE_OF_DONATION + ' ' + 'donation'
                          : row.donationType + ' ' + 'donation'}
                      </TableCell>
                      <TableCell>
                        {row.ONLINE_TOTAL_AMOUNT
                          ? row.ONLINE_TOTAL_AMOUNT
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {row.CHEQUE_TOTAL_AMOUNT
                          ? row.CHEQUE_TOTAL_AMOUNT
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {row.elec_cheque_TOTAL_AMOUNT
                          ? row.elec_cheque_TOTAL_AMOUNT
                          : row.manual_cheque_TOTAL_AMOUNT}
                      </TableCell>
                      <TableCell>
                        {row.manual_bank_TOTAL_AMOUNT
                          ? row.manual_bank_TOTAL_AMOUNT
                          : row.elec_bank_TOTAL_AMOUNT}
                      </TableCell>
                      <TableCell>
                        {row.manual_item_TOTAL_AMOUNT
                          ? row.manual_item_TOTAL_AMOUNT
                          : row.elec_item_TOTAL_AMOUNT}
                      </TableCell>
                      <TableCell>
                        {row.manual_cash_TOTAL_AMOUNT
                          ? row.manual_cash_TOTAL_AMOUNT
                          : row.elec_cash_TOTAL_AMOUNT}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
                  {/* <TableCell colSpan={8} align="center">
                      <CircularProgress />
                    </TableCell> */}
                </>
              )}
              <TableRow>
                <TableCell> &nbsp;</TableCell>
                <TableCell> &nbsp;</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>{<OnlineTotal data={isData} />}</TableCell>
                <TableCell>{<ChequeTotal data={isData} />}</TableCell>
                <TableCell>{<Chequestotal data={isData} />}</TableCell>

                <TableCell>{<ElecTotal data={isData} />}</TableCell>
                <TableCell>{<Itemtotal data={isData} />}</TableCell>

                <TableCell>{<Cashtotal data={isData} />}</TableCell>
              </TableRow>
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

        {SearchHead && (
          <>
            <div>
              <p className="Cheque_text">Head Report</p>
              <img
                src={Print}
                alt="jj"
                style={{ width: '25px', marginRight: '2rem' }}
              />
              <img
                onClick={() => ExportToExcel1()}
                src={ExportExcel}
                alt="jj"
                style={{ width: '25px', marginRight: '2rem' }}
              />
              <img
                onClick={() => ExportPdfmanul(isData, 'HeadReport')}
                src={ExportPdf}
                alt="jj"
                style={{ width: '25px', marginRight: '1rem' }}
              />
            </div>
            <div className="table-div-">
              <Table
                sx={{ minWidth: 650, width: '100%' }}
                aria-label="simple table"
              >
                <TableHead style={{ background: '#FFEEE0' }}>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>ReceiptNo</TableCell>

                    <TableCell>VoucherNo</TableCell>
                    <TableCell>Phone No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Head/Item</TableCell>
                    <TableCell>Amount</TableCell>

                    <TableCell>Remark</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SearchHead ? (
                    <>
                      {(rowsPerPage > 0
                        ? SearchHead.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                        : SearchHead
                      ).map((row, index) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell>
                            {Moment(row.donation_date).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell>{row.ReceiptNo}</TableCell>

                          <TableCell>{row.voucherNo}</TableCell>
                          <TableCell>{row.phoneNo}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell> {row.address}</TableCell>
                          <TableCell>
                            {row.elecItemDetails.map((row) => {
                              return (
                                <li style={{ listStyle: 'none' }}>
                                  {row.type}
                                </li>
                              );
                            })}
                          </TableCell>
                          <TableCell>
                            {row.elecItemDetails.reduce(
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0,
                            )}
                          </TableCell>

                          <TableCell>
                            {row.elecItemDetails.map((row) => {
                              return (
                                <li style={{ listStyle: 'none' }}>
                                  {row.remark}{' '}
                                </li>
                              );
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
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
                      count={SearchHead.length}
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
        )}
      </div>
    </>
  );
};

export default AllConsolidated;
