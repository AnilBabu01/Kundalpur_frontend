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
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import PrintIcon from '@mui/icons-material/Print';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Cancel from '../../../compoments/Cancel1';
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import Moment from 'moment-js';
import CircularProgress from '@mui/material/CircularProgress';
import exportFromJSON from 'export-from-json';
import { ExportPdfmanul } from '../../../compoments/ExportPdf';
import UpdateCash from '../../../Donation/ManualDonation/UpdateComponents/UpdateCash';
import UpdateChe from '../../../Donation/ManualDonation/UpdateComponents/UpdateChe';
import UpdateElec from '../../../Donation/ManualDonation/UpdateComponents/UpdateElec';
import UpdateTtem from '../../../Donation/ManualDonation/UpdateComponents/UpdateTtem';
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

  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const donationColorTheme = {
  cash: '#48a828',
};

const ManualElectronic = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showalert, setshowalert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateData, setupdateData] = useState('');
  const [openupdate, setopenupdate] = useState(false);
  const [showUpdateBtn, setshowUpdateBtn] = useState(true);
  const [donationTypes, setDonationTypes] = useState([]);
  const [updateId, setupdateId] = useState('');
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [type, settype] = useState('');
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

  const getall_donation = () => {
    serverInstance('admin/manual-donation', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
      console.log('all donation', res);
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

  const ExportToExcel = () => {
    const fileName = 'ManaulAllDonationReport';
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

  const filterdata = () => {
    console.log('ccc');
    serverInstance(
      `user//manual-searchAllDonation?type=${type}&fromDate=${datefrom}&toDate=${dateto}',
      'get`,
    ).then((res) => {
      console.log('filter data is', res.data);

      if (res.data) {
        setisData(res.data);
      }
    });
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
            {updateData?.modeOfDonation === '2' && (
              <>
                <UpdateCash
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                />
              </>
            )}
            {updateData?.modeOfDonation === '3' && (
              <>
                <UpdateChe
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                />
              </>
            )}
            {updateData?.modeOfDonation === '1' && (
              <>
                <UpdateElec
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                />
              </>
            )}
            {updateData?.modeOfDonation === '4' && (
              <>
                <UpdateTtem
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                />
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      <div>
        <div className="search-header">
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
          </div>
          <div></div>
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
            sx={{ minWidth: 650, width: '100%' }}
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
                          (n, { amount }) => parseFloat(n) + parseFloat(amount),
                          0,
                        )}
                      </TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>
                        {row.manualItemDetails.map((row) => {
                          return (
                            <li style={{ listStyle: 'none' }}>{row.remark} </li>
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
                        {userrole === 1 && (
                          <EditIcon onClick={() => upadteOpen(row)} />
                        )}

                        <PrintIcon
                          onClick={() =>
                            navigation('/admin-panel/printContentmanul', {
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
                          <CancelIcon onClick={() => handleOpen(row)} />
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
    </>
  );
};

export default ManualElectronic;
