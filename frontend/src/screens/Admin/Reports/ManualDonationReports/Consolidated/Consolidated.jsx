import React, { useEffect, useState } from 'react';

import { serverInstance } from '../../../../../API/ServerInstance';
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
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import { backendApiUrl } from '../../../../../config/config';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Print from '../../../../../assets/Print.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import Edit from '../../../../../assets/Edit.png';
import eye from '../../../../../assets/eye.png';
import { ExportPdfmanul } from '../../../compoments/ExportPdf';
import ManualDonationTap from '../ManualDonationTap';
import { ReactSpinner } from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
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

const Consolidated = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
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
  const [empylist1, setempylist1] = useState('');
  const [userrole, setuserrole] = useState('');
  const [empId, setempId] = useState('');
  console.log('dddd', empylist);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      `${backendApiUrl}user/search-donation?name=${name}&type=${typeid}&date=${date}&phone=${phone}&modeOfDonation=${2}`,
    );
    console.log('filter data is', res);
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

  const getAllEmp = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setempylist1(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };
  const getAllDonationDetails = () => {
    serverInstance('admin/user-manual-report   ', 'get').then((res) => {
      console.log('report', res.data);
      setempylist(res.data);

      // if (res.status) {
      //   isData(res.data.data);
      // } else {
      //   Swal('Error', 'somthing went  wrong', 'error');
      // }
    });
  };
  useEffect(() => {
    getAllDonationDetails();
    getAllEmp();
    setopendashboard(true);
    get_donation_tyeps();
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [showalert, openupdate, open]);

  return (
    <>
      <ManualDonationTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div>
          <div className="search-header">
            <div className="search-inner-div-reports">
              <input type="date" />
              <input type="date" />
              <select
                name="cars"
                id="cars"
                onChange={(e) => settypeid(e.target.value)}
              >
                <option
                  value={empId}
                  name="empId"
                  onChange={(e) => setempId(e.target.value)}
                >
                  Select User
                </option>
                {empylist1 &&
                  empylist1.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.Username}
                    </option>
                  ))}
              </select>
              <button onClick={() => filterdata()}>Search</button>
              <button onClick={() => getall_donation()}>Reset</button>
              <img
                onClick={() => ExportToExcel()}
                src={ExportExcel}
                alt="s"
                style={{ width: '30px' }}
              />
              <label>&nbsp;</label>
              <img
                onClick={() => ExportPdfmanul(isData, 'ManualCashReport')}
                src={ExportPdf}
                alt="ss"
                style={{ width: '30px' }}
              />
            </div>
            <div></div>
          </div>
          <h2 style={{ marginBottom: '1rem' }}>Donation Detials</h2>
        </div>

        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#FFEEE0' }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Date </TableCell>
                <TableCell>User</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empylist ? (
                <>
                  {(rowsPerPage > 0
                    ? empylist
                        .reverse()
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                    : empylist
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
                  count={empylist.length}
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

export default Consolidated;
