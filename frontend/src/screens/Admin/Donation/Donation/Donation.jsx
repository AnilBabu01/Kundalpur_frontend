import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import PrintIcon from '@mui/icons-material/Print';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Request from './Request';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import './Donation.css';
import ElectronicDonation from './ElectronicDonation/ElectronicDonation';
import CashDonation from './CashDonation';
import AllDonationTap from '../Alldonations/AllDonationTap';
import ItemDonation from './ItemDonation';
import ChequeDonation from './ChequeDonation';
import UnderlinedTab from './common/UnderlinedTab';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '15px',
  minHeight: 500,
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
  const [checkVoucher, setcheckVoucher] = useState(false);
  const [msg, setmsg] = useState('');
  const [open, setOpen] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);

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
          setshowalert(!showalert);

          setOpen1(false);
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
        console.log(res);
      },
    );
  };

  const handleOpen = () => setOpen(true);
  const handleClose = React.useCallback(() => setOpen(false), []);

  const navigation = useNavigate();

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, [showalert, open]);

  const getall_donation = () => {
    serverInstance('user/add-elecDonation', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);
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
      navigation('/reciept', {
        state: {
          userdata: row,
        },
      });
    }
  };

  const voucherexhauted = async (row) => {
    try {
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}user/check-voucher`, {
        voucher: row?.voucherNo,
      });

      console.log(res);

      if (res.data.status === true) {
        printreceipt(row);

        Swal.fire('Great!', res.data.message, 'success');
      } else {
        Swal.fire('Great!', res.data.message, 'success');
      }
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
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
          />
        ),
      },
    ],
    [],
  );

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
          <Box
            sx={{
              ...style,
              width: {
                xs: '90%',
                sm: '70%',
                md: '60%',
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
                <h2 style={{ textAlign: 'center' }}>
                  Vouchers exhausted, Please request to new Vouchers
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
          <div className="main_center_header">
            <div className="add-btn-user">
              <button onClick={() => handleOpen()}>+Add</button>
            </div>
          </div>

          <div className="table-div-maain">
            {/* <TableContainer component={Paper}> */}
            <Table
              sx={{ minWidth: 650, width: '97%' }}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#FFEEE0' }}>
                <TableRow>
                  <TableCell>Receipt No</TableCell>
                  <TableCell>Phone No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
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
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.phoneNo}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {row.elecItemDetails.reduce(
                        (n, { amount }) => parseFloat(n) + parseFloat(amount),
                        0,
                      )}
                    </TableCell>
                    <TableCell> {row.address}</TableCell>

                    <TableCell>
                      <RemoveRedEyeIcon
                        onClick={() =>
                          navigation(`/admin-panel/infoElectronic/${row.id}`)
                        }
                      />

                      <DeleteForeverIcon
                        onClick={() => handleClickOpen1(row.id)}
                      />
                      <PrintIcon
                        onClick={() => {
                          voucherexhauted(row);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
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

export default Donation;
