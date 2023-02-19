import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
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
import ChequeDonation from '../../../Donation/Donation/ChequeDonation/index';
import { backendApiUrl } from '../../../../../config/config';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './ManualCheque.css';
import Moment from 'moment-js';
import { ExportPdfmanul } from '../../../compoments/ExportPdf';
import Print from '../../../../../assets/Print.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import Edit from '../../../../../assets/Edit.png';
import eye from '../../../../../assets/eye.png';
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
  cheque: '#1C82AD',
};
const ManualCheque = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showalert, setshowalert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigate();
  const [updateId, setupdateId] = useState('');
  const [updateData, setupdateData] = useState('');
  const [openupdate, setopenupdate] = useState(false);
  const [showUpdateBtn, setshowUpdateBtn] = useState(true);
  const [phone, setphone] = useState('');
  const [date, setdate] = useState('');
  const [typedonation, settypedonation] = useState('');
  const [name, setname] = useState('');
  const [donationTypes, setDonationTypes] = useState([]);
  const [userrole, setuserrole] = useState('');
  const upadteClose = () => {
    setopenupdate(false);
  };
  const upadteOpen = (row) => {
    setupdateData(row);
    setopenupdate(true);
  };

  const handleOpen = (id) => {
    setOpen(true);
    setupdateId(id);
  };
  const handleClose = () => setOpen(false);

  const getall_donation = () => {
    setdate('');
    setphone('');
    setname('');
    serverInstance('user/add-elecDonation', 'get').then((res) => {
      if (res.status) {
        let filterData = res.data.filter((item) => item.modeOfDonation === '3');
        console.log(filterData);
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
    const fileName = 'ManualChequeReport';
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
      `${backendApiUrl}user/search-donation?type=${type}&name=${name}&type=${typedonation}&date=${date}&phone=${phone}`,
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
    setopendashboard(true);
    get_donation_tyeps();
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [showalert, open, openupdate]);

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
              <Cancel handleClose={handleClose} updateId={updateId} type={3} />
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
            <ChequeDonation
              handleClose={upadteClose}
              themeColor={donationColorTheme.cheque}
              updateData={updateData}
              showUpdateBtn={showUpdateBtn}
              setopendashboard={setopendashboard}
            />
          </Box>
        </Fade>
      </Modal>

      <div>
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
            <select name="cars" id="cars">
              <option>Select option</option>
              {donationTypes.map((item, idx) => {
                return <option value={item.id}>{item.type_hi}</option>;
              })}
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
              onClick={() => ExportPdfmanul(isData, 'ManualChequeReport')}
              src={ExportPdf}
              alt="ss"
              style={{ width: '30px' }}
            />
          </div>
          <div></div>
        </div>
      </div>

      <div className="table-div-maain">
        <Table sx={{ minWidth: 650, width: '100%' }} aria-label="simple table">
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
              <input type="text" className="cuolms_search" placeholder="Name" />
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
                      <img
                        onClick={() =>
                          navigation(`/admin-panel/infoElectronic/${row.id}`)
                        }
                        src={eye}
                        alt="print"
                        style={{ width: '20px', marginRight: '2px' }}
                      />

                      {userrole === 1 && (
                        <img
                          onClick={() => upadteOpen(row)}
                          src={Edit}
                          alt="print"
                          style={{ width: '20px', marginRight: '2px' }}
                        />
                      )}

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
                <TableRow>
                  <TableCell colSpan={12} align="center">
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

export default ManualCheque;
