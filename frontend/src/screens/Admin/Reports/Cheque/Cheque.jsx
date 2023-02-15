import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import EditIcon from '@mui/icons-material/Edit';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import PrintIcon from '@mui/icons-material/Print';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import ChangeStatus from './ChangeStatus';
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import exportFromJSON from 'export-from-json';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import Moment from 'moment-js';
import CircularProgress from '@mui/material/CircularProgress';
import { ExportPdfUserCheque } from '../../compoments/ExportPdf';
import './Cheque.css';
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
const Cheque = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refetch, setrefetch] = useState(false);
  const navigation = useNavigate();
  const [deleteId, setdeleteId] = useState('');
  const [open, setOpen] = React.useState(false);
  const [phone, setphone] = useState('');
  const [date, setdate] = useState('');
  const [name, setname] = useState('');
  const [donationTypes, setDonationTypes] = useState([]);
  const [updateId, setupdateId] = useState('');
  const [userrole, setuserrole] = useState('');
  const [type, settype] = useState('');
  const handleOpen = (id) => {
    setOpen(true);
    setdeleteId(id);
  };

  const handleClose = () => setOpen(false);

  const getall_donation = () => {
    serverInstance('admin/donation-list', 'get').then((res) => {
      if (res.status) {
        let filterData = res.data.filter(
          (item) => item.MODE_OF_DONATION === 'CHEQUE',
        );
        setisData(filterData);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
      console.log(res);
    });
  };

  const downloadrecept = (row) => {
    navigation('/reciept', {
      state: {
        userdata: row,
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ExportToExcel = () => {
    const fileName = 'OnlineChequeReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Date: Moment(item?.DATE_OF_DAAN).format('DD/MM/YYYY'),
        'Receipt No': item?.RECEIPT_NO,
        Name: item?.NAME,
        'Phone No': item?.MobileNo,

        Address: item?.ADDRESS,
        'Head/Item': item?.TYPE,
        Amount: item?.AMOUNT,
        Remark: item?.REMARK,
        MODE_OF_DONATION: item?.MODE_OF_DONATION,
        CHEQUE_NO: item?.CHEQUE_NO,
        DATE_OF_CHEQUE: item?.DATE_OF_CHEQUE,

        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY hh:mm'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  const filterdata = async () => {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const res = await axios.get(
      `${backendApiUrl}user/search-donation?type=${type}&name=${name}&date=${date}&phone=${phone}&modeOfDonation=${1}`,
    );
    if (res.data.status) {
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
    get_donation_tyeps;
    setopendashboard(true);
  }, [refetch]);
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
                <h2>Update cheque status</h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>
              <ChangeStatus id={deleteId} handleClose={handleClose} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="dashboarddiv">
        <div>
          <div className="main_center_header1">
            <h2 className="Cheque_text">Cheque donation report</h2>
            <div className="search-header">
              <div className="search-inner-div-reports">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(e) => setname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone No"
                  value={phone}
                  name="phone"
                  onChange={(e) => setphone(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Date"
                  name="date"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                />
                <select onChange={(e) => settype(e.target.value)} id="cars">
                  <option>Select option</option>
                  {donationTypes.map((item, idx) => {
                    return <option value={item.type_hi}>{item.type_hi}</option>;
                  })}
                </select>
                <button onClick={() => filterdata()}>Search</button>
                <button onClick={() => getall_donation()}>Reset</button>
                <SimCardAlertIcon onClick={() => ExportToExcel()} />
                <PictureAsPdfIcon
                  onClick={() =>
                    ExportPdfUserCheque(isData, 'OnlineChequeReport')
                  }
                />
              </div>
              <div></div>
            </div>
          </div>

          <div className="table-div-maain">
            {/* <TableContainer component={Paper}> */}
            <Table
              sx={{ minWidth: 650, width: '97%' }}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#F1F0F0' }}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Receipt No</TableCell>
                  <TableCell>Name </TableCell>
                  <TableCell>Donation Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Cheque No.</TableCell>
                  <TableCell>Date Of submission</TableCell>
                  <TableCell>Name of Bank</TableCell>

                  <TableCell>Action</TableCell>
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
                        <TableCell>
                          {' '}
                          {moment(row?.DATE_OF_DAAN).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>{row?.RECEIPT_NO}</TableCell>

                        <TableCell>{row.NAME}</TableCell>
                        <TableCell> {row.MODE_OF_DONATION}</TableCell>
                        <TableCell> {row.AMOUNT}</TableCell>
                        <TableCell>
                          {' '}
                          {row.CHEQUE_NO ? row.CHEQUE_NO : '-'}
                        </TableCell>
                        <TableCell>
                          {' '}
                          {row.DATE_OF_CHEQUE ? row.DATE_OF_CHEQUE : '-'}
                        </TableCell>
                        <TableCell>
                          {' '}
                          {row.NAME_OF_BANK ? row.NAME_OF_BANK : '-'}
                        </TableCell>

                        <TableCell>
                          <RemoveRedEyeIcon
                            onClick={() =>
                              navigation(`/admin-panel/reports/chequeinfo`, {
                                state: {
                                  data: row,
                                },
                              })
                            }
                          />

                          <EditIcon onClick={() => handleOpen(row.id)} />
                          <PrintIcon
                            onClick={() =>
                              navigation('/admin-panel/reports/printcontent', {
                                state: {
                                  data: row,
                                },
                              })
                            }
                          />
                          <DownloadIcon
                            onClick={() => {
                              downloadrecept(row);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <>
                    <TableCell colSpan={9} align="center">
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
                    // showFirstButton={true}
                    // showLastButton={true}
                    //ActionsComponent={TablePaginationActions}
                    //component={Box}
                    //sx and classes prop discussed in styling section
                  />
                </TableRow>
              </TableFooter>
            </Table>
            {/* </TableContainer> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cheque;
