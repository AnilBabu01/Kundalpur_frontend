import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Moment from 'moment-js';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import exportFromJSON from 'export-from-json';
import './Donation.css';
import ElectronicDonation from '../ManualDonation/ElectronicDonationManual/ElectronicDonation';
import CashDonation from './CashDonationManaul';
import ItemDonation from './ItemDonationManual';
import ChequeDonation from './ChequeDonationManual';
import UnderlinedTab from './common/UnderlinedTab';
import DownloadIcon from '@mui/icons-material/Download';
import DonationSuccessfull from './DonationSuccessfull';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import ClearIcon from '@mui/icons-material/Clear';
import ManualTotal from '../../compoments/ManualTotal';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PrintManual from '../../compoments/PrintManual';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { ExportPdfmanulElectronic } from '../../compoments/ExportPdf';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import './Donation.css';
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
  top: '50%',
  left: '50%',

  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '15px',
};
const style2 = {
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
  cash: '#9F2B68',
  electronic: '#9F2B68',
  cheque: '#808080',
  item: '#FF0000',
};

const ManualDonation = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open1, setOpen1] = React.useState(false);
  const [showalert, setshowalert] = useState(false);
  const [deleteId, setdeleteId] = useState('');
  const [checkVoucher, setcheckVoucher] = useState(false);
  const [msg, setmsg] = useState('');
  const [open, setOpen] = React.useState(true);
  const [open3, setOpen3] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const [userrole, setuserrole] = useState('');
  const [donationTypes, setDonationTypes] = useState([]);
  const [rowData, setrowData] = useState('');
  const [open4, setOpen4] = useState(false);
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [type, settype] = useState('');
  const [open5, setOpen5] = React.useState(false);
  const [voucherfrom, setvoucherfrom] = useState('');
  const [voucherto, setvoucherto] = useState('');
  const [searchvalue, setsearchvalue] = useState('');
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);

  console.log('check data ', isData);

  const filterdata = async () => {
    if (searchvalue) {
      axios.defaults.headers.get[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.get(
        `${backendApiUrl}/admin/search-manual?search=${searchvalue}`,
      );

      console.log('ss', res.data.data);

      if (res.data.status) {
        setisData(res.data.data);
      }
    } else {
      serverInstance(
        `user/manual-searchAllDonation?fromDate=${datefrom}&toDate=${dateto}&fromReceipt=${voucherfrom}&toReceipt=${voucherto}',
        'get`,
      ).then((res) => {
        console.log('filter data is', res.data);

        if (res.data) {
          setisData(res.data);
        }
      });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = React.useCallback(() => setOpen(false), []);

  const navigation = useNavigate();

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, [showalert, open]);

  const getall_donation = () => {
    setsearchvalue('');
    setdatefrom('');
    setdateto('');
    setvoucherfrom('');
    setvoucherto('');
    serverInstance('admin/manual-donation', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);

        console.log('this', res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
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
      navigation('/manualreceipt', {
        state: {
          userdata: row,
        },
      });
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

  const ExportToExcel = () => {
    const fileName = 'ManualDonationReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Date: Moment(item.donation_date).format('DD-MM-YYYY'),
        'Receipt No': item?.ReceiptNo,

        'Phone No': item?.phoneNo,
        name: item?.name,
        Address: item?.address,
        'Head/Item': item?.manualItemDetails.map((row) => {
          return row.type;
        }),
        Amount: item?.manualItemDetails.reduce(
          (n, { amount }) => parseFloat(n) + parseFloat(amount),
          0,
        ),
        remark: item?.manualItemDetails.map((row) => {
          return row.remark;
        }),
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  const voucherexhauted = async (row) => {
    printreceipt(row);
    if (res.data.status === true) {
    }
    try {
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
    get_donation_tyeps();
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [showalert, open]);

  const tabs = React.useMemo(
    () => [
      {
        label: ' Manual Cash Donation',
        component: (
          <CashDonation
            setshowalert={setshowalert}
            handleClose={handleClose}
            themeColor={donationColorTheme.cash}
            handleOpen4={handleOpen4}
            setopendashboard={setopendashboard}
          />
        ),
      },
      {
        label: ' Manual Electronic Donation',
        component: (
          <ElectronicDonation
            setshowalert={setshowalert}
            handleClose={handleClose}
            themeColor={donationColorTheme.electronic}
            handleOpen4={handleOpen4}
            setopendashboard={setopendashboard}
          />
        ),
      },
      {
        label: ' Manual Cheque Donation',
        component: (
          <ChequeDonation
            setshowalert={setshowalert}
            handleClose={handleClose}
            themeColor={donationColorTheme.cheque}
            handleOpen4={handleOpen4}
            setopendashboard={setopendashboard}
          />
        ),
      },
      {
        label: ' Manual Item Donation',
        component: (
          <ItemDonation
            setshowalert={setshowalert}
            handleClose={handleClose}
            themeColor={donationColorTheme.item}
            handleOpen4={handleOpen4}
            setopendashboard={setopendashboard}
          />
        ),
      },
    ],
    [],
  );

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
            <PrintManual isData={isData} handleClose={handleClose5} />
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open4}
        onClose={handleClose4}
        closeAfterTransition
      >
        <Fade in={open4}>
          <Box sx={style}>
            <DonationSuccessfull handleClose={handleClose4} isData={rowData} />
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
          <Box
            sx={{
              ...style,
              width: {
                xs: '90%',
                sm: '70%',
                md: '70%',
              },
            }}
          >
            <UnderlinedTab
              tabs={tabs}
              handleClose={handleClose}
              themeColor={donationColorTheme}
            />
          </Box>
        </Fade>
      </Modal>

      <div className="dashboarddiv">
        <div>
          <div
            className="search-header"
            style={{ paddingLeft: '1.5%', paddingRight: '1.5%' }}
          >
            <div className="search-inner-div-reports">
              <div className="Center_main_dic_filetr">
                <label>From Date</label>
                <input
                  style={{ width: '100%' }}
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
                  style={{ width: '100%' }}
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
                  style={{ width: '100%' }}
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
                  style={{ width: '100%' }}
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
              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button onClick={() => handleOpen()}>+Add</button>
              </div>
            </div>
            {/* <div></div> */}
          </div>

          <div
            className="search-header-print"
            style={{
              paddingRight: '1.5%',
              paddingBottom: '1rem',
              paddingLeft: '1.5%',
            }}
          >
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
                    style={{ width: '30px' }}
                  />
                </IconButton>
              </Tooltip>
              &nbsp;&nbsp;
              <Tooltip title="Export Pdf File">
                <IconButton>
                  <img
                    onClick={() =>
                      ExportPdfmanulElectronic(isData, 'ManualCashReport')
                    }
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
            </div>
          </div>

          <div className="table-div-maain">
            <Table
              sx={{ minWidth: 650, width: '97%' }}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#FFEEE0' }}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>ReceiptNo</TableCell>

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
                  <select
                    className="cuolms_search"
                    onChange={(e) => settype(e.target.value)}
                    id="cars"
                  >
                    <option>Select option</option>
                    {donationTypes.map((item, idx) => {
                      return (
                        <option value={item.type_hi}>{item.type_hi}</option>
                      );
                    })}
                  </select>
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
                      : isData.reverse()
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

                        <TableCell>{row.phoneNo}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell> {row.address}</TableCell>
                        <TableCell>
                          {row.manualItemDetails.map((row) => {
                            return (
                              <li style={{ listStyle: 'none' }}>{row.type}</li>
                            );
                          })}
                        </TableCell>
                        <TableCell>
                          {row.manualItemDetails.reduce(
                            (n, { amount }) =>
                              parseFloat(n) + parseFloat(amount),
                            0,
                          )}
                        </TableCell>
                        <TableCell>&nbsp;</TableCell>
                        <TableCell>
                          {row.manualItemDetails.map((row) => {
                            return (
                              <li style={{ listStyle: 'none' }}>
                                {row.remark}{' '}
                              </li>
                            );
                          })}
                        </TableCell>
                        <TableCell>
                          {/* <RemoveRedEyeIcon
                            onClick={() =>
                              navigation(
                                `/admin-panel/infoElectronic/${row.id}`,
                              )
                            }
                          /> */}
                          {/* {userrole === 1 && (
                            <EditIcon onClick={() => upadteOpen(row)} />
                          )} */}

                          <Tooltip title="Print Certificate">
                            <img
                              onClick={() =>
                                navigation('/admin-panel/printContentmanul', {
                                  state: {
                                    data: row,
                                  },
                                })
                              }
                              src={Print}
                              alt="Print"
                              style={{ width: '20px' }}
                            />
                          </Tooltip>

                          <Tooltip title="Download Receipt">
                            {row.isActive ? (
                              <DownloadIcon
                                onClick={() => {
                                  printreceipt(row);
                                }}
                              />
                            ) : (
                              <ClearIcon />
                            )}
                          </Tooltip>

                          {/* {userrole === 1 && (
                            <CancelIcon onClick={() => handleOpen(row.id)} />
                          )} */}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>
                        <ManualTotal data={isData} />
                      </TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                    </TableRow>
                  </>
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={13} align="center">
                        <CircularProgress />
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
      </div>
    </>
  );
};

export default ManualDonation;
