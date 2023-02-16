import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
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
import CloseIcon from '@mui/icons-material/Close';
import Request from './Request';
import ElectronicDonation from './ElectronicDonation/ElectronicDonation';
import CashDonation from './CashDonation';
import ItemDonation from './ItemDonation';
import ChequeDonation from './ChequeDonation';
import UnderlinedTab from './common/UnderlinedTab';
import DownloadIcon from '@mui/icons-material/Download';
import DonationSuccessfull from './DonationSuccessfull';
import ClearIcon from '@mui/icons-material/Clear';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import exportFromJSON from 'export-from-json';
import './Donation.css';
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
  cash: '#48a828',
  electronic: '#e96d00',
  cheque: '#1C82AD',
  item: '#d6cb00',
};

const Donation = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open1, setOpen1] = React.useState(false);
  const [showalert, setshowalert] = useState(false);
  const [deleteId, setdeleteId] = useState('');
  const [msg, setmsg] = useState('');
  const [open, setOpen] = React.useState(true);
  const [open3, setOpen3] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const [userrole, setuserrole] = useState('');
  const [donationTypes, setDonationTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowData, setrowData] = useState('');
  const [open4, setOpen4] = useState(false);
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [voucherfrom, setvoucherfrom] = useState('');
  const [voucherto, setvoucherto] = useState('');
  const [type, settype] = useState('');

  console.log(type);
  const handleOpen4 = () => {
    setOpen4(true);
  };
  const handleClose4 = () => setOpen4(false);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  console.log('check data ', isData);
  const handleClickOpen1 = (id) => {
    setOpen1(true);
    setdeleteId(id);
    console.log(id);
  };

  const handleOpen = async () => {
    const role = Number(sessionStorage.getItem('userrole'));
    if (role === 3) {
      serverInstance('user/check-voucher', 'get').then((res) => {
        console.log('check couchcer not is ', res);

        if (res.status === false) {
          handleOpen3();
        }
        if (res.status === true) {
          setOpen(true);
        }
      });
    }
    if (role === 1) {
      setOpen(true);
    }
  };

  const handleClose = React.useCallback(() => setOpen(false), []);

  const navigation = useNavigate();

  const ExportToExcel = () => {
    const fileName = 'Report';
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

  const getall_donation = () => {
    serverInstance('user/add-elecDonation', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);

        setrowData(isData.pop());

        console.log(res);
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

  const filterdata = () => {
    serverInstance(
      `user/searchAllDonation?type=${type}&fromDate=${datefrom}&toDate=${dateto}&fromVoucher=${voucherfrom}&toVoucher=${voucherto}',
      'get`,
    ).then((res) => {
      console.log('filter data is', res.data);

      if (res.data) {
        setisData(res.data);
      }
    });
  };

  useEffect(() => {
    getall_donation();
    setopendashboard(true);

    get_donation_tyeps();
    setuserrole(Number(sessionStorage.getItem('userrole')));

    const role = Number(sessionStorage.getItem('userrole'));
    if (role === 3) {
      serverInstance('user/check-voucher', 'get').then((res) => {
        console.log('check couchcer not is ', res);

        if (res.status === false) {
          handleOpen3();
          setOpen(false);
        }
      });
    }
  }, [showalert, open]);

  const tabs = React.useMemo(
    () => [
      {
        label: 'Cash Donation',
        component: (
          <CashDonation
            setshowalert={setshowalert}
            handleClose={handleClose}
            themeColor={donationColorTheme.cash}
            handleOpen4={handleOpen4}
            getall_donation={getall_donation}
            setopendashboard={setopendashboard}
          />
        ),
      },
      {
        label: 'Electronic Donation',
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
        label: 'Cheque Donation',
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
        label: 'Item Donation',
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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open3}
        onClose={handleClose3}
        closeAfterTransition
      >
        <Fade in={open3}>
          <Box sx={style2}>
            <div>
              <div className="add-div-close-div1">
                <h2 style={{ textAlign: 'center', marginLeft: '24%' }}>
                  Request Vouchers
                </h2>
                <CloseIcon onClick={() => handleClose3()} />
              </div>
              <Request handleClose={handleClose3} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="dashboarddiv">
        <div>
          <div
            className="search-header-div-center"
            style={{ paddingLeft: '1.5%', paddingRight: '1.3rem' }}
          >
            <div className="search-inner-div-reports">
              <div className="Center_main_dic_filetr">
                <label>From Date</label>
                <input
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
                <label>Head/Item</label>
                <select onChange={(e) => settype(e.target.value)} id="cars">
                  <option>Select option</option>
                  {donationTypes.map((item, idx) => {
                    return <option value={item.type_hi}>{item.type_hi}</option>;
                  })}
                </select>
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
              <img
                onClick={() => ExportToExcel()}
                src={ExportExcel}
                alt="cc"
                style={{ width: '25px' }}
              />
              &nbsp;&nbsp;
              <img
                onClick={() => ExportPdfmanul(isData, 'Report')}
                src={ExportPdf}
                alt="cc"
                style={{ width: '25px' }}
              />
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
                            (n, { amount }) =>
                              parseFloat(n) + parseFloat(amount),
                            0,
                          )}
                        </TableCell>
                        <TableCell>&nbsp;</TableCell>
                        <TableCell>
                          {row.elecItemDetails.map((row) => {
                            return (
                              <li style={{ listStyle: 'none' }}>
                                {row.remark}{' '}
                              </li>
                            );
                          })}
                        </TableCell>
                        <TableCell>
                          <RemoveRedEyeIcon
                            onClick={() =>
                              navigation(
                                `/admin-panel/infoElectronic/${row.id}`,
                              )
                            }
                          />
                          {/* {userrole === 1 && (
                            <EditIcon onClick={() => upadteOpen(row)} />
                          )} */}

                          <img
                            style={{ width: '20px' }}
                            onClick={() =>
                              navigation('/admin-panel/reports/printcontent', {
                                state: {
                                  data: row,
                                },
                              })
                            }
                            src={Print}
                            alt=" Print"
                          />

                          {row.isActive ? (
                            <DownloadIcon
                              onClick={() => {
                                printreceipt(row);
                              }}
                            />
                          ) : (
                            <ClearIcon />
                          )}
                          {/* {userrole === 1 && (
                            <CancelIcon onClick={() => handleOpen(row.id)} />
                          )} */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <>
                    <TableCell colSpan={8} align="center">
                      <CircularProgress />
                    </TableCell>
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

export default Donation;
