import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Cancel from '../../../compoments/Cancel';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import CashDonation from '../../../Donation/Donation/CashDonation';
import { backendApiUrl } from '../../../../../config/config';
import axios from 'axios';
import { ExportPdfmanul } from '../../../compoments/ExportPdf';
import Print from '../../../../../assets/Print.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import Edit from '../../../../../assets/Edit.png';
import eye from '../../../../../assets/eye.png';
import ElectronicTotal from '../../../compoments/ElectronicTotal';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PrintElectronic from '../../../compoments/PrintElectronic';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DonationReportTap from '../DonationReportTap';
import { ReactSpinner } from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
import './ManualCash.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  color: '#FDC99C',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  zIndex: 2,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  left: '11px',
  bottom: '0px',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '17px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const style5 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '70%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,

  boxShadow: 24,
  borderRadius: '15px',
};
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

const ManualCash = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [showalert, setshowalert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateData, setupdateData] = useState('');
  const [openupdate, setopenupdate] = useState(false);
  const [showUpdateBtn, setshowUpdateBtn] = useState(true);
  const [donationTypes, setDonationTypes] = useState([]);
  const [updateId, setupdateId] = useState('');
  const [userrole, setuserrole] = useState('');
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [voucherfrom, setvoucherfrom] = useState('');
  const [voucherto, setvoucherto] = useState('');
  const [open5, setOpen5] = React.useState(false);
  const [searchvalue, setsearchvalue] = useState('');
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

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

  const getall_donation = () => {
    setdatefrom('');
    setdateto('');
    setvoucherfrom('');
    setvoucherto('');
    setsearchvalue('');
    serverInstance('user/add-elecDonation', 'get').then((res) => {
      if (res.status) {
        let filterData = res.data.filter((item) => item.modeOfDonation === '2');

        setisData(filterData);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
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
    if (row.active === '0') {
    } else {
      navigation('/reciept', {
        state: {
          userdata: row,
        },
      });
    }
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
    if (searchvalue) {
      axios.defaults.headers.get[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.get(
        `${backendApiUrl}admin/search-electric?search=${searchvalue}&type=${2}`,
      );

      console.log('ss', res.data.data);

      if (res.data.status) {
        setisData(res.data.data);
      }
    } else {
      axios.defaults.headers.get[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.get(
        `${backendApiUrl}user/search-donation?fromDate=${datefrom}&toDate=${dateto}&fromVoucher=${voucherfrom}&toVoucher=${voucherto}&modeOfDonation=${2}`,
      );

      console.log('ss', res.data.data);

      if (res.data.status) {
        setisData(res.data.data);
      }
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
    getall_donation();
    setopendashboard(true);
    get_donation_tyeps();
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [showalert, openupdate, open]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open5}
        onClose={handleClose5}
        closeAfterTransition
      >
        <Fade in={open5}>
          <Box sx={style5}>
            <PrintElectronic isData={isData} handleClose={handleClose5} />
          </Box>
        </Fade>
      </Modal>

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
                <h2>Cancel electronic donation </h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>
              <Cancel handleClose={handleClose} updateId={updateId} type={2} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openupdate}
        onClose={upadteClose}
        closeAfterTransition
      >
        <Fade in={openupdate}>
          <Box
            sx={{
              ...openupadtestyle,
              width: {
                xs: '90%',
                sm: '70%',
                md: '60%',
              },
            }}
          >
            <CashDonation
              handleClose={upadteClose}
              themeColor={donationColorTheme.cash}
              updateData={updateData}
              showUpdateBtn={showUpdateBtn}
              setopendashboard={setopendashboard}
            />
          </Box>
        </Fade>
      </Modal>
      <DonationReportTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div className="search-header ">
          <div className="search-inner-div-reports">
            <div className="Center_main_dic_filetr">
              <label>From Date</label>
              <input
                style={{ width: '220px' }}
                type="date"
                placeholder="From"
                value={datefrom}
                name="datefrom"
                onChange={(e) => {
                  setdatefrom(e.target.value);
                }}
              />
            </div>
            <div className="Center_main_dic_filetr">
              <label>To Date</label>
              <input
                style={{ width: '220px' }}
                type="date"
                placeholder="From"
                value={dateto}
                name="dateto"
                onChange={(e) => {
                  setdateto(e.target.value);
                }}
              />
            </div>
            <div className="Center_main_dic_filetr">
              <label>From Voucher</label>
              <input
                style={{ width: '220px' }}
                type="text"
                placeholder="From"
                value={voucherfrom}
                name="voucherfrom"
                onChange={(e) => {
                  setvoucherfrom(e.target.value);
                }}
              />
            </div>
            <div className="Center_main_dic_filetr">
              <label>To Voucher</label>
              <input
                style={{ width: '220px' }}
                type="text"
                placeholder="From"
                value={voucherto}
                name="voucherto"
                onChange={(e) => {
                  setvoucherto(e.target.value);
                }}
              />
            </div>

            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchvalue}
                  name="searchvalue"
                  onChange={(e) => setsearchvalue(e.target.value)}
                />
              </Search>
            </div>

            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button onClick={() => filterdata()}>Search</button>
            </div>
            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button onClick={() => getall_donation()}>Reset</button>
            </div>
          </div>
        </div>

        <div className="search-header-print">
          <div
            className="search-header-print"
            style={{
              borderBottom: '1px  solid gray',
              width: '100%',
              borderTop: ' 1px solid gray',
              paddingTop: '1%',
            }}
          >
            <Tooltip title="Export Excel File">
              <IconButton>
                <img
                  onClick={() => ExportToExcel()}
                  src={ExportExcel}
                  alt="cc"
                  style={{ width: '30px', marginLeft: '0rem' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Pdf File">
              <IconButton>
                <img
                  onClick={() => ExportPdfmanul(isData, 'Report')}
                  src={ExportPdf}
                  alt="cc"
                  style={{ width: '30px' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Report">
              <IconButton>
                <img
                  style={{ width: '30px' }}
                  onClick={() => handleOpen5()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
            </Tooltip>
            &nbsp;&nbsp;
          </div>
        </div>

        <div className="table-div-maain">
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
                <TableCell>User</TableCell>
                <TableCell>Remark</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  placeholder="Search Date"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  placeholder="Search Receipt"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  placeholder="Search Voucher"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  placeholder="Search Phone"
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  className="cuolms_search"
                  placeholder="Name"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  placeholder="Search Address"
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  className="cuolms_search"
                  placeholder="Search Head"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  placeholder="Search Amount"
                />
              </TableCell>
              <TableCell>
                <select name="cars" id="cars" className="cuolms_search">
                  <option>Select user</option>
                  {donationTypes.map((item, idx) => {
                    return <option value={item.id}>{item.type_hi}</option>;
                  })}
                </select>
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  placeholder="Remark"
                />
              </TableCell>
              <TableCell>&nbsp;</TableCell>
              {isData ? (
                <>
                  {(rowsPerPage > 0
                    ? isData.slice(
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
                            <li style={{ listStyle: 'none' }}>{row.type}</li>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {row.elecItemDetails.reduce(
                          (n, { amount }) => parseFloat(n) + parseFloat(amount),
                          0,
                        )}
                      </TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>
                        {row.elecItemDetails.map((row) => {
                          return (
                            <li style={{ listStyle: 'none' }}>{row.remark} </li>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Vew Details">
                          <img
                            onClick={() =>
                              navigation(
                                `/admin-panel/infoElectronic/${row.id}`,
                              )
                            }
                            src={eye}
                            alt="print"
                            style={{ width: '20px', marginRight: '2px' }}
                          />
                        </Tooltip>

                        {userrole === 1 && (
                          <Tooltip title="Edit Donation">
                            <img
                              onClick={() => upadteOpen(row)}
                              src={Edit}
                              alt="print"
                              style={{ width: '20px', marginRight: '2px' }}
                            />
                          </Tooltip>
                        )}

                        <Tooltip title="Print Certificate">
                          <img
                            onClick={() =>
                              navigation('/admin-panel/reports/printcontent', {
                                state: {
                                  data: row,
                                },
                              })
                            }
                            src={Print}
                            alt="print"
                            style={{ width: '20px', marginRight: '2px' }}
                          />
                        </Tooltip>
                        {row.isActive ? (
                          <DownloadIcon
                            onClick={() => {
                              printreceipt(row);
                            }}
                          />
                        ) : (
                          <ClearIcon />
                        )}
                        {userrole === 1 && (
                          <Tooltip title="Cancel Certificate">
                            <CancelIcon onClick={() => handleOpen(row.id)} />
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>
                      <ElectronicTotal data={isData} />
                    </TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                  </TableRow>
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      <ReactSpinner />
                    </TableCell>
                  </TableRow>
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

export default ManualCash;
