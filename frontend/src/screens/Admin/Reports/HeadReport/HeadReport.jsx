import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import EditIcon from '@mui/icons-material/Edit';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import PrintIcon from '@mui/icons-material/Print';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Cancel from '../../compoments/Cancel';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import CashDonation from '../../Donation/Donation/CashDonation';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { ExportPdfmanul } from '../../compoments/ExportPdf';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const openupadtestyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const donationColorTheme = {
  cash: '#48a828',
};

const HeadReport = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showalert, setshowalert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [deleteId, setdeleteId] = useState('');
  const [updateData, setupdateData] = useState('');
  const [openupdate, setopenupdate] = useState(false);
  const [showUpdateBtn, setshowUpdateBtn] = useState(true);
  const [phone, setphone] = useState('');
  const [date, setdate] = useState('');
  const [typedonation, settypedonation] = useState(2);
  const [name, setname] = useState('');
  const [donationTypes, setDonationTypes] = useState([]);
  const [updateId, setupdateId] = useState('');
  const [showsearchData, setshowsearchData] = useState(false);
  const [typeid, settypeid] = useState('');
  const [empylist, setempylist] = useState('');
  const [userrole, setuserrole] = useState('');
  const [empId, setempId] = useState('');
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  console.log('aa', typeid);
  const handleOpen = (id) => {
    setupdateId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const upadteClose = () => {
    setopenupdate(false);
  };
  const upadteOpen = (row) => {
    setupdateData(row);
    setopenupdate(true);
  };

  const handleClickOpen1 = (id) => {
    setOpen1(true);
    setdeleteId(id);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen1(false);
    serverInstance(`user/add-elecDonation?id=${deleteId}`, 'delete').then(
      (res) => {
        if (res.status === true) {
          Swal.fire(
            'Great!',
            'Eletronic donation delete successfully',
            'success',
          );
          setshowalert(true);
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
        console.log(res);
      },
    );
  };

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

  const filterdata = async () => {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const res = await axios.get(
      `${backendApiUrl}admin/donation-report?user=${empId}&fromDate=${datefrom}&toDate=${dateto}`,
    );
    console.log('filter data is now', res.data.data);
    if (res.data.status) {
      setshowsearchData(!showsearchData);
      setisData(res.data.data);
    }
  };

  const get_donation_tyeps = () => {
    try {
      Promise.all([serverInstance('admin/donation-type?type=1', 'get')]).then(
        ([res, item]) => {
          if (res.status) {
            setDonationTypes(res.data);
            console.log(res.data);
          } else {
            Swal.fire('Error', 'somthing went  wrong', 'error');
          }
        },
      );
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };
  useEffect(() => {
    setopendashboard(true);
    getAllEmp();
    get_donation_tyeps();
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [showalert, openupdate, open]);

  return (
    <>
      <div className="dashboarddiv">
        <div>
          <div className="main_center_header10">
            <h2 className="Cheque_text">Head Donation Report</h2>
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
                <button onClick={() => getall_donation()}>Reset</button>
                <SimCardAlertIcon onClick={() => ExportToExcel()} />
                <PictureAsPdfIcon
                  onClick={() => ExportPdfmanul(isData, 'ManualCashReport')}
                />
              </div>
              <div></div>
            </div>
          </div>

          <div className="table-div-maain">
            <Table
              sx={{ minWidth: 650, width: '97%' }}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#FFEEE0' }}>
                <TableRow>
                  <TableCell>Head Name</TableCell>
                  <TableCell>Count </TableCell>
                  <TableCell>Amount Cheque</TableCell>
                  <TableCell>Amount Electronic</TableCell>
                  <TableCell>Amount Item</TableCell>
                  <TableCell>Amount Cash</TableCell>
                  <TableCell>Total</TableCell>
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
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.count}</TableCell>
                        <TableCell>
                          {row.cheque_amount ? row.cheque_amount : '0'}
                        </TableCell>
                        <TableCell>
                          {row.electric_amount ? row.electric_amount : '0'}
                        </TableCell>
                        <TableCell>
                          {row.item_amount ? row.item_amount : '0'}
                        </TableCell>
                        <TableCell>
                          {' '}
                          {row.cash_amount ? row.cash_amount : '0'}
                        </TableCell>
                        <TableCell>{row.total_amount}</TableCell>
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
        </div>
      </div>
    </>
  );
};

export default HeadReport;
