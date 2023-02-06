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
// import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import CashDonation from '../../Donation/Donation/CashDonation';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import exportFromJSON from 'export-from-json';
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

const AllReport = ({ setopendashboard }) => {
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

  const [userrole, setuserrole] = useState('');
  console.log(userrole);
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

  const getall_donation = () => {
    serverInstance('user/add-elecDonation', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);
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
    const fileName = 'AllDonationReport';
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
      `${backendApiUrl}user/search-donation?name=${name}&type=${typedonation}&date=${date}&phone=${phone}`,
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

  useEffect(() => {
    getall_donation();
    setopendashboard(true);
    get_donation_tyeps();
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [showalert, openupdate, open]);

  return (
    <>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to delete'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After delete you cannot get again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Disagree</Button>
          <Button onClick={handleClose2} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
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
            />
          </Box>
        </Fade>
      </Modal>
      <div className="dashboarddiv">
        <div>
          <div className="main_center_header10">
            <h2 className="Cheque_text"> Donations Report</h2>

            <div className="search-header-div-center">
              <div className="search-inner-div-reports">
                <div className="Center_main_dic_filetr">
                  <label>From Date</label>
                  <input type="date" placeholder="From" />
                </div>
                <div className="Center_main_dic_filetr">
                  <label>To Date</label>
                  <input type="date" placeholder="From" />
                </div>
                <div className="Center_main_dic_filetr">
                  <label>From Voucher</label>
                  <input type="text" placeholder="From" />
                </div>
                <div className="Center_main_dic_filetr">
                  <label>To Voucher</label>
                  <input type="text" placeholder="From" />
                </div>

                <div className="Center_main_dic_filetr">
                  <label>Head/Item</label>
                  <select name="cars" id="cars">
                    <option>Select option</option>
                    {donationTypes.map((item, idx) => {
                      return <option value={item.id}>{item.type_hi}</option>;
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
              </div>
              <div></div>
            </div>
          </div>
          <div className="search-header-print">
            <SimCardAlertIcon onClick={() => ExportToExcel()} />
            &nbsp;&nbsp;
            <PictureAsPdfIcon
              onClick={() => ExportPdfmanul(isData, 'ManualCashReport')}
            />
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
                          {userrole === 1 && (
                            <EditIcon onClick={() => upadteOpen(row)} />
                          )}

                          <PrintIcon
                            onClick={() =>
                              navigation('/admin-panel/reports/printcontent', {
                                state: {
                                  data: row,
                                },
                              })
                            }
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
                          {userrole === 1 && (
                            <CancelIcon onClick={() => handleOpen(row.id)} />
                          )}
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

export default AllReport;
